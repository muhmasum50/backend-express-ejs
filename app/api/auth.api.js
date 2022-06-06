const PlayerModel = require('../models/PlayerModel');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
    register: async(req, res, next) => {
        try {
            const payload = req.body;

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
                        
                        const player = new PlayerModel({ ...payload, avatar: filename })
                        await player.save();

                        delete player._doc.password
                
                        return res.status(200).json({
                            status: true,
                            message: `Player ${player.name} berhasil ditambahkan`,
                            data: player
                        })

                    } catch (error) {
                        return res.status(422).json({
                            status: false,
                            message: error.message,
                            fields: error.errors
                        })
                    }
                })
            }
            else {
                let player = new PlayerModel(payload);
                await player.save();
    
                delete player._doc.password
                
                return res.status(200).json({
                    status: true,
                    message: `Player ${player.name} berhasil ditambahkan`,
                    data: player
                })
            }
            
            
        } catch (error) {
            if(error && error.name == "ValidationError") {
                return res.status(422).json({
                    status: false,
                    message: error.message,
                    fields: error.errors
                })
            }

            next(error)
        }
    }
}