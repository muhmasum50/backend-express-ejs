const TransactionModel = require('../models/transaction.model');
const VoucherModel = require('../models/voucher.model');
const CategoryModel = require('../models/category.model');
const PlayerModel = require('../models/player.model');

module.exports = {
    index: async(request, response) => {

        const trx = await TransactionModel.count();
        const voucher = await VoucherModel.count();
        const category = await CategoryModel.count();
        const player = await PlayerModel.count();
        
        try {
            response.render('content/admin/dashboard', {
               category, trx, voucher, player
            });
        } catch(error) {
            console.log(error)
        }
    }
}