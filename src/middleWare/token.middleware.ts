import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import jwt from 'src/utils/jwt';

export class TokenMiddleware {
  async verifyAdmin(headers: any) {
    if (!headers.autharization) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const id_email = jwt.verify(headers.autharization);

    if (!id_email) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    const admin = await UsersEntity.findOneBy({
      id: id_email?.id,
      email: id_email?.email,
    });

    if (!admin?.email) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    // if (
    //   admin?.email !== 'ahmadjonovakmal079@gmail.com' &&
    //   admin.password !== 'adminprodvd2427'
    // ) {
    //   throw new HttpException('Siz Admin emasiz', HttpStatus.BAD_REQUEST);
    // }
    return admin.id;
  }

  async verifyUser(headers: any) {
    if (!headers.autharization) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const id_email = jwt.verify(headers.autharization);
    if (!id_email) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const user = await UsersEntity.findOneBy({
      id: id_email?.id,
      email: id_email?.email,
    });
    if (!user?.email) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    return user.id;
  }
}
