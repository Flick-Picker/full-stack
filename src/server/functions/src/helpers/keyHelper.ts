import { Request } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export function verifyKey(req: Request) : boolean {
  const givenKey = req.header('x-api-key');
  if (!givenKey || !process.env.API_KEY) {
    return false;
  }
  if (process.env.API_KEY === givenKey) {
    return true;
  }
  return false;
}
