import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    products: {
        type: Object,
        required: true
    },
    total: {
        type: Number,
        // required: true
    },
    shopperName: {
        type: String,
        required: true
    },
    shopperAddress: {
        type: String,
        required: true
    },
    shopperEmail: {
        type: String,
        required: true
    },
    shopperPhone: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
},
{
    timestamps: true,
    virtuals: true,
}
)

const OrderModel = mongoose.model('OrderModel', OrderSchema)
export default OrderModel