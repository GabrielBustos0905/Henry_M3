// console.log(Object.keys(process))

const commands = require('./commands/index.js')
// commands{echo, date, pwd, ls}

const print = function(output){
    process.stdout.write(output);
    process.stdout.write('\npromt > ')
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    // args = ['string', 'string', 'string', 'string']
    let args = data.toString().trim().split(" "); // remueve la nueva línea

    // args = ['echo', 'hola', 'como', 'estas', '?']
    let cmd = args.shift()
    // args = ['hola', 'como', 'estas', '?']

    if(commands[cmd]){
        commands[cmd](args, print);
    } else{
        print('cmd not found :(')
    }




    // if(cmd === 'echo'){
    //     process.stdout.write(args.join(' '))
    // } else if(cmd === 'ls'){

    // } else if(cmd === 'pwd'){

    // } else if(cmd === 'date'){

    // } else{
    //     process.stdout.write('Comand not found :(')
    // }
    // process.stdout.write('\npromt > ')
    
});

