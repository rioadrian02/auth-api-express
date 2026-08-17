import UserRepository from '../UserRepository.js';
import { jest } from '@jest/globals';
 
describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new UserRepository();
 
    await expect(userRepository.addUser({})).rejects.toThrow('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(userRepository.verifyAvailableUsername('')).rejects.toThrow('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(userRepository.getPasswordByUsername('')).rejects.toThrow('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(userRepository.getIdByUsername('')).rejects.toThrow('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(userRepository.getUserById('')).rejects.toThrow('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(userRepository.updateFullnameById('')).rejects.toThrow('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(userRepository.deleteUser('')).rejects.toThrow('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});