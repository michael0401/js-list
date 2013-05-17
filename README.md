#js-tree.js

##Overview

js-tree.js is a utility module which provide functions for operating with linked list. It can be used both in the [node.js](http://nodejs.org) and browser.

##Example

[Link]()

##Methods

* [List.Root](#List.Root)
* [addChild](#addChild)
* [firstChild](#firstChild)
* [lastChild](#lastChild)
* [construct](#construct)
* [insertFirstChild](#insertFirstChild)
* [insertChild](#insertChild)
* [Id](#Id)
* [spliceIn](#spliceIn)
* [spliceOut](#spliceOut)
* [nextSibling](#nextSibling)
* [previousSibling](#previousSibling)
* [firstSibling](#firstSibling)
* [lastSibling](#lastSibling)
* [siblings](#siblings)
* [parent](#parent)
* [grandParent](#grandParent)

<a name="List.Root" />
### List.Root(object)

Initialize and return a root with the given values object.

__Example:__

    var L = new List.Root({'id':'root'})
    
__Result:__

![tree 1](https://raw.github.com/michael0401/Pictures/master/tree1.png)

<a name="addChild" />
### addChild(object)

Build a node with given values object and add to the given node as a child.

__Example:__

    L.addChild({'id': 'a'}).Id('a');
    L.addChild({'id': 'b'}).Id('b');
    L.addChild({'id': 'c'}).Id('c');
    
__Result:__

![tree 2](https://raw.github.com/michael0401/Pictures/master/tree2.png)

<a name="firstChild" />
### firstChild()

Return the first child node of the given node.

__Example:__

    L.firstChild().id
    
__Result:__

    a
    
<a name="lastChild" />
### lastChild()

Return the last child node of the given node.

__Example:__

    L.lastChild().id
    
__Result:__

    c
    
<a name="construct" />
### construct(object)

Build a node with given values object.

__Example:__

    var newFirstChild = L.construct({'id': 'head'});
    var newLastChild = L.construct({'id': 'tail'});
    
__Result:__

![tree 3](https://raw.github.com/michael0401/Pictures/master/tree3.png)

<a name="insertFirstChild" />
### insertFirstChild(newNode)

Add a new node to the first child position of the given node.

__Example:__

    L.insertFirstChild(newFirstChild)
    
__Result:__

![tree 4](https://raw.github.com/michael0401/Pictures/master/tree4.png)

<a name="insertChild" />
### insertChild(newNode)

Add a new node to the last child position of the given node.

__Example:__

    L.insertChild(newLastChild)
    
__Result:__

![tree 5](https://raw.github.com/michael0401/Pictures/master/tree5.png)

<a name="Id" />
### Id(argument)

If the argument is empty, return the id of the given node. If the argument is not empty, traverse down from the given node and find the first node with the id matching the argument.

__Alias:__ find

__Example:__

    L.Id('b').id
    
__Result:__

    b
    
<a name="spliceIn" />
### spliceIn(newNode)

Add a new node to the next sibling position of the given node.

__Example:__

    L.Id('c').spliceIn(L.construct({'id': 'd' }))
    
__Result:__

![tree 6](https://raw.github.com/michael0401/Pictures/master/tree6.png)
 
<a name="spliceOut" />
### spliceOut()

Delete the given node from the siblings. If the given node is the head of the sibling list, return the second node. If the give node is not the head of the sibling list, return the one before the given node.

__Example:__

    L.Id('a').spliceOut().id

__Result:__

    head

![tree 7](https://raw.github.com/michael0401/Pictures/master/tree7.png)

<a name="nextSibling" />
### nextSibling()

Return the next sibling of the given node.

__Example:__

    L.Id('head').nextSibling().id

__Result:__

    b
    
<a name="previousSibling" />
### previousSibling()

Return the previous sibling of the given node.

__Example:__

    L.Id('b').previousSibling().id

__Result:__

    head
    
<a name="firstSibling" />
### firstSibling()

Return the first sibling of the given node.

__Example:__

    L.Id('tail').firstSibling().id

__Result:__

    head

<a name="lastSibling" />
### lastSibling()

Return the last sibling of the given node.

__Example:__

    L.Id('b').lastSibling().id

__Result:__

    tail
  
<a name="siblings" />
### siblings()

Return the siblings of the given node as an array.

__Example:__

    L.Id('b').siblings()[0].id

__Result:__

    head
  
<a name="parent" />
### parent()

Return the parent of the given node.

__Example:__

    L.Id('b').parent().id

__Result:__

    root
     
<a name="grandParent" />
### grandParent()

Return the grandparent of the given node.

__Example:__

    L.Id('b').addChild({'id': 'grandchild'});
    L.Id('grandchild').grandParent().id

__Result:__

    root
![tree 8](https://raw.github.com/michael0401/Pictures/master/tree8.png)
  
##Install

The source code is available for download from [GitHub](https://github.com/rranauro/js-tree). Besides that, you can also install using Node Package Manager ([npm](https://npmjs.org)):

    npm install js-tree

##License
