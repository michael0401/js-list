require('../js-list');
require('../index');
var test = require('tape');

test('js-list', function(t) {	
	var L = new List.Root()
	, item1 = L.addChild({'id': 'a'}).Id('a')
	, item2 = L.addChild({'id': 'b'}).Id('b')
	, item3 = L.addChild({'id': 'three'}).Id('three')
	, item4 = L.addChild({'id': 'four'}).Id('four')
	, item5 = L.addChild({'id': 'five'}).Id('five')
	, item6 = L.addChild({'id': 'six'}).Id('six')
	, item7 = L.addChild({'id': 'seven'}).Id('seven')
	, tmp1 = []
	, tmp2 = [];
	
	t.plan(16);
	//	verify the list
	t.equal(L.firstChild()['id'], 'a');
	t.equal(L.Id('a'), item1);	
	// firstChild
	t.equal(item1===L.firstChild(), true);	
	// lastChild
	t.equal(item7 === L.lastChild(), true);
	// insertFirstChild
	L.insertFirstChild(L.construct({'id': 'new-insert'}));
	t.equal(L.firstChild().id, 'new-insert');
	
	// previousSibling, nextSibling
	t.equal(L.Id('b').previousSibling().id, 'a');
	t.equal(L.Id('b').firstSibling().id, 'new-insert');
	
	
	// mappable object, and walk the tree and capture the names
	L.name = 'head';
	tmp1 = _.map(L.each(), function(x) { return x.id; });
	
	t.equal(_.difference([ 'new-insert', 'a', 'b', 'three', 'four', 'five', 'six', 'seven' ]
	, tmp1).length, 0);
	
	// siblings
	tmp2 = _.map(L.lastChild().siblings(), function(x) { return x.id } );
	tmp1 = _.map(L.firstChild().siblings(), function(x) { return x.id } );
	t.equal(_.difference(tmp1, tmp2).length, 0);
	
	// firstSibling / lastSibling
	t.equal(item1.lastSibling().id==='seven', item1.firstSibling().id==='new-insert');
	
	// spliceIn
	var anotheritem = L.construct({'id': 'another-item' });
	L.Id('three').spliceIn(L.construct({'id': 'another-item' }));
	t.equal(L.Id('another-item').nextSibling().id, 'four');
	// spliceOut middle case
	item4.spliceOut();
	t.equal(L.Id('another-item').nextSibling().id, 'five');
	// head of the list case
	t.equal((L.Id('new-insert')).spliceOut().id, 'a')
	// tail of the list case
	t.equal(L.lastChild().spliceOut().id, 'six');
	
	// spliceIn at the end
	t.equal(L.Id('six').spliceIn(L.construct({'id': 'tail'})).id, 'tail');
	L.Id('tail').addChild({'id': 'first-descendent'});
	L.Id('first-descendent').addChild({'id': 'second-descendent'});
	t.equal(L.Id('second-descendent').grandParent().id, 'tail');
});