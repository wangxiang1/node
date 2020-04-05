module.exports = {
  db: {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "kaikeba"
  },

  middleware: ['logger']
}