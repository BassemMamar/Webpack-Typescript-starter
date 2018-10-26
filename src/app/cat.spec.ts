
import Cat from './cat';

describe('AboutComponent', () => {
  let lib;

  beforeEach(() => {
    lib = new Cat();
  });
  

  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).toEqual('Cat');
    });
  });

});