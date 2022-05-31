
module.exports = {
    index: async(request, response) => {
        try {
            response.render('auth/login');
        } catch (error) {
            
        }
    },
    register: async(request, response) => {
        try {
            response.render('auth/register');
        } catch (error) {
            
        }
    }
}