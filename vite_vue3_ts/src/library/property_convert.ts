
import 'reflect-metadata'
import { get, set } from 'lodash-es'
// import { ConverterConfig } from './json_property';

export const enum ConvertTag {
    TO_JSON = 'TO_JSON',
    FROM_JSON = 'FROM_JSON',
}

export const globalUniqueKeyForJsonProperty = Symbol.for('$JsonProperty$')


export function JsonProperty(jsonName: string, converterConfig: ConverterConfig) {
    return function (target: Object, propertyName: string) {
        const metaData = Reflect.getMetadata(globalUniqueKeyForJsonProperty, target) || {}
        console.log(metaData, 'meta')

        metaData[Symbol(jsonName)] = {
            name: propertyName,
            $tag: ConvertTag.FROM_JSON,
            fn: converterConfig.fromJson,
            defaultValue: converterConfig.fromJsonDef
        }
        metaData[Symbol(propertyName)] = {
            name: jsonName,
            $tag: ConvertTag.TO_JSON,
            fn: converterConfig.toJson,
            defaultValue: converterConfig.toJsonDef
        }

        Reflect.defineMetadata(globalUniqueKeyForJsonProperty, metaData, target)

        console.log(metaData)

    }
}

/**
 * @name:BaseJsonConverter
 * @description:数据转换基类
 * @author: hanyuchen
 * @date 2023-11-02 11:01:51
 */
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

/**
 * @name:JsonConverter
 * @description:数据转换类
 * @author: hanyuchen
 * @date 2023-11-02 11:30:41
 * @params {any} F: FromValue js obj数据
 * @params {any} T: ToValue json 数据
 */
export class JsonConverter<F = unknown, T = unknown> implements BaseJsonConverter<F, T> {
    fromJson(json: T): F {
        return this.suffixObj(this.convert(this.prefixJson(json), ConvertTag.FROM_JSON))
    }
    toJson(obj: F): T {
        return this.suffixJson(this.convert(this.prefixObj(obj), ConvertTag.TO_JSON))
    }

    /**
     * 前处理fromJson的入参
     */
    protected prefixJson<T>(json: T): T {
        return json
    }
    /**
     * 后处理fromJson的返回值
     */
    protected suffixObj<F>(obj: F): F {
        return obj
    }

    /**
    * 前处理toJson的入参
    */
    protected prefixObj<F>(obj: F): F {
        return obj
    }
    /**
     * 后处理toJson的返回值
     */
    protected suffixJson<T>(json: T): T {
        return json
    }


    private convert<FromValue, ToValue>(value: FromValue, tag: ConvertTag): ToValue {
        return {} as ToValue
    }
}

/**
 * @name:ConverterConfig
 * @description:装饰器第二个参数
 * @author: hanyuchen
 * @date 2023-11-02 11:34:44
 * @params {any} F: FromValue js obj数据
 * @params {any} T: ToValue json 数据
 */
export type ConverterConfig<FromValue = unknown, ToValue = unknown> = Partial<{

    /**
     * 自定义 json转obj函数
     */
    fromJson(json: ToValue): FromValue;
    /**
     * 自定义 obj转json函数
     */
    toJson(obj: FromValue): ToValue;
    /**
     * fromjson默认值
     */
    fromJsonDef: FromValue;
    /**
     * tojson默认值
     */
    toJsonDef: ToValue;

}>