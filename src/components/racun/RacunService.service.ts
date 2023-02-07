import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import RacunModel from "./RacunModel.model";
import IAddRacun from './dto/IAddRacun.dto';
import IEditRacun from './dto/IEditRacun.dto';

export interface IRacunOptions extends IAdapterOptions {
    loadDete: boolean;
}

export const DefaultRacunOptions: IRacunOptions = {
    loadDete: true,
}

class RacunService extends BaseService<RacunModel, IRacunOptions> {
    tableName(): string {
        return "racun";
    }

    protected  adaptToModel(data: any, options: IRacunOptions): Promise<RacunModel> {
        return new Promise(async (resolve) =>{

            const racun = new RacunModel();
    
            racun.racunId        = +data?.racun_id;
            racun.datum          = data?.datum;
            racun.status         = data?.status;
            racun.datumOd        = data?.datum_od;
            racun.datumDo        = data?.datum_do;
            racun.tip            = data?.tip;
            racun.brojFakture    = +data?.broj_fakture;
            racun.godina         = data?.godina;
            racun.pozivNaBroj    = data?.poziv_na_broj;
            racun.iznos          = data?.iznos;
            racun.paket          = data?.paket;
            racun.valuta         = data?.valuta;
            racun.popust         = data?.popust;
            racun.deteId         = +data?.dete_id;
            
            if(options.loadDete){
                racun.dete = await this.services.dete.getById(racun.deteId,{loadRoditelj: false, loadPredracun:false});
            }

            resolve(racun);
        })

    }

    public async getAllByDeteId(deteId: number){
        return this.getAllByFieldNameAndValue("dete_id", deteId, DefaultRacunOptions);
    }

    public async add(data: IAddRacun): Promise<RacunModel> {
        return this.baseAdd(data, DefaultRacunOptions);
    }

    public async edit(id: number, data: IEditRacun): Promise<RacunModel> {
        return this.baseEditById(id, data, DefaultRacunOptions);
    }

    public async deleteById(deteId: number): Promise<true> {
        return this.baseDeleteById(deteId);
    }

}

export default RacunService;