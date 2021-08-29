const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/whatsapp", (req, res) => {
    const mobile = req.body.mobile;
    const client = require("twilio")(process.env.accountSid, process.env.authToken);
    client.messages 
      .create({ 
         body: 'Hello👋! This is Sanskriti 😎... Let\'s catch up someday?', 
         from: 'whatsapp:+14155238886',       
         to: `whatsapp:${mobile}`
       }) 
      .then(message => {
        console.log(message.sid);
        res.redirect("/");
      })
      .catch((e) => {
        console.log(e);
      })
      .done();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Started on PORT: " + PORT));