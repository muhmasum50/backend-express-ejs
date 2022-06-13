
const BankModel = require('../models/BankModel')
const VoucherModel = require('../models/VoucherModel')
const NominalModel = require('../models/NominalModel')
const PaymentModel = require('../models/PaymentModel')
const TransactionModel = require('../models/TransactionModel')

module.exports = {
    index: async(req, res) => {
        res.status(201).json({data : []});
    },
    checkout: async(req, res) => {
        try {
            
            const { accountUser, name, nominal, voucher, payment, bank } = req.body

            const res_voucher = await VoucherModel.findOne({_id: voucher})
                .select('name category _id thumbnail user')
                .populate('category')
                .populate('user')

            if(!res_voucher) {
                return res.status(400).json({status: false, message: 'Voucher not found'})
            }

            const res_nominal = await NominalModel.findOne({_id: nominal})
            if(!res_nominal) {
                return res.status(400).json({status: false, message: 'Nominal not found'})
            }

            const res_payment = await PaymentModel.findOne({_id: payment})
            if(!res_payment) {
                return res.status(400).json({status: false, message: 'Payment not found'})
            }

            const res_bank = await BankModel.findOne({_id: bank})
            if(!res_payment) {
                return res.status(400).json({status: false, message: 'Bank not found'})
            }

            let tax = (10/100) * res_nominal._doc.price;
            let grandTotal =  res_nominal._doc.price - tax;

            const payload = {
                historyVoucherTopup: {
                    gameName    : res_voucher._doc.name,
                    category    : res_voucher._doc.category ? res_voucher._doc.category.name : '',
                    thumbnail   : res_voucher._doc.thumbnail,
                    coinName    : res_nominal._doc.coinName,
                    coinQuantity: res_nominal._doc.coinQuantity,
                    price       : res_nominal._doc.price,
                },
                historyPayment: {
                    name        : res_bank._doc.name,
                    type        : res_payment._doc.type,
                    bankName    : res_bank._doc.bankName,
                    bankNumber  : res_bank._doc.bankNumber,
                },
                name : name,
                accountUser: accountUser,
                tax: tax,
                grandTotal: grandTotal,
                player: req.player._id,
                historyUser: {
                    name: res_voucher._doc.user?.name,
                    phoneNumber: res_voucher._doc.user?.phoneNumber
                },
                category: res_voucher._doc.categiry?._id,
                user: res_voucher._doc.user?.id
            }

            const transaction = new TransactionModel(payload)
            await transaction.save();

            res.status(201).json({status:true, data:transaction});
        } catch (error) {
            res.status(500).json({ message: error.message || `Internal server error`});
        }
    }
}