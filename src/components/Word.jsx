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
    <section>
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-[2rem] font-bold">{data.word}</h1>
          {data.phonetic && (
            <span className="inline-block text-purple text-lg">
              {data.phonetic}
            </span>
          )}
        </div>
        <button
          className="border-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:grayscale"
          disabled={buttonDisabled}
          onClick={() => pronunciation.play()}
        >
          <img className="w-[48px]" src={Play} alt="Play button" />
        </button>
      </div>

      {data.meanings.map(({ partOfSpeech, definitions, synonyms }, key) => (
        <section key={key}>
          <div className="flex items-center mb-8">
            <h2 className="mr-4 italic text-lg">{partOfSpeech}</h2>
            <hr className="w-contained h-[1px] border-none bg-lightGray" />
          </div>

          <h3 className="text-darkGray font-normal text-base">Meaning</h3>
          <ul className="p-0 pl-4 list-disc my-4">
            {definitions.map(({ definition, example }, key) => (
              <li className="text-purple pl-1 pb-3 text-[15px]" key={key}>
                <span className="text-lightBlack">{definition}</span>
                {example && <p className="mt-3 text-darkGray">"{example}"</p>}
              </li>
            ))}
          </ul>

          {synonyms.length !== 0 && (
            <div className="flex flex-wrap items-center mb-8">
              <h3 className="mr-6 text-base font-normal text-darkGray">
                Synonyms
              </h3>
              {synonyms.map((synonym, key) => (
                <span className="mr-2 text-purple font-bold" key={key}>
                  {synonym}
                </span>
              ))}
            </div>
          )}
        </section>
      ))}
      <hr className="mb-6 w-contained h-[1px] border-none bg-lightGray" />
      <div className="mb-[85px]">
        <h4 className="underline text-darkGray text-sm font-normal">Source</h4>
        <a className="text-lightBlack" href={data.sourceUrls[0]}>
          {data.sourceUrls[0]}
          <img
            className="ml-2 inline-block"
            src={NewWindow}
            alt="Arrow to external link"
          />
        </a>
      </div>
    </section>
  );
};

export default Word;
