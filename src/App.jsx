import React, { useRef } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Word from "./components/Word";

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

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;

  return (
    <main className="width">
      <input type="text" ref={userWord} />
      <button onClick={() => queryClient.invalidateQueries(["word"])}>
        Search
      </button>
      {isSuccess && <Word data={data[0]} />}
    </main>
  );
};

export default App;
