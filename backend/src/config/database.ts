import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
dotenv.config();

//Make the db conection with postgress
const url = process.env.DATABASE_URL;

export const sequelize = new Sequelize(url, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    models: [__dirname + '/../models/**/*']
});



