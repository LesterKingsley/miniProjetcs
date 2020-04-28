
	var[body,searchBar,searchButton,pokedex,pokePic,pokeDescript,pokeName,pokeType,height,weight,pokeBox]=[document.querySelector('body'),document.querySelector('#searchBar'),document.querySelector('#searchButton'),document.querySelector('#pokedex'),document.querySelector('#pokePic img'),document.querySelector('#pokeDescript'),document.querySelector('#name'),document.querySelector('#type'),document.querySelector('#height'),document.querySelector('#weight'),document.querySelector('#pokeBox')]
searchButton.addEventListener('click',function()
{
	const pokeData={
	url:"https://pokeapi.co/api/v2/",
	type:"pokemon/",
	named:searchBar.value
}
var{url,type,named}=pokeData
var pokeLink=`${url}${type}${named}`
fetch(pokeLink).then((data)=>data.json())
			   .then((pokemon)=>pokemonGenerator(pokemon))
			   .catch((error)=>alert(`${named} is not a pokemon`))
})
var pokeList=(p)=>{
for(let i=0;i<p.results.length;i++)
{
	pokeBox.innerHTML+=`<div id='${p.results[i].url}' class='pockets'>${p.results[i].name}</div>`
}
var pockets=document.querySelectorAll('.pockets')
Array.from(pockets).forEach(e=>e.addEventListener('click',function(e){
	fetch(e.target.id).then((data)=>data.json())
	.then((poke)=>pokemonGenerator(poke))
}))
}
const pokemonGenerator=p=>{
	pokePic.src=p.sprites.front_default!=null?p.sprites.front_default:"picball.png"
	pokeName.textContent=p.name
	pokeType.textContent=p.types.length==1?p.types[0].type.name:`${p.types[0].type.name} ${p.types[1].type.name}`
	weight.textContent=p.weight/10 +" kg"
	height.textContent=p.height/10 +" meter/s"
	function bgchanger()
{
	var elementals=new Map([["fire","#F08030"],["water","#0077"],["bug","olive"],["grass","green"],["electric","#A1871F"],["normal","#6D6D4E"],["ice","#b4cffa"],["ground","#B5651D"],["ghost","gray"],["poison","purple"],["psychic","pink"],["flying","lightgray"],["steel","darkgray"],["fairy","lightpink"],["rock","#654321"],["dragon","#7038F8"],["dark","#111"],["fighting","#C03028"]])
	for(const [key,value] of elementals)
	{
		if(p.types.length==1)
		{
			if(p.types[0].type.name===key)
			{
				body.style.backgroundImage=""
				body.style.backgroundColor=value
			}
		}
		if(p.types.length==2)
		{
			var color_1=elementals.get(p.types[0].type.name);
			var color_2=elementals.get(p.types[1].type.name);
			body.style.backgroundImage=`linear-gradient(${color_1},${color_2})`
		}
	}
}
bgchanger()
}
var allPokemon="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964"
fetch(allPokemon).then((data)=>data.json())
				  .then((pokemons)=>pokeList(pokemons))


