import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import PorodicniStatusModel from "./PorodicniStatusModel.model";
import IAddPorodicniStatus from './dto/IAddPorodicniStatus.dto';
import IEditPorodicniStatus from './dto/IEditPorodicniStatus.dto';

class PorodicniStatusAdapterOptions implements IAdapterOptions {

}

interface DetePorodicniStatusInterface {
    dete_porodicni_status_id: number;
    dete_id: number;
    porodicni_status_id: number;
}

class PorodicniStatusService extends BaseService<PorodicniStatusModel, PorodicniStatusAdapterOptions> {
    tableName(): string {
        return "porodicni_status";
    }

    protected async adaptToModel(data: any): Promise<PorodicniStatusModel> {
        const porodicniStatus: PorodicniStatusModel = new PorodicniStatusModel();

        porodicniStatus.porodicniStatusId    = +data?.porodicni_status_id;
        porodicniStatus.ime       = data?.ime;

        return porodicniStatus;
    }

    public async add(data: IAddPorodicniStatus): Promise<PorodicniStatusModel> {
        return this.baseAdd(data, {});
    }

    public async edit(id: number, data: IEditPorodicniStatus): Promise<PorodicniStatusModel> {
        return this.baseEditById(id, data, {});
    }

    public async deleteById(deteId: number): Promise<true> {
        return this.baseDeleteById(deteId);
    }

    public async getAllByDeteId(deteId: number, options: PorodicniStatusAdapterOptions = {}): Promise<PorodicniStatusModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<DetePorodicniStatusInterface>("dete_porodicni_status", "dete_id", deteId)
            .then(async result => {
                const porodicniStatusIds = result.map(dp => dp.porodicni_status_id);

                const porodicnistatusi: PorodicniStatusModel[] = [];

                for (let porodicniStatusId of porodicniStatusIds) {
                    const porodicniStatus = await this.getById(porodicniStatusId, options);
                    porodicnistatusi.push(porodicniStatus);
                }

                resolve(porodicnistatusi);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

export default PorodicniStatusService;