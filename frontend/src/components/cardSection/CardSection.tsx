import React from "react";
import "./CardSection.css";
import { cardsData } from "@/data/data";
import SingleCard from "../singleCard/SingleCard";

const CardSection: React.FC = () => {
  return (
    <div className="cardSection">
      {cardsData?.map((elem, i) => (
        <SingleCard
          title={elem.title}
          desc={elem.desc}
          iconPath={elem.iconPath}
          key={i}
        />
      ))}
    </div>
  );
};

export default CardSection;
