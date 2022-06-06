const VoucherModel = require('../models/VoucherModel');

module.exports = {
    landingPage: async(req, res) => {
        try {
            const voucher = await VoucherModel.find().
            select('_id name status category thumbnail').populate('category');

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

            res.status(200).json({
                status: true,
                message:'Voucher game ditemukan', 
                data: voucher
            });

        } catch (error) {

            res.status(500).json({ message: error.message || `Internal server error`});
        }
    }
}