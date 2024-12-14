const express = require("express");

const router = express.Router();
const mysql = require("mysql");

// npm i jsonwebtoken
const jwt = require("jsonwebtoken");
// 秘钥
const secretKey = "my-key";
// token有效期
const option = {
  expiresIn: "1h", //Token有效期为1h
};

// 登录
// 链接数据库
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "demo",
});

router.post("/login", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query(
      "SELECT id, username FROM user where username = ? and password = ? limit 1",
      [req.body.username, req.body.password],
      function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        console.log("结果", results);

        if (results.length > 0) {
          // 生成token
          const token = jwt.sign({ id: results[0].id }, secretKey, option);

          // 解析token
          const yuanlai = jwt.verify(token, secretKey);
          console.log(yuanlai, "原来如此");
          res.send({ msg: "操作成功", code: 200, data: results, token: token });
        } else {
          res.send({ msg: "用户名或密码错误", code: 200 });
        }

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
      }
    );
  });
});

module.exports = router;
