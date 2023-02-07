import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import GrupaModel from "./GrupaModel.model";
import IAddGrupa from './dto/IAddGrupa.dto';
import IEditGrupa from './dto/IEditGrupa.dto';
import { URLSearchParams } from "url";

class GrupaAdapterOptions implements IAdapterOptions {

}

interface DeteGrupaInterface {
    dete_grupa_id: number;
    dete_id: number;
    grupa_id: number;
}

class GrupaService extends BaseService<GrupaModel, GrupaAdapterOptions> {
    tableName(): string {
        return "grupa";
    }

    protected async adaptToModel(data: any): Promise<GrupaModel> {
        const grupa: GrupaModel = new GrupaModel();

        grupa.grupaId    = +data?.grupa_id;
        grupa.ime       = data?.ime;

        return grupa;
    }

    public async add(data: IAddGrupa): Promise<GrupaModel> {
        return this.baseAdd(data, {});
    }

    public async edit(id: number, data: IEditGrupa): Promise<GrupaModel> {
        return this.baseEditById(id, data, {});
    }

    public async deleteById(deteId: number): Promise<true> {
        return this.baseDeleteById(deteId);
    }

    public async getAllByDeteId(deteId: number, options: GrupaAdapterOptions = {}): Promise<GrupaModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<DeteGrupaInterface>("dete_grupa", "dete_id", deteId)
            .then(async result => {
                const grupaIds = result.map(dg => dg.grupa_id);

                const grupe: GrupaModel[] = [];

                for (let grupaId of grupaIds) {
                    const grupa = await this.getById(grupaId, options);
                    grupe.push(grupa);
                }

                resolve(grupe);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

export default GrupaService;