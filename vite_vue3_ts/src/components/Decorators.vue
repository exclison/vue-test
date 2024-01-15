<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-11-01 10:40:29
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-11-20 18:30:45
 * @FilePath: \vue-test\vite_vue3_ts\src\components\Decorators.vue
 * @Description: ts装饰器
-->
<template>
  <div class="Decorators">装饰器</div>
</template>

<script lang="ts">
export default {
  name: "Decorators",
};
</script>
<script setup lang="ts">
import { ref, reactive } from "vue";
import "reflect-metadata";

// function f() {
//   console.log("f(): evaluated");
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log("f(): called");
//     console.log(target, propertyKey, descriptor, "f_target");
//   };
// }

// function g() {
//   console.log("g(): evaluated");
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log("g(): called");
//     console.log(target, propertyKey, descriptor, "g_target");
//   };
// }

// class C {
//   @f()
//   @g()
//   method() {}
// }

// // 类装饰器-------------------------------------------------
// function sealed(constructor: Function) {
//   Object.seal(constructor);
//   Object.seal(constructor.prototype);
//   console.log('seal')
// }

// @sealed
// class Greeter {
//   greeting: string;
//   constructor(message: string) {
//     this.greeting = message;
//   }
//   greet() {
//     return "Hello, " + this.greeting;
//   }
// }

// const greeter = new Greeter("message");
// greeter.greeting = "333";
// console.log(greeter.greet(), "greet");

// 覆盖构造函数
// function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
//     return class extends constructor {
//         newProperty = "new property";
//         hello = "override";
//     }
// }

// @classDecorator
// class Greeter {
//     property = "property";
//     hello: string;
//     constructor(m: string) {
//         this.hello = m;
//     }
// }

// console.log(new Greeter("world"));

// 方法装饰器---------------------------------------------

// class Greeter {
//   greeting: string;
//   constructor(message: string) {
//     this.greeting = message;
//   }

//   @enumerable(true)
//   greet() {
//     return "Hello, " + this.greeting;
//   }
// }

// function enumerable(value: boolean) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     // target.greeting = value
//     console.log(target, propertyKey, descriptor, "enumerable");
//     descriptor.value = function () {
//         return value
//     }

//     // descriptor.enumerable = value;
//     // console.log(target, propertyKey, descriptor, "enumerable");
//   };
// }
// const greeter = new Greeter("greeting");

// console.log(greeter.greet(), "Greeter");

// 访问器装饰器----------------------------------------

// class Point {
//   private _x: number;
//   private _y: number;
//   constructor(x: number, y: number) {
//     this._x = x;
//     this._y = y;
//   }

//   @configurable(false)
//   get x() {
//     return this._x;
//   }

//   @configurableY(20)
//   get y() {
//     console.log('kly')
//     return this._y;
//   }
// }

// function configurable(value: boolean) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     descriptor.configurable = value;
//   };
// }
// function configurableY(value: number) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log(target,descriptor,'klkl')
//     descriptor.get =function () {
//         return value
//     }
//   };
// }

// const point = new Point(0, 0);
// console.log(point.y, "yyy");

// 属性装饰器-----------------------------------------

const formatMetadataKey = Symbol("format");

class Greeter {
  @format("Hello, %s")
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");

    console.log(formatString, "string");
    return formatString.replace("%s", this.greeting);
  }
}

function format(formatString: string) {
  console.log(formatString, "sss");
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

const greeter = new Greeter("张三");
console.log(greeter.greet(), "grkkk");
console.log(Reflect.getMetadata(formatMetadataKey, greeter, "greeting"), "grkkk");

// 参数装饰器

// class Greeter {
//   greeting: string;
//
//   constructor(message: string) {
//     this.greeting = message;
//   }
//
//   @validate
//   greet(@required name: string) {
//     return "Hello " + name + ", " + this.greeting;
//   }
// }
//
// function required(target: any, propertyKey: string, propertyIndex: number) {
//   console.log(target, propertyIndex, "kkkkk");
// }
//
// function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//
//     console.log(target,descriptor,'llll')
//
// }
//
// const greeter = new Greeter('message')
//
// console.log(greeter.greet('zhangsan'))
</script>

<style scoped lang="scss">
.Decorators {
}
</style>
