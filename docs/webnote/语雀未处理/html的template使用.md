
```typescript
<template id="template-task">
      <div class="task">
        <a class="task-name" target="_blank">some file name</a>
        <span class="task-progress">50%</span>
      </div>
    </template>
```
```typescript
function (task) {
  // 模板dom
  const taskTemplate = document.querySelector("#template-task");
  // 复制节点
  const taskDOM = taskTemplate.content.firstElementChild.cloneNode(true);
  console.log(taskDOM);
  // 名字 ---该模板内容，由于是复制，相当于只改副本，不影响原来的
  const nameDOM = taskDOM.querySelector(".task-name");
  nameDOM.textContent = task.name;
  // 百分比 --还是该数据，没什么好看的
  const progressDOM = taskDOM.querySelector(".task-progress");
  const progress = `${task.progress}%`;
  progressDOM.textContent = progress;
  // 改一些样式，还是没什么好看的
  if (task.status === TASK_STATUS.PROCESSING) {
    taskDOM.style.background = `linear-gradient(to right, #bae7ff ${progress}, #fafafa ${progress}, #fafafa 100%)`;
  } else if (task.status === TASK_STATUS.SUCCESS) {
    taskDOM.style.background = "#d9f7be";
    nameDOM.href = task.url;
  } else if (task.status === TASK_STATUS.ERROR) {
    taskDOM.style.background = "#ffccc7";
  }
  // 返回dom节点
  return taskDOM;
 },
   
 // 使用，调用函数返回就是dom，再做append操作就行
const taskList = this.element.querySelector(".task-list");
const id = `task-${task.id}`;
let taskBox = taskList.querySelector(`#${id}`);
if (!taskBox) {
 taskBox = document.createElement("div");
 taskBox.id = id;
 // Element.prepend 方法可以在父节点的第一个子节点之前插入一系列Node对象或者DOMString对象
 taskList.prepend(taskBox);
}
taskBox.innerHTML = "";
taskBox.append(this.taskRenderer(task));
```
