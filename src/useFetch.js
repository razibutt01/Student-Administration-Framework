import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setpending] = useState(true);
  const [error, seterror] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((list) => {
        setData(list);
        setpending(false);
        seterror(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          seterror(err.message);
          setpending(false);
        }
      });
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
