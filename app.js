let express = require("express");
let datas = require("./datas.json");
let cors = require("cors");

let app = express();
let corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(function (error, request, response, next) {
  response.status(error.status || 500);
  response.json({
    error: error.message,
  });
});

//DATA LOADING
app.get("/", function (req, res) {
  res.json(datas);
});

//SEARCH A SONG
app.get("/search/:mot?", function (req, res) {
  let mot = req.params.mot;

  let tab = [];
  let reg = new RegExp(mot, "i");

  tab = datas.filter((elt) => reg.test(elt.tracks));
  res.json(tab);
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
