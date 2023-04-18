import Serverless from 'serverless';
import { notEmpty, isFunctionDefinition, fixModuleName, findEntriesSpecified } from '../utils';

describe('notEmpty', () => {
  it('should false for null', () => {
    expect(notEmpty(null)).toEqual(false);
  });
  it('should false for undefined', () => {
    expect(notEmpty(undefined)).toEqual(false);
  });
  it('should true for number', () => {
    expect(notEmpty(Math.random())).toEqual(true);
  });
});

describe('isFunctionDefinition', () => {
  it('should return false if null', () => {
    expect(isFunctionDefinition(null as unknown as Serverless.FunctionDefinitionHandler)).toEqual(false);
  });
  it('should return false if undefined', () => {
    expect(isFunctionDefinition(undefined as unknown as Serverless.FunctionDefinitionHandler)).toEqual(false);
  });
  it('should return true if including a handler property', () => {
    expect(isFunctionDefinition({ handler: '' } as unknown as Serverless.FunctionDefinitionHandler)).toEqual(true);
  });
});

describe('fixModuleName', () => {
  const modules = {
    '@beforeyoubid/ui-lib': '@beforeyoubid/ui-lib',
    '@beforeyoubid/ui-lib/something': '@beforeyoubid/ui-lib',
    'uuid/v4': 'uuid',
  };
  for (const [lib, expectedLib] of Object.entries(modules)) {
    it(`${lib} should output as ${expectedLib}`, () => {
      expect(fixModuleName(lib)).toEqual(expectedLib);
    });
  }
});
describe('findEntriesSpecified', () => {
  it('if given a string it will handle it', async () => {
    const key = 'examples/example-layer-service/hello.default';
    const res = await findEntriesSpecified(key);
    expect(res).toEqual(['examples/example-layer-service/hello.js']);
  });
  it('if given an array it will handle it', async () => {
    const key = 'examples/example-layer-service/hello.default';
    const res = await findEntriesSpecified([key]);
    expect(res).toEqual(['examples/example-layer-service/hello.js']);
  });
  it('if given an empty array it will return nothing', async () => {
    const res = await findEntriesSpecified([]);
    expect(res).toEqual([]);
  });
  it('if given a bad variable it will return an empty array', async () => {
    const res = await findEntriesSpecified(123 as unknown as string);
    expect(res).toEqual([]);
  });
});
