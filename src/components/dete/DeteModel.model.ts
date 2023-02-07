import IModel from "../../common/IModel.inteface";
import GrupaModel from '../grupa/GrupaModel.model';
import ObjekatModel from '../objekat/ObjekatModel.model';
import UgovorModel from '../ugovor/UgovorModel.model';
import PorodicniStatusModel from '../porodicniStatus/PorodicniStatusModel.model';
import RoditeljModel from '../roditelj/RoditeljModel.model';
import PredracunModel from '../predracun/PredracunModel.model';

export default class DeteModel implements IModel {
    deteId: number;
    imePrezime: string;
    jmbg: string;
    datumRodj: string;
    adresa: string;
    brojUgovora: string;
    datumUgovora: string;
    datumPolaska: string;
    subvencija: boolean;
    popust: string;
    objekat:string;
    ugovor: string;
    pstatus: string;
    grupa: string;

    // grupe?: GrupaModel[] =[];
    // objekti?: ObjekatModel[] = [];
    // ugovori?: UgovorModel[] = [];
    // porodicniStatusi?: PorodicniStatusModel[] = [];
    roditelji?: RoditeljModel[] = [];
    predracuni?: PredracunModel[] = [];
}
