const TransactionModel = require('./../models/TransactionModel');

module.exports = {
    index: async(request, response) => {
        try {
            const alertMessage = request.flash("alertMessage");
            const alertStatus = request.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const trx = await TransactionModel.find();

            const path_images =  request.protocol + '://' + request.get('host') + `/uploads/`;

            response.render('content/admin/list_transaction', {trx, alert, path_images});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/transaksi');
        }
    },

    updateStatus: async(request, response) => {
        try {

            const { id } = request.params
            const { status } = request.query

            await TransactionModel.findByIdAndUpdate({_id: id}, {status})

            request.flash('alertMessage', `Berhasil mengubah status transaksi`);
            request.flash('alertStatus', 'success');
            response.redirect('/transaksi');
            
        } catch (error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/transaksi');
        }
    }
}