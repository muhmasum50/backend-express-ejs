const NominalModel = require('../models/NominalModel');
const coinType = [{name: 'Gold'}, {name : 'Diamond'},{name : 'Jewel'},{name : 'Silver'}];

module.exports = {
    index: async(request, response) => {
        try {
            const alertMessage = request.flash("alertMessage");
            const alertStatus = request.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const nominal = await NominalModel.find();

            response.render('content/admin/list_nominal', {nominal, alert});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/nominal');
        }
    },
    create: async(request, response) => {
        try {
            response.render('content/admin/create_nominal', {coinType});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/nominal');
        }
    },
    store: async(request, response) => {
        try {
            const { coinName, coinQuantity, price } = request.body;
            const nominal = NominalModel({ coinName, coinQuantity, price });
            await nominal.save(); 

            request.flash('alertMessage', 'Berhasil menambahkan data nominal');
            request.flash('alertStatus', 'success');

            response.redirect('/nominal');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/nominal');
        }
    },
    edit: async(request, response) => {
        try {
            const { id } = request.params;
            const nominal = await NominalModel.findOne({_id: id});

            response.render('content/admin/edit_nominal', {nominal, coinType});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/nominal');
        }
    },
    update: async(request, response) => {
        try {
            const { id } = request.params;
            const { coinName, coinQuantity, price } = request.body;

            const nominal = await NominalModel.findOneAndUpdate({
                _id: id
            }, {coinName, coinQuantity, price});

            request.flash('alertMessage', 'Berhasil mengubah data nominal');
            request.flash('alertStatus', 'success');

            response.redirect('/nominal');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/nominal');
        }
    },
    destroy: async (request, response) => {
        try {
            const { id } = request.params;
            const nominal = await NominalModel.findOneAndDelete({
                _id: id
            });

            request.flash('alertMessage', 'Berhasil menghapus data nominal');
            request.flash('alertStatus', 'success');

            response.redirect('/nominal');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/nominal');
        }
    }

}