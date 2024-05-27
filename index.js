import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Constants
const PORT = 3000;
const app = express();
const API_URL = "https://pokeapi.co/api/v2";

//Functions
function randomPokemonFirstGen(){
    return Math.floor(Math.random()*150) + 1;
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
        const pokemonName = response.data.name;

        res.render("index.ejs", {pokemons: JSON.stringify(pokemonName)});
    }catch(err){
        console.error("An error has ocurred: " + err);
        res.status(500).send("An error has ocurred " + err);
    }
});

app.listen(PORT, ()=>{
    console.log(`The server is running in the port ${PORT}`);
})