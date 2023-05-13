# typeScript

## 接口与类

> 接口interface：相当于约束，冒号后就可以点到接口的属性

> class需要new才可以获取属性


## class

```javascript
// 定义一个类/超类
class Person{
  // 前置有Public Private Protected readOnly
  pubilc    name:String,
  private   name2:String,
  Protected name3:String,
  readOnly  name4: String,
  static name5:String
  // 构造函数就是new的时候用来传参修改超类的name等值的
  constructor(name:String){
    // 构造器里面可以改变readOnly是的值，也就是new的时候可以改变
    this.name = name
  }
}
```

> extends的是子类 派生类

> 可以修改protected 不可以修改private


## 泛型接口

> class 一个类 user ，写好属性与构造器


```javascript
class user{
  // 必要所以加个问号
  id?:nuumber
  name:string
  age:number
  constructor(name:string,age:number){
    this.name = name
    this.age = age
  }
}
// class一个父类/超类UserCRUD，作用是传入一个类（对象）进行增删改除
class UserCRUD{
  data:Array<user>=[]
  add()
  getUserId()
}
// 但不够灵活，只能查询固定的,所以需要写一个泛型接口interface，约束将来某个类必须有设定的属性
interface IBaseCRUD<T>{
  data:Array<T>
  add:(t:T)=>T
  getUserId:(id：number)=>T
}
//接口约束上面的超类UserCRU
//<User>尖括号的写法就是泛型，User里设定了是什么就是什么
class UserCRUD implements IBaseCRUD<User>{
  data:Array<User> = []
  add(user:User):User{
  	user.id = Data.now() + Math.random()
  	this.data.push(user.id)
  }
  getUserID(id:number):User{
     return this.data.find(user=>user.id === id)
  }
}
// 使用
//实例化一个对象
const userCRUD = new UserCRUD()
//调用方法
userCRUD.add(new User('Jack',20))
userCRUD.add(new User('tom',21))
const {id} = userCRUD.add(new User('tom',21))
userCRUD.add(new User('lucy',22))
console.log(userCRUD.data)
const user = userCRUD.getUserId()
console.log(user)
```
