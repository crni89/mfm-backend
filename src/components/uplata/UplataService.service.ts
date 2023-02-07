import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import UplataModel from "./UplataModel.model";
import IAddUplata from './dto/IAddUplata.dto';
import IEditUplata from './dto/IEditUplata.dto';

export interface IUplataOptions extends IAdapterOptions {
    loadDete: boolean;
}

export const DefaultUplataOptions: IUplataOptions = {
    loadDete: true,
}

class UplataService extends BaseService<UplataModel, IUplataOptions> {
    tableName(): string {
        return "uplata";
    }

    protected  adaptToModel(data: any, options: IUplataOptions): Promise<UplataModel> {
        return new Promise(async (resolve) =>{

            const uplata = new UplataModel();
    
            uplata.uplataId        = +data?.uplata_id;
            uplata.datum          = data?.datum;
            uplata.status         = data?.status;
            uplata.pozivNaBroj    = data?.poziv_na_broj;
            uplata.iznos          = data?.iznos;
            uplata.deteId         = +data?.dete_id;
            
            if(options.loadDete){
                uplata.dete = await this.services.dete.getById(uplata.deteId,{loadRoditelj: false, loadPredracun:false});
            }

            resolve(uplata);
        })

    }

    public async getAllByDeteId(deteId: number){
        return this.getAllByFieldNameAndValue("dete_id", deteId, DefaultUplataOptions);
    }

    public async add(data: IAddUplata): Promise<UplataModel> {
        return this.baseAdd(data, DefaultUplataOptions);
    }

    public async edit(id: number, data: IEditUplata): Promise<UplataModel> {
        return this.baseEditById(id, data, DefaultUplataOptions);
    }

    public async deleteById(deteId: number): Promise<true> {
        return this.baseDeleteById(deteId);
    }

}

export default UplataService;