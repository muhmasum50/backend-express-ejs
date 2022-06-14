const CategoryModel = require('../models/category.model');

module.exports = {
    index: async(request, response) => {
        try {
            const alertMessage = request.flash("alertMessage");
            const alertStatus = request.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const category = await CategoryModel.find();

            response.render('content/admin/list_category', {category, alert});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/category');
             
        }
    },
    create: async(request, response) => {
        try {
            response.render('content/admin/create_category');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/category');
        }
    },
    store: async(request, response) => {
        try {
            const { name } = request.body;
            const category = CategoryModel({ name });
            await category.save();

            request.flash('alertMessage', 'Berhasil menambahkan data kategori');
            request.flash('alertStatus', 'success');

            response.redirect('/category');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/category');
        }
    },
    edit: async(request, response) => {
        try {
            const { id } = request.params;
            const category = await CategoryModel.findOne({_id: id});

            response.render('content/admin/edit_category', {category});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/category');
        }
    },
    update: async(request, response) => {
        try {
            const { id } = request.params;
            const { name } = request.body;

            const category = await CategoryModel.findOneAndUpdate({
                _id: id
            }, {name});

            request.flash('alertMessage', 'Berhasil mengubah data kategori');
            request.flash('alertStatus', 'success');

            response.redirect('/category');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/category');
        }
    },
    destroy: async (request, response) => {
        try {
            const { id } = request.params;
            const category = await CategoryModel.findOneAndDelete({
                _id: id
            });

            request.flash('alertMessage', 'Berhasil menghapus data kategori');
            request.flash('alertStatus', 'success');

            response.redirect('/category');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/category');
        }
    }

}