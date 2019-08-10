import React from "react";
import "./primaryNewsBoxAbout.css";
import {LABEL_ABOUT} from "../../constants";

export default function PrimaryNewsBoxAbout() {
 
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
      <aside className="info-about-label">{LABEL_ABOUT}</aside>

      <div className="info-about-body">
        <p>
        The Qlik Core Refugee Project is an open source learning project by <a href="http://www.qliklab.ch/" target="_new"><span className="author-link">Patric Amatulli</span></a> and <span className="author-link">Alexander Torngren</span>, which was created by using Qlik Core, React and Docker Container. The journey started at the Qlik Master Summit 2019 in Sweden during the hackathon with the goal to provide a valuable user experience using the Qlik Core Associative Engine and open source visualization libraries to provide insights to the refugees and migration topic around the world.
        The design is inspired to <a href="https://studioijeoma.com/" target="_new"><span className="about-link">Ekene Ijeoma</span></a> and <a href="https://studioijeoma.com/" target="_new"><span className="about-link">Hyperakt</span></a> Refugees project. So special thanks goes to them for the inspiring UI!
        The refugee data was provided by the <a href="https://masterssummit.com/" target="_new"><span className="about-link">Qlik Master Summit</span> </a> Team, as for the news and stories we used the <a href="https://www.newsdeeply.com/" target="_new"><span className="about-link">News Deeply</span></a> feed.
        </p>
       
      </div>
    </div>
  );
}
