var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    
    mongoose.connect("mongodb://localhost/test");

//mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true, useUnifiedTopology: true}).then(res => console.log('Conexion a BD exitosa')); //conexion a base de datos

//Creacion de la Base de Datos en un JSON
var userSchemaJSON = {
    email: String,
    password: String
};

//modelos
var user_schema = new Schema(userSchemaJSON); //esto crea un Objeto
var User = mongoose.model("User", user_schema); // esquema que tendra la tabla a mapear

app.use("/public",express.static('public')); //permite usar archivos estaticos como imagenes, css, scripts
//se pueden crear varias carpetas segun se necesiten en el proyecto

//dos tipos diferentes de uso del BODY-PARSER
app.use(bodyParser.json); //para peticiones que tengan el formato applitacion json
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "pug");

app.get("/", function(req,res){
    res.render("index");
}); 

app.get("/login",function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("login");
    })    
});

app.post("/users", function(req,res){
    var user = new User({email: req.body.email, password: req.body.password});
    
    //guardar los datos del usuario
    user.save(function(){
        res.send("Datos Guardados");
    });
    
});

app.listen(8080);