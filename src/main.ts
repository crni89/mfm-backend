import * as express from "express";
import * as cors from "cors";
import * as fs from "fs";
import * as mysql2 from "mysql2/promise"
import * as morgan from "morgan";
import IConfig from "./common/IConfig.interface";
import { DevConfig } from "./configs";
import IApplicationResources from "./common/IApplicationResources.inteface";
import fileUpload = require("express-fileupload");
import DeteService from './components/dete/DeteService.service';
// import UserService from "./components/user/UserService.service";
import GrupaService from './components/grupa/GrupaService.service';
import AdministratorService from "./components/administrator/AdministratorService.service";
import ObjekatService from './components/objekat/ObjekatService.service';
import UgovorService from './components/ugovor/UgovorService.service';
import PorodicniStatusService from './components/porodicniStatus/PorodicniStatusService.service';
import RoditeljService from './components/roditelj/RoditeljService.service';
import PredracunService from './components/predracun/PredracunService.service';
import RacunService from './components/racun/RacunService.service';
import UplataService from './components/uplata/UplataService.service';

async function main() {
    const config: IConfig = DevConfig;

fs.mkdirSync("./logs", {
    mode: 0o755,
    recursive: true,
});

const db = await mysql2.createConnection({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    charset: config.database.charset,
    timezone: config.database.timezone,
    supportBigNumbers: config.database.supportBigNumbers,
});

function attactConnectionMonitoring(db: mysql2.Connection) {
    db.on('error', async error => {
        if (!error.fatal) {
            return;
        }

        if (error?.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw error;
        }

        console.log('Reconnecting to the database server...');

        db = await mysql2.createConnection(db.config);

        attactConnectionMonitoring(db);

        db.connect();
    });
}

attactConnectionMonitoring(db);

const applicationResources: IApplicationResources = {
    databaseConnection: db,
    services: {
        dete: null,
        // user: null,
        grupa: null,
        administrator: null,
        objekat: null,
        ugovor: null,
        porodicniStatus: null,
        roditelj: null,
        predracun: null,
        racun: null,
        uplata: null,
    }
};

applicationResources.services.dete = new DeteService(applicationResources);
// applicationResources.services.user = new UserService(applicationResources);
applicationResources.services.grupa = new GrupaService(applicationResources);
applicationResources.services.administrator = new AdministratorService(applicationResources);
applicationResources.services.objekat = new ObjekatService(applicationResources);
applicationResources.services.ugovor = new UgovorService(applicationResources);
applicationResources.services.porodicniStatus = new PorodicniStatusService(applicationResources);
applicationResources.services.roditelj = new RoditeljService(applicationResources);
applicationResources.services.predracun = new PredracunService(applicationResources);
applicationResources.services.racun = new RacunService(applicationResources);
applicationResources.services.uplata = new UplataService(applicationResources);


const application: express.Application = express();

application.use(morgan(config.logging.foramt, {
    stream: fs.createWriteStream(config.logging.path + "/" + config.logging.filename, {flags: 'a'}),
}));

application.use(cors());

application.use(express.urlencoded({extended: true,}));

// application.use(fileUpload({
//     limits: {
//         files: config.fileUploads.maxFiles,
//         fileSize: config.fileUploads.maxFileSize,
//     },
//     abortOnLimit: true,

//     useTempFiles: true,
//     tempFileDir: config.fileUploads.tempFileDirectory,
//     createParentPath: true,
//     safeFileNames: true,
//     preserveExtension: true,
// }));

application.use(express.json());

application.use(config.server.static.route, express.static("./static", {
    index: config.server.static.index,
    dotfiles: config.server.static.dotfiles,
    cacheControl: config.server.static.cacheControl,
    etag: config.server.static.etag,
    maxAge: config.server.static.maxAge
}));

for(const router of config.routers) {
    router.setupRoutes(application, applicationResources);
}

application.use((req, res) => {
    res.sendStatus(404);
});

application.listen(config.server.port);
console.log(`Server running on port ${config.server.port}`)
}

process.on('uncaughtException', error => {
    console.error('ERROR:',error);
});

main();