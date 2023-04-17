export class UserFn {
  date(time: Date): string {
    const date = JSON.stringify(time)
      .split('T')[0]
      .split('"')[1]
      .split('-')
      .reverse()
      .join(' ');

    return date;
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
}
