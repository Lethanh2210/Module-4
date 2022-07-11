import {Schema, model} from "mongoose";






const PublisherSchema = new Schema({

    name: String

})



const Publisher = model('Publisher', PublisherSchema);



export { Publisher };