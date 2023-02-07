import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IEditUplataDto {
    datum: string;
    status: string;
    pozivNaBroj: string;
    iznos: string;
}

export default interface IEditUplata extends IServiceData {
    datum: string;
    status: string;
    poziv_na_broj: string;
    iznos:string;
}

const EditUplataValidator = ajv.compile({
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
    ],
    additionalProperties: false,
});

export { EditUplataValidator };
