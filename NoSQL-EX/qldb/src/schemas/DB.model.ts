import {Schema, model} from "mongoose";



interface IDB {

    name: string;

    address: string;

    email: string;

    phone: number;

}



const dbSchema = new Schema<IDB>({

    name: String,

    address: String,

    email: String,

    phone: String

})

const DB = model<IDB>('DB', dbSchema);

export { DB };