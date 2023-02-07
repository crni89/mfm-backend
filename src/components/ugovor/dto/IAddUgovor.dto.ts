import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IAddUgovorDto {
    ime: string;
    cena: string;
}

export default interface IAddUgovor extends IServiceData {
    ime: string;
    cena: string;
}

const AddUgovorValidator = ajv.compile({
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

export { AddUgovorValidator };
