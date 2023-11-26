import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "www.thecocktaildb.com/api/json/v1/1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

// app.get("/submit", (req, res)=>{
//     res.render("index.ejs", { drink: "hello"});
// });


app.post('/submit', async (req, res) => {

    console.log(req.body);

    switch (req.body.choice) {
      case "Search":
        try {
          const requestedDrink = req.body.reqDrink;
          const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${requestedDrink}`);
          res.render("index.ejs", {
            drink: result.data.drinks[0]
          });
        } catch (error) {
          console.log(error.response.data);
          res.status(500);
        }
        break;
      default:
        try {
      const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      res.render("index.ejs", {
        drink: result.data.drinks[0]
      });
    } catch (error) {
      console.log(error.response.data);
      res.status(500);
    }
      break;
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}...`);
});