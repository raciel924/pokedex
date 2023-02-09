const pokemonNombre = document.getElementById("nombre-pokemon");
const pokemonImg   = document.getElementById("pokemon-img");
const boton = document.getElementById("btn-mostrar");
const tipo = document.getElementById('pokemon-tipo');

const colores = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#B39FA2',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#C2C2C2',
    default: '#2A1A1F',
    fairy: '#CEFFFF',
    dark: '#767676'
};


//Funcion para encontrar el total de pokemones en la API
 async function get_count()
 {
    respuesta = (await fetch("https://pokeapi.co/api/v2/pokemon?")).json();
    return respuesta;
  }

//Funcion que nos da un numero aleatorio entre 0 y el valor de la API
async function  ID_aletorio()
{
    const datos = await  get_count();
    total = datos.count;
      valor = Math.floor(Math.random() * (total  + 1));
      //en la api se encontro que la numeracion cambia a partir del ID 1007
      // por lo cual se hizo un arreglo para seguir monstrando la informacion
      if(valor > 1007)
      {
        valor= valor+8993;
      }
      console.log(valor);
       return valor;
 
}
//funcion que nos trae el JSON del pokemon deseado en base al ID aleatorio
async function get_json()
{
    const datos = await  ID_aletorio();
    ID = datos;
    res  = (await fetch("https://pokeapi.co/api/v2/pokemon/"+ID)).json();
    return res;
}

//funcion  donde nos muestra en el html los datos necesarios  optenidos por la API

async function get_datos()

{
    tipo.innerHTML='';
        datos = await get_json();
        console.log(datos.name);
        pokemonNombre.textContent = datos.name;
        pokemonImg.src =datos['sprites']['other']['official-artwork']['front_default'];
        //esta funcion lo que busca es imprimir la informacion de a cuerdo a los elementos 
        //que tenga el json
        datos.types.forEach(dat => {
            const div = document.createElement("div");
            div.className = 'pokemon-tipo';
            div.textContent =  dat['type']['name'] ;
            div.style.background = colores[dat['type']['name']];
            tipo.appendChild(div);
            console.log(dat['type']['name'])
         });
            
          
}

//evento para el cual se busca un pokemon al hacer clic en el boton
if(boton)
{
    boton.addEventListener("click", () => {
        get_datos();
     });
}

function main()
{
    //funcion que nos muestra un pokemon cada 30 segundos
    setInterval(get_datos, 30000);
}

main();

