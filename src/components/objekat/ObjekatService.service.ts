import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import ObjekatModel from "./ObjekatModel.model";
import IAddObjekat from './dto/IAddObjekat.dto';
import IEditObjekat from './dto/IEditObjekat.dto';

class ObjekatAdapterOptions implements IAdapterOptions {

}

interface DeteObjekatInterface {
    dete_objekat_id: number;
    dete_id: number;
    objekat_id: number;
}

class ObjekatService extends BaseService<ObjekatModel, ObjekatAdapterOptions> {
    tableName(): string {
        return "objekat";
    }

    protected async adaptToModel(data: any): Promise<ObjekatModel> {
        const objekat: ObjekatModel = new ObjekatModel();

        objekat.objekatId    = +data?.objekat_id;
        objekat.ime       = data?.ime;

        return objekat;
    }

    public async add(data: IAddObjekat): Promise<ObjekatModel> {
        return this.baseAdd(data, {});
    }

    public async edit(id: number, data: IEditObjekat): Promise<ObjekatModel> {
        return this.baseEditById(id, data, {});
    }

    public async deleteById(deteId: number): Promise<true> {
        return this.baseDeleteById(deteId);
    }

    public async getAllByDeteId(deteId: number, options: ObjekatAdapterOptions = {}): Promise<ObjekatModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<DeteObjekatInterface>("dete_objekat", "dete_id", deteId)
            .then(async result => {
                const objekatIds = result.map(deb => deb.objekat_id);

                const objekti: ObjekatModel[] = [];

                for (let objekatId of objekatIds) {
                    const objekat = await this.getById(objekatId, options);
                    objekti.push(objekat);
                }

                resolve(objekti);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

export default ObjekatService;