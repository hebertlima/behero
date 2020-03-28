const crypto = require('crypto');
const connection = require('../database/conection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    async store(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    },
    async update(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        const { title, description, value } = request.body;

        await connection('incidents').where('id', id).update({
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ message: 'incident updated' });
    }
};