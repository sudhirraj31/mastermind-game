import "./App.css";
import { useEffect, useRef, useState } from "react";

import MastermindBoard from "./components/MastermindBoard";

export default function App() {
  // rules display state
  const [displayRules, setDisplayRules] = useState(false);
  // using ref to element updated state for display
  const ruleRef = useRef();
  useEffect(() => {
    ruleRef.current.style.display = displayRules ? "block" : "none";
  }, [displayRules]);

  // In this module, entry to Mastermind module only, rest are there

  return (
    <div className="App">
      <h1>MASTERMIND</h1>
      <div
        onClick={() => setDisplayRules(!displayRules)}
        style={{ cursor: "pointer" }}
      >
        {displayRules ? <h4>Hide Rules</h4> : <h4>Show Rules</h4>}
      </div>
      <p ref={ruleRef} style={{ border: "#000 1px solid", padding: "10px" }}>
        Try to guess the pattern, in both order and color, within ten turns.
        After submitting a row, a small green peg is placed for each code peg
        from the guess which is correct in both color and position. A white peg
        indicates the existence of a correct color code peg placed in the wrong
        position. And red peg corresponds to both color and position is wrong.
        More info on{" "}
        <a
          href="https://en.wikipedia.org/wiki/Mastermind_(board_game)"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Wikipedia
        </a>
        .
      </p>
      <MastermindBoard />
    </div>
  );
}
