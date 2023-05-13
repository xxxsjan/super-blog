
```typescript
import { fabric } from 'fabric';
// 实例化画布
this.canvas = new fabric.Canvas('canvas');
```
### 修改原生样式
```typescript
// 样式设置
setPolygoStyle() {
  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  const cloneIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";

  const deleteImg = new Image();
  deleteImg.src = deleteIcon;

  const cloneImg = new Image();
  cloneImg.src = cloneIcon;

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = 'pink';
  // fabric.Object.prototype.cornerStyle = "circle";

  function renderIcon(icon) {
    return function renderIcon(
      ctx,
      left,
      top,
      styleOverride,
      fabricObject
    ) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  }
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 24
  });

  const _that = this;

  function deleteObject(eventData, transform) {
    const target = transform.target;
    const canvas = target.canvas;
    if (target.areaType === '1') {
      _that.targetButtonDisabled = false;
    }
    _that.curAreaName = '';
    _that.curAreaTarget = null;
    canvas.remove(target);
    canvas.requestRenderAll();
  }
},
```
### 画布添加监听
```typescript
this.canvas = new fabric.Canvas('canvas');
// 添加监听
this.canvas.on('mouse:down', function(event){
  console.log('%c event', 'background-color:pink', event);
  this.curAreaTarget = event.target || null;
  this.curAreaName = event.target?.areaName || '';
});
```

### 添加多边形
通过add方法增加
每个对变形对应一个kclass对象
类似于threejs
```typescript
this.canvas = new fabric.Canvas('canvas')
const option = {
  left: document.querySelector(".drawing-board__main").scrollLeft + 20,
  top: 80,
  areaType: "2",
  areaName: "",
  fill: "transparent", // 中间区域颜色
  strokeWidth: 3,// 框的线
  objectCaching: false,
  selectable: false,
  stroke: "hsla(44, 100%, 50%, 1)", 
  // stroke: option.areaType === '1' ? '#fff' : 'hsla(44, 100%, 50%, 1)'
};
// 多边形
renderPolygon(points, option) {
  const area = new fabric.Polygon(points, option);
  this.canvas.add(area);
  return area;
},
```
### setActiveObject
上面new创建的多边形，可通过this.canvas.setActiveObject(area:kclass);进行选取
### getObjects
获取画布内所有的多边形，是个数组  
this.canvas.getObjects() :()=>kclass[]

### 原型方法修改
```typescript
setPolygoStyle() {
  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  const cloneIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";

  const deleteImg = new Image();
  deleteImg.src = deleteIcon;

  const cloneImg = new Image();
  cloneImg.src = cloneIcon;

  fabric.Object.prototype.transparentCorners = false;
  // fabric.Object.prototype.cornerColor = 'pink';
  fabric.Object.prototype.cornerColor = 'blue';
  // fabric.Object.prototype.cornerStyle = "circle";

  function renderIcon(icon) {
    return function (
      ctx,
      left,
      top,
      styleOverride,
      fabricObject
    ) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  }
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 24
  });

  const vm = this;

  function deleteObject(eventData, transform) {
    const target = transform.target;
    const canvas = target.canvas;
    console.log(eventData, canvas === vm.canvas)
    if (target.areaType === '1') {
      vm.targetButtonDisabled = false;
    }
    vm.curAreaName = '';
    vm.curAreaTarget = null;
    canvas.remove(target);
    canvas.requestRenderAll();
  }
},
```
### 更改编辑样式，自由<-->多边形
```typescript
function changeEditMode(){
  const polys = this.getObjects();// 获取画布所有图形

  this.editable = !this.editable;
  if (this.editable) {
    polys.forEach((poly) => {
      const lastControl = poly.points.length - 1;
      poly.cornerStyle = 'circle';
      poly.cornerColor = 'blue';
      poly.controls = poly.points.reduce((acc, point, index) => {
        acc['p' + index] = new fabric.Control({
          positionHandler: polygonPositionHandler,
          actionHandler: this.anchorWrapper(
            index > 0 ? index - 1 : lastControl,
            this.actionHandler
          ),
          actionName: 'modifyPolygon',
          pointIndex: index
        });
        return acc;
      }, {});
    });
  } else {
    polys.forEach((poly) => {
      poly.cornerColor = 'blue';
      poly.cornerStyle = 'rect';
      poly.controls = fabric.Object.prototype.controls;
    });
  }
  this.canvas.requestRenderAll();
  function polygonPositionHandler(dim, finalMatrix, fabricObject) {
    const x =
      fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x;
    const y =
      fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y;
    return fabric.util.transformPoint(
      { x: x, y: y },
      fabric.util.multiplyTransformMatrices(
        fabricObject.canvas.viewportTransform,
        fabricObject.calcTransformMatrix()
      )
    );
  }
}
```
### Fabric 提供了 7 种基础形状：
[https://juejin.cn/post/6993801903121367048](https://juejin.cn/post/6993801903121367048)

- fabric.Circle (圆)
- fabric.Ellipse (椭圆)
- fabric.Line (线)
- fabric.Polyline (多条线绘制成图形)
- fabric.triangle (三角形)
- fabric.Rect (矩形)
- fabric.Polygon (多边形)
```typescript
import { fabric } from "fabric";

// 创建一个fabric实例
let canvas = new fabric.Canvas("canvas"); //可以通过鼠标方法缩小,旋转
// or
// let canvas = new fabric.StaticCanvas("canvas");//没有鼠标交互的fabric对象

// 创建一个矩形对象
let rect = new fabric.Rect({
    left: 200, //距离左边的距离
    top: 200, //距离上边的距离
    fill: "green", //填充的颜色
    width: 200, //矩形宽度
    height: 200, //矩形高度
});

// 将矩形添加到canvas画布上
canvas.add(rect);
// 创建一个圆形对象
let circle = new fabric.Circle({
    left: 0, //距离左边的距离
    top: 0, //距离上边的距离
    fill: "red", //填充的颜色
    radius: 50, //圆的半径
});
// 创建一个三角形对象
let triangle = new fabric.Triangle({
    left: 200, //距离左边的距离
    top: 0, //距离上边的距离
    fill: "blue", //填充的颜色
    width: 100, //宽度
    height: 100, //高度
});
// 将图形形添加到canvas画布上
canvas.add(circle, triangle);
```
#### 禁止选中
```typescript
// 我们可以通过以下属性设置,决定是否可以对相关元素进行交互
canvas.selection = false; // 禁止所有选中 
rect.set("selectable", false); // 只是禁止这个矩形选中
```
### 绘制图片
```typescript
//通过url绘制图片
fabric.Image.fromURL(
    //本地图片需要通过require来引入,require("./xxx.jpeg")
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.thaihot.com.cn%2Fuploadimg%2Fico%2F2021%2F0711%2F1625982535739193.jpg&refer=http%3A%2F%2Fimg.thaihot.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630940858&t=e1d24ff0a7eaeea2ff89cedf656a9374",
    (img) => {
        img.scale(0.5);
        canvas.add(img);
    }
);
//也可以通过标签绘制
let img = document.getElementById("img");
let image = new fabric.Image(img, {
    left: 100,
    top: 100,
    opacity: 0.8,
});
canvas.add(image);
```
### 绝对动画
```typescript
let canvas = new fabric.Canvas("canvas");
let rect = new fabric.Rect({
    left: 400, //距离左边的距离
    top: 200, //距离上边的距离
    fill: "green", //填充的颜色
    width: 200, //宽度
    height: 200, //高度
});
rect.animate("left", 100, {
    onChange: canvas.renderAll.bind(canvas),
    duration: 1000,
});
canvas.add(rect);
```
### 相对动画
```typescript
rect.animate("left", "+=100", {
  onChange: canvas.renderAll.bind(canvas),
  duration: 1000,
});

rect.set({ angle: 45 });
rect.animate("angle", "-=90", {
  onChange: canvas.renderAll.bind(canvas),
  duration: 2000,
});
```

### 自由绘画
```typescript
let canvas = new fabric.Canvas("canvas");
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.color = "blue";
canvas.freeDrawingBrush.width = 5;
```


