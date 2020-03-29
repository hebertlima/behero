const connection = require('../database/conection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .orderBy('id', 'desc')
            .select('*');

        return response.json(incidents);
    }
}