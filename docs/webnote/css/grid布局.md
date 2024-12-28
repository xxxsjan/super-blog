# grid布局

```css
.grid-layout {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #333;
  display: grid;
  gap: 10px 10px;
}

```

## 4画面

```
.grid-layout.layout-4 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
```

![image-20231005035329751](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202310050353217.png)

## 6画面

```
.grid-layout.layout-6 {
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  .grid-item:nth-child(1) {
    grid-area: 1/1/3/3;
  }
}
```

![image-20231005035656127](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202310050356373.png)

## 9画面

```
.grid-layout.layout-9 {
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
}
```

![image-20231005035405388](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202310050354555.png)

## 16画面

```
.grid-layout.layout-16 {
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);

  gap: 10px;
}
```

![image-20231005035431825](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202310050354768.png)

## grid-template

`grid-template: repeat(2, 1fr) / repeat(3, 1fr);`

- `repeat(2, 1fr)` 表示在网格的行部分重复两次，每个重复项的大小为 `1fr`。`1fr` 是指网格容器的可用空间等分为两等份，每份的大小相等。
- `repeat(3, 1fr)` 表示在网格的列部分重复三次，每个重复项的大小为 `1fr`。同样，`1fr` 表示网格容器的可用空间等分为三等份，每份的大小相等。

## grid-area

`grid-area: 1/1/3/3;`

可以看做是线，从1开始

11 第1行线+第1列线

33 第3行线+第3列线

围起来的区域就是
