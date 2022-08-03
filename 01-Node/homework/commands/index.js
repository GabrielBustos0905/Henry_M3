let fs = require('fs')
let request = require('request')

const { request } = require('http')

module.exports = {
    echo: function(args, print){
        print(args.join(' '))
    },
    date: function(args, print){
        print(Date())
    },
    ls: function(args, print){
        fs.readdir('.', function(err, files){
            // if(err) throw err,
            // print(files.join('\n'))
            let output = '';
            files.forEach(e => {output = output + e +'\n'})
            print(output)
        })
    },
    pwd: function(args, print){
        print(process.cwd())
    },
    cat: function(args, print){
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            print(data)
        })
    },
    head: function(args, print){
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            print(data.split('\n').splice(0, 10).join('\n'))
        })
    },
    tail: function(args, print){
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            print(data.split('\n').splice(-args[1]).join('\n')) // con el -args[1] va para atras a adelante
        })
    },
    curl: function(args, print){
        request(args[0], function(err, data){
            if (err) throw err;
            print(data.body)
        })
    }
}