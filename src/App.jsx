import React, { useRef } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Word from "./components/Word";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";

import Logo from "./assets/images/logo.svg";
import Search from "./assets/images/icon-search.svg";

const App = () => {
  const queryClient = useQueryClient();
  const userWord = useRef("keyboard");

  const { isLoading, isSuccess, isError, error, data } = useQuery({
    queryKey: ["word"],
    queryFn: () =>
      axios
        .get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${
            userWord.current === "keyboard"
              ? userWord.current
              : userWord.current.value
          }`
        )
        .then((res) => res.data),
  });

  const handleInput = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries(["word"]);
  };

  if (isLoading) return <Loading />;

  return (
    <main className="width main">
      <header className="header">
        <img src={Logo} alt="Dictionary Logo" />
      </header>
      <form onSubmit={(e) => handleInput(e)} className="search">
        <input
          required
          className="search__input"
          type="text"
          ref={userWord}
          placeholder="Search for any word..."
        />
        <button className="search__button">
          <img src={Search} alt="Search Button" />
        </button>
      </form>
      {isError && <ErrorPage error={error.response.data} />}
      {isSuccess && <Word data={data[0]} />}
    </main>
  );
};

export default App;
