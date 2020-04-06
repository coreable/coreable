import { describe, it } from 'mocha';;
import { generator } from './generator';

describe('Test Data Generator [api/lib/generator.ts]', () => {

  it('should generate fake data and insert it into the database', async() => {
    return await generator();
  });

});