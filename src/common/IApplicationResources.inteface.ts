import * as mysql2 from "mysql2/promise";
import DeteService from '../components/dete/DeteService.service';
// import UserService from "../components/user/UserService.service";
import GrupaService from '../components/grupa/GrupaService.service';
import AdministratorService from '../components/administrator/AdministratorService.service';
import ObjekatService from '../components/objekat/ObjekatService.service';
import UgovorService from '../components/ugovor/UgovorService.service';
import PorodicniStatusService from '../components/porodicniStatus/PorodicniStatusService.service';
import RoditeljService from '../components/roditelj/RoditeljService.service';
import PredracunService from '../components/predracun/PredracunService.service';
import RacunService from '../components/racun/RacunService.service';
import UplataService from '../components/uplata/UplataService.service';

export interface IServices {
    dete: DeteService;
    // user: UserService;
    grupa: GrupaService;
    administrator: AdministratorService;
    objekat: ObjekatService;
    ugovor: UgovorService;
    porodicniStatus: PorodicniStatusService;
    roditelj: RoditeljService;
    predracun: PredracunService;
    racun: RacunService;
    uplata: UplataService;
}

export default interface IApplicationResources {
    databaseConnection: mysql2.Connection;
    services: IServices;
}
