const BankModel = require('./../models/BankModel');

module.exports = {
    index: async(request, response) => {
        try {
            const alertMessage = request.flash("alertMessage");
            const alertStatus = request.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const bank = await BankModel.find();

            response.render('content/admin/list_bank', {bank, alert});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/bank');
        }
    },
    create: async(request, response) => {
        try {
            response.render('content/admin/create_bank');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/bank');
        }
    },
    store: async(request, response) => {
        try {
            const { bankName, bankNumber, name } = request.body;
            const bank = BankModel({ name, bankName, bankNumber });
            await bank.save(); 

            request.flash('alertMessage', 'Berhasil menambahkan data bank');
            request.flash('alertStatus', 'success');

            response.redirect('/bank');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/bank');
        }
    },
    edit: async(request, response) => {
        try {
            const { id } = request.params;
            const bank = await BankModel.findOne({_id: id});

            response.render('content/admin/edit_bank', {bank});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/bank');
        }
    },
    update: async(request, response) => {
        try {
            const { id } = request.params;
            const { bankName, bankNumber, name } = request.body;

            await BankModel.findOneAndUpdate({
                _id: id
            }, {bankName, bankNumber, name});

            request.flash('alertMessage', 'Berhasil mengubah data bank');
            request.flash('alertStatus', 'success');

            response.redirect('/bank');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/bank');
        }
    },
    destroy: async (request, response) => {
        try {
            const { id } = request.params;
            await BankModel.findOneAndDelete({
                _id: id
            });

            request.flash('alertMessage', 'Berhasil menghapus data bank');
            request.flash('alertStatus', 'success');

            response.redirect('/bank');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/bank');
        }
    }

}