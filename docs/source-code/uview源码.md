# uview

## u-collapse-item的实现



一开始body高度是0，等待渲染完成后，获取content的高度，给body设置上，利用transition: all 0.3s; 达到过度效果

### 源码

https://github.dev/umicro/uView

#### u-collapse-item.vue

```
// uview-ui/components/u-collapse-item/u-collapse-item.vue
<template>
	...
		<view class="u-collapse-body" :style="[{
				height: isShow ? height + 'px' : '0'
			}]">
			<view class="u-collapse-content" :id="elId" :style="[bodyStyle]">
				<slot></slot>
			</view>
		</view>
	
</template>

<script>
	 
	export default {
		name: "u-collapse-item",
		data() {
			return {
				...
				height: 0, // body内容的高度
			};
		},
		watch: {
			open(val) {
				this.isShow = val;
			}
		},
		created() {
			this.parent = false;
			// 获取u-collapse的信息，放在u-collapse是为了方便，不用每个u-collapse-item写一遍
			this.isShow = this.open;
		},
		methods: {
			// 异步获取内容，或者动态修改了内容时，需要重新初始化
			init() {
				this.parent = this.$u.$parent.call(this, 'u-collapse');
				if(this.parent) {
					this.nameSync = this.name ? this.name : this.parent.childrens.length;
					// 不存在时才添加本实例
					!this.parent.childrens.includes(this) && this.parent.childrens.push(this);
					this.headStyle = this.parent.headStyle;
					this.bodyStyle = this.parent.bodyStyle;
					this.arrowColor = this.parent.arrowColor;
					this.hoverClass = this.parent.hoverClass;
					this.arrow = this.parent.arrow;
					this.itemStyle = this.parent.itemStyle;
				}
				this.$nextTick(() => {
					this.queryRect();
				});
			},
	 
			// 查询内容高度
			queryRect() {
				// $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
				// 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
				this.$uGetRect('#' + this.elId).then(res => {
					this.height = res.height;
				})
			}
		},
		mounted() {
			this.init();
		}
	};
</script>

<style lang="scss" scoped>

	.u-collapse-body {
		overflow: hidden;
		transition: all 0.3s;
	}

</style>

```



#### 全局混入 

```
// uview-ui/libs/mixin/mixin.js
{
    methods:{
        $uGetRect(selector, all) {
                    return new Promise(resolve => {
                        uni.createSelectorQuery().
                        in(this)[all ? 'selectAll' : 'select'](selector)
                            .boundingClientRect(rect => {
                                if (all && Array.isArray(rect) && rect.length) {
                                    resolve(rect)
                                }
                                if (!all && rect) {
                                    resolve(rect)
                                }
                            })
                            .exec()
                    })
        },
    }
}
```

