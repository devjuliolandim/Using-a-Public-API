import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Constants
const PORT = 3000;
const app = express();
const API_URL = "https://pokeapi.co/api/v2";

//How many pokemons?
const pokemonsRange = 500;

//Functions
function randomPokemonFirstGen(){
    return Math.floor(Math.random()*pokemonsRange) + 1;
}

function capitalizeFirstLetter(pokemonName){
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}

//MiddleWares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.get("/get-pokemon", async (req,res)=>{
    try{
        //Promise coming from the API
        const response = await axios.get(API_URL + `/pokemon/${randomPokemonFirstGen()}`);
        
        //Pokemon Name
        let pokemonName = response.data.name;
        pokemonName = capitalizeFirstLetter(pokemonName) // Capitalizing first letter

        //Pokemon Image
        const pokemonImage = response.data.sprites.front_default;

        res.render("index.ejs",{data: {name: pokemonName, image: pokemonImage}});

    }catch(err){
        console.error("An error has ocurred: " + err);
        res.status(500).send("An error has ocurred " + err);
    }
});

app.listen(PORT, ()=>{
    console.log(`The server is running in the port ${PORT}`);
})