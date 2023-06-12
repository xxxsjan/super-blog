# react优化

## 父组件重新渲染时不重新渲染

使用 `React.memo()`

```javascript
function Child(props) {
  return <div>{props.text}</div>;
}

const MemoizedChild = React.memo(Child);
```

使用 `shouldComponentUpdate` 方法

```tsx
class Child extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.text !== this.props.text;
  }

  render() {
    return <div>{this.props.text}</div>;
  }
}
```

