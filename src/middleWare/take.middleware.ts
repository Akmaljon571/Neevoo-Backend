import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TakeEntity } from 'src/entities/take.entity';

@Injectable()
export class TakeMiddleware implements NestMiddleware {
  date(time: Date): string {
    const date = JSON.stringify(time)
      .split('T')[0]
      .split('"')[1]
      .split('-')
      .reverse()
      .join(' ');

    return date;
  }

  trim(st: string): number {
    return Number(
      st.split(' ').join('').split(' ').join('').split(' ').join(''),
    );
  }

  plus(date: string[], month: number) {
    const result = date.map((e) => Number(e));
    const natija = result[1] + month;
    if (natija > 12) {
      const qoldiq = natija - 12;
      result[2] += 1;

      return [result[0], qoldiq, result[2]];
    }
    return [result[0], natija, result[2]];
  }

  async taqoslash(result: number[], today: number[], id: string) {
    if (
      result[0] == today[0] &&
      result[1] < today[1] &&
      result[2] == today[2]
    ) {
      await TakeEntity.createQueryBuilder()
        .update()
        .set({
          active: false,
        })
        .where({
          id,
        })
        .execute();
    } else if (
      result[0] < today[0] &&
      result[1] == today[1] &&
      result[2] == today[2]
    ) {
      await TakeEntity.createQueryBuilder()
        .update()
        .set({
          active: false,
        })
        .where({
          id,
        })
        .execute();
    }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const allTake: TakeEntity[] = await TakeEntity.find();
    const date = new Date();
    const today = this.date(date)
      .split(' ')
      .map((e) => Number(e));
    for (let i = 0; i < allTake.length; i++) {
      if (allTake[i].active) {
        const bazaCreate = this.date(allTake[i].create_date).split(' ');
        const result = this.plus(bazaCreate, allTake[i].month);

        this.taqoslash(result, today, allTake[i].id);
      }
    }
    next();
  }
}
