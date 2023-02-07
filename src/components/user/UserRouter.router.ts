// import * as express from "express";
// import IApplicationResources from "../../common/IApplicationResources.inteface";
// import IRouter from "../../common/IRouter.interface";
// import AuthMiddleware from "../../middlewares/AuthMiddleware";
// import UserController from "./UserController.controller";
// import DeteController from '../../components/dete/DeteController.controller';
// import GrupaController from '../grupa/GrupaController.controller';

// class UserRouter implements IRouter {
//     public setupRoutes(application: express.Application, resources: IApplicationResources) {
//         const userController: UserController = new UserController(resources.services);
//         const deteController: DeteController = new DeteController(resources.services);
//         const grupaController: GrupaController = new GrupaController(resources.services);

//         application.get("/api/user",                                                                     userController.getAll.bind(userController));
//         application.get("/api/user/:id",                                                                 userController.getById.bind(userController));
//         application.post("/api/user",                                                                    userController.add.bind(userController));
//         application.put("/api/user/:id",                                                                 userController.editById.bind(userController));
//         application.post("/api/user/resetPassword",                                                      userController.passwordResetEmailSend.bind(userController));
//         application.get("/api/user/reset/:code",                                                         userController.resetPassword.bind(userController));

//         application.get("/api/dete",                                                                     deteController.getAll.bind(deteController));
//         application.get("/api/dete/:id",                                                                 deteController.getById.bind(deteController));
//         application.post("/api/dete",                                                                    deteController.add.bind(deteController));
//         application.put("/api/dete/:id",                                                                 deteController.edit.bind(deteController));
//         application.delete("/api/dete/:id",                                                              deteController.delete.bind(deteController));

//     }
// }

// export default UserRouter;
