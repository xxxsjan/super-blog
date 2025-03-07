# keep-alive

## geeker-admin

```vue
<router-view v-slot="{ Component, route }">
    <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="['home','dataScreen']" v-if="isRouterRefresh">
         <component :is="Component" :key="route.path" />
        </keep-alive>
    </transition>
</router-view>
```

## vben-admin

```vue
<RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
```
