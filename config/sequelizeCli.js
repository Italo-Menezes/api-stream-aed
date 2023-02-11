module.exports = {
  development: {
    username: "admin",
    password:process.env.SENHA_BANCO_AWS,
    database: "ead_api",
    host: "database-1.cvmvqavlrf07.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    port: 3306
  },
  test: {
    username: "admin",
    password:process.env.SENHA_BANCO_AWS,
    database: "ead_api",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
  },
  production: {
    username: "admin",
    password:process.env.SENHA_BANCO_AWS,
    database: "ead_api",
    host: "database-1.cvmvqavlrf07.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    port: 3306
  }
}