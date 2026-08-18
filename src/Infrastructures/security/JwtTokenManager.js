import TokenManager from '../../Applications/security/TokenManager.js';

class JwtTokenManager extends TokenManager {
    constructor (jwt) {
        super();
        this._jwt = jwt;
    }
    async createAccessToken(payload) {
        return this._jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '30m'});
    }

    async createRefreshToken(payload) {
        return this._jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);
    }

    async verifyRefreshToken(token) {
        return this._jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    }

    async decodePayload(token) {
        return this._jwt.decode(token);
    }
}

export default JwtTokenManager;