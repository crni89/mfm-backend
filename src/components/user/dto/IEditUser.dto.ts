// import addFormats from "ajv-formats";

// import Ajv from "ajv";
// import IServiceData from "../../../common/IServiceData.interface";

// const ajv = new Ajv();
// addFormats(ajv);

// export default interface IEditUser extends IServiceData {
//     password_hash?: string;
//     is_active?: number;
//     ime_prezime?: string;
//     username?: string;
//     email?: string;
//     password_reset_code?: string;
// }

// export interface IEditUserDto {
//     password?: string;
//     isActive?: boolean;
//     imePrezime?: string;
//     username?: string;
//     email?: string;
// }

// const EditUserValidator = ajv.compile({
//     type: "object",
//     properties: {
//         password: {
//             type: "string",
//             pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
//         },
//         isActive: {
//             type: "boolean",
//         },
//         email: {
//             type: "string",
//             // format: "idn-email", // Za IDN podrsku
//             format: "email",
//         },
//         imePrezime: {
//             type: "string",
//             minLength: 2,
//             maxLength: 128,
//         },
//         username: {
//             type: "string",
//             minLength: 2,
//             maxLength: 64,
//         }
//     },
//     required: [
        
//     ],
//     additionalProperties: false,
// });

// export { EditUserValidator };

