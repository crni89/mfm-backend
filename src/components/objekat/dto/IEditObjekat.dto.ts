import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IEditObjekatDto {
    ime: string;
}

export default interface IEditObjekat extends IServiceData {
    ime: string;
}

const EditObjekatValidator = ajv.compile({
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

export { EditObjekatValidator };
