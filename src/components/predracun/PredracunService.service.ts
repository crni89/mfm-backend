import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import PredracunModel from "./PredracunModel.model";
import IAddPredracun from './dto/IAddPredracun.dto';
import IEditPredracun from './dto/IEditPredracun.dto';

export interface IPredracunOptions extends IAdapterOptions {
    loadDete: boolean;
}

export const DefaultPredracunOptions: IPredracunOptions = {
    loadDete: true,
}

interface DetePredracunInterface {
    predracun_dete_id: number;
    dete_id: number;
    predracun_id: number;
}

class PredracunService extends BaseService<PredracunModel, IPredracunOptions> {
    tableName(): string {
        return "predracun";
    }

    protected  adaptToModel(data: any, options: IPredracunOptions): Promise<PredracunModel> {
        return new Promise(async (resolve) =>{

            const predracun = new PredracunModel();
    
            predracun.predracunId    = +data?.predracun_id;
            predracun.datum          = data?.datum;
            predracun.status         = data?.status;
            predracun.datumOd        = data?.datum_od;
            predracun.datumDo        = data?.datum_do;
            predracun.tip            = data?.tip;
            predracun.brojFakture    = +data?.broj_fakture;
            predracun.godina         = data?.godina;
            predracun.pozivNaBroj    = data?.poziv_na_broj;
            predracun.iznos          = data?.iznos;
            predracun.paket          = data?.paket;
            predracun.valuta         = data?.valuta;
            predracun.popust         = data?.popust;
            predracun.deteId         = +data?.dete_id;
            
            if (options.loadDete) {
                predracun.deca = await this.services.dete.getAllByPredracunId(predracun.predracunId, {loadRoditelj:false,loadPredracun:false});
            }

            resolve(predracun);
        })

    }

    public async getAllByDeteId(deteId: number, options: IPredracunOptions = {loadDete:false}): Promise<PredracunModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<DetePredracunInterface>("predracun_dete", "dete_id", deteId)
            .then(async result => {
                const predracunIds = result.map(pd => pd.predracun_id);

                const predracuni: PredracunModel[] = [];

                for (let predracunId of predracunIds) {
                    const predracun = await this.getById(predracunId, options);
                    predracuni.push(predracun);
                }

                resolve(predracuni);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    public async add(data: IAddPredracun): Promise<PredracunModel> {
        return this.baseAdd(data, DefaultPredracunOptions);
    }

    public async edit(id: number, data: IEditPredracun): Promise<PredracunModel> {
        return this.baseEditById(id, data, DefaultPredracunOptions);
    }

    public async deleteById(deteId: number): Promise<true> {
        return this.baseDeleteById(deteId);
    }

}

export default PredracunService;