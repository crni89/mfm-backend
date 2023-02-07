import * as express from "express";
import IApplicationResources from '../../common/IApplicationResources.inteface';
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import DeteController from "../dete/DeteController.controller";
import GrupaController from "../grupa/GrupaController.controller";
import ObjekatController from "../objekat/ObjekatController.controller";
import UgovorController from "../ugovor/ObjekatController.controller";
import AdministratorController from "./AdministratorController.controller";
import PorodicniStatusController from '../porodicniStatus/PorodicniStatusController.controller';
import RoditeljController from '../roditelj/RoditeljController.controller';
import PredracunController from '../predracun/PredracunController.controller';
import RacunController from '../racun/RacunController.controller';
import UplataController from '../uplata/UplataController.controller';

class AdministratorRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const administratorController: AdministratorController = new AdministratorController(resources.services);
        const deteController: DeteController = new DeteController(resources.services);
        const grupaController: GrupaController = new GrupaController(resources.services);
        const objekatController: ObjekatController = new ObjekatController(resources.services);
        const ugovorController: UgovorController = new UgovorController(resources.services);
        const porodicniStatusController: PorodicniStatusController = new PorodicniStatusController(resources.services);
        const roditeljController: RoditeljController = new RoditeljController(resources.services);
        const predracunController: PredracunController = new PredracunController(resources.services);
        const racunController: RacunController = new RacunController(resources.services);
        const uplataController: UplataController = new UplataController(resources.services);

        application.get("/api/administrator",                           administratorController.getAll.bind(administratorController));
        application.get("/api/administrator/:id",                       administratorController.getById.bind(administratorController));
        application.post("/api/administrator",                          administratorController.add.bind(administratorController));
        application.put("/api/administrator/:aid",                      administratorController.editById.bind(administratorController));
        application.delete("/api/administrator/:id",                    administratorController.delete.bind(administratorController));

        //Grupa
        application.get("/api/grupa",                                   grupaController.getAll.bind(grupaController));
        application.get("/api/grupa/:id",                               grupaController.getById.bind(grupaController));
        application.post("/api/grupa",                                  grupaController.add.bind(grupaController));
        application.put("/api/grupa/:id",                               grupaController.edit.bind(grupaController));
        application.delete("/api/grupa/:id",                            grupaController.delete.bind(grupaController));

        //Objekat
        application.get("/api/objekat",                                 objekatController.getAll.bind(objekatController));
        application.get("/api/objekat/:id",                             objekatController.getById.bind(objekatController));
        application.post("/api/objekat",                                objekatController.add.bind(objekatController));
        application.put("/api/objekat/:id",                             objekatController.edit.bind(objekatController));
        application.delete("/api/objekat/:id",                          objekatController.delete.bind(objekatController));
        
        //Ugovor
        application.get("/api/ugovor",                                  ugovorController.getAll.bind(ugovorController));
        application.get("/api/ugovor/:id",                              ugovorController.getById.bind(ugovorController));
        application.post("/api/ugovor",                                 ugovorController.add.bind(ugovorController));
        application.put("/api/ugovor/:id",                              ugovorController.edit.bind(ugovorController));
        application.delete("/api/ugovor/:id",                           ugovorController.delete.bind(ugovorController));
        
        //Porodicni status
        application.get("/api/porodicniStatus",                         porodicniStatusController.getAll.bind(porodicniStatusController));
        application.get("/api/porodicniStatus/:id",                     porodicniStatusController.getById.bind(porodicniStatusController));
        application.post("/api/porodicniStatus",                        porodicniStatusController.add.bind(porodicniStatusController));
        application.put("/api/porodicniStatus/:id",                     porodicniStatusController.edit.bind(porodicniStatusController));
        application.delete("/api/porodicniStatus/:id",                  porodicniStatusController.delete.bind(porodicniStatusController));

        //Dete
        application.get("/api/dete",                                    deteController.getAll.bind(deteController));

        application.get("/api/deca",                                    deteController.search.bind(deteController));
        application.get("/api/decap",                                   deteController.searchPred.bind(deteController));

        
        application.get("/api/dete/:id",                                deteController.getById.bind(deteController));
        application.post("/api/dete",                                   deteController.add.bind(deteController));
        application.put("/api/dete/:id",                                deteController.edit.bind(deteController));
        application.delete("/api/dete/:id",                             deteController.delete.bind(deteController));

        application.get("/api/predracun",                               predracunController.getAllPre.bind(predracunController));
        application.get("/api/dete/:did/predracun",                     predracunController.getAll.bind(predracunController));
        application.get("/api/dete/:did/predracun/:id",                 predracunController.getById.bind(predracunController));
        application.put("/api/dete/:did/predracun/:id",                 predracunController.edit.bind(predracunController));
        application.post("/api/dete/:did/predracun",                    predracunController.add.bind(predracunController));
        application.delete("/api/dete/:id/predracun/:pid",              predracunController.delete.bind(predracunController));
        
        application.get("/api/racun",                                   racunController.getAllRac.bind(racunController));
        application.get("/api/dete/:did/racun",                         racunController.getAll.bind(racunController));
        application.get("/api/dete/:did/racun/:id",                     racunController.getById.bind(racunController));
        application.put("/api/dete/:did/racun/:id",                     racunController.edit.bind(racunController));
        application.post("/api/dete/:did/racun",                        racunController.add.bind(racunController));
        application.delete("/api/dete/:id/racun/:pid",                  racunController.delete.bind(racunController));
        
        application.get("/api/uplata",                                   uplataController.getAllRac.bind(uplataController));
        application.get("/api/dete/:did/uplata",                         uplataController.getAll.bind(uplataController));
        application.get("/api/dete/:did/uplata/:id",                     uplataController.getById.bind(uplataController));
        application.put("/api/dete/:did/uplata/:id",                     uplataController.edit.bind(uplataController));
        application.post("/api/dete/:did/uplata",                        uplataController.add.bind(uplataController));
        application.delete("/api/dete/:id/uplata/:pid",                  uplataController.delete.bind(uplataController));
        
        //Roditelj
        application.get("/api/roditelj",                                roditeljController.getAll.bind(roditeljController));
        application.get("/api/roditelj/:id",                            roditeljController.getById.bind(roditeljController));
        application.post("/api/roditelj",                               roditeljController.add.bind(roditeljController));
        application.put("/api/roditelj/:id",                            roditeljController.edit.bind(roditeljController));
        application.delete("/api/roditelj/:id",                         roditeljController.delete.bind(roditeljController));
    }
}
// AuthMiddleware.getVerifier("administrator")

export default AdministratorRouter;
