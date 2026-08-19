import ClientError from '../ClientError.js';
import { jest } from '@jest/globals';
 
describe('ClientError', () => {
  it('should throw error when directly use it', () => {
    expect(() => new ClientError('')).toThrow('cannot instantiate abstract class');
  });
});