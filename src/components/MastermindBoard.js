import "./MastermindBoard.css";
import { useMemo, useState } from "react";
import Pegs from "./Pegs";
import DecodeRow from "./DecodeRow";

// control the game from here,
//how many attempts or pegs in one chance should be given
const ATTEMPTS = 10;
const PEGSINROW = 4;

// pegs to choose from
const CODES = [
  "#FFB400",
  "#FF5A5F",
  "#8CE071",
  "#00D1C1",
  "#007A87",
  "#7B0051",
];

const MastermindBoard = () => {
  // track which peg is selected
  const [selectedPeg, setSelectedPeg] = useState("0");
  // track which decode row is currently activated
  const [activatedRow, setActivatedRow] = useState(0);

  // success code created here
  const SUCCESSCODE = useMemo(() => {
    const _code = new Map();
    let min = 0;
    let max = 5;
    for (let i = 0; i < 4; i++) {
      _code.set(i, CODES[Math.floor(Math.random() * (max - min + 1)) + min]);
    }
    return _code;
  }, []);

  // for printing decode rows
  const decodeRows = new Array(ATTEMPTS);
  // correct guess in console
  // console.log(SUCCESSCODE);
  return (
    <div className="mastermind-board">
      <div className="decode-board">
        {decodeRows.fill().map((_, i) => {
          return (
            <DecodeRow
              key={i}
              SUCCESSCODE={SUCCESSCODE}
              CODES={CODES}
              PEGSINROW={PEGSINROW}
              ATTEMPTS={ATTEMPTS}
              selectedPeg={selectedPeg}
              rowId={i}
              activatedRow={activatedRow}
              setActivatedRow={setActivatedRow}
            />
          );
        })}
      </div>
      <div className="codes">
        <Pegs
          colors={CODES}
          selectedPeg={selectedPeg}
          setSelectedPeg={setSelectedPeg}
        />
      </div>
    </div>
  );
};

export default MastermindBoard;
