
const UserModel = require('./../models/UserModel');
const bcrypt = require('bcryptjs');

module.exports = {
    index: async(request, response) => {
        try {
            const alertMessage = request.flash("alertMessage");
            const alertStatus = request.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };


            if(request.session.user === null || request.session.user === undefined){
                response.render('auth/login',{alert});
            }else {
                response.redirect('/dashboard');
            }
        } catch (error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/auth/login');
        }
    },
    login: async(request, response) => {
        try {
            
            const { username, password } = request.body;
            const user = await UserModel.findOne({username: username})

            if(user) {
                const checkPassword = await bcrypt.compare(password, user.password);
                if(checkPassword) {
                    if(user.status === 'Y') {
                        request.session.user = {
                            id: user._id,
                            email: user.email,
                            username: user.username,
                            name: user.name,
                            status: user.status,
                            session_created: new Date()
                        }
                        response.redirect('/dashboard');
                    }
                    else {
                        request.flash('alertMessage', 'Mohon maaf akun anda belum aktif');
                        request.flash('alertStatus', 'danger');
            
                        response.redirect('/auth/login');
                    }
                }

                request.flash('alertMessage', 'Password anda salah');
                request.flash('alertStatus', 'danger');
                response.redirect('/auth/login');
            }

            request.flash('alertMessage', 'Akun tidak ditemukan');
            request.flash('alertStatus', 'danger');
            response.redirect('/auth/login');
            
        } catch (error) {
            request.flash('alertMessage', `${error.message}`);
            request.flash('alertStatus', 'danger');
            response.redirect('/auth/login');
        }
    },
    logout: (request, response) => {
        request.session.destroy();
        response.redirect('/auth/login');
    },
    register: async(request, response) => {
        try {
            response.render('auth/register');
        } catch (error) {
            
        }
    }
}