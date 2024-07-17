require("dotenv").config();
const mysql = require("mysql2");
const pool = mysql
  .createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
  })
  .promise();
const seedSql =
  "insert into employees (age, title, role, slug) values('29', 'teacher', 'admin', 'team c'),('30', 'teacher', 'admin', 'team c'),('31', 'teacher', 'admin', 'team b')";
pool
  .execute(seedSql)
  .then((result) => {
    console.table(result);
    return;
  })
  .catch((error) => console(error.message));
