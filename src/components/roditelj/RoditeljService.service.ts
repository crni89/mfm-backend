import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import { IAddRoditelj, IRoditeljDete } from './dto/IAddRoditelj.dto';
import { IEditRoditelj } from "./dto/IEditRoditelj.dto";
import RoditeljModel from "./RoditeljModel.model";

export interface IRoditeljAdapterOptions extends IAdapterOptions {
    loadDete: boolean;
}

interface DeteRoditeljInterface {
    roditelj_dete_id: number;
    dete_id: number;
    roditelj_id: number;
}

export const DefaultRoditeljAdapterOptions: IRoditeljAdapterOptions = {
    loadDete: true
}

class RoditeljService extends BaseService<RoditeljModel, IRoditeljAdapterOptions> {
    tableName(): string {
        return "roditelj";
    }

    protected adaptToModel(data: any, options: IRoditeljAdapterOptions = DefaultRoditeljAdapterOptions): Promise<RoditeljModel> {
        return new Promise(async (resolve) => {
            const roditelj = new RoditeljModel();
    
            roditelj.roditeljId     = +data?.roditelj_id;
            roditelj.imePrezime     = data?.ime_prezime;
            roditelj.jmbg           = data?.jmbg;
            roditelj.brLicne        = data?.br_licne;
            roditelj.mobilni        = data?.mobilni;
            roditelj.email          = data?.email;
            roditelj.adresa         = data?.adresa;
            roditelj.opstina        = data?.opstina;
            roditelj.tekuciRacun    = data?.tekuci_racun;
            roditelj.brojResenja    = data?.broj_resenja;
            roditelj.nosilacUgovora = +data?.nosilac_ugovora === 1;
            
            if (options.loadDete) {
                roditelj.deca = await this.services.dete.getAllByRoditeljId(roditelj.roditeljId, {loadRoditelj:false, loadPredracun:false});
            }


            resolve (roditelj);
        })
    }

    public async add(data: IAddRoditelj): Promise<RoditeljModel> {
        return this.baseAdd(data, {loadDete:false});
    }

    public async edit(id: number, data: IEditRoditelj): Promise<RoditeljModel> {
        return this.baseEditById(id, data, {loadDete:true});
    }

    async addRoditeljDete(data: IRoditeljDete): Promise<number[]> {
        return new Promise((resolve, reject) => {
            const sql: string = "INSERT roditelj_dete SET roditelj_id = ?, dete_id = ?;";

            // this.db.execute(sql, [ data.roditelj_id, data.dete_id ])
            // .then(async result => {
            //     const info: any = result;
            //     resolve(+(info[0]?.insertId));
            // })
            // .catch(error => {
            //     reject(error);
            // });

            const deteIds = Array.isArray(data.dete_id) ? data.dete_id : [data.dete_id];

            Promise.all(deteIds.map(dete_id =>
            this.db.execute(sql, [data.roditelj_id, dete_id])
            ))
            .then(async result => {
                const insertedIds: number[] = result.map(info => {
                  // check that info is an OkPacket with an insertId property
                  if (info && Array.isArray(info) && info.length > 0 && 'insertId' in info[0]) {
                    return +info[0].insertId;
                  }
                  // return undefined if the insertId property is not found
                  return undefined;
                });
                // filter out undefined values from the insertedIds array
                resolve(insertedIds.filter(id => id !== undefined));
              })
              .catch(error => {
                reject(error);
              });
        })
    }

    async deleteRoditeljDete(data: IRoditeljDete): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "DELETE FROM roditelj_dete WHERE roditelj_id = ? AND dete_id = ?;";

            this.db.execute(sql, [ data.roditelj_id, data.dete_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.affectedRows));
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    async deleteById(roditeljId: number): Promise<{}> {
        return new Promise(resolve => {
            this.deleteAllRoditeljDeteByRoditeljId(roditeljId)
            .then(() => this.getById(roditeljId, {
                loadDete: false
            }))
            .then(roditelj => {
                if (roditelj === null) throw { status: 404, message: "Roditelj not found!" }
                return roditelj;
            })
            .then(async filesToDelete => {
                await this.baseDeleteById(roditeljId);
                return filesToDelete;
            })
            .then(filesToDelete => {
                resolve({
                    filesToDelete: filesToDelete,
                });
            })
            .catch(error => {
                throw {
                    message: error?.message ?? "Could not delete this item!",
                }
            });
        })
    }

    private async deleteAllRoditeljDeteByRoditeljId(roditeljId: number): Promise<true> {
        return new Promise(resolve => {
            const sql = `DELETE FROM roditelj_dete WHERE roditelj_id = ?;`;
            this.db.execute(sql, [ roditeljId ])
            .then(() => {
                resolve(true);
            })
            .catch(error => {
                throw {
                    message: error?.message ?? "Could not delete roditelj dete!",
                }
            });
        })
    }

    public async getAllByDeteId(deteId: number, options: IRoditeljAdapterOptions = {loadDete:false}): Promise<RoditeljModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<DeteRoditeljInterface>("roditelj_dete", "dete_id", deteId)
            .then(async result => {
                const roditeljIds = result.map(dr => dr.roditelj_id);

                const roditelji: RoditeljModel[] = [];

                for (let roditeljId of roditeljIds) {
                    const roditelj = await this.getById(roditeljId, options);
                    roditelji.push(roditelj);
                }

                resolve(roditelji);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

export default RoditeljService;