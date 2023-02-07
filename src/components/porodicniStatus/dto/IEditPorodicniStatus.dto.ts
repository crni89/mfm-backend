import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IEditPorodicniStatusDto {
    ime: string;
}

export default interface IEditPorodicniStatus extends IServiceData {
    ime: string;
}

const EditPorodicniStatusValidator = ajv.compile({
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

export { EditPorodicniStatusValidator };
