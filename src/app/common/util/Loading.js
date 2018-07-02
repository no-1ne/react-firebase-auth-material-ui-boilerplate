import React from "react";
//isLoading : A boolean prop passed to this Loading function,if component is Loading return true ,otherwise false
//pastDelay : A boolean prop passed to this Loading function after a set delay(default 200 milliseconds)
//error :An Error object passed to this Loading function when the loader has failed. When there is no error, null is passed
export default function Loading({ isLoading, pastDelay, error }) {
  if (isLoading && pastDelay) {
    return <p>Loading...</p>;
  } else if (error && !isLoading) {
    return <p>Error!</p>;
  } else {
    return null;
  }
}
