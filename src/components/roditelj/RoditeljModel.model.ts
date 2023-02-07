import IModel from "../../common/IModel.inteface";
import DeteModel from '../dete/DeteModel.model';

export default class RoditeljModel implements IModel {
    roditeljId: number;
    imePrezime: string;
    jmbg: string;
    brLicne: string;
    adresa: string;
    mobilni: string;
    email: string;
    opstina: string;
    tekuciRacun: string;
    brojResenja: string;
    nosilacUgovora: boolean;

    deca?: DeteModel[] = [];
}
