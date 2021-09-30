var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + "," + middleInitial + "," + lastName;
    }
    return Student;
}());
var person = [{ firstName: '', lastName: '' }];
function greeter(person) {
    var list = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        list[_i - 1] = arguments[_i];
    }
    return "hello," + person.firstName + " , " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);
var list = [{ firstName: '', lastName: '' }];
//元组 标识一个已知元素数量和类型的数组
var x = ['sss', 199];
//枚举类型
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
var d = Color[0];
var searchFunc = function (source, substr) { };
var Employee = /** @class */ (function () {
    function Employee(source) {
        this.source = source;
        Employee.userName = '111';
    }
    Object.defineProperty(Employee.prototype, "fullname", {
        get: function () {
            return this.name;
        },
        set: function (newName) {
            this.name = newName;
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
//抽象类
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () { };
    return Animal;
}());
var deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(53),
    createCardPicker: function () {
        var _this = this;
        return function () {
            return {
                suit: _this.suits[0],
                card: 1
            };
        };
    }
};
//泛型
function identity(arg) {
    return arg;
}
var output = identity('name');
var myIdentity = identity;
var myIdentity2 = identity;
var myIdentity3 = identity;
function getProperty(obj, key) {
    return obj[key];
}
var obj = {
    param1: '12',
    param2: '34',
};
getProperty(obj, 'param1');
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 0] = "B";
})(Enum || (Enum = {}));
console.log(Enum[0]);
