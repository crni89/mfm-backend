import Ajv from "ajv";
import addFormats from "ajv-formats";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();
addFormats(ajv);

export interface IEditDeteDto {
    imePrezime?: string;
    jmbg?: string;
    datumRodj?: string;
    adresa?: string;
    brojUgovora?: string;
    datumUgovora?: string;
    datumPolaska?: string;
    subvencija?: boolean;
    popust?: string;
    pstatus?: string;
    grupa?: string;
    objekat?: string;
    ugovor?: string;
}

export interface IEditDete extends IServiceData {
    ime_prezime?: string;
    jmbg?: string;
    datum_rodj?: string;
    adresa?: string;
    broj_ugovora?: string;
    datum_ugovora?: string;
    datum_polaska?: string;
    subvencija?: number;
    popust?: string;
    objekat?: string;
    ugovor?: string;
    pstatus?: string;
    grupa?: string;
}

const EditDeteValidator = ajv.compile({
    type: "object",
    properties: {
        imePrezime: {
            type: "string",
            minLength: 2,
            maxLength: 120,
        },
        jmbg: {
            type: "string",
            minLength: 13,
            maxLength: 13,
        },
        datumRodj: {
            type: "string",
            pattern: "[0-9]{2}[.][0-9]{2}[.][0-9]{4}[.]$",
        },
        adresa: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        brojUgovora: {
            type: "string",
            minLength: 2,
            maxLength: 120,
        },
        datumUgovora:{
            type: "string",
            pattern: "[0-9]{2}[.][0-9]{2}[.][0-9]{4}[.]$",
        },
        datumPolaska:{
            type: "string",
            pattern: "[0-9]{2}[.][0-9]{2}[.][0-9]{4}[.]$",
        },
        subvencija:{
            type: "boolean",
        },
        popust: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        ugovor: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        objekat: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        pstatus: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        grupa: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
    },
    required: [

    ],
    additionalProperties: false,
});

export { EditDeteValidator };
