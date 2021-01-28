
/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Phu Vinh Hoang Student ID: 157238189 Date: November 27, 2020
*
********************************************************************************/

require("dotenv").config({path:"./config/keys.env"});

const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const dataService = require("./modules/data-service.js");
const productService = require("./modules/dataProduct-service");

const data = dataService(process.env.pvhoang_atlas);
const data_product = productService(process.env.pvhoang_atlas);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/api/posts", (req,res)=>{
    data.addNewPost(req.body).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    });
});

app.post("/product/posts", (req,res)=>{
    data_product.addNewProduct(req.body).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    });
});

app.get("/api/posts", (req,res) => {
    data.getAllPosts(req.query.page, req.query.perPage, req.query.category, req.query.tag).then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    })
});
// get all furni product
app.get("/products", (req,res) => {
    data_product.getAll().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    })
});

app.get("/products/best", (req,res) => {
    data_product.getBest().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    })
});

app.get("/api/categories", (req,res)=>{
    data.getCategories().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    })
});

app.get("/api/tags", (req,res)=>{
    data.getTags().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    })
});

app.get("/api/posts/:id",(req,res)=>{
    data.getPostById(req.params.id).then(data=>{
        res.json(data);
    }).catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    });
});

app.put("/api/posts/:id", (req,res)=>{
    data.updatePostById(req.body,req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    });
});

app.delete("/api/posts/:id", (req,res)=>{
    data.deletePostById(req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `Server throws, error: : ${err}`});
    });
});

// mongoDB connection

data_product.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{console.log("Server is running on Port: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("Unable to run the server: " + err);
    process.exit();
});
