import { Router } from "express";
import { NoivaController } from "./controllers/NoivaController";
import { DiaController } from "./controllers/DiaController";

const router = Router()

router.post("/noiva", NoivaController.createUser)
router.get("/noiva/:id",NoivaController.getNoiva)
router.get("/allNoiva",NoivaController.getAllNoiva)
router.put("/noiva/:id", NoivaController.updateNoiva)
router.delete("/noiva/:id", NoivaController.deleteNoiva)

router.post("/dia", DiaController.createDia)
router.get("/getdia/:dia/:mes/:ano", DiaController.findDia)
router.get("/getAlldia", DiaController.findAllDia)

export {router}