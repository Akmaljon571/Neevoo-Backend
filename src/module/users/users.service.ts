import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { RegistrUserDto } from './dto/registr';
import jwt from 'src/utils/jwt';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { InsertResult } from 'typeorm';
import senMail from 'src/utils/node_mail';
import { random } from 'src/utils/random';
import { ParolEmailUserDto } from './dto/parol_email';
import { ParolUserDto } from './dto/parol';

@Injectable()
export class UsersService {
  private readonly redis: Redis;

  constructor(
    private readonly redisService: RedisService,
    private readonly tokenmiddleware: TokenMiddleware,
  ) {
    this.redis = this.redisService.getClient();
  }

  async verifyUser(headers: any) {
    const getUserId = await this.tokenmiddleware
      .verifyUser(headers)
      .catch((): any => {
        throw new HttpException('bad request in token', HttpStatus.BAD_REQUEST);
      });

    return getUserId;
  }

  async registr(body: RegistrUserDto) {
    const randomSon = random();
    const allReady: UsersEntity | undefined = await UsersEntity.findOne({
      where: {
        email: body.email,
        password: body.password,
      },
    }).catch(() => undefined);

    if (allReady) {
      throw new HttpException('User Already exists', HttpStatus.BAD_REQUEST);
    }

    await senMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      password: body.password,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code send Email',
      status: 200,
    };
  }

  async registr_email(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const findUser = await UsersEntity.findOne({
      where: {
        email: redis.email,
      },
    }).catch(() => []);
    if (findUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const {
      raw: [raw],
    }: InsertResult = await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        email: redis.email,
        password: redis.password,
      })
      .returning('*')
      .execute();
    const token = jwt.sign({ id: raw.user_id, email: raw.user_email });

    this.redis.del(random);

    return {
      token,
      status: 201,
    };
  }

  async login(body: RegistrUserDto) {
    const allReady: UsersEntity | undefined = await UsersEntity.findOne({
      where: {
        email: body.email,
        password: body.password,
      },
    }).catch(() => undefined);

    if (!allReady) {
      throw new HttpException('User Not Fount', HttpStatus.NOT_FOUND);
    }

    const token = jwt.sign({ id: allReady.id, email: allReady.email });

    return {
      token,
      status: 201,
    };
  }

  async parol(body: ParolUserDto) {
    const randomSon = random();
    const findUser = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => []);
    if (!findUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    await senMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code send Email',
      status: 200,
    };
  }

  async parol_email(random: string, body: ParolEmailUserDto) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const findUser: any = await UsersEntity.findOne({
      where: {
        email: redis.email,
      },
    }).catch(() => []);
    if (!findUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    this.redis.del(random);
    if (body.newPassword != body.password) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    await UsersEntity.createQueryBuilder()
      .update()
      .set({
        password: body.password,
      })
      .where({ id: findUser.id })
      .execute();
    return {
      message: 'User password successfully updated',
      status: 200,
    };
  }

  async getAdmin(headers: any): Promise<UsersEntity[] | any[]> {
    const verifyAdmin = await this.tokenmiddleware
      .verifyAdmin(headers)
      .catch((): any => {
        throw new HttpException(
          'bad request in Admin token',
          HttpStatus.BAD_REQUEST,
        );
      });

    if (verifyAdmin) {
      const getAllUsers: UsersEntity[] | any[] = (
        await UsersEntity.find()
      ).filter((e) => delete e.password);

      return getAllUsers;
    }
  }

  async getOne(headers: any): Promise<UsersEntity | any> {
    const verifyUser = await this.tokenmiddleware
      .verifyUser(headers)
      .catch((): any => {
        throw new HttpException(
          'bad request in Admin token',
          HttpStatus.BAD_REQUEST,
        );
      });

    if (verifyUser) {
      const getAllUsers: UsersEntity | any = await UsersEntity.findOne({
        where: {
          id: verifyUser,
        },
      }).catch((): any => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });

      return getAllUsers;
    }
  }

  async update(headers: any, payload: UpdateUserDto): Promise<void> {
    const getUserId = await this.verifyUser(headers);
    if (getUserId) {
      await UsersEntity.createQueryBuilder()
        .update({ password: payload.password })
        .where({
          id: getUserId,
        })
        .execute()
        .catch((): any => {
          throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
        });
    }
  }

  async deleteUser(headers: any): Promise<void> {
    const getUserId = await this.tokenmiddleware
      .verifyAdmin(headers)
      .catch((): any => {
        throw new HttpException('bad request in token', HttpStatus.BAD_REQUEST);
      });

    await UsersEntity.createQueryBuilder()
      .delete()
      .where({ id: getUserId })
      .execute()
      .catch((): any => {
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      });
  }
}
