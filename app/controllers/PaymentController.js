const PaymentModel = require('./../models/PaymentModel');
const BankModel = require('./../models/BankModel');

module.exports = {
    index: async(request, response) => {
        try {
            const alertMessage = request.flash("alertMessage");
            const alertStatus = request.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const payment = await PaymentModel.find().populate('banks');

            response.render('content/admin/list_payment', {payment, alert});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/payment');
        }
    },
    create: async(request, response) => {
        try {
            const banks = await BankModel.find();
            response.render('content/admin/create_payment', { banks });
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/payment');
        }
    },
    store: async(request, response) => {
        try {
            const { type, banks } = request.body;
            const payment = PaymentModel({ type, banks });
            await payment.save(); 

            request.flash('alertMessage', 'Berhasil menambahkan data payment');
            request.flash('alertStatus', 'success');

            response.redirect('/payment');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/payment');
        }
    },
    edit: async(request, response) => {
        try {
            const { id } = request.params;
            const banks = await BankModel.find();
            const payment = await PaymentModel.findOne({_id: id}).populate('banks');

            response.render('content/admin/edit_payment', {payment, banks});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/payment');
        }
    },
    update: async(request, response) => {
        try {
            const { id } = request.params;
            const { type, banks } = request.body;

            await PaymentModel.findOneAndUpdate({
                _id: id
            }, {type, banks});

            request.flash('alertMessage', 'Berhasil mengubah data payment');
            request.flash('alertStatus', 'success');

            response.redirect('/payment');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/payment');
        }
    },
    destroy: async (request, response) => {
        try {
            const { id } = request.params;
            await PaymentModel.findOneAndDelete({
                _id: id
            });

            request.flash('alertMessage', 'Berhasil menghapus data payment');
            request.flash('alertStatus', 'success');

            response.redirect('/payment');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/payment');
        }
    }

}