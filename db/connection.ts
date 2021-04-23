import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const dbName = process.env.DB || 'node';
const dbUser = process.env.USER_DB || '';
const dbPassword = process.env.PASSWORD_DB || '';

// console.log('dbName', dbName);
// console.log('dbUser', dbUser);
// console.log('dbPassword', dbPassword);

// es necesario colocar el nombre de usuario y password de la base de datos
// y el nombre de la base de datos en caso de no llamarse node
const db = new Sequelize('node', '', '', {
    host: 'localhost',
    dialect: 'mariadb',
    //logging: false //descomentar para evitar que las consultas aparezcan en consola
});

export default db