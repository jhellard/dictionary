import React, { useState, useEffect } from "react";

import NewWindow from "../assets/images/icon-new-window.svg";
import Play from "../assets/images/icon-play.svg";

const Word = ({ data }) => {
  const [pronunciation, setPronunciation] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const phoneticWithAudio = data.phonetics.find(({ audio }) => audio);
    setPronunciation(phoneticWithAudio && new Audio(phoneticWithAudio.audio));
    setButtonDisabled(!phoneticWithAudio);
  }, [data]);

  return (
    <section className="word">
      <div className="word__wrapper">
        <div>
          <h1 className="word__word">{data.word}</h1>
          {data.phonetic && (
            <span className="word__phonetic">{data.phonetic}</span>
          )}
        </div>
        <button disabled={buttonDisabled} onClick={() => pronunciation.play()}>
          <img src={Play} alt="Play button" />
        </button>
      </div>

      {data.meanings.map(({ partOfSpeech, definitions, synonyms }, key) => (
        <section key={key}>
          <div className="word__container">
            <h2 className="word__speech">{partOfSpeech}</h2>
            <hr className="word__line" />
          </div>

          <h3 className="word__meaning">Meaning</h3>
          <ul className="word__list">
            {definitions.map(({ definition, example }, key) => (
              <li className="word__definition" key={key}>
                <span>{definition}</span>
                {example && <p className="word__example">"{example}"</p>}
              </li>
            ))}
          </ul>

          {synonyms.length !== 0 && (
            <div className="word__synonyms">
              <h3>Synonyms</h3>
              {synonyms.map((synonym, key) => (
                <span className="word__synonym" key={key}>
                  {synonym}
                </span>
              ))}
            </div>
          )}
        </section>
      ))}
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
