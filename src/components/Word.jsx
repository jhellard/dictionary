import React from "react";

const Word = ({ data }) => {
  console.log(data);
  return (
    <section className="word">
      <div>
        <h1 className="word__word">{data.word}</h1>
        <span>{data.phonetic}</span>
      </div>
      {data.meanings.map((meaning, key) => {
        return (
          <section key={key}>
            <h2>{meaning.partOfSpeech}</h2>
            <p>Meaning</p>
            <ul>
              {meaning.definitions.map((definition, key) => {
                return <li key={key}>{definition.definition}</li>;
              })}
            </ul>
          </section>
        );
      })}
      <hr />
      <div>
        <h4>Source</h4>
        <a href={data.sourceUrls[0]}>{data.sourceUrls[0]}</a>
      </div>
    </section>
  );
};

export default Word;
