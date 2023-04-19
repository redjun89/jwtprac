const express = require("express");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/set-key", (req, res) => {
  const { key } = req.body;
  const token = jwt.sign({ key }, "sparta");
  res.cookie('token', token);
  return res.status(200).end();
});

app.get("/get-key", (req, res) => {
  const { token } = req.cookies;
  const { key } = jwt.decode(token);
  return res.status(200).json({ key });
});

app.listen(5002, () => {
  console.log("서버가 켜졌어요!");
});



// const express = require('express');
// const JWT = require("jsonwebtoken");
// const app = express();

// app.post('/login', async (req, res) => {
//   // 사용자 정보
//   const user = {
//     userId: 1022,
//     email: "test@gmail.com",
//     name: "레드준",
//   }

//   // 사용자 정보를 JWT로 생성
//   const userJWT = await JWT.sign(user, // user 변수의 데이터를 payload에 할당
//     "secretOrPrivateKey", // JWT의 비밀키를 secretOrPrivateKey라는 문자열로 할당
//     { expiresIn: "1h" } // JWT의 인증 만료시간을 1시간으로 설정
//   );

//   // userJWT 변수를 sparta 라는 이름을 가진 쿠키에 Bearer 토큰 형식으로 할당
//   res.cookie('sparta', `Bearer ${userJWT}`);
//   return res.status(200).end();
// });

// app.listen(5002, () => {
//   console.log(5002, "번호로 서버가 켜졌어요!");
// });


// const jwt = require('jsonwebtoken');

// const payloadData = {
//     myPayloadData: 1234
// }

// const token = jwt.sign(payloadData, "mysecretKey");
// console.log(token);

// const decodedValue = jwt.decode(token);
// console.log("복호화한 token 입니다.", decodedValue);

// // jwt를 만들었을 때, 사용한 비밀키가 일치하는지 검증
// const decodedValueByVerify = jwt.verify(token, "myscretKey");
// console.log("decodedValueByVerify : ", decodedValueByVerify);

// // jwt를 만들었을 때, 사용한 비밀키가 일치하는지 검증 하지만 에러 발생
// const decodedValueByVerifyToError = jwt.verify(token, "비밀키를 다르게 입력해 봄.");
// console.log("decodedValueByVerifyToError : ", decodedValueByVerifyToError);
