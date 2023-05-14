function getRandomCodeSample() {
    const codeSamples = [
        {
            language: 'JavaScript',
            code: `
function greet(name) {
    console.log('Hello, ' + name + '!');
}

greet('World');
            `
        },
        {
            language: 'Python',
            code: `
def greet(name):
    print(f'Hello, {World}!')

greet('World')
            `
        },
        {
            language: 'Java 🤮',
            code: `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
            `
        },
        {
            language: "C Sharp",
            code: `
using System;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
    }
}
            `
        }
    ];

    const randomIndex = Math.floor(Math.random() * codeSamples.length);
    return codeSamples[randomIndex];
}

var randomCodeSample = getRandomCodeSample();
document.getElementById("code-sample-language").innerText = `In the meantime, enjoy some ${randomCodeSample.language}!`;
document.getElementById("code-sample").innerHTML = randomCodeSample.code;
