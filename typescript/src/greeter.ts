class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = `${firstName},${middleInitial},${lastName}`;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}
const person:Person[] = [{firstName:'',lastName:''}]
function greeter(person: Person,...list:string[]): string {
  return `hello,${person.firstName} , ${person.lastName}`;
}

const user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);

let list:Person[] = [{firstName:'',lastName:''}]

//元组 标识一个已知元素数量和类型的数组
let x:[string,number] = ['sss',199]

//枚举类型
enum Color {Red,Green,Blue}
let c:Color = Color.Red
let d:string = Color[0]

//接口的 索引签名
interface SquareConfig { 
    color?:string;
    width?:number;
    [propName:string]:any
}
//接口 函数类型
interface SearchFunc { 
    (source:string,substr:string):void;
}

const searchFunc:SearchFunc = function(source:string,substr:string){}

class Employee { 
    static userName:string;
    private name:string;
    constructor(readonly source:string) {
        Employee.userName = '111'
    }

    get fullname():string{
        return this.name
    }
    set fullname(newName:string){
        this.name = newName
    }
}

//抽象类
abstract class Animal {
    abstract makeSound():void;
    move():void{}
    constructor() {
        
    }
}
interface Card{
    suit:string;
    card:number;
}
interface Deck{
    suits:string[];
    cards:number[];
    createCardPicker(this:Deck):()=>Card;
}
let deck:Deck = {
    suits:['hearts','spades','clubs','diamonds'],
    cards:Array(53),
    createCardPicker:function(this:Deck){
        return ()=>{
            return {
                suit:this.suits[0],
                card:1
            }
        }
    }
}

//泛型
function identity<T>(arg:T):T{
    return arg
}

let output = identity<string>('name')

let myIdentity:<T>(arg:T)=>T = identity

//将泛型函数字面量写成接口
interface GenericIdentityFn {
    <T>(arg:T):T
}

let myIdentity2:GenericIdentityFn = identity

//指定接口泛型类型
interface GenericIdentityFn2<T>{
    (arg:T):T
}
let myIdentity3:GenericIdentityFn2<string> = identity



function getProperty<T,K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const obj = {
    param1:'12',
    param2:'34',
}

getProperty(obj,'param1')

enum Enum{
    A=0,
    B=0,
}
console.log(Enum[0])

const t: (string|number) [] = ['111',123]


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



function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
        console.log(target,descriptor,propertyKey)
    };
}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

console.log(new Greeter("world").greet)