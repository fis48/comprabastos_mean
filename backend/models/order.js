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
    shopperId: {
        type: String,
        required: true
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
    shopperWhatsapp: {
        type: String
    },
    companyId: {
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
    companyWhatsapp: {
        type: String
    },
    deliveryTerms: {
        type: String,
        required: true
    },
    paymentTerms: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'CREATED'
    }
},
{
    timestamps: true,
    virtuals: true,
}
)

const OrderModel = mongoose.model('OrderModel', OrderSchema)
export default OrderModel