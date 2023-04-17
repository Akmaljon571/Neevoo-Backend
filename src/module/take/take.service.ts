import { TakeEntity } from './../../entities/take.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import { CreateTakeDto } from './dto/create-take.dto';

@Injectable()
export class TakeService {
  async validateUser(userId: string): Promise<UsersEntity> {
    const findUser: UsersEntity = await UsersEntity.findOne({
      where: {
        id: userId,
      },
    }).catch(() => {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return findUser;
  }

  async create(body: CreateTakeDto) {
    const findUser: UsersEntity = await this.validateUser(body.user);
    await TakeEntity.createQueryBuilder()
      .insert()
      .into(TakeEntity)
      .values({
        month: body.month,
        price: body.price,
        take_user: findUser,
      })
      .execute();
  }

  async findAll() {
    return await TakeEntity.find({
      relations: {
        take_user: true,
      },
    }).catch(() => {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    });
  }

  async remove(id: string) {
    const findTake = await TakeEntity.findOne({
      where: {
        id,
      },
    }).catch(() => {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findTake) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await TakeEntity.createQueryBuilder()
      .delete()
      .from(TakeEntity)
      .where({
        id: findTake.id,
      })
      .execute();
  }
}
