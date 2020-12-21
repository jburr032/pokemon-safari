const axios = require("axios");
const fs = require("fs");

async function fetchPokemonData(){
    const NUM_POKEMON = 251;
    const pokemonObjs = [];

    console.log('Fetching...')

    for(let i=1; i <= NUM_POKEMON; i++){
        i === 75 && console.log('1/3 done...');
        i === 125 && console.log('2/3 done...');

        const pokemonObj = {
            name: "",
            types: [],
            battleSprite: "",
            up: {frame1: "", frame2: ""},
            down: {frame1: "", frame2: ""},
            left: {frame1: "", frame2: ""},
            right: {frame1: "", frame2: ""},
        };

        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const { data } = response;
    
            // Get pokemon name
            const lowerCaseName = data.forms[0].name;
            pokemonObj.name = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);
    
            // Get pokmeon types
            data.types.map(obj => {
                pokemonObj.types.push(obj.type.name);
            });

            pokemonObj.battleSprite = `pokemon-battle-sprites/main-sprites/diamond-pearl/${i}.png`;
            
            pokemonObj.up = {
                frame1: `sprites/pokemon/overworld/up/${i}.png`, 
                frame2: `sprites/pokemon/overworld/up/frame2/${i}.png`
            };

            pokemonObj.down = {
                frame1: `sprites/pokemon/overworld/down/${i}.png`, 
                frame2: `sprites/pokemon/overworld/down/frame2/${i}.png`
            };

            pokemonObj.left = {
                frame1: `sprites/pokemon/overworld/left/${i}.png`, 
                frame2: `sprites/pokemon/overworld/left/frame2/${i}.png`
            };

            pokemonObj.right = {
                frame1: `sprites/pokemon/overworld/right/${i}.png`, 
                frame2: `sprites/pokemon/overworld/right/frame2/${i}.png`
            };
    
            // Add obj to array of pokemon
            pokemonObjs.push(pokemonObj)
        }catch(err){
            console.error(err);
        }

    }
    const pokemonObjsJSON = JSON.stringify(pokemonObjs);
    fs.writeFile("./fetched_pokemon.json", pokemonObjsJSON, () => {});
    console.log('Done!');

}

fetchPokemonData();