import React from "react";
import "./primaryInfoBoxAbout.css";

export default function PrimaryInfoBoxAbout() {
 
  const styleContent = {
    transform: {
      transformOrigin: "center 50% 0px",
      transform: "matrix(1, 0, 0, 1, 0, 0)"
    }
  };
  return (
    <div
      className="info-about about"
      data-3dhover=""
      style={styleContent.transform}
    >
      <aside className="info-about-label">About</aside>

      <div className="info-about-body">
        <p>
          Lorem opossum solitary what consumed nomadic scratchy big then call
          tlacuache tail. Consumed ears tlacuache didelphimorph marsupial fur
          hunted white beast nomadic big marsupial one. Fur and opossum beast
          what tail then one dangle one pelt bitey. Didelphimorph snout pelt fur
          prehensile where big consumed fur solitary scratchy. Call how fur what
          oil white prehensile solitary is hunted manicou. Didelphimorph one
          tlacuache and bitey scratchy tlacuache tail dangle fur call nomadic
          tail. Prehensile white scratchy prehensile opossum one prehensile oil
          tail prehensile and omnivore beast hunted. Hunted dangle oil the fur
          solitary consumed snout. Prehensile opossum prehensile white a tail
          trees prehensile bitey beast pelt how. Prehensile tail nomadic tail
          manicou is nomadic trees hunted.
        </p>
      </div>
    </div>
  );
}
