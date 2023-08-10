import React from "react";
import { Pokemon, PokemonDetail } from "../../src/interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {
  pokemons: PokemonDetail[];
  viewDetails: Detail;
  setDetails: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetails, setDetails } = props;
  console.log(pokemons);

  const setSelectPokemon = (id: number) => {
    if (!viewDetails.isOpened) {
      setDetails({
        id: id,
        isOpened: true,
      });
    }
  };
  return (
    <section
      className={
        viewDetails.isOpened
          ? "collection-container-active"
          : "collection-container"
      }
    >
      {viewDetails.isOpened ? (
        <div className="overlay"></div>
      ) : (
        <div className=""></div>
      )}
      {pokemons.map((pokemon, index) => (
        <div
          onClick={() => setSelectPokemon(pokemon.id)}
          className="pokemon-item"
          key={index}
        >
          <PokemonList
            image={pokemon.sprites.front_default}
            key={pokemon.id}
            viewDetails={viewDetails}
            setDetails={setDetails}
            name={pokemon.name}
            abilities={pokemon.abilities}
            id={pokemon.id}
          />
        </div>
      ))}
    </section>
  );
};

export default PokemonCollection;
