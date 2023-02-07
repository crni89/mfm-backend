import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IAddObjekatDto {
    ime: string;
}

export default interface IAddObjekat extends IServiceData {
    ime: string;
}

const AddObjekatValidator = ajv.compile({
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

export { AddObjekatValidator };
