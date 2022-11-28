import { Role } from "./Role"

export interface Account {
    _id? : string
    type? : string
    displayName? : string
    email? : string
    firstname? : string
    lastname? :  string
    legalname? :  string
    imagePath? : string
    role? : Role
    createdAt? : Date
}

export const EmptyAccount: Account = {
    email : "",
    firstname : "",
    lastname :  ""
};
