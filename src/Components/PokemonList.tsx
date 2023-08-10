import { Detail } from "../App";
import "./pokemon.css";
import React, { useEffect } from "react";
import { useState } from "react";
interface Props {
  viewDetails: Detail;
  setDetails: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  name: string;
  id: number;
  image: string;
}

const PokemonList: React.FC<Props> = (props) => {
  const { image, viewDetails, setDetails, name, abilities, id } = props;
  const closeDetail = () => {
    setDetails({
      id: 0,
      isOpened: false,
    });
  };
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(id === viewDetails?.id);
  }, [viewDetails]);
  return (
    <div className="">
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p onClick={closeDetail} className="detail-close">
              X
            </p>
          </div>
          <div className="detail-info">
            <img src={image} alt="pokemon" className="detail-img" />
            <p className="detail-name">{name}</p>
          </div>
          <div className="detail-skill">
            <p className="detail-ability">Abilities:</p>
            {abilities?.map((ability: any) => {
              return <div>{ability.ability.name}</div>;
            })}
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name"> {name}</p>

          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
