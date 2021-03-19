class Greeter {
    greeting:string;
    constructor(message:string){
        this.greeting = message;
    }
    greet(){
        console.log(this.greeting)
    }
}

const greeter:Greeter = new Greeter('hello')
greeter.greet()