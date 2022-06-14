const PlayerModel = require('./../models/PlayerModel');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
    index: async(req, res) => {
        try {
            
            const path_dir = req.protocol + '://' + req.get('host') + `/uploads/avatar/`;
            const player = {
                id : req.player._id,
                username: req.player.username,
                name: req.player.name,
                email: req.player.email,
                avatar: req.avatar,
                dir_avatar: path_dir + req.player.avatar,
                phoneNumber: req.player.phoneNumber,
                status: req.player.status
            }

            res.status(200).json({status: true, message: 'Profile ditemukan', data: player})
        } catch (error) {
            res.status(500).json({ status: false, message: error.message || `Internal server error`});
        }
    },
    update: async(req, res) => {
        try {
            const path_dir = req.protocol + '://' + req.get('host') + `/uploads/avatar/`;

            const { name = "", phoneNumber = "" } = req.body
            const payload = {}

            if(name.length) payload.name = name
            if(phoneNumber.length) payload.phoneNumber = phoneNumber

            if(req.file) {

                let temp_path = req.file.path;
                let originalExtension = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExtension;
                let target_path = path.resolve(config.ROOT_PATH, `public/uploads/avatar/${filename}`);

                const src = fs.createReadStream(temp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);
                src.on('end', async () => {
                    try {

                        let currentImage = `${config.ROOT_PATH}/public/uploads/avatar/${req.player.avatar}`;
                        if(fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage);
                        }

                        const player = await PlayerModel.findOneAndUpdate({_id: req.player._id}, {payload, avatar: filename});

                        res.status(201).json({
                            status: true,
                            message: 'Profile dan photo berhasil diubah',
                            data: {
                                id: player._id,
                                name: player.name,
                                phoneNumber: player.phoneNumber,
                                avatar: player.avatar,
                                dir_avatar: path_dir + player.avatar
                            }
                        })

                    } catch (error) {
                        if(error && error.name == "ValidationError") {
                            res.status(422).json({ status: false, message: error.message, field: error.fields || `Internal server error`});
                        }
                        res.status(500).json({ status: false, message: error.message || `Internal server error`});
                    }
                })
            }
            else {
                const player = await PlayerModel.findOneAndUpdate({
                    _id: req.player._id
                }, payload, { new: true, runValidators: true })

                res.status(201).json({
                    status: true,
                    message: 'Profile berhasil diubah',
                    data: {
                        id: player._id,
                        name: player.name,
                        phoneNumber: player.phoneNumber,
                        avatar: player.avatar,
                        dir_avatar: path_dir + player.avatar
                    }
                })
            }

        } catch (error) {
            res.status(500).json({ status: false, message: error.message || `Internal server error`});
        }
    }
}