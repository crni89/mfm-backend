import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IAddUplataDto {
    datum: string;
    status: string;
    pozivNaBroj: string;
    iznos: string;
}

export default interface IAddUplata extends IServiceData {
    dete_id: number;
    datum: string;
    status: string;
    poziv_na_broj: string;
    iznos:string;
}

const AddUplataValidator = ajv.compile({
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
    },
    required: [
        "datum",
        "status",
        "pozivNaBroj",
        "iznos",
    ],
    additionalProperties: false,
});

export { AddUplataValidator };
