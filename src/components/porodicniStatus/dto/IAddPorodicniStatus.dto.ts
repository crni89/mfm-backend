import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IAddPorodicniStatusDto {
    ime: string;
}

export default interface IAddPorodicniStatus extends IServiceData {
    ime: string;
}

const AddPorodicniStatusValidator = ajv.compile({
    type: "object",
    properties: {
        ime: {
            type: "string",
            minLength: 4,
            maxLength: 64,
        },
    },
    required: [
        "ime",
    ],
    additionalProperties: false,
});

export { AddPorodicniStatusValidator };
