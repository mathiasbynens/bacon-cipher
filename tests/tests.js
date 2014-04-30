(function(root) {
	'use strict';

	var noop = Function.prototype;

	var load = (typeof require == 'function' && !(root.define && define.amd)) ?
		require :
		(!root.document && root.java && root.load) || noop;

	var QUnit = (function() {
		return root.QUnit || (
			root.addEventListener || (root.addEventListener = noop),
			root.setTimeout || (root.setTimeout = noop),
			root.QUnit = load('../node_modules/qunitjs/qunit/qunit.js') || root.QUnit,
			addEventListener === noop && delete root.addEventListener,
			root.QUnit
		);
	}());

	var qe = load('../node_modules/qunit-extras/qunit-extras.js');
	if (qe) {
		qe.runInContext(root);
	}

	// The `bacon` object to test
	var bacon = root.bacon || (root.bacon = (
		bacon = load('../bacon.js') || root.bacon,
		bacon = bacon.bacon || bacon
	));

	/*--------------------------------------------------------------------------*/

	function forEach(array, fn) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			fn(array[index]);
		}
	}

	function forOwn(object, fn) {
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				fn(key, object[key]);
			}
		}
	}

	// `throws` is a reserved word in ES3; alias it to avoid errors
	var raises = QUnit.assert['throws'];

	// explicitly call `QUnit.module()` instead of `module()`
	// in case we are in a CLI environment
	QUnit.module('bacon');

	test('bacon.encode', function() {
		equal(
			bacon.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
			'AAAAAAAAABAAABAAAABBAABAAAABABAABBAAABBBABAAAABAAAABAABABABAABABBABBAAABBABABBBAABBBBBAAAABAAABBAABABAABBBAABBBABAABABABBABBABABBB',
			'A-Z'
		);
		equal(
			bacon.encode('abcdefghijklmnopqrstuvwxyz'),
			'AAAAAAAAABAAABAAAABBAABAAAABABAABBAAABBBABAAAABAAAABAABABABAABABBABBAAABBABABBBAABBBBBAAAABAAABBAABABAABBBAABBBABAABABABBABBABABBB',
			'a-z'
		);
		equal(
			bacon.encode('foo bar'),
			'AABABABBABABBAB AAAABAAAAABAAAA',
			'single space character'
		);
		equal(
			bacon.encode('fOo bAr'),
			'AABABABBABABBAB AAAABAAAAABAAAA',
			'uppercase vs. lowercase doesn’t matter'
		);
		equal(
			bacon.encode('!"#$%&\'()*+,-./0123456789:;<=>?@[\]^_`{|}~'),
			'',
			'[^a-zA-Z] are ignored'
		);
		equal(
			bacon.encode('foo!"#$%&\'()*+,-./0123456789:;<=>?@[\]^_`{|}~bar'),
			'AABABABBABABBAB AAAABAAAAABAAAA',
			'[^a-zA-Z] are ignored and become spaces if they occur between [a-zA-Z]'
		);
		equal(
			bacon.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { 'alphabet': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' }),
			'AAAAAAAAABAAABAAAABBAABAAAABABAABBAAABBBABAAAABAABABABAABABBABBAAABBABABBBAABBBBBAAAABAAABBAABABAABBBABAABABABBABBABABBBBBAAABBAAB',
			'custom cipher alphabet'
		);
		equal(
			bacon.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { 'alphabet': 'abcdefghijklmnopqrstuvwxyz' }),
			'AAAAAAAAABAAABAAAABBAABAAAABABAABBAAABBBABAAAABAABABABAABABBABBAAABBABABBBAABBBBBAAAABAAABBAABABAABBBABAABABABBABBABABBBBBAAABBAAB',
			'custom cipher alphabet is uppercased before use'
		);
	});

	test('bacon.decode', function() {
		equal(
			bacon.decode('AAAAAAAAABAAABAAAABBAABAAAABABAABBAAABBBABAAAABAAAABAABABABAABABBABBAAABBABABBBAABBBBBAAAABAAABBAABABAABBBAABBBABAABABABBABBABABBB'),
			'ABCDEFGHIIKLMNOPQRSTUUWXYZ',
			'A-Z'
		);
		equal(
			bacon.decode('AA AA AA AAA BAAAB AAAABBA ABAAA.ABAB#AABBA@AABB+BABAA/AABAAAABAABABABAAB_ABBABBAAABBABABBB AABBBBBAAAABAAABBAABABAAB<BBAABBBABAABABABBA>BBABABBB'),
			'A B CD E F G H IIKL MNO PQRST UUWX YZ',
			'[^a-zA-Z] are ignored and become spaces if they occur between [a-zA-Z]'
		);
		equal(
			bacon.decode('AAAAAAAAABAAABAAAABBAABAAAABABAABBAAABBBABAAAABAABABABAABABBABBAAABBABABBBAABBBBBAAAABAAABBAABABAABBBABAABABABBABBABABBBBBAAABBAAB', { 'alphabet': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' }),
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'custom cipher alphabet'
		);
		equal(
			bacon.decode('AAAAAAAAABAAABAAAABBAABAAAABABAABBAAABBBABAAAABAABABABAABABBABBAAABBABABBBAABBBBBAAAABAAABBAABABAABBBABAABABABBABBABABBBBBAAABBAAB', { 'alphabet': 'abcdefghijklmnopqrstuvwxyz' }),
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'custom cipher alphabet is uppercased before use'
		);
	});

	/*--------------------------------------------------------------------------*/

	// configure QUnit and call `QUnit.start()` for
	// Narwhal, Node.js, PhantomJS, Rhino, and RingoJS
	if (!root.document || root.phantom) {
		QUnit.config.noglobals = true;
		QUnit.start();
	}
}(typeof global == 'object' && global || this));
