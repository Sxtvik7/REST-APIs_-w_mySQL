const express = require('express');

const app = express();

app.use(express.json());

const userRoutes = require('./routes/routes.js');
app.use("/api/v2", userRoutes)

app.listen(3200, ()=>{
    console.log("server is running")
})
