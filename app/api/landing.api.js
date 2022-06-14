const VoucherModel = require('../models/voucher.model');
const CategoryModel = require('../models/category.model');

module.exports = {
    landingPage: async(req, res) => {
        try {
            const path_dir = req.protocol + '://' + req.get('host') + `/uploads/`;
            const voucher = await VoucherModel.find().
            select('_id name status category thumbnail').populate('category');

            voucher.forEach(voc => {
                voc.thumbnail = voc.thumbnail.length ? path_dir + voc.thumbnail : ''
            })

            res.status(200).json({data: voucher});
        } catch (error) {

            res.status(500).json({ message: error.message || `Internal server error`});
        }
    },
    detailPage: async(req, res) => {
        try {
            const { id } = req.params;

            const voucher = await VoucherModel.findOne({_id : id})
            .populate('category')
            .populate('nominals')
            .populate('user', '_id name phoneNumber');

            if(!voucher) {
                res.status(404).json({
                    status: false,
                    message: 'Voucher game tidak ditemukan', 
                    data: []
                });
            }

            const path_dir = req.protocol + '://' + req.get('host') + `/uploads/`;
            voucher.thumbnail = voucher.thumbnail.length ? path_dir + voucher.thumbnail : ''
                
            res.status(200).json({
                status: true,
                message:'Voucher game ditemukan', 
                data: voucher
            });

        } catch (error) {

            res.status(500).json({ message: error.message || `Internal server error`});
        }
    },
    category: async(req, res) => {
        try {
            const cat = await CategoryModel.find()
        
            res.status(200).json({data: cat});
        } catch (error) {

            res.status(500).json({ message: error.message || `Internal server error`});
        }
    }

}