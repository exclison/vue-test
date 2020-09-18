
import {Feature} from './types'

//类型注解
let v: string;
v = 'kkkk';
// v = 1

//类型推论
let v2 = true;
// v2 = 1

//原始类型: string number boolean undefined null symbol
let v3: string | undefined;

//类型数组
let arr: string[];
arr = ['tom'];

// 任意类型
let anyst: any;

anyst = 1
anyst = '333'

//any用于数组
let anyarray: any[]
anyarray = [1,'ttt']
anyarray[1]= 100

//函数类型约束
function greet(person: string): string {

    return 'hello,' + person
}
const msg = greet('tom')

// void类型
function warn(): void{
    console.log(111)
}

//对象object,不是原始类型就是对象类型
function fn1(o: object){
    console.log(333)
}
fn1({prop: 0})
// fn1(1) no ok

//正确的姿势
function fn2(o: {prop: number}){
    o.prop
}
fn2({prop: 0})
// fn2({prop:'tom'})

//类型别名
type Prop = {prop: number}
// function fn3(o:Prop){} // 等同于fn2

// type 和接口interface的区别,基本完全相同

// interface Prop2{
//     prop:number
// }

//类型断言
const someValue: any = 'string'
const strlen = (someValue as string).length


//联合类型
let union: string | number
union = 'sss'
union = 39

//交叉类型
type First = {first: number}
type Second = {second: number}
// 扩展新的type
type FirstAndSecond = First & Second
function fn4(): FirstAndSecond{
    return {first:2,second:3}
}

//函数
//1.设置了就是必填参数
//2.默认值 msg='abc'
//3.可选参数?
function greeting(person: string,msg='abc',msg2?: string): string{
    return ''
}

greeting('rr')

// 函数重载:场景主要源码和框架,函数用参数个数,类型或返回值类型区分同名函数
//先声明,在实现
function watch(cb1: () => void): void;
function watch(cb1: () => void,cb2: (v1: any,v2: any) => void): void;
//实现
function watch(cb1: () => void,cb2?: (v1: any,v2: any) => void){
    if(cb1 && cb2){
        console.log('执行重载2')
    }
    else {
        console.log('执行重载1');
        
    }
}

//watch()


class Parent {
    private _foo = "foo" //私有属性,不能在类的外部访问
    protected bar = "bar" // 保护属性,可以在子类中访问

    //参数属性:构造函数参数加修饰符,能够定义为成员属性
    constructor(public tua = "tua") {
        this.tua = tua
    }

    //方法也有修饰符
    private someMethod() {
        this._foo
    }

    // 存储器:属性方式访问,可添加额外逻辑,控制读写性
    // 可用于计算属性
    get foo(){
        return this._foo
    }
    set foo(val){
        this._foo = val
    }


}

class Child extends Parent {
    say(){
        this.bar
    }
}

const p = new Parent()
p.foo
p.tua

const c = new Child()
c.tua
c.foo


//接口
interface Person {
    firstName: string;
    lastName: string;
}
// greeting函数通过Person接口约束参数解构
function greete(person: Person) {
    return 'Hello,' + person.firstName + ' ' + person.lastName
}

greete({firstName:'jjj',lastName:'iii'}) //正确
// greete({firstName:'jjj'}) //错误

//泛型 (Generics)是指在定义函数,接口或类的时候,不预先指定具体的类型,
// 而在使用的时候再指定类型的一种特性,一次增加代码通用型

// 不用泛型
// interface Result {
//     ok: 0 | 1;
//     data: Feature[];
// }

// 使用泛型
interface Result<T> {
    ok: 0 | 1;
    data: T;
}

// 泛型方法
function getResult<T>(data: T): Result<T> {
    return {ok:1,data};
}

//用尖括号方式指定T为string
getResult<string>('hello')
//用类型推断指定T为number
getResult(1)

// 装饰器原理

// 累装饰器参数只有一个就是类构造函数
// 装饰器表达式会在运行时当作函数被调用,类的构造函数作为其唯一参数
function log(target: Function) {
    //target是构造函数
    // console.log(target === Foo); // true
    target.prototype.log = function(){
        console.log(this.bar);
    }
}

//方法装饰器有三个参数: 1.实例 2.方法名
function dong(target: any,name: string,descriptor: any){
    console.log(target,name,descriptor);
    
    // 这里通过修改descriptor.value扩展了bar方法
    const baz = descriptor.value;
    descriptor.value = function(val: string){
        console.log('dong')
        //原始逻辑
        baz.call(this,val)
    }
}

//属性装饰器
//如果包一层,可以传递配置对象进来,更加灵活
function mua(option: string) {
    // 返回的才是装饰器函数
    //接受两个参数: 1.实例 2.属性名称
    return function (target: any,name: string) {
        target[name] = option
    }
}

@log
class Foo {
    bar = "bar";

    @mua('mua')
    ns!: string;

    @dong
    setBar(val: string) {
        this.bar = val
    }
}

const foo = new Foo()
// foo.log()
foo.setBar('sbc')











