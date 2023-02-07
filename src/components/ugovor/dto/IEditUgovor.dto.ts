import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IEditUgovorDto {
    ime: string;
    cena: string;
}

export default interface IEditUgovor extends IServiceData {
    ime: string;
    cena: string;
}

const EditUgovorValidator = ajv.compile({
    type: "object",
    properties: {
        ime: {
            type: "string",
            minLength: 1,
            maxLength: 64,
        },
        cena: {
            type: "string",
            minLength: 1,
            maxLength: 50,
        }
    },
    required: [
        "ime",
    ],
    additionalProperties: false,
});

export { EditUgovorValidator };
