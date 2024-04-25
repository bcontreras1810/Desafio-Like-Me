// Importacion del modulo "pool" desde el archivo "dbConfig"
const pool = require("./dbConfig");

// Definición de la funcion asincronica "guardarPosts" para insertar un nuevo post en la base de datos
const guardarPosts = async (titulo, img, descripcion,  likes) => {
  // Definicion de la consulta SQL
  const consulta = {
    text:
      "INSERT INTO posts ( titulo, img, descripcion, likes ) VALUES ( $1, $2, $3, $4)",
    // Valores a ser insertados en la consulta
    values: titulo, img, descripcion,  likes,
  };
  // Ejecucion de la consulta en la base de datos utilizando el pool de conexiones
  const result = await pool.query(consulta);
  // Retorno de las filas afectadas por la consulta
  return result.rows;
};

// Definicion de la funcion asincronica "like" para obtener todos los posts de la base de datos
const like = async () => {
  // Ejecucion de la consulta SQL para seleccionar todos los posts de la tabla "posts"
  const result = await pool.query(`SELECT * FROM posts`);
  return result.rows;
};

// Definicion de la funcion asincronica "putPosts" para incrementar el contador de likes de un post especifico
const putPosts = async (id) => {
  // Ejecución de la consulta SQL 
  const result = await pool.query(
    `UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows;
};

// Exportación de las funciones definidas
module.exports = { guardarPosts, like, putPosts};
