
/*jslint newcap: false, node: true, vars: true, white: true, nomen: true  */
/*global Hash: true */

(function(global) {
	"use strict";
	
	var Tree = function(obj) {
		var items;
		
		for (items in obj) {
			if (obj.hasOwnProperty(items)) {
				this[items] = obj[items];				
			}
		}
		this.child = undefined;
		this.sibling = undefined;
		this.owner = undefined;
		return this;
	};
	
	
	Tree.prototype.addChild = function (obj) {
		return this.insertChild(new Tree(obj));
	};

	Tree.prototype.firstChild = function () {
		return this.child;
	};

	Tree.prototype.nextSibling = function () {
		return this.sibling;
	};
	Tree.prototype.lastSibling = function () {
		var sib = ((this && this.sibling) || this)
		, LIMIT = 1000000
		, counter = 0;
		
		while ((sib && sib.sibling) && counter < LIMIT) {
			sib = sib.sibling;
		}
		if (counter === LIMIT) {
			throw new Error('cycle encountered');
		}
		return sib;
	};
	Tree.prototype.lastChild = function () {
		return this.firstChild() && this.firstChild().lastSibling();
	};
	Tree.prototype.parent = function () {
		return this.owner;
	};
	Tree.prototype.firstSibling = function () {
		return this.parent() && this.parent().firstChild();		
	};
	Tree.prototype.previousSibling = function () {
		var predecessor = this.firstSibling();
		while (predecessor && predecessor.sibling && predecessor.sibling !== this) {
			predecessor = predecessor.sibling;
		}
		return predecessor;
	};
	Tree.prototype.grandParent = function () {
		return (this.parent() && this.parent().parent());
	};
	// What it does: fetches the last sibling from the objects children and inserts child at the end.
	Tree.prototype.insertChild = function (child) {
		var lastChild = this.lastChild();

		// case 1: no first child, just add the child
		if (!this.firstChild()) {
			child.sibling = undefined;
			child.owner = undefined;
			return this.insertFirstChild(child);
		}
		// case 2: fetch last child and add this to the end
		try {
			lastChild.sibling = child;
			child.owner = lastChild.owner;
			child.sibling = undefined;				
		} catch (e) {
			throw '[insertChild] - lastChild wrong!';
		}
		return this;
	};
	
	// insert an element as the first child of a parent; previous first child is sibling of new
	Tree.prototype.insertFirstChild = function (child) {
		if (child) {
			if (this && this.child) {
				child.sibling = this.child;
			} else {
				child.sibling = undefined;					
			}
			this.child = child;
			child.owner = this;
		}
		return this;				
	};

	// insert an element as a sibling of this element
	Tree.prototype.spliceIn = function (sib) {
		if (sib) {
			sib.sibling = this.sibling;
			this.sibling = sib;
			sib.owner = this.owner;
		}
		return sib;
	};

	// remove a sibling from a Tree of siblings
	Tree.prototype.spliceOut = function () {
		var location = this && this.parent() && this.parent().firstChild()
		, owner = this && this.parent();

		// only child
		if (this === location && !this.sibling) {
			this.owner.child = undefined;
			this.owner = undefined;
			return undefined;
		}
		// first child with siblings
		if (this === location && this.sibling) {
			this.owner.child = this.sibling;
			this.owner = undefined;
			this.sibling = undefined;
			return owner.firstChild();
		}
		// middle child or end child
		while (location && location.sibling && location.sibling !== this) { 
			location = location.sibling; 
		}
		location.sibling = this.sibling;
		this.owner = undefined;
		this.sibling = undefined;
		return location;
	};

	Tree.prototype.siblings = function (it) {
		var result = [] 
		, next = (this && this.owner && this.owner.child)
		, iterator = (((typeof it === 'function') && it) || function () { return true; });

		while (next) {
			if (iterator(next) === true) {
				result.push(next);						
			}
			next = next.sibling;					
		}
		return result;
	};	

	Tree.prototype.each = function () {
		var result = [];

		this.walk(function() {
			result.push(this);
		});
		return result.slice(1);
	};

	Tree.prototype.walk = function(fn) {			
		if (typeof fn !== 'function') {
			throw 'you must supply a function to the Tree walk method.';				
		}
		// visit this node
		fn.call(this, this);
		if (this && this.child) {
			// its child
			this.child.walk(fn);
		}
		if (this && this.sibling) {
			this.sibling.walk(fn);
		}
	};

	Tree.prototype.find = function(id, fn) {
		var local = this
			, found;

		// the empty argument Tree returns the id of self	
		if (arguments.length === 0) {
			return this.id;
		}

		this.walk(function(item) {
			if (item.id === id) {
				if (fn && typeof fn === 'function') {
					fn.call(local, item);
				} else {
					found = item;
				}
			}
		});
		return found;
	};
	Tree.prototype.Id = Tree.prototype.find;
	
	var tree = function (o) {
		return new Tree(o);
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = tree;
	    }
		exports.tree = tree;
	} else {
		if (typeof global.UTIL === 'undefined') {
			global.UTIL = {};
		}
		global.UTIL.tree = tree;
	}
	
}(this));


