import "reflect-metadata";
import { get, set } from "lodash-es";
// import { ConverterConfig } from './json_property';

export const enum ConvertTag {
    TO_JSON = "TO_JSON",
    FROM_JSON = "FROM_JSON",
}

export const globalUniqueKeyForJsonProperty = Symbol.for("$JsonProperty$");

export function JsonProperty(jsonName: string, converterConfig: ConverterConfig) {
    return function (target: Object, propertyName: string) {
        // 获取元数据
        const metaData = Reflect.getMetadata(globalUniqueKeyForJsonProperty, target) || {};

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
        return this.suffixObj(this.convert(this.prefixJson(json), ConvertTag.FROM_JSON));
    }
    toJson(obj: F): T {
        return this.suffixJson(this.convert(this.prefixObj(obj), ConvertTag.TO_JSON));
    }

    /**
     * 前处理fromJson的入参
     */
    protected prefixJson<T>(json: T): T {
        return json;
    }
    /**
     * 后处理fromJson的返回值
     */
    protected suffixObj<F>(obj: F): F {
        return obj;
    }

    /**
     * 前处理toJson的入参
     */
    protected prefixObj<F>(obj: F): F {
        return obj;
    }
    /**
     * 后处理toJson的返回值
     */
    protected suffixJson<T>(json: T): T {
        return json;
    }

    private convert<FromValue, ToValue>(value: FromValue, tag: ConvertTag): ToValue {

        // 从元数据中取出对应关系以及处理函数
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
        const collectedMetaGroup = Reflect.ownKeys(metaDataGroup).filter(
            (key) => tag == metaDataGroup[key].$tag
        );

        return collectedMetaGroup.reduce((total, key) => {
            const { name } = metaDataGroup[key];

            const result = this.getValueByPath(value, key, metaDataGroup);

            this.setValueByPath(result, name, total);

            console.log(result, "result");

            return total;
        }, {}) as ToValue;
    }

    private getValueByPath<FromValue, ToValue>(
        value: FromValue,
        key: string | symbol,
        metaDataGroup: MetaGroup<FromValue, ToValue>
    ): ToValue {

        const { fn, defaultValue } = metaDataGroup[key];

        // 应对获取多个数据的情况
        const paths = this.extractKeyStrFromSymbol(key).split("|");

        const values = paths.map((path) => get(value, path, undefined) as FromValue);

        if (values.length <= 1) {
            return (
                isUndefined(values[0]) ? defaultValue : fn?.(values[0]) ?? values[0] ?? defaultValue
            ) as ToValue;
        }
        return (
            values.every(isUndefined) ? defaultValue : fn?.(values as FromValue) ?? values ?? defaultValue
        ) as ToValue;
    }

    private setValueByPath<FromValue, ToValue>(
        value: FromValue | ToValue,
        key: string | symbol,
        accumulativeData: Record<string | symbol, ToValue>
    ) {
        const paths = this.extractKeyStrFromSymbol(key).split("|");

        paths.forEach((path) => {
            set(accumulativeData, path, value);
        });
    }

    private extractKeyStrFromSymbol(key: string | symbol): string {
        if (typeof key == "string") {
            return key;
        }
        const matched = key.toString().match(/Symbol\((\S*)\)/);

        return matched ? matched[1] : "";
    }
}

/**
 * @name:
 * @description:
 * @author: hanyuchen
 */
export type MetaGroup<FromValue, ToValue> = Record<
    string | symbol,
    {
        name: string;
        $tag: ConvertTag;
        fn?(value: FromValue): ToValue;
        defaultValue?: ToValue;
    }
>;

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
}>;

export const isUndefined = (value: any): boolean => {
    return value == undefined || value == null || value == "";
};
