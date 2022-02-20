const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name : {type : String , required : true} ,
    image : {type : String , required : true} , 
    capacity : {type : String},
    thingType : {type : String , required : true} , 
    size : {type: String},
    bookedTimeSlots : [
        {
            from : {type : String , required : true},
            to : {type : String , required : true}
        }
    ] , 
    rentPerDay : {type : Number , required : true},
    description: {type: String}

}, 
// {timestamps : true}

)
const productModel = mongoose.model('products' , productSchema)
module.exports = productModel