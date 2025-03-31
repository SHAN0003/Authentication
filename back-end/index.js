const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secretKey = "khopditodsaaleka123";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Required for cookies
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

//DB connection
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://Shan:Shan123@cluster0.ukwgu.mongodb.net/Accounts"
    );
    console.log("DB connected :)");
  } catch (error) {
    console.log("DB connection FAILED", error);
  }
};
connectDB();

//generate JWT token
const generateJWT = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: "1h" });
};

//middleware
function authenticate(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

//register end-popint
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email });
  console.log("user-->", user);

  if (user) {
    return res.send("User alredy exist, try to login!");
  } else {
    //password hashing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data = {
      email: email,
      password: hash,
      name: name,
      token: token,
    };
    await User.insertMany(data);

    return res.send("user created successfully :)");
  }
});

//login end-point
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log("user->", user);

  if (user) {
    const check = await bcrypt.compare(password, user.password);
    console.log("check---------->", check, user.token);

    if (check) {
      //JWT token
      const token = generateJWT(user._id);
      console.log(token);

      res.cookie("token", token, {
        httpOnly: true, // Prevents JS access
        secure: false, // Set to true for HTTPS
        sameSite: "lax", // Allows frontend to receive cookie
        expires: new Date(Date.now() + 9000000),
      });

      return res.json({
        loged: true,
        name: user.name,
        msg: `welcome ${user.name}`,
        token: token
      });
    } else {
      return res.json({ loged: false, msg: "enter valid password !" });
    }
  } else {
    return res.json({
      loged: false,
      msg: "enter valid email OR register first !!",
    });
  }
});

app.listen(8000, () => console.log("server strted !!"));
