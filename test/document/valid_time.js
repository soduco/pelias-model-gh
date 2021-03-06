
var Document = require('../../Document');

module.exports.tests = {};

module.exports.tests.getValidTime = function (test) {
  test('getValidTime', function (t) {
    let doc = new Document('mysource', 'mylayer', 'myid');
    t.same(doc.getValidTime(), undefined, 'getter works');
    doc.validtime = {start: -43829, end: 10957};
    t.same(doc.getValidTime(), {start: -43829, end: 10957}, 'getter works');
    t.end();
  });
};

module.exports.tests.setValidTime = function(test) {
  test('setValidTime', function(t) {
    const doc = new Document('mysource','mylayer','myid');
    const vtime = {start: {in: '1850'}, end: {in: '2000'}};
    t.equal(doc.setValidTime(vtime), doc, 'chainable');
    t.same(doc.validtime, {start: -43829, end: 10957}, 'setter works');
    t.end();
  });
  

  test('setValidTime - validate', function(t) {
    const doc = new Document('mysource','mylayer','myid');
    t.throws( doc.setValidTime.bind(doc), null, 'invalid args (none)' );
    t.throws( doc.setValidTime.bind(doc,-1), null, 'invalid args (not an object)' );
    t.throws( doc.setValidTime.bind(doc,{start: {in: 'not a date'}}), null, 'start should be a long');
    t.throws( doc.setValidTime.bind(doc,{end: {in: null}}), null, 'end should be a long');
    t.same( doc.setValidTime({}).getValidTime(), {}, 'empty input valid time should lead to empty output valid time');
    t.end();
  });

  test('valid time consistency', function(t) {
    const doc = new Document('mysource','mylayer','myid');
    
    doc.setValidTime({start: {in: '1850'}, end: {in: '2000'}});
    let validtime = {start: -43829, end: 10957};
    t.same(doc.validtime, validtime, 'year-only valid time shoud be transformed to year-month-day');
    
    doc.setValidTime({start: {in: '1850-02'}, end: {in: '2000-05'}});
    validtime = {start: -43798, end: 11078};
    t.same(doc.validtime, validtime, 'year-month valid time shoud be transformed to year-month-day');

    validtime = {start: '1860', end: '1850'};
    t.throws( doc.setValidTime.bind(doc, validtime), null, 'start should be leq than end');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('valid time: ' + name, testFunction);
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common);
  }
};
