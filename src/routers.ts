import AuthRouter from './components/auth/AuthRouter.router';
// import UserRouter from './components/user/UserRouter.router';
import AdministratorRouter from './components/administrator/AdministratorRouter.router';


const ApplicationtRouters =  [
    // new UserRouter(),
    new AuthRouter(),
    new AdministratorRouter(),
];

export default ApplicationtRouters;