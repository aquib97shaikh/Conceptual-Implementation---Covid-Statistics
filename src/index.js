const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const { data } = require('./data')

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')

app.get("/totalRecovered", async (req,res) =>{
    let result = await connection.aggregate([
      {
        $group: {
            _id : "total",
          recovered: { $sum: "$recovered" },
        },
      },
    ]);
    // let result = data.reduce((t,n)=>t+n.recovered,0);


    // let result = await connection.find({});
    // console.log({result,resultd});
    res.send({
        data:resultdm,
    })
})




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;