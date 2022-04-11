import express from "express";

const routes = express.Router();

routes.post("/", () => {
    console.log("funcionou");
})

export default routes;