import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { AddRoditeljValidator, IAddRoditeljDto } from './dto/IAddRoditelj.dto';
import { EditRoditeljValidator, IEditRoditeljDto, IEditRoditelj } from './dto/IEditRoditelj.dto';
import { DefaultRoditeljAdapterOptions } from './RoditeljService.service';

class RoditeljController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        this.services.roditelj.getAll(DefaultRoditeljAdapterOptions)
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.roditelj.getById(id, DefaultRoditeljAdapterOptions)
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Roditelj nije pronadjen!',
                }
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddRoditeljDto;

        if (!AddRoditeljValidator(data)) {
            return res.status(400).send(AddRoditeljValidator.errors);
        }

        this.services.roditelj.add({
            ime_prezime: data.imePrezime,
            jmbg: data.jmbg,
            br_licne: data.brLicne,
            mobilni: data.mobilni,
            email: data.email,
            adresa: data.adresa,
            opstina: data.opstina,
            tekuci_racun: data.tekuciRacun,
            broj_resenja: data.brojResenja,
            nosilac_ugovora: +data.nosilacUgovora,
        })
        .then(newRoditelj => {
            this.services.roditelj.addRoditeljDete({
                roditelj_id: newRoditelj.roditeljId,
                dete_id: data.deteId, // pass an array of dete IDs
              })
              .then(insertedIds => {
                console.log(`Inserted roditelj_dete rows with IDs: ${insertedIds}`);
              })
              .catch(error => {
                throw {
                  status: 500,
                  message: error?.message,
                };
              });

            return newRoditelj;
        })
        .then(newRoditelj => {
            return this.services.roditelj.getById(newRoditelj.roditeljId, {
                loadDete: true
            });
        })
        .then(async result => {
            await this.services.roditelj.commitChanges();
            res.send(result);
        })
        .catch(async error => {
            await this.services.roditelj.rollbackChanges();
            res.status(error?.status ?? 500).send(error?.message);
        })
    }

    async edit(req: Request, res: Response) {
        const id: number = +req.params?.id;
        const data = req.body as IEditRoditeljDto;

        if (!EditRoditeljValidator(data)) {
            return res.status(400).send(EditRoditeljValidator.errors);
        }

        const serviceData: IEditRoditelj = { };

        if (data.imePrezime !== undefined) {
            serviceData.ime_prezime = data.imePrezime;
        }

        if (data.jmbg !== undefined) {
            serviceData.jmbg = data.jmbg;
        }
        
        if (data.brLicne !== undefined) {
            serviceData.br_licne = data.brLicne;
        }

        if (data.mobilni !== undefined){
            serviceData.mobilni = data.mobilni;
        }

        if (data.email !== undefined){
            serviceData.email = data.email;
        }

        if (data.adresa !== undefined){
            serviceData.adresa = data.adresa;
        }

        if (data.opstina !== undefined){
            serviceData.opstina = data.opstina;
        }
        
        if (data.tekuciRacun !== undefined){
            serviceData.tekuci_racun = data.tekuciRacun;
        }
        
        if (data.brojResenja !== undefined){
            serviceData.broj_resenja = data.brojResenja;
        }

        if (data.nosilacUgovora !== undefined){
            serviceData.nosilac_ugovora = data.nosilacUgovora ? 1:0;
        }


        this.services.roditelj.edit(id, serviceData)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async delete(req: Request, res: Response) {
        const roditeljId: number     = +req.params?.id;

        this.services.roditelj.getById(roditeljId, DefaultRoditeljAdapterOptions)
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Roditelj nije pronadjen!',
                }
            }
        })
        .then(() => {
            return this.services.roditelj.deleteById(roditeljId)
        })
        .then(() => {
            res.send('Roditelj je izbrisan!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }
}

export default RoditeljController;
