import { Router } from "express";
import { NoivaController } from "./controllers/NoivaController";

const router = Router()

router.post("/noiva", NoivaController.createUser)
router.get("/noiva/:id",NoivaController.getNoiva)

export {router}