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
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-[2rem] sm:text-[4rem] font-bold dark:text-white">
            {data.word}
          </h1>
          {data.phonetic && (
            <span className="inline-block text-purple text-lg sm:text-2xl">
              {data.phonetic}
            </span>
          )}
        </div>
        <button
          className="border-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:grayscale"
          disabled={buttonDisabled}
          onClick={() => pronunciation.play()}
        >
          <img className="w-[48px] sm:w-[75px]" src={Play} alt="Play button" />
        </button>
      </div>

      {data.meanings.map(({ partOfSpeech, definitions, synonyms }, key) => (
        <section key={key}>
          <div className="flex items-center mb-8">
            <h2 className="mr-4 italic text-lg dark:text-white sm:text-2xl">
              {partOfSpeech}
            </h2>
            <hr className="w-contained h-[1px] border-none bg-lightGray dark:bg-darkGray" />
          </div>

          <h3 className="text-darkGray font-normal text-base sm:text-xl">
            Meaning
          </h3>
          <ul className="p-0 pl-4 list-disc my-4 sm:pl-8">
            {definitions.map(({ definition, example }, key) => (
              <li
                className="text-purple pl-1 pb-3 text-[15px] sm:text-lg"
                key={key}
              >
                <span className="text-lightBlack dark:text-white">
                  {definition}
                </span>
                {example && <p className="mt-3 text-darkGray">"{example}"</p>}
              </li>
            ))}
          </ul>

          {synonyms.length !== 0 && (
            <div className="flex flex-wrap items-center mb-8">
              <h3 className="mr-6 text-base font-normal text-darkGray sm:text-xl">
                Synonyms
              </h3>
              {synonyms.map((synonym, key) => (
                <span
                  className="mr-2 text-purple font-bold sm:text-xl"
                  key={key}
                >
                  {synonym}
                </span>
              ))}
            </div>
          )}
        </section>
      ))}
      <hr className="mb-6 w-contained h-[1px] border-none bg-lightGray dark:bg-lineGray" />
      <div className="pb-8 sm:flex sm:gap-6">
        <h4 className="underline text-darkGray text-sm font-normal sm:no-underline">
          Source
        </h4>
        <a
          className="text-lightBlack dark:text-white"
          href={data.sourceUrls[0]}
        >
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
