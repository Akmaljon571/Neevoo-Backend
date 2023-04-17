import { HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const senMail = async (adres: string, content: string) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: 'lincorteamnt@gmail.com',
        pass: 'xbewqqnfarwklaaj',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transport.sendMail({
      from: 'lincorteamnt@gmail.com',
      to: adres,
      subject: content,
      text: content,
    });
  } catch (error) {
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
};

export default senMail;
