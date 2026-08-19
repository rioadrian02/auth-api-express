import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool();

const DatabaseTestHelper = {
    // =========================
    // USERS
    // =========================

    async addUser({
        id = 'user-123',
        username = 'dicoding',
        password = 'secret_password',
        fullname = 'Dicoding Indonesia',
    } = {}) {
        const query = {
            text: `
                INSERT INTO users
                (id, username, password, fullname, created_at)
                VALUES ($1, $2, $3, $4, $5)
            `,
            values: [
                id,
                username,
                password,
                fullname,
                new Date().toISOString(),
            ],
        };

        await pool.query(query);
    },

    async findUsersById(id) {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);

        return result.rows;
    },

    async cleanUsers() {
        await pool.query('DELETE FROM users');
    },

    // =========================
    // AUTHENTICATIONS
    // =========================

    async cleanAuthentications() {
        await pool.query('DELETE FROM authentications');
    },

    // =========================
    // CLEAN ALL
    // =========================

    async cleanAll() {
        await pool.query('DELETE FROM authentications');
        await pool.query('DELETE FROM users');
    },

    // =========================
    // CLOSE CONNECTION
    // =========================

    async close() {
        await pool.end();
    },
};

export default DatabaseTestHelper;