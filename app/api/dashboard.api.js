const CategoryModel = require('../models/CategoryModel');
const TransactionModel = require('./../models/TransactionModel');

module.exports = {
    index: async(req, res) => {
        try {
            const Transaction = await TransactionModel.aggregate([
                {$match :  {player:req.player._id}},
                {$group : {_id: '$category', grandTotal :{$sum: '$grandTotal'}}}
            ])

            const Category = await CategoryModel.find({})

            Category.forEach(cate => {
                Transaction.forEach(trx => {
                    if(cate._id.toString() === trx._id.toString()) {
                       trx.name = cate.name
                    }
                })
            })

            const history = await TransactionModel.find({ player: req.player._id })
                .populate('category')
                .sort({ 'upadtedAt': -1 })

            res.status(200).json({status: true, message: 'Dashboad ditemukan', data: history, count: Transaction})

        } catch (error) {
            res.status(500).json({ status: false, message: error.message || `Internal server error`});
        }
    }
}