import PasswordHash from '../../Applications/security/PasswordHash';

class BcryptPasswordHash extends PasswordHash {
    constructor(bcrypt, saltRound = 10) {
        super();
        this._bcrypt = bcrypt;
        this._saltRound = saltRound;
    }

    async hash(password) {
        return this._bcrypt.hash(password, this._saltRound);
    }

    async comparePassword (password, hashedPassword) {
        return this._bcrypt.comparePassword(password, hashedPassword);
    }
}

export default BcryptPasswordHash;