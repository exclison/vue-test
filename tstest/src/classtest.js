var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        console.log(this.greeting);
    };
    return Greeter;
}());
var greeter = new Greeter('hello');
greeter.greet();
