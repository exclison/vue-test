/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-11-02 09:49:07
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-11-03 09:32:28
 * @FilePath: \vue-test\vite_vue3_ts\src\library\json_property.ts
 * @Description: 
 */
import 'reflect-metadata';

// export { JsonConverter } from './json-converter';
// export type { IJsonConverter } from './types';
// export { JsonProperty } from './json-property';

// import { globalUniqueKeyForJsonProperty } from '../constant';
// import { ConvertTag } from '../enum';
// import type { ConverterConfig } from '../types';




import { get, set } from 'lodash-es';
// import type { MetaGroup, IJsonConverter } from '../types';
// import { ConvertTag } from '../enum';
// import { isUndefined } from '../utils';
// import { globalUniqueKeyForJsonProperty } from '../constant';

// import { ConvertTag } from '../enum';

export const enum StrictType {
    STRING = '[object String]',
    BOOLEAN = '[object Boolean]',
    NUMBER = '[object Number]',
    UNDEFINED = '[object Undefined]',
    NULL = '[object Null]',
    OBJECT = '[object Object]',
    ARRAY = '[object Array]',
    ERROR = '[object Error]',
    DATE = '[object Date]',
    /**
     * 正则表达式类型
     */
    REGEXP = '[object RegExp]',
    /**
     * 普通函数/箭头函数（Generator别用这个判断）
     */
    FUNCTION = '[object Function]',
    /**
     * Generator函数
     */
    GENERATOR = '[object GeneratorFunction]',
}

export const enum ConvertTag {
    TO_JSON = 'TO_JSON',
    FROM_JSON = 'FROM_JSON',
}


export const globalUniqueKeyForJsonProperty = Symbol.for('$JsonProperty$');


function isUndefined(value: any) {
    return value == undefined
}


/**
 * 标记json名称并声明转换函数与默认值
 * @param jsonName 对应的json名称
 * @param converter.toJson 该字段从obj转成json时使用的方法，默认 undefined
 * @param converter.toJsonDef 调用toJson时出现undefined情况时用该值填充，默认 undefined
 * @param converter.toJsonIgnore toJson后出现undefined是否需要移除改属性，默认 undefined
 * @param converter.fromJson 该字段从json转成obj时使用的方法，默认 undefined
 * @param converter.fromJsonDef 调用fromJson时出现undefined情况时用该值填充
 * @param converter.fromJsonIgnore fromJson后出现undefined是否需要移除改属性，默认 undefined
 */
export function JsonProperty<FromValue = unknown, ToValue = unknown>(
    jsonName: string,
    converter: ConverterConfig<FromValue, ToValue> = {},
) {
    return function (target: Object, propertyName: string) {
        const metaData = Reflect.getMetadata(globalUniqueKeyForJsonProperty, target) ?? {};
        metaData[Symbol(propertyName)] = {
            name: jsonName,
            fn: converter.toJson,
            defaultValue: converter.toJsonDef,
            $$tag: ConvertTag.TO_JSON,
            removal: converter.toJsonIgnore,
        };
        metaData[Symbol(jsonName)] = {
            name: propertyName,
            fn: converter.fromJson,
            defaultValue: converter.formJsonDef,
            $$tag: ConvertTag.FROM_JSON,
            removal: converter.fromJsonIgnore,
        };

        Reflect.defineMetadata(globalUniqueKeyForJsonProperty, metaData, target);
    };
}



/**
 * @note 使用数据类继承该类
 */
export class JsonConverter<O = unknown, J = unknown> implements IJsonConverter<O, J> {
    public toJson(obj: O): J {
        return this.postprocessJson(this.convert<O, J>(this.preprocessObj(obj), ConvertTag.TO_JSON));
    }

    public fromJson(json: J): O {
        return this.postprocessObj(this.convert<J, O>(this.preprocessJson(json), ConvertTag.FROM_JSON));
    }

    /**
     * 前处理 toJson 的入参
     * @note 子类可重写该方法
     */
    protected preprocessObj<O>(obj: O): O {
        return obj;
    }

    /**
     * 后处理 formJson 的返回值
     * @note 子类可重写该方法
     */
    protected postprocessObj<O>(obj: O): O {
        return obj;
    }

    /**
     * 前处理 fromJson 的入参
     * @note 子类可重写该方法
     */
    protected preprocessJson<J>(json: J): J {
        return json;
    }

    /**
     * 后处理 toJson 的返回值
  
     * @note 子类可重写该方法
     */
    protected postprocessJson<J>(json: J): J {
        return json;
    }

    private convert<FromValue, ToValue>(value: FromValue, tag: ConvertTag): ToValue {
        const collectedMetaGroup: MetaGroup<FromValue, ToValue> = Reflect.getMetadata(globalUniqueKeyForJsonProperty, this);

        if (Array.isArray(value)) {
            return value.map(val => this.baseConvert<FromValue, ToValue>(val, collectedMetaGroup, tag)) as ToValue;
        }

        return this.baseConvert<FromValue, ToValue>(value, collectedMetaGroup, tag);
    }

    private baseConvert<FromValue, ToValue>(
        value: FromValue,
        collectedMetaGroup: MetaGroup<FromValue, ToValue>,
        tag: ConvertTag,
    ): ToValue {
        debugger
        const validKeys = Reflect.ownKeys(collectedMetaGroup).filter(key => tag === collectedMetaGroup[key].$$tag);

        return validKeys.reduce((acc, key) => {
            const { name, removal } = collectedMetaGroup[key];
            const result = this.getValueByPath<FromValue, ToValue>(value, key, collectedMetaGroup);

            if ((typeof removal === 'function' && removal(result)) || removal === result) {
                return acc;
            }

            this.setValueByPath<FromValue, ToValue>(result, name, acc);
            return acc;
        }, {} as unknown as Record<string | symbol, ToValue>) as ToValue;
    }

    private getValueByPath<FromValue, ToValue>(
        value: FromValue,
        key: symbol | string,
        collectedMetaGroup: MetaGroup<FromValue, ToValue>,
    ): ToValue {
        const { fn, defaultValue } = collectedMetaGroup[key];
        const paths = this.extractKeyStrFromSymbol(key).split('|');

        // 这里已经保证了，如果取不到值，默认返回undefined，所以接下来只需要判断undefined就好了
        const values = paths.map(p => get(value, p, undefined) as FromValue);

        if (values.length <= 1) {
            return (isUndefined(values[0]) ? defaultValue : (fn?.(values[0]) ?? values[0] ?? defaultValue)) as ToValue;
        }

        return (values.every(isUndefined) ? defaultValue : fn?.(values as FromValue) ?? defaultValue) as ToValue;
    }

    private setValueByPath<FromValue, ToValue>(
        value: FromValue | ToValue,
        key: symbol | string,
        accumulativeData: Record<string | symbol, ToValue>,
    ): void {
        const paths = this.extractKeyStrFromSymbol(key).split('|');
        const pathHasSpliter = paths.length > 1; // 判断是否是多维路径

        if (pathHasSpliter && Array.isArray(value) && paths.length === value.length) {
            paths.forEach((p, i) => set(accumulativeData, p, value[i]));
        } else {
            set(accumulativeData, paths[0], value);
        }
    }

    private extractKeyStrFromSymbol(value: string | symbol): string {
        if (typeof value === 'string') {
            return value;
        }

        const matched = value.toString().match(/(?<=Symbol\().+(?=\))/g);
        return matched?.[0] ?? '';
    }
}








export type MetaGroup<FromValue, ToValue> = Record<string | symbol, {
    name: string;
    $$tag: ConvertTag;
    fn?: (value: FromValue) => ToValue;
    defaultValue?: ToValue;
    removal?: (value: unknown) => unknown | unknown;
}>;

export type ConverterConfig<FromValue = unknown, ToValue = unknown> = Partial<{
    /**
     * 值为undefined情况时用该值填充
     */
    toJsonDef: ToValue;
    /**
     * 值为undefined情况时用该值填充
     */
    formJsonDef: FromValue,
    /**
     * toJson方法的返回值如果等于toJsonIgnore，或者等于toJsonIgnore的返回值，那么将忽略，默认值为undefined
     */
    toJsonIgnore: (value: FromValue) => boolean | unknown;
    /**
     * fromJson方法的返回值如果等于toJsonIgnore，或者等于toJsonIgnore的返回值，那么将忽略，默认值为undefined
     */
    fromJsonIgnore: (value: ToValue) => boolean | unknown;
    /**
     * 将js obj转成json格式
     * @note 值为undefined不会使用该方法进行转换
     */
    toJson(obj: FromValue): ToValue;
    /**
     * 将json转成js obj格式
     * @note 值为undefined不会使用该方法进行转换
     */
    fromJson(json: ToValue): FromValue;
}>;

export interface IJsonConverter<FromValue = unknown, ToValue = unknown> {
    /**
     * 将js obj转成json格式
     */
    toJson(obj: FromValue): ToValue;
    /**
     * 将json转成js obj格式
     */
    fromJson(json: ToValue): FromValue;
}
