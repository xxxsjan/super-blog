源自elelment-plus源码
```typescript
import { useEventListener, useParallax, useThrottleFn } from '@vueuse/core'
const target = ref<HTMLElement | null>(null)
const parallax = reactive(useParallax(target))

const cardStyle = computed(() => ({
  height: '30rem',
  width: '100%',
  transition: '.3s ease-out all',
  transform: `rotateX(${parallax.roll}deg) rotateY(${parallax.tilt}deg)`,
}))

const layerBase: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  transition: '.3s ease-out all',
}

const screenLayer = computed(() => ({
  ...layerBase,
  width: '80%',
  height: '80%',
  transform: `translateX(${parallax.tilt * 10 + 80}px) translateY(${
    parallax.roll * 10 + 50
  }px)`,
}))

const peopleLayer = computed(() => ({
  ...layerBase,
  width: '30%',
  height: '30%',
  right: 0,
  bottom: 0,
  transform: `translateX(${parallax.tilt * 25 + 25}px) translateY(${
    parallax.roll * 25
  }px) scale(1)`,
}))

// center layer
const leftLayer = computed(() => ({
  ...layerBase,
  width: '20%',
  height: '20%',
  transform: `translateX(${parallax.tilt * 12 + 205}px) translateY(${
    parallax.roll * 12 + 210
  }px)`,
}))

const leftBottomLayer = computed(() => ({
  ...layerBase,
  width: '30%',
  height: '30%',
  left: 0,
  bottom: 0,
  transform: `translateX(${parallax.tilt * 30 - 10}px) translateY(${
    parallax.roll * 30
  }px)`,
}))

const rightLayer = computed(() => ({
  ...layerBase,
  width: '33%',
  height: '33%',
  top: 0,
  right: 0,
  transform: `translateX(${parallax.tilt * 25 + 5}px) translateY(${
    parallax.roll * 25
  }px)`,
}))


```
html
```typescript
<div ref="target" class="home-page">
    <div ref="jumbotronRef" class="jumbotron">
      <div class="parallax-container" :style="containerStyle">
        <div :style="cardStyle">
          <screen-svg :style="screenLayer" alt="banner" />
          <people-svg
            :style="peopleLayer"
            alt="banner"
            class="cursor-pointer"
            @click="jumpTo('guide/quickstart.html')"
          />
          <left-layer-svg :style="leftLayer" alt="banner" />
          <left-bottom-layer-svg :style="leftBottomLayer" alt="banner" />
          <right-layer-svg :style="rightLayer" alt="banner" />
        </div>
      </div>
    </div>
    <img
      src="/images/theme-index-blue.png"
      alt="banner"
      class="mobile-banner"
    />
    <HomeSponsors />
    <HomeCards />
  </div>
```
