//importacion de modulos express
const express = require("express");

//creacion de instancia de express
const app = express();

//imortamos las funciones del archivo consulta
const { guardarPosts, putPosts, like} = require("./consultas")

//Configuracion del middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

//Manejo de la solicitud GET a la raiz del servidor
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Manejo de la solicitud POST para guardar un nuevo post
app.post("/post", async (req, res) => {
  try {
    // Extracción de datos del cuerpo de la solicitud
    const { usuario, URL, descripcion } = req.body; 
    //inicia el contador de likes
    const likes = 0; 
    //Llamada a la funcion para guardar el post en la base de datos
    const result = await guardarPosts([usuario, URL, descripcion, likes]); 
    // Envío de la respuesta al cliente
    res.send(result);   
  } catch (error) { 
    // Manejo de errores y envío de una respuesta de error al cliente
    res.status(500).send(error);
  }
});

//Manejo de la solicitud GET para obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    // Llamada a la función para obtener todos los posts
    const posts = await like();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Manejo de la solicitud PUT para actualizar un post existente
app.put("/post", async (req, res) => {
  try {
    // Extracción del parámetro "id" de la consulta
    let {id}  = req.query;
    //Llamada a la función para actualizar el post con el ID proporcionado
    const posts = await putPosts(id);
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Manejo de cualquier otra solicitud que no coincida con las rutas anteriores
app.get("*", (req, res) => {
  // Envío de una respuesta indicando que la página no existe
  res.send("Esta página no existe");
});

// Inicio del servidor en el puerto 3000 y mensaje de confirmación en la consola
app.listen(3000, console.log("Server ON"))