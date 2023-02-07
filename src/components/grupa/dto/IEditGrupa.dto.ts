import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IEditGrupaDto {
    ime: string;
}

export default interface IEditGrupa extends IServiceData {
    ime: string;
}

const EditGrupaValidator = ajv.compile({
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

export { EditGrupaValidator };
