const express = require("express");
const cors = require("cors");
const passport = require("passport");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

const corsOptions = {
  AllowMethods: ["GET, POST, PUT, PATCH, DELETE, HEAD"],
  AllowHeaders: ["Origin, X-Requested-With, AcceptContent-Length, Accept, Content-Type, Authorization"],
  ExposeHeaders: ["Content-Length"],
  AllowCredentials: true,
  origin: function (origin, callback) {
    callback(null, true);
  },
};
app.use(cors(corsOptions));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Okamoto application.",
  });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const dbConfig = require("./config/db.config");
const db = require("./models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
