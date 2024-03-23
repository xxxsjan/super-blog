### 虚拟节点主要有三种：
元素节点 有tag、children ==>createElement()
文本节点 有text ==> createTextNode()
注释节点 isComment=true

### children节点的比较
遍历newNode ，去oldNode里看有没有，没有就代表是新节点，需要新增，
新增的位置就是未处理节点的前面，
下一个还是新的话，他又会插入未处理节点的前面，这样顺序就不会乱
比如 Dom： A   B    C     D
newNode    A    D    E     B   C    D
oldNode      A   B    C     D
第一遍循环到A，发现有，且位置一样，如果其他也一样，那就这样不用理，这个现在就是已处理
Dom：         A（当前）   B    C  
newNode    A（当前）    D    E     B   C  
oldNode      A（当前）   B    C 
第二遍循环，到了D，发现是新的，所以插入到第一个未处理的前面，**处理未处理都是指oldNode 上的**
Dom：         A（已处理）**  D（当前）**      B（未处理） C （未处理）   
newNode    A（已处理）   ** D（当前）**    E（未处理）     B（未处理）   C（未处理）    
oldNode      A（已处理）   B（未处理）  C（未处理）    
第三遍循环，到了E，还是新的，还是插入到第一个未处理的前面，
这里就可以解释为什么不插入到已处理的后面
如果是插入到已处理（A）的后面，是这样的
Dom：         A（已处理）** **  **E（当前） **D（已处理） B（未处理） C （未处理）  
newNode    A（已处理）  D（已处理） **E（当前）** B（未处理）   C（未处理）  
oldNode      A（已处理）   B（未处理）  C（未处理）  
但实际我们要的结果是这样的
Dom：         A（已处理）D（已处理）**E（当前）** B（未处理）C （未处理）  
newNode    A（已处理）D（已处理）**E（当前）**B（未处理）C（未处理）  
oldNode      A（已处理）B（未处理）  C（未处理）
**处理、未处理都是指oldNode 上的**
