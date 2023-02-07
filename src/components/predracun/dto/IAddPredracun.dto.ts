import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IAddPredracunDto {
    datum: string;
    status: string;
    datumOd: string;
    datumDo: string;
    tip: string;
    brojFakture: number;
    godina: string;
    pozivNaBroj: string;
    iznos: string;
    paket: string;
    valuta: string;
    popust: string;
}

export default interface IAddPredracun extends IServiceData {
    dete_id: number;
    datum: string;
    status: string;
    datum_od: string;
    datum_do: string;
    tip: string;
    broj_fakture: number;
    godina: string;
    poziv_na_broj: string;
    iznos:string;
    paket: string;
    valuta: string;
    popust: string;
}

const AddPredracunValidator = ajv.compile({
    type: "object",
    properties: {
        datum: {
            type: "string",
            pattern: "[0-9]{2}[.][0-9]{2}[.][0-9]{4}[.]$",
        },
        status: {
            type: "string",
            minLength: 4,
            maxLength: 50,
        },
        datumOd: {
            type: "string",
            pattern: "[0-9]{2}[.][0-9]{2}[.][0-9]{4}[.]$",
        },
        datumDo: {
            type: "string",
            pattern: "[0-9]{2}[.][0-9]{2}[.][0-9]{4}[.]$",
        },
        tip: {
            type: "string",
            minLength: 4,
            maxLength: 50,
        },
        brojFakture: {
            type: "integer",
            minimum: 1,
        },
        godina: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        pozivNaBroj: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        iznos: {
            type: "string",
            minLength: 4,
            maxLength: 50,
        },
        paket: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        valuta: {
            type: "string",
            minLength: 1,
            maxLength: 50,
        },
        popust: {
            type: "string",
            minLength: 1,
            maxLength: 50,
        },
    },
    required: [
        "datum",
        "status",
        "datumOd",
        "datumDo",
        "tip",
        "brojFakture",
        "godina",
        "pozivNaBroj",
        "iznos",
        "paket",
        "valuta",
        "popust"
    ],
    additionalProperties: false,
});

export { AddPredracunValidator };
