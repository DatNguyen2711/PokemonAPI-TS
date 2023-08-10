import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./Components/PokemonCollection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}
export interface Detail {
  id: number;
  isOpened: boolean;
}
const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetails, setDetails] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
  const getPokemon = async () => {
    setLoading(true);
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      .then((res) => {
        setNextUrl(res.data.next);
        res.data.results.map(async (pokemon: Pokemons) => {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          setPokemons((p) => [...p, poke.data]);
        });
      })

      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getPokemon();
  }, []);
  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);

    const newPokemons = await Promise.all(
      res.data.results.map(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        console.log(poke.data.length);

        return poke.data;
      })
    );

    setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetails={viewDetails}
          setDetails={setDetails}
        />
        {!viewDetails.isOpened && (
          <div className="btn" onClick={nextPage}>
            <button>{loading ? "Loading..." : "Load more"}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
