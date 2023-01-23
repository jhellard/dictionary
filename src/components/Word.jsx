import React from "react";

import NewWindow from "../assets/images/icon-new-window.svg";

const Word = ({ data }) => {
  console.log(data);
  return (
    <section className="word">
      <div>
        <h1 className="word__word">{data.word}</h1>
        <span className="word__phonetic">{data.phonetic}</span>
      </div>
      {data.meanings.map((meaning, key) => {
        return (
          <section key={key}>
            <div className="word__container">
              <h2 className="word__speech">{meaning.partOfSpeech}</h2>
              <hr className="word__line" />
            </div>

            <h3 className="word__meaning">Meaning</h3>
            <ul className="word__list">
              {meaning.definitions.map((definition, key) => {
                return (
                  <li className="word__definition" key={key}>
                    <span>{definition.definition}</span>
                  </li>
                );
              })}
            </ul>
            <div className="word__synonyms">
              {meaning.synonyms.length !== 0 && <h3>Synonyms</h3>}
              {meaning.synonyms.map((synonym, key) => {
                return (
                  <span className="word__synonym" key={key}>
                    {synonym}
                  </span>
                );
              })}
            </div>
          </section>
        );
      })}
      <hr className="bottom-line" />
      <div className="source">
        <h4 className="source__heading">Source</h4>
        <a className="source__link" href={data.sourceUrls[0]}>
          {data.sourceUrls[0]}
          <img src={NewWindow} alt="Arrow to external link" />
        </a>
      </div>
    </section>
  );
};

export default Word;
