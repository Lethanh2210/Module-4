import {Schema, model} from "mongoose";



interface IUser {

    name: string;

    MaSo: string;

    email: string;

    phone: number;

}



const userSchema = new Schema<IUser>({

    name: String,

    MaSo: String,

    email: String,

    phone: String

})

const User = model<IUser>('User', userSchema);

export { User };