export default {
    development: {
      username: process.env.DB_USER || 'defaultUser',
      password: null,
      database: process.env.DB_NAME || 'defaultDb',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    },
    test: {
      username: process.env.DB_USER || 'defaultUser',
      password: null,
      database: process.env.DB_NAME || 'defaultDb',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    },
    production: {
      username: process.env.DB_USER || 'defaultUser',
      password: null,
      database: process.env.DB_NAME || 'defaultDb',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      logging: false
    }
  };