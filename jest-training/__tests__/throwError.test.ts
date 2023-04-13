import { throwError } from '../throwError';

describe('throwError options', () => {
  it('SyntaxError function', () => {
    expect(() => throwError('syntax')).toThrow(SyntaxError);
  });

  it('TypeError function', () => {
    expect(() => throwError('type')).toThrow(TypeError);
  });

  it('ReferenceError function', () => {
    expect(() => throwError('reference')).toThrow(ReferenceError);
  });
});
