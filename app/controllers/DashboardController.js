const TransactionModel = require('./../models/TransactionModel');
const VoucherModel = require('./../models/VoucherModel');
const CategoryModel = require('./../models/CategoryModel');
const PlayerModel = require('./../models/PlayerModel');

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