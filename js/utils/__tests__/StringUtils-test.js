jest.dontMock('../StringUtils');

describe('StringUtils', function() {
  var randKey = require('../StringUtils').randKey;

  it('defaults to 5 characters', function() {
    expect(randKey().length).toBe(5);
  });

  it('adds a prefix when supplied', function() {
    var key = randKey('t');
    expect(/^t_/.test(key)).toBe(true);
    expect(key.length).toBe(7);
  });
});
