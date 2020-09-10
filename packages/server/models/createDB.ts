import { resolve } from 'path';
import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async (filename: string) => {
    const db = await open({
      filename: resolve(__dirname, `../db/${filename}.db`),
      driver: sqlite3.Database
    })
    db.close();
}