const CategoryModel = require('./../models/CategoryModel');

module.exports = {
    index: async(request, response) => {
        try {
            const category = await CategoryModel.find();

            response.render('content/admin/list_category', {category});
        } catch(error) {
            console.log(error)
        }
    },
    create: async(request, response) => {
        try {
            response.render('content/admin/create_category');
        } catch(error) {
            console.log(error)
        }
    },
    store: async(request, response) => {
        try {
            const { name } = request.body;
            const category = CategoryModel({ name });
            await category.save();

            response.redirect('/category');
        } catch(error) {
            console.log(error)
        }
    },
    edit: async(request, response) => {
        try {
            const { id } = request.params;
            const category = await CategoryModel.findOne({_id: id});

            response.render('content/admin/edit_category', {category});
        } catch(error) {
            console.log(error)
        }
    },
    update: async(request, response) => {
        try {
            const { id } = request.params;
            const { name } = request.body;

            const category = await CategoryModel.findOneAndUpdate({
                _id: id
            }, {name});

            response.redirect('/category');
        } catch(error) {
            console.log(error)
        }
    },
    destroy: async (request, response) => {
        try {
            const { id } = request.params;
            const category = await CategoryModel.findOneAndDelete({
                _id: id
            });

            response.redirect('/category');
        } catch(error) {
            console.log(error)
        }
    }

}