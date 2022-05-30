module.exports = {
    index: async(request, response) => {
        try {
            response.render('index', {
                title: 'test express JS'
            });
        } catch(error) {
            console.log(error)
        }
    }
}