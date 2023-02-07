
// import UserModel from "./UserModel.model";
// import { IAddUser } from "./dto/IAddUser.dto";
// import IEditUser from "./dto/IEditUser.dto";
// import IAdapterOptions from "../../common/IAdapterOptions.interface";
// import BaseService from "../../common/BaseService";

// export interface IUserAdapterOptions extends IAdapterOptions {
//     removePassword: boolean;
// }

// export const DefaultUserAdapterOptions: IUserAdapterOptions = {
//     removePassword: false,
// }

// export default class UserService extends BaseService<UserModel, IUserAdapterOptions> {
//     tableName(): string {
//         return "user";
//     }

//     protected async adaptToModel(data: any, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel> {
//         const user = new UserModel();

//         user.userId         = +data?.user_id;
//         user.email          = data?.email;
//         user.passwordHash   = data?.password_hash;
//         user.imePrezime       = data?.ime_prezime;
//         user.username        = data?.username;
//         user.isActive       = +data?.is_active === 1;
//         user.passwordResetCode = data?.password_reset_code ? data?.password_reset_code : null;

//         if (options.removePassword) {
//             user.passwordHash = null;
//         }

//         return user;
//     }

//     public async add(data: IAddUser): Promise<UserModel> {
//         return this.baseAdd(data, {
//             removePassword: true,
//         });
//     }

//     public async edit(id: number, data: IEditUser): Promise<UserModel> {
//         return this.baseEditById(id, data, {
//             removePassword: true,
//         });
//     }

//     // public async getUserByActivateionCode(code: string, option: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel|null> {
//     //     return new Promise((resolve, reject) => {
//     //         this.getAllByFieldNameAndValue("activation_code", code, option)
//     //         .then(result => {
//     //             if (result.length === 0) {
//     //                 return resolve(null);
//     //             }

//     //             resolve(result[0]);
//     //         })
//     //         .catch(error => {
//     //             reject(error?.message);
//     //         });
//     //     });
//     // }

//     public async getUserByPasswordResetCode(code: string, option: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel|null> {
//         return new Promise((resolve, reject) => {
//             this.getAllByFieldNameAndValue("password_reset_code", code, option)
//             .then(result => {
//                 if (result.length === 0) {
//                     return resolve(null);
//                 }

//                 resolve(result[0]);
//             })
//             .catch(error => {
//                 reject(error?.message);
//             });
//         });
//     }

//     public async getByEmail(email: string, option: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel|null> {
//         return new Promise((resolve, reject) => {
//             this.getAllByFieldNameAndValue("email", email, option)
//             .then(result => {
//                 if (result.length === 0) {
//                     return resolve(null);
//                 }

//                 resolve(result[0]);
//             })
//             .catch(error => {
//                 reject(error?.message);
//             });
//         });
//     }
// }
