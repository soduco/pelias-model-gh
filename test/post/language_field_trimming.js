
var Document = require('../../Document');
var language_field_trimming = require('../../post/language_field_trimming');

module.exports.tests = {};

module.exports.tests.dedupe = function (test) {
  test('dedupe - name', function (t) {
    var doc = new Document('mysource', 'mylayer', 'myid');

    doc.setName('default', 'test1');
    doc.setNameAlias('default', 'test2');
    doc.setNameAlias('default', 'test3');

    doc.setName('en', 'test1');
    doc.setNameAlias('en', 'test3');
    doc.setNameAlias('en', 'test4');

    doc.setName('de', 'test1');
    doc.setNameAlias('de', 'test2');

    language_field_trimming(doc);

    t.deepEquals(doc.name.default, ['test1', 'test2', 'test3']);
    t.deepEquals(doc.name.en, ['test4']);
    t.false(doc.name.de);

    t.end();
  });

  test('dedupe - phrase', function (t) {
    var doc = new Document('mysource', 'mylayer', 'myid');

    doc.setName('default', 'test1');
    doc.setNameAlias('default', 'test2');
    doc.setNameAlias('default', 'test3');

    doc.setName('en', 'test1');
    doc.setNameAlias('en', 'test3');
    doc.setNameAlias('en', 'test4');

    doc.setName('de', 'test1');
    doc.setNameAlias('de', 'test2');

    language_field_trimming(doc);

    t.deepEquals(doc.phrase.default, ['test1', 'test2', 'test3']);
    t.deepEquals(doc.phrase.en, ['test4']);
    t.false(doc.phrase.de);

    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('post/language_field_trimming: ' + name, testFunction);
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common);
  }
};
