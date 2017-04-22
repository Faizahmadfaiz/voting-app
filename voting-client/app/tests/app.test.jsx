import chai from 'chai';
import {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
describe('App', ()=> {
    it('should properly run tests', () => {
        expect(1).to.equal(1);
    });
});