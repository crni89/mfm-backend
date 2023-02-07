import IModel from '../../common/IModel.inteface';
import DeteModel from '../dete/DeteModel.model';

export default class PredracunModel implements IModel {
    predracunId: number;
    datum: string;
    status: string;
    datumOd: string;
    datumDo: string;
    tip: string;
    brojFakture: number;
    godina: string;
    pozivNaBroj: string;
    iznos: string;
    paket: string;
    valuta: string;
    popust: string;
    deteId: number;

    //FKs:
    deca?: DeteModel[] = [];
}