# bem规范

block__element-modifier

## scss

### B

```css
$namespace: "xdoc";
$element-separator: "__";
$modifier-separator: "-";

@mixin b($block) {
  $B: $namespace + "-" + $block !global;

  .#{$B} {
    @content;
  }
}
```

使用

```css
@include b(test) {
  width: 100%;
  background-color: $--color-white;
}
```

实际输出

```css
.nb-test {
  width: 100%;
  background-color: #fff;
}
```



### E

```css
@mixin e($element) {
  $currentSelector: "";
  @each $unit in $element {
    $currentSelector: #{$currentSelector + "." + $B + $element-separator + $unit + ","};
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}
```



### M

```css
@mixin m($modifier) {
  $parentSelector: & !global;
  $currentSelector: "";
  @each $unit in $modifier {
    $currentSelector: #{$currentSelector + & + $modifier-separator + $unit + ","};
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}
```



## js

```typescript
import { computed, inject, ref, unref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

export const defaultNamespace = 'el'
const statePrefix = 'is-'

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> =
  Symbol('namespaceContextKey')

export const useGetDerivedNamespace = (
  namespaceOverrides?: Ref<string | undefined>
) => {
  const derivedNamespace =
    namespaceOverrides || inject(namespaceContextKey, ref(defaultNamespace))
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace
  })
  return namespace
}

export const useNamespace = (
  block: string,
  namespaceOverrides?: Ref<string | undefined>
) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides)
  const b = (blockSuffix = '') =>
    _bem(namespace.value, block, blockSuffix, '', '')
  const e = (element?: string) =>
    element ? _bem(namespace.value, block, '', element, '') : ''
  const m = (modifier?: string) =>
    modifier ? _bem(namespace.value, block, '', '', modifier) : ''
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace.value, block, blockSuffix, element, '')
      : ''
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace.value, block, '', element, modifier)
      : ''
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace.value, block, blockSuffix, '', modifier)
      : ''
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : ''
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string) => `--${namespace.value}-${name}`
  const cssVarBlockName = (name: string) =>
    `--${namespace.value}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>

```

用法

```javascript
import { useNamespace } from "./hooks";
const ns = useNamespace("card");
console.log(ns.namespace.value); // el
console.log(ns.b()); // el-card
console.log(ns.b('111')); // el-card-111
console.log(ns.be("picker", "panel")); //  el-card-picker__panel
console.log(ns.bem("menu", "item", "divided")); // el-card-menu__item--divided
console.log(ns.e("icon")); // el-card__icon
console.log(ns.em("label", "left")); //  el-card__label--left
console.log(ns.is("disabled", true)); // is-disabled
console.log(ns.is("disabled", false)); // 空字符串
console.log(ns.m("card")); // el-card--card
console.log(
  ns.cssVar({
    "border-style": "solid",
    "border-width": "",
  })
); // { "--el-border-style": "solid" }
console.log(
  ns.cssVarBlock({
    "text-color": "#409eff",
    "active-color": "",
  })
); // {"--el-card-text-color": "#409eff"}

console.log(ns.cssVarName("fill-color-light")); // --el-fill-color-light
console.log(ns.cssVarBlockName("disabled-text-color")); // --el-card-disabled-text-color
```

