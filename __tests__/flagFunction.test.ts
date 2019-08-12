import { flag, loadFlags } from '../src/index';

describe('Loading the flags', () => {
  it('sets the flag initial value', done => {
    loadFlags({ testFlag: true });
    flag('testFlag', () => {
      done();
    });
  });

  it('can be called multiple times', done => {
    loadFlags({ testFlag: true });
    loadFlags({ testFlag: false });
    flag('testFlag', fail, done);
  });
});
