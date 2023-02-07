// import Ajv from "ajv";
// import addFormats from "ajv-formats";
// import IServiceData from "../../../common/IServiceData.interface";
// // import * as formats from "ajv-formats-draft2019/formats"; // Za IDN podrsku: npm i ajv-formats-draft2019

// // const ajv = new Ajv({ formats }); // Za IDN podrsku
// const ajv = new Ajv();
// addFormats(ajv);

// export interface IAddUserDto {
//     username: string;
//     email: string;
//     password: string;
//     imePrezime: string;
// }

// export interface IAddUser extends IServiceData {
//     username: string;
//     email: string;
//     password_hash: string;
//     ime_prezime: string;
// }

// const AddUserValidator = ajv.compile({
//     type: "object",
//     properties: {
//         email: {
//             type: "string",
//             // format: "idn-email", // Za IDN podrsku
//             format: "email",
//         },
//         password: {
//             type: "string",
//             pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
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
//         },
//     },
//     required: [
//         "email",
//         "password",
//         "imePrezime",
//         "username",
//     ],
//     additionalProperties: false,
// });

// export { AddUserValidator };
