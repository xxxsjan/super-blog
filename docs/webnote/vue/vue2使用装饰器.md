[https://www.jianshu.com/p/40f78e6481b4](https://www.jianshu.com/p/40f78e6481b4)
[https://juejin.cn/post/7145018989981204517](https://juejin.cn/post/7145018989981204517)
npm i -S vue-property-decorator

```javascript
import { Watch, Prop, Emit, Mutation } from 'vue-property-decorator'

<template>
  <div>
  <input v-model="name" />

  <input v-model="pwd" />

  <button @click="login">登录</button>
  </div>
  </template>

  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { MyComp } from '@/components/myComp';

@Options({components: { MyComp }})
export default class Login extends Vue {
  @Prop({ default: '' }) readonly msg: string | undefined
  private name = '';
  private pwd = '';
  public msg = 'hahaha'

  public created(): void {
    // TODO
  }
  public mounted(): void {
    // TODO
  }
  @Watch('name')
  public setName(name: string): void {
    console.log('watch: name')
  }
// 计算属性
  public get user(): string {
    console.log(this.name + '-' + this.pwd);
  }
// methods
  public login() {
    console.log('login',this.user);
  }

  @Emit() 
  changeVal(msg: string) { 
    return msg 
  }
  public sendMsg(): void {
    this.changeVal()
  }
}
</script>
```
