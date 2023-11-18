# 基于 Typescript 装饰器实现前后端数据转换

参考链接 https://juejin.cn/post/7165480530794774558

面向切面编程(AOP)在 Typescript 中的体现 https://juejin.cn/post/7259957160306573372

在前后端联调接口的过程中，开发人员经常会遇到如下情况：

字段命名不一致。例如同样表示 结束时间，后端接口返回 collect_end_time，而前端习惯命名 endTime；
字段命名风格不一致。参考：collect_end_time 和 endTime，后端习惯使用 下划线 风格，而前端更倾向于 驼峰 风格；
字段值存在转换关系。例如 collect_end_time 和 endTime，后端要求存 ms 单位的时间戳，而前端喜欢使用 s 单位下的时间进行计算。

所以在获取接口数据（response data）时，要将后端接口返回的 json 结构遍历成前端所需要 js obj 结构，而请求数据（request payload）时，前端要经常将 js obj 遍历成后端所接受的 json 格式。可见，每次从接口获取数据以及发送数据时，都要将数据遍历一番才能得到各端青睐的数据格式。
作为前端开发人员，预期是：

通过 fromJson 方法将后端返回的数据转成前端使用的数据格式；
通过 toJson 方法将前端的格式转成后端接口所需要的数据格式。

因此我们将基于装饰器功能实现更加优雅的转换方式，即实现 @JsonProperty 属性装饰器以及 JsonConverter 基类。

## 定义接口

BaseJsonConverter 接口应该具备两个方法

- fromJson 方法 将接口 json 数据转为前端 obj 数据
- toJson 方法 将前端 obj 数据转为后端 json 数据

```typescript
export interface BaseJsonConverter<FromValue = unknown, ToValue = unknown> {
  /**
   * 将接口json数据转换为js obj数据
   */
  fromJson(json: ToValue): FromValue;
  /**
   * 将js obj数据转换为 接口json数据
   */
  toJson(obj: FromValue): ToValue;
}
```

## 实现类属性装饰器 @JsonProperty

@JsonProperty 类属性装饰器 旨在收集 json 与 obj 数据结构中的参数命名与转换关系

收集参数参数命名与转换关系涉及两个重要方法`Reflect.getMetadata` 与 `Reflect.defineMetadata`
具体用法参考 [reflect-metadata]('https://www.npmjs.com/package/reflect-metadata')

思路就是使用装饰器收集参数命名与转换关系,并将其存储到属性元数据中,通过实现 fromJson,toJson 方法,取出对应转换关系进行数据转换

```typescript
export function JsonProperty(jsonName: string, converterConfig: ConverterConfig) {
  return function (target: Object, propertyName: string) {
    // 获取元数据
    const metaData = Reflect.getMetadata(globalUniqueKeyForJsonProperty, target) || {};

    // Symbol(jsonName)为转换前的key
    //  name:转换后的key, $tag:转换类型, fn:自定义转换函数, defaultValue:转换后默认值

    // 写入FromJson对应的参数
    metaData[Symbol(jsonName)] = {
      name: propertyName,
      $tag: ConvertTag.FROM_JSON,
      fn: converterConfig.fromJson,
      defaultValue: converterConfig.fromJsonDef,
    };
    // 写入ToJson需要的参数
    metaData[Symbol(propertyName)] = {
      name: jsonName,
      $tag: ConvertTag.TO_JSON,
      fn: converterConfig.toJson,
      defaultValue: converterConfig.toJsonDef,
    };

    // 写入元数据
    Reflect.defineMetadata(globalUniqueKeyForJsonProperty, metaData, target);
  };
}
```

1. jsonName 为 json 数据对应的属性名,propertyName 为 obj 数据对应的属性名
2. 这里分别收集了 jsonName -> propertyName ,与 propertyName -> jsonName 的对应关系,以及自定义处理函数与默认值
3. 使用`Symbol()`来避免 jsonName 与 propertyName 重名导致对应关系被覆盖

### 实现 JsonConverter 数据转换基类

```typescript
export class JsonConverter<F = unknown, T = unknown> implements BaseJsonConverter<F, T> {
  fromJson(json: T): F {
    return this.suffixObj(this.convert(this.prefixJson(json), ConvertTag.FROM_JSON));
  }
  toJson(obj: F): T {
    return this.suffixJson(this.convert(this.prefixObj(obj), ConvertTag.TO_JSON));
  }
}
```

### 入参与返回值的前后处理：这些方法可以子类重写

```typescript
  /**
   * 前处理fromJson的入参
   * 子类可重写该方法
   */
  protected prefixJson<T>(json: T): T {
    return json;
  }
  /**
   * 后处理fromJson的返回值
   * 子类可重写该方法
   */
  protected suffixObj<F>(obj: F): F {
    return obj;
  }

  /**
   * 前处理toJson的入参
   * 子类可重写该方法
   */
  protected prefixObj<F>(obj: F): F {
    return obj;
  }
  /**
   * 后处理toJson的返回值
   * 子类可重写该方法
   */
  protected suffixJson<T>(json: T): T {
    return json;
  }

```

### 数据转换核心方法 conver 与 baseConvert

```typescript
  private convert<FromValue, ToValue>(value: FromValue, tag: ConvertTag): ToValue {
    // 从元数据中取出对应关系以及处理函数
    // { symbol(user_name):{name:'userNmae',$tag:FROM_JSON,fn:()=>{},defaultValue:''} }
    const metaData: MetaGroup<FromValue, ToValue> =
      Reflect.getMetadata(globalUniqueKeyForJsonProperty, this) || {};

    if (Array.isArray(value)) {
      return value.map((val) => this.baseConvert(val, metaData, tag)) as ToValue;
    }

    return this.baseConvert(value, metaData, tag);
  }

  private baseConvert<FromValue, ToValue>(
    value: FromValue,
    metaDataGroup: MetaGroup<FromValue, ToValue>,
    tag: ConvertTag
  ): ToValue {
    // 过滤对应的元数据   ToJson 还是 FromJson
    // [ symbol(user_name) ]
    const collectedMetaGroup = Reflect.ownKeys(metaDataGroup).filter(
      (key) => tag == metaDataGroup[key].$tag
    );

    return collectedMetaGroup.reduce((total, key) => {
      // key : symbol(user_name)
      // metaDataGroup : { symbol(user_name):{name:'userNmae',$tag:FROM_JSON,fn:()=>{},defaultValue:''} }
      const { name } = metaDataGroup[key];

      // key可能为多条数据的组合
      const result = this.getValueByPath(value, key, metaDataGroup);

      // name可能为多条数据的组合
      this.setValueByPath(result, name, total);

      console.log(result, "result");

      return total;
    }, {}) as ToValue;
  }


```

### 类内部封装的 utils 方法

```typescript

  private getValueByPath<FromValue, ToValue>(
    value: FromValue,
    key: string | symbol,
    metaDataGroup: MetaGroup<FromValue, ToValue>
  ): ToValue {
    const { fn, defaultValue } = metaDataGroup[key];

    // 1. 首先对key进行正则解析,去除 Symbol()
    // 2. 然后取"|"分隔符 ,依赖多条数据时,key为userinfo.user_id|userinfo.user_name这种

    // 应对获取多个数据的情况
    const paths = this.extractKeyStrFromSymbol(key).split("|");

    // 取到数据数组(原因为可能依赖多个数据) get方法为loadsh提供
    const values = paths.map((path) => get(value, path, undefined) as FromValue);

    if (values.length <= 1) {
      return (
        isUndefined(values[0]) ? defaultValue : fn?.(values[0]) ?? values[0] ?? defaultValue
      ) as ToValue;
    }
    // 多个数据直接完整返回,具体怎么处理交给传入的fn处理
    return (
      values.every(isUndefined) ? defaultValue : fn?.(values as FromValue) ?? values ?? defaultValue
    ) as ToValue;
  }

  private setValueByPath<FromValue, ToValue>(
    value: FromValue | ToValue,
    key: string | symbol,
    accumulativeData: Record<string | symbol, ToValue>
  ) {
    // 1. 首先对key进行正则解析,去除 Symbol()
    // 2. 然后取"|"分隔符 ,依赖多条数据时,key为userinfo.user_id|userinfo.user_name这种
    // 获取多个数据的key
    const paths = this.extractKeyStrFromSymbol(key).split("|");

    // 给每个key填充数据 set为loadsh提供
    paths.forEach((path) => {
      set(accumulativeData, path, value);
    });
  }

  private extractKeyStrFromSymbol(key: string | symbol): string {
    if (typeof key == "string") {
      return key;
    }
    // 如果key为symbol类型,则截取出对应的字符串key
    const matched = key.toString().match(/Symbol\((\S*)\)/);

    return matched ? matched[1] : "";
  }
```
