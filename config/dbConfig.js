export default {
  development: {
    username: process.env.DB_USER || 'roissi',
    password: null,
    database: process.env.DB_NAME || 'alcai',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000
    }
  },
  test: {
    username: process.env.DB_USER || 'roissi',
    password: null,
    database: process.env.DB_NAME || 'alcai',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    username: process.env.DB_USER || 'defaultUser',
    password: null,
    database: process.env.DB_NAME || 'defaultDb',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000
    }
  }
};