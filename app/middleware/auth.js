const config = require('../../config');
const bcrypt = require('bcryptjs');
const JSON_WEB_TOKEN = require('jsonwebtoken')
const PlayerModel = require('../models/PlayerModel')

module.exports = {
    isLoginAdmin: (req, res, next) => {
        if(req.session.user === null || req.session.user === undefined){
            req.flash('alertMessage', 'Mohon maaf sesi anda habis, silahkan login kembali');
            req.flash('alertStatus', 'danger');

            res.redirect('/auth/login');
        }
        else {
            next()
        }
    },

    isLoginPlayer: async(req, res, next) => {
        try {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
            const data = JSON_WEB_TOKEN.verify(token, config.JWT_KEY)

            const player = await PlayerModel.findOne({_id: data.player.id})

            if(!player) {
                throw new Error()
            }

            req.player = player
            req.token = token
            next()
        } catch (error) {
            res.status(401).json({
                status: false,
                message: 'Unauthorized'
            })
        }
    }
}