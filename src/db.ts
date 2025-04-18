import { Sequelize } from 'sequelize';
const config = require('../config/config.json');

const environment = process.env.NODE_ENV || 'development'; // Default to 'development'
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

export default sequelize;