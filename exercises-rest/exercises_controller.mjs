import express from "express";
import "dotenv/config";
import * as exercises from "./exercises_model.mjs";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.post("/exercises");

app.get("/exercises");

app.get("/exercises/:_id");

app.put("/exercises/:_id");

app.delete("/exercises/:_id");

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} ...`);
});