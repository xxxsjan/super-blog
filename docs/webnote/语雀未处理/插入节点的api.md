## Element
### prepend
> Element.prepend 方法可以在父节点的第一个子节点之前插入一系列Node对象或者DOMString对象

类似进栈，堆叠上去，后者居上

### append
> **Element.append** 方法在 Element的最后一个子节点之后插入一组 [Node](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象或 [DOMString](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/JavaScript/Reference/Global_Objects/String_6fa58bba0570d663099f0ae7ae8883ab) 对象。

### element.insertAdjacentHTML
[https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML)
> **insertAdjacentHTML()** 方法将指定的文本解析为 [Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 元素，并将结果节点插入到 DOM 树中的指定位置。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接使用 innerHTML 操作更快。
> _element_.insertAdjacentHTML(_position_, _text_);

## Node
**appendChild**
> **Node.appendChild()** 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。

