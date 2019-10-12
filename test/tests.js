const { randomiseSentence } = require('../index');

QUnit.test('hello test', function(assert) {
  const sentence = 'Just some random sentence';
  const result = randomiseSentence(sentence);
  assert.ok(Array.isArray(result), 'Function return array');
  assert.equal(result.length, sentence.split(' ').length, 'Array has correct nr of items');
  assert.notDeepEqual(result, sentence.split(' '), 'Randomise function works correctly');
});
