import { createContainer } from 'instances-container';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import pool from './database/postgres/pool.js';

import UserRepository from '../Domains/users/UserRepository.js';
import UserRepositoryPostgres from './repositories/UserRepositoryPostgres.js';
import AuthenticationRepositoryPostgres from './repositories/AuthenticationRepositoryPostgres.js';
import BcryptPasswordHash from './security/BcryptPasswordHash.js';
import PasswordHash from '../Applications/security/PasswordHash.js';
import JwtTokenManager from './security/JwtTokenManager.js';
import AddUserUseCase from '../Applications/use_case/AddUserUseCase.js';
import LoginUserUseCase from '../Applications/use_case/LoginUserUseCase.js';
import LogoutUserUseCase from '../Applications/use_case/LogoutUserUseCase.js';
import RefreshAuthenticationUseCase from '../Applications/use_case/RefreshAuthenticationUseCase.js';
import DetailUserUseCase from '../Applications/use_case/DetailUserUseCase.js';
import UpdateFullnameUseCase from '../Applications/use_case/UpdateFullnameUseCase.js';
import DeleteUserUseCase from '../Applications/use_case/DeleteUserUseCase.js';

const container = createContainer();

const userRepository = new UserRepositoryPostgres();
const authenticationRepository = new AuthenticationRepositoryPostgres();
const passwordHash = new BcryptPasswordHash();
const tokenManager = new JwtTokenManager();

container.register([
    {
        key: UserRepository.name,
        Class: UserRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: nanoid,
                },
            ],
        },
    },
    {
        key: PasswordHash.name,
        Class: BcryptPasswordHash,
        parameter: {
            dependencies: [
                {
                    concrete: bcrypt,
                },
                {
                    concrete: nanoid,
                },
            ],
        },
    }
]);

container.register([
    {
        key: AddUserUseCase.name,
        Class: AddUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash.name
                }
            ]
        }
    }
])

export default container;