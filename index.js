import express from 'express';

// handlebars
import expressHbs from 'express-handlebars';
import hbs from "hbs";

// requests
import getContent from './app/requests/api.betting.js'

// ws
// var expressWs = require('express-ws')(app);
import expressWs from 'express-ws';

// router
// const router = express.Router()

// const app = express();
// const { app, getWss, applyTo } = expressWs(express());
const app = expressWs(express()).app;

app.engine("hbs", expressHbs.engine(
    {
        helpers: {
            is_profitable: function (value1, value2) {
                
                return value1 == value2 && 'profitable';
                
            },
            json: function (value, options) {
                return JSON.stringify(value);
            }
        },
        layoutsDir: "views/layouts", 
        defaultLayout: "layout",
        extname: "hbs",
    }
))
app.set("view engine", "hbs");

hbs.registerPartials("/views/partials");


app.use(express.static('static'));


app.use("/all", function(request, response) {
    getContent().then(data => {
        response.render("template_bets" , {
            active_all: true,
            data: data
        });
    });
})
app.use("/spoons", function(request, response) {
    response.render("spoons" , {
        active_spoons: true,
    });
})

app.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
      ws.send(msg);
    });
  });

app.use("/", function(request, response) {
    getContent().then(info => {
        const data = info.filter(item => item.markets.totals.some(delta => {
            if (delta.over.v + delta.under.v > 3.8) {
                return delta.over.v - delta.under.v == 0;
            }
        }));
        response.render("template_bets.hbs" , {
            active_home: true,
            data: data
        });
    })
});


app.listen(3000, () => console.log("work on 3000 port"));