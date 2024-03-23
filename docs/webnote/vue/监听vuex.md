
```javascript
watch:{
  '$store.state.num'(){}
}

store.subscribe((mutation,state)=>{
  if(mutation.type ==='add'){
    // do
  }
})
```
