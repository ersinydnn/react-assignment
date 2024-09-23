const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");
const companyRoutes = require("./routes/companies");
const productRoutes = require("./routes/products");

dotenv.config();

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in .env");
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });

    console.log("User Exists:", userExists);
    console.log("Email Exists:", emailExists);

    if (userExists) {
      return res
        .status(400)
        .send({ message: "This username is already taken" });
    }

    if (emailExists) {
      return res.status(400).send({ message: "This email is already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error occurred while saving to MongoDB:", error);
    res
      .status(500)
      .send({ message: "An error occurred during registration", error });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).send({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "An error occurred during login", error });
  }
});

app.get("/api/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "An error occurred", error });
  }
});

app.use("/api/companies", companyRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
