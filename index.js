const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log('MongoDB connected')
);

app.use(express.json());
app.use("/url", urlRoute);
app.listen(PORT, ()=> console.log(`Server Started at PORT ${PORT}`));