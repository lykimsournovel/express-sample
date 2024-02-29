const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    database: "react_sample",
    user: "root",
    password: "12345678",
  })
  .promise();
const seedSql =
  "insert into employees (age, title, role, slug) values('29', 'teacher', 'admin', 'team c'),('30', 'teacher', 'admin', 'team c'),('31', 'teacher', 'admin', 'team c')";
pool
  .execute(seedSql)
  .then((result) => {
    console.table(result);
    return;
  })
  .catch((error) => console(error.message));
