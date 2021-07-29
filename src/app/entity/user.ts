import { Role } from "./role";

export class User {
    id :number;
    username:string;
    nom:string;
    prenom:string;
    password:string;
    adresse:string;
    birthdate:string;
    telephone:number;
    email:string;
    role:Role;
    
    constructor()
    {
    
    }
}