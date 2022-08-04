// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

// server.METHOD(URL, (req, res, next) => {})

const PATH = '/posts'

server.post(PATH, (req, res) => {
    const { author, title, contents } = req.body;
    // console.log(author, title, contents)

    if (!author || !title || !contents){
        return res
            .status(STATUS_USER_ERROR)
            .json(
                {error: "No se recibieron los parámetros necesarios para crear el Post"
            })
    }
    
    const post = {
        author,
        title,
        contents,
        id: id++
    }

    posts.push(post)
    res.status(200).json(posts)
});

server.post(`${PATH}/author/:author`, (req, res) =>{
    let {author} = req.params;
    let [title, contents] = req.body;

    if (!author || !title || !contents){
        res
            .status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parámetros necesarios para crear el Post"
            })
    }
    
    const post = {
        author,
        title,
        contents,
        id: id++
    }

    posts.push(post)
    res.status(200).json(posts)
})

server.get(PATH, (req, res) => {
    let { terms } = req.query;
    console.log(terms);

    if(terms){
        const term_post = posts.filter(
            (p) => p.title.includes(terms) || p.contents.includes(terms)
        )

        return res.json(term_post)
    }
    res.json(posts);
});

server.get(`${PATH}/:author`, (req, res) => {
    let { author } = req.params;

    const posts_author = posts.filter(p => p.author === author);

    if (posts_author.length > 0){
        res.json(posts_author)
    } else{
        res
            .status(STATUS_USER_ERROR)
            .json({
                error: "No existe ningun post del autor indicado"
            })
    }
});

server.get(`${PATH}/:author/:title`, (req, res) => {
    let { author, title } = req.params;

    if (author && title){

        const new_post = posts.filter(p => p.author === author && p.title === title)
    
        if(new_post.length > 0){
            res.json(new_post)
        } else{
            res
                .status(STATUS_USER_ERROR)
                .json({
                    error: "No existe ningun post con dicho titulo y autor indicado"
                })
        }
    } else{
        res
                .status(STATUS_USER_ERROR)
                .json({
                    error: "No existe ningun post con dicho titulo y autor indicado"
                })
    }
    
});

server.put(PATH, (req, res) => {
    let { id, title, contents} = req.body;

    if(id && title && contents){
        let post = posts.filter(p => p.id === parseInt(id));

        if(post){
            post.title = title;
            post.contents = contents;
            res.json(post)
        } else{
            res
                .status(STATUS_USER_ERROR)
                .json({
                    error: "No existe ningun post con el ID indicado :("
                })
        }
    }else{
        res
            .status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parámetros necesarios para modificar el Post"
            })
    }
    res.send('Done')
});

server.delete(PATH, (req, res) => {
    let { id } = req.body;

    const post = posts.find(p => p.id === parseInt(id));

    if(!id || !post){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }

    posts = posts.filter(p => p.id !== parseInt(id));
    res.json({succes: true})
});

server.delete("/author", (req, res) => {
    let { author } = req.body;
    const author_found = posts.find(p => p.author === author);

    if(!author || !author_found){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }

    let delete_author = [];

    posts = posts.filter(p => {
        if(p.author !== author){
            return true
        } else{
            delete_author.push(p)
        }
    })

    return res.json(delete_author)
})

module.exports = { posts, server };
