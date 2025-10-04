/* Minimal client-side app for a Pokémon mini-database */

const searchInput = document.getElementById('search');
const typeSelect = document.getElementById('typeFilter');
const resultsEl = document.getElementById('results');
const statusEl = document.getElementById('status');

// Modal elements
const modal = document.getElementById('pokemonModal');
const modalSprite = document.getElementById('modalSprite');
const modalName = document.getElementById('modalName');
const modalId = document.getElementById('modalId');
const modalTypes = document.getElementById('modalTypes');
const modalEvolution = document.getElementById('modalEvolution');
const modalMoves = document.getElementById('modalMoves');
const closeBtn = document.querySelector('.close');

// Complete Generation 1 Pokémon dataset (151 Pokémon) in numerical order
const allPokemon = [
  { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', evolutionLevel: 1 },
  { id: 2, name: 'Ivysaur', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', evolutionLevel: 2 },
  { id: 3, name: 'Venusaur', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', evolutionLevel: 3 },
  { id: 4, name: 'Charmander', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', evolutionLevel: 1 },
  { id: 5, name: 'Charmeleon', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png', evolutionLevel: 2 },
  { id: 6, name: 'Charizard', types: ['Fire', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', evolutionLevel: 3 },
  { id: 7, name: 'Squirtle', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', evolutionLevel: 1 },
  { id: 8, name: 'Wartortle', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png', evolutionLevel: 2 },
  { id: 9, name: 'Blastoise', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png', evolutionLevel: 3 },
  { id: 10, name: 'Caterpie', types: ['Bug'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png', evolutionLevel: 1 },
  { id: 11, name: 'Metapod', types: ['Bug'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png', evolutionLevel: 2 },
  { id: 12, name: 'Butterfree', types: ['Bug', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png', evolutionLevel: 3 },
  { id: 13, name: 'Weedle', types: ['Bug', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png' },
  { id: 14, name: 'Kakuna', types: ['Bug', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png' },
  { id: 15, name: 'Beedrill', types: ['Bug', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png' },
  { id: 16, name: 'Pidgey', types: ['Normal', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png' },
  { id: 17, name: 'Pidgeotto', types: ['Normal', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png' },
  { id: 18, name: 'Pidgeot', types: ['Normal', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png' },
  { id: 19, name: 'Rattata', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png' },
  { id: 20, name: 'Raticate', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png' },
  { id: 21, name: 'Spearow', types: ['Normal', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png' },
  { id: 22, name: 'Fearow', types: ['Normal', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png' },
  { id: 23, name: 'Ekans', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png' },
  { id: 24, name: 'Arbok', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png' },
  { id: 25, name: 'Pikachu', types: ['Electric'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { id: 26, name: 'Raichu', types: ['Electric'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png' },
  { id: 27, name: 'Sandshrew', types: ['Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png' },
  { id: 28, name: 'Sandslash', types: ['Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png' },
  { id: 29, name: 'Nidoran♀', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png' },
  { id: 30, name: 'Nidorina', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png' },
  { id: 31, name: 'Nidoqueen', types: ['Poison', 'Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png' },
  { id: 32, name: 'Nidoran♂', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png' },
  { id: 33, name: 'Nidorino', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png' },
  { id: 34, name: 'Nidoking', types: ['Poison', 'Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png' },
  { id: 35, name: 'Clefairy', types: ['Fairy'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png' },
  { id: 36, name: 'Clefable', types: ['Fairy'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png' },
  { id: 37, name: 'Vulpix', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png' },
  { id: 38, name: 'Ninetales', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png' },
  { id: 39, name: 'Jigglypuff', types: ['Normal', 'Fairy'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' },
  { id: 40, name: 'Wigglytuff', types: ['Normal', 'Fairy'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png' },
  { id: 41, name: 'Zubat', types: ['Poison', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png' },
  { id: 42, name: 'Golbat', types: ['Poison', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png' },
  { id: 43, name: 'Oddish', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png' },
  { id: 44, name: 'Gloom', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png' },
  { id: 45, name: 'Vileplume', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png' },
  { id: 46, name: 'Paras', types: ['Bug', 'Grass'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png' },
  { id: 47, name: 'Parasect', types: ['Bug', 'Grass'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png' },
  { id: 48, name: 'Venonat', types: ['Bug', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png' },
  { id: 49, name: 'Venomoth', types: ['Bug', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png' },
  { id: 50, name: 'Diglett', types: ['Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png' },
  { id: 51, name: 'Dugtrio', types: ['Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png' },
  { id: 52, name: 'Meowth', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png' },
  { id: 53, name: 'Persian', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png' },
  { id: 54, name: 'Psyduck', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png' },
  { id: 55, name: 'Golduck', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png' },
  { id: 56, name: 'Mankey', types: ['Fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png' },
  { id: 57, name: 'Primeape', types: ['Fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png' },
  { id: 58, name: 'Growlithe', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png' },
  { id: 59, name: 'Arcanine', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png' },
  { id: 60, name: 'Poliwag', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png' },
  { id: 61, name: 'Poliwhirl', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png' },
  { id: 62, name: 'Poliwrath', types: ['Water', 'Fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png' },
  { id: 63, name: 'Abra', types: ['Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png' },
  { id: 64, name: 'Kadabra', types: ['Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png' },
  { id: 65, name: 'Alakazam', types: ['Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png' },
  { id: 66, name: 'Machop', types: ['Fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png' },
  { id: 67, name: 'Machoke', types: ['Fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png' },
  { id: 68, name: 'Machamp', types: ['Fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png' },
  { id: 69, name: 'Bellsprout', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png' },
  { id: 70, name: 'Weepinbell', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png' },
  { id: 71, name: 'Victreebel', types: ['Grass', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png' },
  { id: 72, name: 'Tentacool', types: ['Water', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png' },
  { id: 73, name: 'Tentacruel', types: ['Water', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png' },
  { id: 74, name: 'Geodude', types: ['Rock', 'Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png' },
  { id: 75, name: 'Graveler', types: ['Rock', 'Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png' },
  { id: 76, name: 'Golem', types: ['Rock', 'Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png' },
  { id: 77, name: 'Ponyta', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png' },
  { id: 78, name: 'Rapidash', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png' },
  { id: 79, name: 'Slowpoke', types: ['Water', 'Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png' },
  { id: 80, name: 'Slowbro', types: ['Water', 'Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png' },
  { id: 81, name: 'Magnemite', types: ['Electric', 'Steel'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png' },
  { id: 82, name: 'Magneton', types: ['Electric', 'Steel'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png' },
  { id: 83, name: 'Farfetch\'d', types: ['Normal', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png' },
  { id: 84, name: 'Doduo', types: ['Normal', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png' },
  { id: 85, name: 'Dodrio', types: ['Normal', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png' },
  { id: 86, name: 'Seel', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png' },
  { id: 87, name: 'Dewgong', types: ['Water', 'Ice'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png' },
  { id: 88, name: 'Grimer', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png' },
  { id: 89, name: 'Muk', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png' },
  { id: 90, name: 'Shellder', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png' },
  { id: 91, name: 'Cloyster', types: ['Water', 'Ice'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png' },
  { id: 92, name: 'Gastly', types: ['Ghost', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png' },
  { id: 93, name: 'Haunter', types: ['Ghost', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png' },
  { id: 94, name: 'Gengar', types: ['Ghost', 'Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
  { id: 95, name: 'Onix', types: ['Rock', 'Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png' },
  { id: 96, name: 'Drowzee', types: ['Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png' },
  { id: 97, name: 'Hypno', types: ['Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png' },
  { id: 98, name: 'Krabby', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png' },
  { id: 99, name: 'Kingler', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png' },
  { id: 100, name: 'Voltorb', types: ['Electric'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png' },
  { id: 101, name: 'Electrode', types: ['Electric'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png' },
  { id: 102, name: 'Exeggcute', types: ['Grass', 'Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png' },
  { id: 103, name: 'Exeggutor', types: ['Grass', 'Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png' },
  { id: 104, name: 'Cubone', types: ['Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png' },
  { id: 105, name: 'Marowak', types: ['Ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png' },
  { id: 106, name: 'Hitmonlee', types: ['Fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png' },
  { id: 107, name: 'Hitmonchan', types: ['Fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png' },
  { id: 108, name: 'Lickitung', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png' },
  { id: 109, name: 'Koffing', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png' },
  { id: 110, name: 'Weezing', types: ['Poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png' },
  { id: 111, name: 'Rhyhorn', types: ['Ground', 'Rock'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png' },
  { id: 112, name: 'Rhydon', types: ['Ground', 'Rock'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png' },
  { id: 113, name: 'Chansey', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png' },
  { id: 114, name: 'Tangela', types: ['Grass'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png' },
  { id: 115, name: 'Kangaskhan', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png' },
  { id: 116, name: 'Horsea', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png' },
  { id: 117, name: 'Seadra', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png' },
  { id: 118, name: 'Goldeen', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png' },
  { id: 119, name: 'Seaking', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png' },
  { id: 120, name: 'Staryu', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png' },
  { id: 121, name: 'Starmie', types: ['Water', 'Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png' },
  { id: 122, name: 'Mr. Mime', types: ['Psychic', 'Fairy'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png' },
  { id: 123, name: 'Scyther', types: ['Bug', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png' },
  { id: 124, name: 'Jynx', types: ['Ice', 'Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png' },
  { id: 125, name: 'Electabuzz', types: ['Electric'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png' },
  { id: 126, name: 'Magmar', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png' },
  { id: 127, name: 'Pinsir', types: ['Bug'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png' },
  { id: 128, name: 'Tauros', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png' },
  { id: 129, name: 'Magikarp', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png' },
  { id: 130, name: 'Gyarados', types: ['Water', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png' },
  { id: 131, name: 'Lapras', types: ['Water', 'Ice'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png' },
  { id: 132, name: 'Ditto', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png' },
  { id: 133, name: 'Eevee', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
  { id: 134, name: 'Vaporeon', types: ['Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png' },
  { id: 135, name: 'Jolteon', types: ['Electric'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png' },
  { id: 136, name: 'Flareon', types: ['Fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png' },
  { id: 137, name: 'Porygon', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/137.png' },
  { id: 138, name: 'Omanyte', types: ['Rock', 'Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png' },
  { id: 139, name: 'Omastar', types: ['Rock', 'Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png' },
  { id: 140, name: 'Kabuto', types: ['Rock', 'Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png' },
  { id: 141, name: 'Kabutops', types: ['Rock', 'Water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/141.png' },
  { id: 142, name: 'Aerodactyl', types: ['Rock', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png' },
  { id: 143, name: 'Snorlax', types: ['Normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' },
  { id: 144, name: 'Articuno', types: ['Ice', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png' },
  { id: 145, name: 'Zapdos', types: ['Electric', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png' },
  { id: 146, name: 'Moltres', types: ['Fire', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png' },
  { id: 147, name: 'Dratini', types: ['Dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png' },
  { id: 148, name: 'Dragonair', types: ['Dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png' },
  { id: 149, name: 'Dragonite', types: ['Dragon', 'Flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png' },
  { id: 150, name: 'Mewtwo', types: ['Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' },
  { id: 151, name: 'Mew', types: ['Psychic'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png' }
];
let dynamicPokemon = allPokemon;

function normalize(text) {
  return String(text).trim().toLowerCase();
}

function formatId(id) {
  const width = id >= 1000 ? 4 : 3;
  return `#${String(id).padStart(width, '0')}`;
}

function renderPokemon(pokemonList) {
  if (!Array.isArray(pokemonList)) return;
  const fragment = document.createDocumentFragment();
  pokemonList.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.addEventListener('click', () => showPokemonDetails(p));

    const idEl = document.createElement('div');
    idEl.className = 'id';
    idEl.textContent = formatId(p.id);

    // Evolution level badge
    if (p.evolutionLevel) {
      const evolutionEl = document.createElement('div');
      evolutionEl.className = 'evolution-level';
      evolutionEl.textContent = `Lv.${p.evolutionLevel}`;
      card.appendChild(evolutionEl);
    }

    const img = document.createElement('img');
    img.className = 'sprite';
    img.src = p.sprite;
    img.alt = `${p.name} sprite`;
    img.loading = 'lazy';

    const nameEl = document.createElement('div');
    nameEl.className = 'name';
    nameEl.textContent = p.name;

    const types = document.createElement('div');
    types.className = 'types';
    p.types.forEach(t => {
      const pill = document.createElement('span');
      pill.className = `type-pill ${t}`;
      pill.textContent = t;
      types.appendChild(pill);
    });

    card.appendChild(idEl);
    card.appendChild(img);
    card.appendChild(nameEl);
    card.appendChild(types);
    fragment.appendChild(card);
  });
  resultsEl.innerHTML = '';
  resultsEl.appendChild(fragment);
}

function applyFilters() {
  const q = normalize(searchInput.value);
  const type = typeSelect.value;
  const filtered = dynamicPokemon.filter(p => {
    const nameMatch = normalize(p.name).includes(q) || String(p.id) === q || formatId(p.id).toLowerCase() === q;
    const typeMatch = !type || p.types.includes(type);
    return nameMatch && typeMatch;
  });
  renderPokemon(filtered);
}

searchInput.addEventListener('input', applyFilters);
typeSelect.addEventListener('change', applyFilters);

// --- Full Pokédex loader (PokéAPI) ---
const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const MAX_ID = 1025; // up to Gen 9
const CACHE_KEY = 'pokedex_all_v1';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function setStatus(text) {
  if (!statusEl) return;
  statusEl.textContent = text || '';
}

function populateTypeFilter(uniqueTypes) {
  const existing = new Set(Array.from(typeSelect.options).map(o => o.value || o.textContent));
  uniqueTypes.forEach(t => {
    if (!existing.has(t)) {
      const opt = document.createElement('option');
      opt.textContent = t;
      typeSelect.appendChild(opt);
    }
  });
}

function parsePokemonDetail(json) {
  const id = json.id;
  const name = json.name.charAt(0).toUpperCase() + json.name.slice(1);
  const types = json.types
    .sort((a, b) => a.slot - b.slot)
    .map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));
  const sprite = json.sprites.other?.['official-artwork']?.front_default
    || json.sprites.front_default
    || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return { id, name, types, sprite, evolutionLevel: null };
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fetchEvolutionData(pokemonId) {
  try {
    const species = await fetchJson(`${POKEAPI_BASE}/pokemon-species/${pokemonId}`);
    const evolutionChain = await fetchJson(species.evolution_chain.url);
    
    // Find this Pokémon in the evolution chain and get its evolution level
    function findEvolutionLevel(chain, targetId, level = 0) {
      if (chain.species.url.includes(`/${targetId}/`)) {
        return level;
      }
      
      for (const evolution of chain.evolves_to || []) {
        const result = findEvolutionLevel(evolution, targetId, level + 1);
        if (result !== null) return result;
      }
      
      return null;
    }
    
    const evolutionLevel = findEvolutionLevel(evolutionChain.chain, pokemonId);
    return evolutionLevel;
  } catch (e) {
    return null;
  }
}

async function loadAllPokemon() {
  // Cache first
  try {
    const cachedRaw = localStorage.getItem(CACHE_KEY);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw);
      if (Date.now() - cached.timestamp < CACHE_TTL_MS && Array.isArray(cached.data) && cached.data.length > 0) {
        dynamicPokemon = cached.data;
        setStatus(`Loaded ${dynamicPokemon.length} Pokémon from cache.`);
        applyFilters();
        const types = Array.from(new Set(dynamicPokemon.flatMap(p => p.types))).sort();
        populateTypeFilter(types);
        return;
      }
    }
  } catch (_) {}

  setStatus('Fetching Pokémon list...');
  const list = await fetchJson(`${POKEAPI_BASE}/pokemon?limit=${MAX_ID}&offset=0`);
  const urls = list.results.map(r => r.url);

  const concurrency = 20;
  let completed = 0;
  const total = urls.length;
  const results = new Array(total);

  function updateProgress() { setStatus(`Loading ${completed}/${total} Pokémon...`); }

  async function worker(start) {
    for (let i = start; i < urls.length; i += concurrency) {
      try {
        const detail = await fetchJson(urls[i]);
        const pokemon = parsePokemonDetail(detail);
        
        // Fetch evolution data
        const evolutionLevel = await fetchEvolutionData(pokemon.id);
        if (evolutionLevel !== null && evolutionLevel > 0) {
          pokemon.evolutionLevel = evolutionLevel;
        }
        
        results[i] = pokemon;
      } catch (_) {
        // skip
      } finally {
        completed += 1;
        if (completed % 10 === 0 || completed === total) updateProgress();
      }
    }
  }

  setStatus('Loading Pokémon details...');
  await Promise.all(Array.from({ length: concurrency }, (_, idx) => worker(idx)));

  dynamicPokemon = results.filter(Boolean).sort((a, b) => a.id - b.id);
  setStatus(`Loaded ${dynamicPokemon.length} Pokémon.`);
  applyFilters();

  const types = Array.from(new Set(dynamicPokemon.flatMap(p => p.types))).sort();
  populateTypeFilter(types);

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: dynamicPokemon }));
  } catch (_) {}
}

loadAllPokemon().catch(err => {
  setStatus('Failed to load full Pokédex. Using Gen 1 only.');
  console.error(err);
});
// Initial render with Gen 1 while full Pokédex loads
renderPokemon(dynamicPokemon);

// Modal functionality
function showPokemonDetails(pokemon) {
  // Basic info
  modalSprite.src = pokemon.sprite;
  modalSprite.alt = `${pokemon.name} sprite`;
  modalName.textContent = pokemon.name;
  modalId.textContent = formatId(pokemon.id);
  
  // Types
  modalTypes.innerHTML = '';
  pokemon.types.forEach(type => {
    const pill = document.createElement('span');
    pill.className = `type-pill ${type}`;
    pill.textContent = type;
    modalTypes.appendChild(pill);
  });
  
  // Evolution info
  if (pokemon.evolutionLevel) {
    modalEvolution.innerHTML = `
      <div><strong>Evolution Stage:</strong> Level ${pokemon.evolutionLevel}</div>
      <div><strong>Evolution Level:</strong> ${getEvolutionLevel(pokemon.id)}</div>
    `;
  } else {
    modalEvolution.innerHTML = '<div>This Pokémon does not evolve or is already fully evolved.</div>';
  }
  
  // Load moves
  loadPokemonMoves(pokemon.id);
  
  modal.style.display = 'block';
}

function getEvolutionLevel(pokemonId) {
  // Simple evolution level mapping for common Pokémon
  const evolutionLevels = {
    1: 16, 2: 32, 4: 16, 5: 36, 7: 16, 8: 36, 10: 7, 11: 10, 13: 7, 14: 10,
    16: 18, 17: 36, 19: 20, 21: 20, 23: 22, 25: 0, 27: 22, 29: 16, 30: 32,
    32: 16, 33: 32, 35: 0, 37: 0, 39: 0, 41: 22, 43: 21, 44: 0, 46: 24,
    48: 31, 50: 26, 52: 0, 54: 33, 56: 28, 58: 0, 60: 25, 61: 0, 63: 16,
    64: 0, 66: 28, 67: 0, 69: 21, 70: 0, 72: 30, 74: 25, 75: 0, 77: 40,
    79: 37, 81: 30, 84: 31, 86: 34, 88: 38, 90: 0, 92: 25, 93: 0, 95: 0,
    96: 26, 98: 28, 100: 30, 102: 0, 104: 28, 108: 0, 109: 35, 111: 42,
    113: 0, 114: 0, 116: 32, 118: 33, 120: 0, 123: 0, 124: 0, 125: 0,
    126: 0, 127: 0, 128: 0, 129: 20, 131: 0, 132: 0, 133: 0, 137: 0,
    138: 40, 140: 40, 142: 0, 143: 0, 144: 0, 145: 0, 146: 0, 147: 30,
    148: 55, 150: 0, 151: 0
  };
  return evolutionLevels[pokemonId] || 'Unknown';
}

async function loadPokemonMoves(pokemonId) {
  modalMoves.innerHTML = '<div>Loading moves...</div>';
  
  try {
    const response = await fetch(`${POKEAPI_BASE}/pokemon/${pokemonId}`);
    const data = await response.json();
    
    // Get level-up moves
    const levelUpMoves = data.moves
      .filter(move => move.version_group_details.some(vg => vg.move_learn_method.name === 'level-up'))
      .map(move => {
        const levelDetail = move.version_group_details.find(vg => vg.move_learn_method.name === 'level-up');
        return {
          name: move.move.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          level: levelDetail.level_learned_at
        };
      })
      .sort((a, b) => a.level - b.level)
      .slice(0, 20); // Show first 20 moves
    
    modalMoves.innerHTML = '';
    if (levelUpMoves.length === 0) {
      modalMoves.innerHTML = '<div>No level-up moves found.</div>';
      return;
    }
    
    levelUpMoves.forEach(move => {
      const moveEl = document.createElement('div');
      moveEl.className = 'move-item';
      moveEl.innerHTML = `
        <div class="move-name">${move.name}</div>
        <div class="move-level">Lv. ${move.level}</div>
      `;
      modalMoves.appendChild(moveEl);
    });
  } catch (error) {
    modalMoves.innerHTML = '<div>Failed to load moves.</div>';
  }
}

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
  }
});


