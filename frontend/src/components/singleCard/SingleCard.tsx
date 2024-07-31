import React from "react";
import "./SingleCard.css";

interface SingleCardProps {
  title: string;
  desc: string;
  iconPath: string;
}

const SingleCard: React.FC<SingleCardProps> = ({ title, desc, iconPath }) => {
  return (
    <div className="singleCard">
      <img src={iconPath} alt={`${title} icon`} className="singleCardIcon" />
      <div>
        <h3 className="singleCardTitle">{title}</h3>
        <p className="singleCardDesc">{desc}</p>
      </div>
    </div>
  );
};

export default SingleCard;
