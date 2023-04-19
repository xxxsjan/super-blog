## classnames

https://www.npmjs.com/package/classnames

```typescript
import classnames from 'classnames'
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

## prop-types

检验props

```typescript
import protoTypes from "prop-types";
Card.protoTypes = {
  video: protoTypes.array.isRequired,
};
```

## styled-components

写css返回一个react组件

```typescript
// style.js
import styled from "styled-components";

export const Wrapper = styled.div`
background: #fff;
position: relative;
top: 34.1vw;
`
// 使用
import { Wrapper } from './style'
const MyCom = ()=>{
  
  return (
    <Wrapper>
    。。。
    </Wrapper >
  )
}
```

## react-weui

```tsx
import WeUI from 'react-weui'
const {
  Toast
} = WeUI;

<Toast show={loading} icon="loading">加载中...</Toast>
```



## swiper

```tsx
import Swiper from "swiper";
import { BannersWrapper } from "./style";

useEffect(() => {
  new Swiper(".btn-banners", {
    loop: true,
    pagination: {
      el: ".swiper-pagination", //幻灯片滑块
    },
    autoplay: {
      //自动轮播
      delay: 3000,
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
```