export default {
    development: {
      username: process.env.DB_USER || 'roissi',
      password: null,
      database: process.env.DB_NAME || 'alcai',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    },
    test: {
      username: process.env.DB_USER || 'roissi',
      password: null,
      database: process.env.DB_NAME || 'alcai',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    },
    production: {
      url: process.env.DATABASE_URL,
      username: process.env.DB_USER || 'defaultUser',
      password: null,
      database: process.env.DB_NAME || 'defaultDb',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      logging: false
    }
  };