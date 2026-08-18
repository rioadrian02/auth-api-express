import { createContainer } from 'instances-container';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './database/postgres/pool.js';

import UserRepository from '../Domains/users/UserRepository.js';
import AuthenticationRepository from '../Domains/authentications/AuthenticationRepository.js';
import UserRepositoryPostgres from './repositories/UserRepositoryPostgres.js';
import AuthenticationRepositoryPostgres from './repositories/AuthenticationRepositoryPostgres.js';
import TokenManager from '../Applications/security/TokenManager.js';

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

// register repository dan services
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
        key: AuthenticationRepository.name,
        Class: AuthenticationRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
            ],
        }
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
    },
    {
        key: TokenManager.name,
        Class: JwtTokenManager,
        parameter: {
            dependencies: [
                {
                    concrete: jwt,
                }
            ]
        }
    }
]);

// register use case
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
    },
    {
        key: LoginUserUseCase.name,
        Class: LoginUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name
                },
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name
                },
                {
                    name: 'tokenManager',
                    internal: TokenManager.name
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash.name
                }
            ]
        }
    },
    {
        key: DetailUserUseCase.name,
        Class: DetailUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name
                },
            ]
        }
    },
    {
        key: LogoutUserUseCase.name,
        Class: LogoutUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name
                },
            ]
        }
    },
    {
        key: UpdateFullnameUseCase.name,
        Class: UpdateFullnameUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name
                },
            ]
        }
    },
    {
        key: RefreshAuthenticationUseCase.name,
        Class: RefreshAuthenticationUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name
                },
                {
                    name: 'tokenManager',
                    internal: TokenManager.name
                },
            ]
        }
    },
    {
        key: DeleteUserUseCase.name,
        Class: DeleteUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name
                },
                                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name
                },
            ]
        }
    }
]);

export default container;