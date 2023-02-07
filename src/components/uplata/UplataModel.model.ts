import IModel from '../../common/IModel.inteface';
import DeteModel from '../dete/DeteModel.model';

export default class UplataModel implements IModel {
    uplataId: number;
    datum: string;
    status: string;
    pozivNaBroj: string;
    iznos: string;
    deteId: number;

    //FKs:
    dete?: DeteModel = null;
}