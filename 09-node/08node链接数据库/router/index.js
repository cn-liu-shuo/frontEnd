const express = require("express");

// 创建路由对象
const router = express.Router();

var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost", // 服务器地址
  user: "root",
  password: "root",
  database: "demo",
  // port
});

router.get("/getList", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query("SELECT * FROM mons", function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      console.log("结果", results);

      res.send({ msg: "操作成功", code: 200, data: results });
      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

router.post("/postList", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!

    let params = [req.body.name, req.body.age, req.body.sex, req.body.address];
    // Use the connection
    connection.query(
      "INSERT INTO mons (name,age,sex,address) VALUES (?,?,?,?);",
      params,
      function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        console.log("结果", results);

        res.send({ msg: "操作成功", code: 200, data: results });
        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
      }
    );
  });
});

// 将router暴露
module.exports = router;
