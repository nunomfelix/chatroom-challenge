import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    './src/modules/**/entities/*.entity{.ts,.js}',
    './src/modules/**/entites/*.view-entity{.ts,.js}',
  ],
  migrations: ['./src/migrations/*{.ts,.js}'],
});
