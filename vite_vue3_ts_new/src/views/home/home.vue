<!--
 * @Author: Hanyuchen e-exclison@outlook.ocm
 * @Date: 2024-04-10 10:44:45
 * @LastEditors: Hanyuchen e-exclison@outlook.ocm
 * @LastEditTime: 2024-04-10 10:49:35
 * @FilePath: \vite_vue3_ts_new\src\views\home\home.vue
 * @Description: 
-->
<template>
  <div class="home">
    首页
  </div>
</template>

<script lang="ts">
export default {
  name: "home",
};
</script>
<script setup lang="ts">
// import { ref, reactive, computed } from "vue";
import {Temporal, Intl, toTemporalInstant} from '@js-temporal/polyfill';

Date.prototype.toTemporalInstant = toTemporalInstant;


// -----------------------------------------Promise.withResolvers测试-----------------------------------------------

const {promise, resolve, reject} = Promise.withResolvers();

setTimeout(() => resolve('Resolved after 2 seconds'), 2000);

promise.then(value => console.log(value));

// -----------------------------------------Object.groupBy()测试-----------------------------------------------

const pets = [
  {gender: '男', name: '张三'},
  {gender: '女', name: '李四'},
  {gender: '男', name: '王五'}
];

const res = Object.groupBy(pets, pet => pet.gender);
console.log(res);
// 输出:
// {
//   女: [{ gender: '女', name: '李四' }]
//   男: [{ gender: '男', name: '张三' }, { gender: '男', name: '王五' }],
// }


// -----------------------------------------日期Temporal对象测试-----------------------------------------------
const today = Temporal.PlainDate.from({year: 2023, month: 11, day: 19});
console.log(today.toString()); // 输出: 2023-11-19

const duration = Temporal.Duration.from({hours: 3, minutes: 30});
const tomorrow = today.add(duration);
console.log(tomorrow.toString()); // 输出: 2023-11-20

// 时间同样和Date一样，从1970年1月开始，也就是北京时间1970年1月08:00:00
/*
{
  epochMicroseconds: 1714282664774664n //微秒
  epochMilliseconds: 1714282664774 //毫秒
  epochNanoseconds: 1714282664774664769n //纳秒
  epochSeconds: 1714282664 // 秒
}
 */
const now = Temporal.Now;
// console.log(now.plainDate(), 'now');
// const instant = now.instant(); //获取1970年到现在的毫秒,微秒,纳秒,秒数
console.log(new Date().getTime(), 'time');
// console.log(instant, 'instant');
Temporal.Now.instant().epochSeconds;
Temporal.Now.instant().epochMilliseconds;

console.log(Temporal.Calendar,'calendar');

const calendar = new Temporal.Calendar('iso8601');
console.log(calendar,'calendar');

const time = Temporal.Now.plainDateISO().toString();
console.log(time,'time')

// 本地时间
const zoneDatetimeISO = Temporal.Now.zonedDateTimeISO();
console.log(zoneDatetimeISO.toPlainDate().toString(), '本地时间');

// 当前时区
// const timeZone = Temporal.Now.timeZone();

// 另一个时区的当前时间
Temporal.Now.zonedDateTimeISO('Europe/London');

// -----------------------------------------Temporal.Now测试-----------------------------------------------
console.log(`-----------------------------------------Temporal.Now测试-----------------------------------------------`);

 const instant = Temporal.Now.instant() // 获取当前系统的准确时间
 const timeZoneId = Temporal.Now.timeZoneId() // 获取当前系统时区
 const zonedDateTime = Temporal.Now.zonedDateTime(calendar) // 获取系统时区和指定日历中的当前日期和挂钟时间
 const zonedDateTimeISO = Temporal.Now.zonedDateTimeISO() // 获取系统时区的当前日期和挂钟时间以及 ISO-8601 日历
 const plainDate = Temporal.Now.plainDate(calendar) // 获取系统时区的当前日期和指定的日历
 const plainDateISO = Temporal.Now.plainDateISO() // 获取系统时区和 ISO-8601 日历中的当前日期
 const plainTimeISO = Temporal.Now.plainTimeISO() // 获取系统时区的当前挂钟时间和ISO-8601日历
 const plainDateTime = Temporal.Now.plainDateTime(calendar) // 获取系统时区中的当前系统日期/时间，但返回一个不记得其时区的对象，因此不应用于在使用夏令时的时区中派生其他值（例如 12 小时后）（夏令时）。
 const plainDateTimeISO = Temporal.Now.plainDateTimeISO() // 与上面相同，但返回 ISO-8601 日历中的日期时间

console.log(instant,'instant');
console.log(timeZoneId,'timeZoneId');
console.log(zonedDateTime,'zonedDateTime');
console.log(zonedDateTimeISO,'zonedDateTimeISO');
console.log(plainDate,'plainDate');
console.log(plainDateISO,'plainDateISO');
console.log(plainTimeISO,'plainTimeISO');
console.log(plainDateTime,'plainDateTime');
console.log(plainDateTimeISO,'plainDateTimeISO');

//
const d = Temporal.Duration.from({ minutes: 130 });
const dd = d.round({ largestUnit: 'day' });
console.log(d,'ddddd')
console.log(dd,'ddddd')

// -----------------------------------------Records与Tuple测试-----------------------------------------------

// // Records
// const myRecord = #{
//  name: '01',
//   age: 23
// }
//
// // Tuple
// const myTuple = #['1', '2', '3']
// const myRecord = Record({ name: '01', age: 23 });   // #{ name: '01', age: 23 }
// const myTuple = Tuple([1, 2, 3, 4, 5]);   // #[1, 2, 3, 4, 5]

// -----------------------------------------装饰器测试-----------------------------------------------

function logged(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Example {
  @logged
  sum(a, b) {
    return a + b;
  }
}

const e = new Example();
e.sum(1, 2); // 输出：[1, 2]



for (let i = 0; i <= 3; i++) {
  const x = 4*i;
  const y = 25 - 7*i;
  const z = 75+3*i;

  const a = 500*x+300*y+(100/3*z)
  console.log(a);
  if(500*x+300*y+(100/3*z) == 10000){
    console.log(x,y,z)
  }
}


</script>

<style scoped lang="scss">
.home {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
