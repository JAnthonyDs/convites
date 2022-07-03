import { Router } from "express";
import { NoivaController } from "./controllers/NoivaController";
import { DiaController } from "./controllers/DiaController";
import { DiaNoivaController } from "./controllers/DiaNoivaController";
import multer from "multer";

import { storage } from "./config/multer";

const upload = multer({
    storage: storage
})

const router = Router()

router.post("/noiva",upload.single('foto'),NoivaController.createUser)
router.get("/noiva/:id",NoivaController.getNoiva)
router.get("/allNoiva",NoivaController.getAllNoiva)
router.put("/noiva/:id", NoivaController.updateNoiva)
router.delete("/noiva/:id/:id_day", NoivaController.deleteNoiva)

router.post("/dia", DiaController.createDia)
router.get("/getdia/:dia/:mes/:ano", DiaController.findDia)
router.get("/getAlldia", DiaController.findAllDia)
router.get("/dia/:dia/:mes/:ano",DiaController.findOneIdDay)

router.post("/teste", DiaNoivaController.create)
router.get("/teste", DiaNoivaController.find)

export {router}