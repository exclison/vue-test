//响应式
// const obj = {}

function defineReactive(obj, key, val) {
  //递归
  observe(val)
  //对传入的obj进行访问=拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log("get" + key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set" + key + ":" + newVal);
        //如果传入的newVal依然是obj
        observe(newVal)
        val = newVal;
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
    // observe(obj[key]);
  });
}

function set(obj,key,val){
    defineReactive(obj,key,val)
}

// defineReactive(obj,'foo','foo')
// obj.foo
// obj.foo = 'foooooo'

const obj = { foo: "foo", bar: "bar", baz: { a: 1 },arr:[1] };

//遍历做响应化处理
observe(obj);

obj.foo;
obj.foo = "fooooooo";

obj.bar;
obj.bar = "barrrrrr";

obj.baz.a = 10; //no ok
obj.baz = {a:100}
obj.baz.a = 1000

set(obj,'dong','dong')
// obj.dong = 'dong'
obj.dong = 'kk'

//Object.defineProperty()对数组无效
//分析：改变数组对方法只有七个
//解决方案：替换数组实例的原型方法，让他们在修改数组同时还可以通知更新
obj.arr.push(2)
console.log(Array.__proto__);
// Array
