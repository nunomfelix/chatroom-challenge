"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        'src/modules/**/entities/*.entity{.ts,.js}',
        'src/modules/**/entites/*.view-entity{.ts,.js}',
    ],
    migrations: ['src/database/migrations/*{.ts,.js}'],
});
//# sourceMappingURL=ormconfig.js.map