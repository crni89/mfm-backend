import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import UgovorModel from "./UgovorModel.model";
import IAddUgovor from './dto/IAddUgovor.dto';
import IEditUgovor from './dto/IEditUgovor.dto';

class UgovorAdapterOptions implements IAdapterOptions {

}

interface DeteUgovorInterface {
    dete_ugovor_id: number;
    dete_id: number;
    ugovor_id: number;
}

class UgovorService extends BaseService<UgovorModel, UgovorAdapterOptions> {
    tableName(): string {
        return "ugovor";
    }

    protected async adaptToModel(data: any): Promise<UgovorModel> {
        const ugovor: UgovorModel = new UgovorModel();

        ugovor.ugovorId    = +data?.ugovor_id;
        ugovor.ime       = data?.ime;
        ugovor.cena        = data?.cena;

        return ugovor;
    }

    public async add(data: IAddUgovor): Promise<UgovorModel> {
        return this.baseAdd(data, {});
    }

    public async edit(id: number, data: IEditUgovor): Promise<UgovorModel> {
        return this.baseEditById(id, data, {});
    }

    public async deleteById(deteId: number): Promise<true> {
        return this.baseDeleteById(deteId);
    }

    public async getAllByDeteId(deteId: number, options: UgovorAdapterOptions = {}): Promise<UgovorModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<DeteUgovorInterface>("dete_ugovor", "dete_id", deteId)
            .then(async result => {
                const ugovorIds = result.map(du => du.ugovor_id);

                const ugovori: UgovorModel[] = [];

                for (let ugovorId of ugovorIds) {
                    const ugovor = await this.getById(ugovorId, options);
                    ugovori.push(ugovor);
                }

                resolve(ugovori);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

export default UgovorService;