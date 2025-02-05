import { noop } from './noop';

describe('noop', () => {
  it('should work', () => {
    expect(noop()).toEqual('noop');
  });
});
