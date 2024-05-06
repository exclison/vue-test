# ES2024 前瞻

ECMAScript 2024（ES15） 即将发布（2024年6月），新的版本带来了非常多全新的特性。其中有 5 个全新的 JS 方法，可以大幅度提升我们的工作效率

## 01：Promise.withResolvers

这个功能引入了一个新方法来创建一个 promise，直接返回 resolve 和 reject 的回调。使用 Promise.withResolvers
，我们可以创建直接在其执行函数之外 resolve 和 reject

```javascript
const [promise, resolve, reject] = Promise.withResolvers();

setTimeout(() => resolve('Resolved after 2 seconds'), 2000);

promise.then(value => console.log(value));

```

## 02：Object.groupBy()

Object.groupBy() 方法是一项新添加的功能，允许我们按照特定属性将数组中的 对象分组，从而使数据处理变得更加容易。

```javascript
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

```

## 03：Temporal

Temporal提案引入了一个新的API，以更直观和高效的方式 处理日期和时间。例如，Temporal
API提供了新的日期、时间和持续时间的数据类型，以及用于创建、操作和格式化这些值的函数。

API参考[Temporal文档](https://tc39.es/proposal-temporal/docs/index.html)

```javascript
import {Temporal, Intl, toTemporalInstant} from '@js-temporal/polyfill';

Date.prototype.toTemporalInstant = toTemporalInstant;

const today = Temporal.PlainDate.from({year: 2023, month: 11, day: 19});
console.log(today.toString()); // 输出: 2023-11-19

const duration = Temporal.Duration.from({hours: 3, minutes: 30});
const tomorrow = today.add(duration);
console.log(tomorrow.toString()); // 输出: 2023-11-20

```
### Temporal.Now
- Temporal.Now.instant()- 获取当前系统的准确时间
- Temporal.Now.timeZoneId()- 获取当前系统时区
- Temporal.Now.zonedDateTime(calendar)- 获取系统时区和指定日历中的当前日期和挂钟时间
- Temporal.Now.zonedDateTimeISO()- 获取系统时区的当前日期和挂钟时间以及 ISO-8601 日历
- Temporal.Now.plainDate(calendar)- 获取系统时区的当前日期和指定的日历
- Temporal.Now.plainDateISO()- 获取系统时区和 ISO-8601 日历中的当前日期
- Temporal.Now.plainTimeISO()- 获取系统时区的当前挂钟时间和ISO-8601日历
- Temporal.Now.plainDateTime(calendar)- 获取系统时区中的当前系统日期/时间，但返回一个不记得其时区的对象，因此不应用于在使用夏令时的时区中派生其他值（例如 12 小时后）（夏令时）。
- Temporal.Now.plainDateTimeISO()- 与上面相同，但返回 ISO-8601 日历中的日期时间


### Temporal.Instant
Temporal.Instant表示固定时间点（称为“精确时间”），与日历或位置无关，例如 1969 年 7 月 20 日 20:17 UTC
```javascript
const instant = Temporal.Instant.from('1969-07-20T20:17Z');
instant.toString(); // => '1969-07-20T20:17:00Z'
instant.epochMilliseconds; // => -14182980000
```

### Temporal.ZonedDateTime
Temporal.ZonedDateTime是一个时区感知、日历感知的日期/时间对象，代表从地球上特定区域的角度来看在特定精确时间已经发生（或将要发生）的真实事件，例如 1995 年 12 月 7 日下午 3 点：美国太平洋时间（公历）上午 24 点。此类型针对需要时区的用例进行了优化，包括 DST 安全算术以及与 RFC 5545 (iCalendar) 的互操作性。

### Temporal.PlainDate
对象Temporal.PlainDate表示与特定时间或时区无关的日历日期，例如 2006 年 8 月 24 日。
```javascript
const date = Temporal.PlainDate.from({ year: 2006, month: 8, day: 24 }); // => 2006-08-24
date.year; // => 2006
date.inLeapYear; // => false
date.toString(); // => '2006-08-24'
```

### Temporal.PlainTime
对象Temporal.PlainTime表示与特定日期或时区无关的挂钟时间，例如晚上 7:39。
```javascript
const time = Temporal.PlainTime.from({
  hour: 19,
  minute: 39,
  second: 9,
  millisecond: 68,
  microsecond: 346,
  nanosecond: 205
}); // => 19:39:09.068346205

time.second; // => 9
time.toString(); // => '19:39:09.068346205'
```

注意事项:
现阶段需要借助 [@js-temporal/polyfill](https://www.npmjs.com/package/@js-temporal/polyfill) 来使用这个功能

## 04：Records 和 Tuples
Records 和 Tuples 是全新的数据结构，提供了一种更简洁和类型安全的方式来创建对象和数组。

- Records 类似于对象，但具有具体类型的固定属性集。
- Tuples 类似于数组，但具有固定长度，每个元素可以具有不同类型。

```javascript
// let record = #{
//   id: 1,
//   name: "JavaScript",
//   year: 2024
// };
console.log(record.name); // 输出: JavaScript

```

## 05：装饰器（Decorators）
装饰器（Decorators）是一种提议的语法，用于添加元数据或修改类、函数或属性的行为。装饰器可用于实现各种功能，如日志记录、缓存和依赖注入。

```javascript
function logged(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
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

```

## 其他
ES15 还提供了很多其他的新提案,例如:
-  ArrayBuffer.prototype.{detached,transfer,transferToFixedLength}
- 新的正则标识符/v

## 参考链接

[Describe changes in ES2024](https://github.com/tc39/ecma262/pull/3282)