const express = require("express")
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const course = require("./routes/course");
const port = 3000;

//middleware
app.use(express.json())

app.get("/home", (req, res) => {
    res.send("This is a home page");
})

app.use("/api/v1/course", course);

const start = async () => {
    try {
        await connectDB(process.env.mongoURI);
        app.listen(port, () => {
            console.log(`edu-course-management app running on port ${port}`)
        })
    } catch (error) {
        console.error(error);
    }
}

start();