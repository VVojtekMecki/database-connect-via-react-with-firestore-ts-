import { Timestamp } from "firebase/firestore";
//User class which forms data structure inside firestore database 

class User
   {
    id: string;
    name: string;
    surname: string;
    login: string;
    isDeleted: boolean;
    constructor (p_id: string, p_name: string, p_surname: string, p_login: string, p_deleted: boolean)
    {
      this.name = p_name;
      this.surname = p_surname;
      this.login = p_login;
      this.id = p_id;
      this.isDeleted = p_deleted;
    }
    toString() 
    {
      return this.name + ', ' + this.surname + ', ' + this.login;
    }
   }

   export {User};