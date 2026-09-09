# React生态工具指南

## 样式处理工具

### classnames - 动态类名管理

用于动态管理React组件的className，支持多种类型的参数组合。

**安装**

```bash
npm install classnames
```

**使用示例**

```typescript
import classNames from 'classnames'

// 基础用法 - 多个类名组合
classNames('foo', 'bar'); // => 'foo bar'

// 条件类名 - 对象语法
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''

// 多个对象组合
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// 混合使用多种类型
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// 自动过滤falsy值
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

### styled-components - CSS-in-JS解决方案

允许直接在JavaScript中编写CSS，返回带有样式的React组件。

**安装**

```bash
npm install styled-components
```

**使用示例**

```typescript
// style.js
import styled from "styled-components";

// 创建一个带样式的div组件
export const Wrapper = styled.div`
  background: #fff;
  position: relative;
  top: 34.1vw;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

// 使用样式组件
import { Wrapper } from './style'

const MyComponent = () => {
  return (
    <Wrapper>
      <h1>Hello Styled Components</h1>
      <p>这是一个使用styled-components的示例</p>
    </Wrapper>
  )
}
```

## 类型检查工具

### prop-types - 运行时Props类型检查

用于在运行时验证React组件的props类型，帮助捕获潜在的类型错误。

**安装**

```bash
npm install prop-types
```

**使用示例**

```typescript
import PropTypes from "prop-types";

function Card({ videos, title, isActive }) {
  return (
    <div>
      {title}
      {videos.map(video => (
        <VideoItem key={video.id} data={video} active={isActive} />
      ))}
    </div>
  )
}

// 定义props类型
Card.propTypes = {
  videos: PropTypes.array.isRequired,  // 必需的数组
  title: PropTypes.string,             // 可选的字符串
  isActive: PropTypes.bool             // 可选的布尔值
};
```

## UI组件库

### react-weui - 微信风格组件

基于WeUI和React的UI组件库，提供了一套微信风格的组件。

**安装**

```bash
npm install react-weui weui
```

**使用示例**

```tsx
import WeUI from 'react-weui'

// 解构需要使用的组件
const { Toast, Button } = WeUI;

function LoadingExample() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Button onClick={() => setLoading(true)}>显示加载</Button>
      <Toast show={loading} icon="loading">加载中...</Toast>
    </div>
  )
}
```

## 轮播图组件

### Swiper - 功能强大的轮播组件

一个现代的轮播图解决方案，支持触摸滑动和多种动画效果。

**安装**

```bash
npm install swiper
```

**使用示例**

```tsx
import Swiper from "swiper";
import "swiper/css";  // 引入样式
import { BannersWrapper } from "./style";

function Carousel() {
  useEffect(() => {
    // 初始化Swiper实例
    new Swiper(".btn-banners", {
      loop: true,                    // 循环模式
      pagination: {
        el: ".swiper-pagination",     // 分页器
      },
      autoplay: {
        delay: 3000,                 // 自动播放间隔
        disableOnInteraction: false  // 用户操作后不停止自动播放
      },
    });
  }, []);

  return (
    <BannersWrapper>
      <div className="btn-banners swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">{renderBanners1()}</div>
          <div className="swiper-slide">{renderBanners2()}</div>
          <div className="swiper-slide">{renderBanners3()}</div>
          <div className="swiper-slide">{renderBanners4()}</div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </BannersWrapper>
  )
}
```

## 工具选型建议

1. 对于类名管理，如果项目中需要频繁使用条件类名，推荐使用`classnames`，它提供了简洁的API和良好的性能。

2. 样式管理方案选择：
   - 小型项目：可以使用普通CSS或CSS Modules
   - 中大型项目：推荐使用`styled-components`，它提供了更好的样式隔离和动态样式能力

3. 类型检查：
   - 如果使用TypeScript，优先使用TypeScript的静态类型检查
   - 如果使用JavaScript，建议使用`prop-types`进行运行时类型检查

4. UI组件选择：
   - 微信风格应用：使用`react-weui`
   - 通用后台系统：推荐使用Ant Design
   - 定制化需求高：考虑使用基础组件库自行封装

5. 轮播图实现：
   - 简单轮播：可以使用react-slick
   - 复杂交互：推荐使用`Swiper`，它提供了更多的功能和更好的性能
