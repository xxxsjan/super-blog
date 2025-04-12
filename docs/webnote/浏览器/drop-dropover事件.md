> drop函数第一个参数是DragEvent

### 获取文件方法
文件在e.dataTransfer.items下，或者e.dataTransfer.files下
e.dataTransfer.items(DataTransferItemList)的子项item:DataTransferItem可以通过调用getAsFile函数拿到文件file
e.dataTransfer.files的子项file:File就是文件
```typescript
document.addEventListener('drop',fucntion(e:DragEvent){
     if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access files
      for (const item of e.dataTransfer.items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log("file: ", file);
          this.#upload(file);
        }
      }
    } else {
      // Use DataTransfer interface to access the files
      for (const file of e.dataTransfer.files) {
        console.log("file: ", file);
        this.#upload(file);
      }
    }                     
})

 dropAreaDOM.addEventListener("dragover", (e) => {
    // Prevent file from being opened
    e.preventDefault();
  };);
```
通过XMLHttpRequest post上传文件
```typescript
{
  #upload = (file) => {
    const data = new FormData();
    data.append("file", file);
    const task = {
      id: this.tasks.length,
      name: file.name,
      status: TASK_STATUS.PROCESSING,
      progress: 0,
    };
    this.tasks.unshift(task);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.uploadUrl);
    xhr.setRequestHeader("x-file-name", encodeURIComponent(file.name));
    xhr.upload.addEventListener("progress", (e) => {
      const { loaded, total } = e;
      const progress = Math.round((loaded / total) * 100);
      task.progress = progress;
      this.#updateTask(task);
    });
    xhr.addEventListener("load", (e) => {
      task.status = TASK_STATUS.SUCCESS;
      const response = JSON.parse(xhr.response);
      console.log("response", response);
      const { url } = response;
      task.url = url;
      this.#updateTask(task);
    });
    xhr.addEventListener("error", (e) => {
      task.status = TASK_STATUS.ERROR;
      this.#updateTask(task);
    });
    xhr.send(data);
  };
}
```
