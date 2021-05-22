import React, { ReactElement } from "react";
import classes from "./styles";

const urlSkyScanner = "https://www.skyscanner.com/";
const urlKayak = "https://www.kayak.fr/flights";
const urlGovoyages = "https://www.govoyages.com/";
const urlLastMinutes = "https://www.lastminute.com/";

export default function Links(): ReactElement {
  return (
    <>
      <a
        href={urlSkyScanner}
        className={`${classes.link} bg-skyScanner`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>skyscanner</span>
      </a>
      <a
        href={urlLastMinutes}
        className={`${classes.link} bg-lastMinutes`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>Last minutes</span>
      </a>
      <a
        href={urlGovoyages}
        className={`${classes.link} bg-goVoyages`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>Govoyages</span>
      </a>
      <a
        href={urlKayak}
        className={`${classes.link} bg-kayak`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>Kayak</span>
      </a>
    </>
  );
}
