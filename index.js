const fetch  = require("node-fetch");
const express = require("express");
const app = express();
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

const getContent = async () => {
    const url = `https://api.betting-api.com/1xbet/football/line/all?token=7f1d3664836d4fb1a295da5f9024771be7a441567eff414e8146533fe8c84665`;
    // const additional_url = `/data/data.json`

    // const url = `http://localhost:3000/data/data.json`;

    const response = await fetch(url);
    const data = await response.json();
    return data; 
}

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

hbs.registerPartials(__dirname + "/views/partials");


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



app.listen(3000);