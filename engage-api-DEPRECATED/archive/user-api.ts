import {IUser} from "./models/student/user";
export interface IUserApi {
    getMe(): IUser;

}