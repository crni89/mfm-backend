import { resolve } from "path";
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import { IRoditeljAdapterOptions } from "../roditelj/RoditeljService.service";
import DeteModel from "./DeteModel.model";
import { IAddDete, IDeteGrupa, IDeteObjekat, IDetePorodicniStatus, IDeteUgovor } from "./dto/IAddDete.dto";
import { IEditDete } from "./dto/IEditDete.dto";
import { IRoditeljDete } from '../roditelj/dto/IAddRoditelj.dto';
import { Like } from "typeorm";
import { Request, Response } from 'express';
import { DevConfig } from "../../configs";
import IConfig from "../../common/IConfig.interface";
import * as mysql2 from "mysql2/promise"


export interface IDeteAdapterOptions extends IAdapterOptions {
    loadRoditelj: boolean;
    loadPredracun: boolean;
}

export const DefaultDeteAdapterOptions: IDeteAdapterOptions = {
    loadRoditelj:true,
    loadPredracun:true
}

interface RoditeljDeteInterface {
    roditelj_dete_id: number;
    dete_id: number;
    roditelj_id: number;
}

interface PredracunDeteInterface {
    predracun_dete_id: number;
    dete_id: number;
    predracun_id: number;
}

export default class DeteService extends BaseService<DeteModel, IDeteAdapterOptions> {
    tableName(): string {
        return "dete";
    }

    protected adaptToModel(data: any, options: IDeteAdapterOptions = DefaultDeteAdapterOptions): Promise<DeteModel> {
        return new Promise(async (resolve) => {
            const dete = new DeteModel();
    
            dete.deteId         = +data?.dete_id;
            dete.imePrezime     = data?.ime_prezime;
            dete.jmbg           = data?.jmbg;
            dete.datumRodj      = data?.datum_rodj;
            dete.adresa         = data?.adresa;
            dete.brojUgovora    = data?.broj_ugovora;
            dete.datumUgovora   = data?.datum_ugovora;
            dete.subvencija     = +data?.subvencija === 1;
            dete.datumPolaska   = data?.datum_polaska;
            dete.popust         = data?.popust;
            dete.objekat        = data?.objekat;
            dete.ugovor         = data?.ugovor;
            dete.grupa          = data?.grupa;
            dete.pstatus        = data?.pstatus;
            
            // if (options.loadGrupa) {
            //     dete.grupe = await this.services.grupa.getAllByDeteId(dete.deteId, {});
            // }

            // if (options.loadObjekat) {
            //     dete.objekti = await this.services.objekat.getAllByDeteId(dete.deteId, {});
            // }

            // if (options.loadUgovor) {
            //     dete.ugovori = await this.services.ugovor.getAllByDeteId(dete.deteId, {});
            // }

            // if (options.loadPorodicniStatus) {
            //     dete.porodicniStatusi = await this.services.porodicniStatus.getAllByDeteId(dete.deteId, {});
            // }

            if (options.loadRoditelj) {
                dete.roditelji = await this.services.roditelj.getAllByDeteId(dete.deteId, {loadDete:false});
            }

            if (options.loadPredracun) {
                dete.predracuni = await this.services.predracun.getAllByDeteId(dete.deteId, {loadDete: false});
            }


            resolve (dete);
        })
    }

    public async add(data: IAddDete): Promise<DeteModel> {
        return this.baseAdd(data, DefaultDeteAdapterOptions);
    }

    public async edit(id: number, data: IEditDete, options: IDeteAdapterOptions = DefaultDeteAdapterOptions): Promise<DeteModel> {
        return this.baseEditById(id, data, options);
    }

    async addDeteUgovor(data: IDeteUgovor): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "INSERT dete_ugovor SET dete_id = ?, ugovor_id = ?;";

            this.db.execute(sql, [ data.dete_id, data.ugovor_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.insertId));
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    // async addDetePorodicniStatus(data: IDetePorodicniStatus): Promise<number> {
    //     return new Promise((resolve, reject) => {
    //         const sql: string = "INSERT dete_porodicni_status SET dete_id = ?, porodicni_status_id = ?;";

    //         this.db.execute(sql, [ data.dete_id, data.porodicni_status_id ])
    //         .then(async result => {
    //             const info: any = result;
    //             resolve(+(info[0]?.insertId));
    //         })
    //         .catch(error => {
    //             reject(error);
    //         });
    //     })
    // }
    
    async addDeteObjekat(data: IDeteObjekat): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "INSERT dete_objekat SET dete_id = ?, objekat_id = ?;";

            this.db.execute(sql, [ data.dete_id, data.objekat_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.insertId));
            })
            .catch(error => {
                reject(error);
            });
        })
    }
    
    async addDeteGrupa(data: IDeteGrupa): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "INSERT dete_grupa SET dete_id = ?, grupa_id = ?;";

            this.db.execute(sql, [ data.dete_id, data.grupa_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.insertId));
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    async deleteDeteUgovor(data: IDeteUgovor): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "DELETE FROM dete_ugovor WHERE dete_id = ? AND ugovor_id = ?;";

            this.db.execute(sql, [ data.dete_id, data.ugovor_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.affectedRows));
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    async deleteDetePorodicniStatus(data: IDetePorodicniStatus): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "DELETE FROM dete_porodicni_status WHERE dete_id = ? AND porodicni_status_id = ?;";

            this.db.execute(sql, [ data.dete_id, data.porodicni_status_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.affectedRows));
            })
            .catch(error => {
                reject(error);
            });
        })
    }
    
    async deleteDeteObjekat(data: IDeteObjekat): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "DELETE FROM dete_objekat WHERE dete_id = ? AND objekat_id = ?;";

            this.db.execute(sql, [ data.dete_id, data.objekat_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.affectedRows));
            })
            .catch(error => {
                reject(error);
            });
        })
    }
    
    async deleteDeteGrupa(data: IDeteGrupa): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "DELETE FROM dete_grupa WHERE dete_id = ? AND grupa_id = ?;";

            this.db.execute(sql, [ data.dete_id, data.grupa_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.affectedRows));
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    async deleteRoditeljDete(data: IRoditeljDete): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "DELETE FROM roditelj_dete WHERE dete_id = ? AND roditelj_id = ?;";

            this.db.execute(sql, [ data.dete_id, data.roditelj_id ])
            .then(async result => {
                const info: any = result;
                resolve(+(info[0]?.affectedRows));
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    async deleteById(deteId: number): Promise<{}> {
        return new Promise(resolve => {
            this.deleteAllRoditeljDeteByDeteId(deteId)
            .then(() => this.getById(deteId, {
                loadRoditelj:false,
                loadPredracun:false
            }))
            .then(dete => {
                if (dete === null) throw { status: 404, message: "Dete not found!" }
                return dete;
            })
            .then(async filesToDelete => {
                await this.baseDeleteById(deteId);
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

    // private async deleteAllDeteUgovorByDeteId(deteId: number): Promise<true> {
    //     return new Promise(resolve => {
    //         const sql = `DELETE FROM dete_ugovor WHERE dete_id = ?;`;
    //         this.db.execute(sql, [ deteId ])
    //         .then(() => {
    //             resolve(true);
    //         })
    //         .catch(error => {
    //             throw {
    //                 message: error?.message ?? "Could not delete dete ugovor!",
    //             }
    //         });
    //     })
    // }

    // private async deleteAllDetePorodicniStatusByDeteId(deteId: number): Promise<true> {
    //     return new Promise(resolve => {
    //         const sql = `DELETE FROM dete_porodicni_status WHERE dete_id = ?;`;
    //         this.db.execute(sql, [ deteId ])
    //         .then(() => {
    //             resolve(true);
    //         })
    //         .catch(error => {
    //             throw {
    //                 message: error?.message ?? "Could not delete dete porodicni status!",
    //             }
    //         });
    //     })
    // }

    // private async deleteAllDeteObjekatByDeteId(deteId: number): Promise<true> {
    //     return new Promise(resolve => {
    //         const sql = `DELETE FROM dete_objekat WHERE dete_id = ?;`;
    //         this.db.execute(sql, [ deteId ])
    //         .then(() => {
    //             resolve(true);
    //         })
    //         .catch(error => {
    //             throw {
    //                 message: error?.message ?? "Could not delete dete objekat!",
    //             }
    //         });
    //     })
    // }

    // private async deleteAllDeteGrupaByDeteId(deteId: number): Promise<true> {
    //     return new Promise(resolve => {
    //         const sql = `DELETE FROM dete_grupa WHERE dete_id = ?;`;
    //         this.db.execute(sql, [ deteId ])
    //         .then(() => {
    //             resolve(true);
    //         })
    //         .catch(error => {
    //             throw {
    //                 message: error?.message ?? "Could not delete dete grupa!",
    //             }
    //         });
    //     })
    // }

    private async deleteAllRoditeljDeteByDeteId(deteId: number): Promise<true> {
        return new Promise(resolve => {
            const sql = `DELETE FROM roditelj_dete WHERE dete_id = ?;`;
            this.db.execute(sql, [ deteId ])
            .then(() => {
                resolve(true);
            })
            .catch(error => {
                throw {
                    message: error?.message ?? "Could not delete dete roditelj!",
                }
            });
        })
    }

    public async getAllByRoditeljId(roditeljId: number, options: IDeteAdapterOptions = {loadRoditelj:false, loadPredracun:false}): Promise<DeteModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<RoditeljDeteInterface>("roditelj_dete", "roditelj_id", roditeljId)
            .then(async result => {
                const deteIds = result.map(rd => rd.dete_id);

                const deca: DeteModel[] = [];

                for (let deteId of deteIds) {
                    const dete = await this.getById(deteId, options);
                    deca.push(dete);
                }

                resolve(deca);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    // async searchDete(options: IDeteAdapterOptions, objekat: string, ugovor: string): Promise<DeteModel[]> {
    //     return new Promise((resolve, reject)=>{
    //         this.search(options, objekat, ugovor)
    //         .then(async result =>{
    //             const objekat = result.map(o => o.objekat);
    //             const ugovor = result.map(du => du.ugovor);

    //             const deca: DeteModel[] = [];

    //             const dete = await this.getAll(options);
    //             deca.push(dete);
    //         })
    //     })
    // }

    public async getAllByPredracunId(predracunId: number, options: IDeteAdapterOptions = {loadRoditelj:false, loadPredracun:false}): Promise<DeteModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<PredracunDeteInterface>("predracun_dete", "predracun_id", predracunId)
            .then(async result => {
                const deteIds = result.map(rd => rd.dete_id);

                const deca: DeteModel[] = [];

                for (let deteId of deteIds) {
                    const dete = await this.getById(deteId, options);
                    deca.push(dete);
                }

                resolve(deca);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

}