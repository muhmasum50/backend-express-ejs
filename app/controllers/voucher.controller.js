const VoucherModel = require('../models/voucher.model');
const CategoryModel = require('../models/category.model');
const NominalModel = require('../models/nominal.model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
    index: async(request, response) => {
        try {
            const alertMessage = request.flash("alertMessage");
            const alertStatus = request.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const voucher = await VoucherModel.find()
                .populate('category')
                .populate('nominals');

            response.render('content/admin/list_voucher', {voucher, alert});
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/voucher');
        }
    },
    create: async(request, response) => {
        try {
            const category = await CategoryModel.find(); 
            const nominal = await NominalModel.find();
            response.render('content/admin/create_voucher', {category, nominal});

        } catch(error) {
            request.flash('alertMessage', `${error.message}` );
            request.flash('alertStatus', 'danger');
            response.redirect('/voucher');
        }
    },
    store: async(request, response) => {
        try {
            const { name, category, nominals } = request.body;

            if(request.file) {
                let temp_path = request.file.path;
                let originalExtension = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1];
                let filename = request.file.filename + '.' + originalExtension;
                let target_path = path.resolve(config.ROOT_PATH, `public/uploads/${filename}`);

                const src = fs.createReadStream(temp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);
                src.on('end', async () => {
                    try {
                        
                        const voucher = new VoucherModel({
                            name, category, nominals, thumbnail: filename
                        })
                        await voucher.save();

                        request.flash('alertMessage', 'Berhasil menambahkan data voucher');
                        request.flash('alertStatus', 'success');
                        response.redirect('/voucher');

                    } catch (error) {
                        request.flash('alertMessage', `${error.message}`);
                        request.flash('alertStatus', 'danger');
                        response.redirect('/voucher');
                    }
                })
            }
            else {
                const voucher = VoucherModel({
                    name, category, nominals
                })
                await voucher.save();
    
                request.flash('alertMessage', 'Berhasil menambahkan data voucher');
                request.flash('alertStatus', 'success');
                response.redirect('/voucher');
            }
            
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/voucher');
        }
    },
    edit: async(request, response) => {
        try {
            const { id } = request.params;

            const category = await CategoryModel.find(); 
            const nominal = await NominalModel.find();
            const voucher = await VoucherModel.findOne({_id: id}).populate('category')
            .populate('nominals');

            const path_images =  request.protocol + '://' + request.get('host') + `/uploads/${voucher.thumbnail}`;

            response.render('content/admin/edit_voucher', {voucher, category, nominal, path_images});

        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/voucher');
        }
    },
    update: async(request, response) => {
        try {

            const { id } = request.params;
            const { name, category, nominals } = request.body;

            if(request.file) {
                let temp_path = request.file.path;
                let originalExtension = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1];
                let filename = request.file.filename + '.' + originalExtension;
                let target_path = path.resolve(config.ROOT_PATH, `public/uploads/${filename}`);

                const src = fs.createReadStream(temp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);
                src.on('end', async () => {
                    try {

                        const voucher = await VoucherModel.findOne({_id: id});

                        let currentImage = `${config.ROOT_PATH}/public/uploads/${voucher.thumbnail}`;
                        if(fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage);
                        }

                        await VoucherModel.findOneAndUpdate({_id: id}, {name, category, nominals, thumbnail: filename});

                        request.flash('alertMessage', 'Berhasil mengubah data voucher');
                        request.flash('alertStatus', 'success');
                        response.redirect('/voucher');

                    } catch (error) {
                        request.flash('alertMessage', `${error.message}`);
                        request.flash('alertStatus', 'danger');
                        response.redirect('/voucher');
                    }
                })
            }
            else {
                await VoucherModel.findOneAndUpdate({_id: id}, {name, category, nominals})
    
                request.flash('alertMessage', 'Berhasil mengubah data voucher');
                request.flash('alertStatus', 'success');
                response.redirect('/voucher');
            }

        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/voucher');
        }
    },
    destroy: async (request, response) => {
        try {
            const { id } = request.params;
            const voucher = await VoucherModel.findOneAndDelete({
                _id: id
            });

            let currentImage = `${config.ROOT_PATH}/public/uploads/${voucher.thumbnail}`;
            if(fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage);
            }

            request.flash('alertMessage', 'Berhasil menghapus data voucher');
            request.flash('alertStatus', 'success');

            response.redirect('/voucher');
        } catch(error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/voucher');
        }
    }

}