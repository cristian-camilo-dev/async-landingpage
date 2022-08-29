//*paginacion de peliculas
let pagina = 1;
const btnAnterior=document.getElementById("btnAnterior");
const btnSiguiente=document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click",()=>{
  if(pagina < 1000){
    pagina++;
    cargarPeliculas();
  }
  
})
 

btnAnterior.addEventListener("click",()=>{
  if(pagina > 1){
    pagina--;
    cargarPeliculas();
  }
  

});






//* guardamos en una variable la api de the Movie

let API =
  `https://api.themoviedb.org/3/movie/popular?api_key=13320fd81b07db3f985c53e81f38ab0a&language=es-ES&page=${pagina}`;

// variables del dom para el manejo de la pagina
const contenedor = document.getElementById("contenedor");

// funcion para mostrar las peliculas use async await
// para que espere a que se resuelva la promesa

const cargarPeliculas = async () => {
  // usamos try catch para manejar los errores
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=13320fd81b07db3f985c53e81f38ab0a&language=es-ES&page=${pagina}`);
    //comprobamos si el llamado es 200
    if (respuesta.status === 200) {
      const data = await respuesta.json();
      console.log(data);
      let estructuraHtml="";
      // recorremos el array de peliculas
      data.results.forEach((pelicula) => {
        console.log(pelicula.title);
        estructuraHtml+=`
        <div class="pelicula">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
        <h2 class="titulo">${pelicula.title}</h2>
        
  
        
        </div>
        
        `;
        
        contenedor.innerHTML=estructuraHtml;

        
        
      });
    } else if (respuesta.status === 401) {
      console.log("Error de autenticacion");
    } else if (respuesta.status === 404) {
      console.log("la pelicula no existe");
    } else {
      console.log("Error desconocido");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
