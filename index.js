import express from "express";
import "dotenv/config";
// handlebars
import expressHbs from "express-handlebars";
import hbs from "hbs";

// cache bets
import initCaching from "./cache/functions/bets.js";
// initCaching();

// helper
import read_json from './app/helpers/read_json.js';


// ws
// var expressWs = require('express-ws')(app);
import expressWs from "express-ws";

// router
// const router = express.Router()

// const app = express();
// const { app, getWss, applyTo } = expressWs(express());

const app = expressWs(express()).app;

app.engine(
  "hbs",
  expressHbs.engine({
    helpers: {
      is_profitable: function (value1, value2) {
        return value1 == value2 && "profitable";
      },
      json: function (value, options) {
        return JSON.stringify(value);
      },
    },
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

hbs.registerPartials("/views/partials");

app.use(express.static("static"));

const _CACHE_URL = 'cache/data/bets.json';

app.

use("/all", function (request, response) {
  read_json(_CACHE_URL).then((data) => {
    response.render("template_bets", {
      active_all: true,
      data: data,
      heading: 'Все ставки'
    });
  });
});
app.use("/spoons", function (request, response) {
  response.render("spoons", {
    active_spoons: true,
  });
});

app.ws("/echo", function (ws, req) {
  ws.on("message", function (msg) {
    ws.send(msg);
  });
});

app.use("/", function (request, response) {
  read_json(_CACHE_URL).then((bets) => {
    const filtered_info = bets.filter((item) =>
    item.markets.totals.some((delta) => {
      if (delta.over.v + delta.under.v > 3.8) {
        return delta.over.v - delta.under.v == 0;
      }
    })
    );
    response.render("template_bets.hbs", {
      active_home: true,
      data: filtered_info,
      heading: 'Вилки'
    });
  });
});

app.listen(3000, () => {
  console.log("work on 3000 port");
});
