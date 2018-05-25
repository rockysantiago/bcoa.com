import React from "react";

export default ({ image }) => {
  return <img src={image.image} alt={image.altText} />;
};
