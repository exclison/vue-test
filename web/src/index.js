const obj = {foo:'foo',toString(){return 'abc'}}
const sym = Symbol(obj)
// console.log(sym);

const sym1 = Symbol(obj)

const va = sym === sym1

// console.log(va);

var mySymol = Symbol()
var mySymol1 = Symbol()
var a = {}
a.mySymol = 'hello'
// console.log(a[mySymol]) //undefined
// console.log(a['mySymol']) // 'hello'

a[mySymol1] = 'foo'
// console.log(a[mySymol1]);

let neObj = {
    [mySymol]:function(){
        return '222'
    },
    foo:2,
    bar: 3
}
// console.log(neObj[mySymol]());


var log = {}
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
  };
//   console.log(log.levels.DEBUG, 'debug message');
//   console.log(log.levels.INFO, 'info message');

  const objSymbol = Object.getOwnPropertySymbols(neObj)
//   console.log(objSymbol);

//   console.log(Reflect.ownKeys(neObj));

  var s1 = Symbol.for('foo')
  var s2 = Symbol.for('foo')
//   console.log(s1 === s2);

  const i = 'string'.match(/s/g)
// console.log(i);

const hell = 'helloworld'.replace(/el/,'aa')
// console.log(hell);

// console.log(/el/[Symbol.replace](this,'hell'))

const set = new Set([2,3,4,5,5])
const arr = [...set]
// console.log(arr);(this,'hell')



var proxy = new Proxy({}, {
    get: function(target, property) {
        console.log(target,property);
      return 35;
    }
  });
  
  proxy.time // 35
  proxy.name // 35
  proxy.title // 35



  var pipe = (function () {
    return function (value) {
      var funcStack = [];
      var oproxy = new Proxy({} , {
        get : function (pipeObject, fnName) {
          if (fnName === 'get') {
            return funcStack.reduce(function (val, fn) {
              return fn(val);
            },value);
          }
          funcStack.push(window[fnName]);
          return oproxy;
        }
      });
  
      return oproxy;
    }
  }());
  
  var double = n => n * 2;
  var pow    = n => n * n;
  var reverseInt = n => n.toString().split("").reverse().join("") | 0;
  
  pipe(3).double.pow.reverseInt.get; // 63
