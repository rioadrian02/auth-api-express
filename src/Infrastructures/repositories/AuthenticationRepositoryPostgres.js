import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository.js';
import InvariantError from '../../Commons/exceptions/InvariantError.js';

class AuthenticationRepositoryPostgres extends AuthenticationRepository {
    constructor(pool) {
        super();
        this._pool = pool;
    }

    async addToken(token, userId) {
        const query = {
            text: 'INSERT INTO authentications(token, user_id) VALUES($1, $2)',
            values: [token, userId],
        };
        await this._pool.query(query);
    }

    async checkAvailabilityToken(token) {
        const query = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Refresh token tidak ditemukan di database');
        }
    }

    async deleteToken(token) {
        const query = {
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token],
        };
        await this._pool.query(query);
    }

    async deleteAllTokenByUserId(userId, client) {
        const db = client || this._pool;

        const query = {
            text: 'DELETE FROM authentications WHERE user_id = $1',
            values: [userId]
        }

        await db.query(query);
    }
}

export default AuthenticationRepositoryPostgres;