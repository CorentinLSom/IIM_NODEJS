import express from "express";
import router from "./back/routes/start.js";
import cors from"cors";

import bodyParser from "body-parser";

import ip from "ip";
const app = express();
const ipAddr = ip.address();

// let lastHouseVisited = "Gryffondor";
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(router);

app.get("/", (req, res) => {
    res.json({ message: lastHouseVisited });
})
app.post("/", (req, res) => {
    lastHouseVisited = req.body.house;
    res.json({ message: lastHouseVisited });
})

app.listen(3000, () => {
    console.log("Server run: http://" + ip.address() + ":3000");
})