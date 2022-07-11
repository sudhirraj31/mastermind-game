import "./DecodeRow.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Peg from "./Peg";

const DecodeRow = (props) => {
  // current decode row guesses
  const [currentGuess, setCurrentGuess] = useState({});
  // for tracking if current decode row is submitted or not
  const [pegsSubmitted, setPegsSubmitted] = useState(false);
  // decode pegs count
  const decodeRowPegs = new Array(props.PEGSINROW);
  // decode pegs hints count
  const decodeRowHints = new Array(props.PEGSINROW).fill("");
  // hints updated when pegs are submitted
  const [updatedHints, setUpdatedHints] = useState([]);

  // setting current peg guesses
  // storing as a object
  const handleDecodeRowClick = (e) => {
    setCurrentGuess({
      ...currentGuess,
      [e.target.name]: props.selectedPeg,
    });
  };

  // filling peg color in decoding row
  const pegLabelHandler = (e) => {
    e.target.style.backgroundColor = `${props.CODES[props.selectedPeg]}`;
  };

  // peg submit handler
  const handleDecodeRowSubmit = () => {
    // approach is very simple i compared each guess with success-code
    // started with these two variables
    let exactMatches = 0;
    let noMatches = 0;
    for (let [key, value] of props.SUCCESSCODE) {
      // if value and position matches then exact-matches increment
      if (props.CODES[currentGuess[key]] === value) {
        exactMatches++;
      } else {
        // else checked for success code value in currentguess object values
        const currentGuessValues = Object.values(currentGuess).map(
          (val) => props.CODES[val]
        );
        // if not found then no matches increment
        if (!currentGuessValues.includes(value)) {
          noMatches++;
        }
      }
    }

    // if all matches are correct => WINS!! window reloads
    if (exactMatches === props.PEGSINROW) {
      alert("Congratulations... You win!!!");
      if (window.confirm("Want to play again?")) {
        window.location.reload();
      }
    } else {
      // else to continue the game next decode row highlights
      let prevActivatedRow = props.activatedRow;
      prevActivatedRow++;
      props.setActivatedRow(prevActivatedRow);
    }
    // if all chances are Over
    if (props.rowId === props.ATTEMPTS - 1) {
      if (window.confirm("You are out of chances!! Want to play again?")) {
        window.location.reload();
      }
    }

    setPegsSubmitted(true);

    // here we have exact matches and no matches
    // it means rest pegs are not in correct position
    let matches = props.PEGSINROW - exactMatches - noMatches;
    //Hints effect
    // here i'm going to update our hints array with background colors
    // red => incorrect color or position , green => correct color or position
    const _matches = new Array(matches).fill("");
    const _exactMatch = new Array(exactMatches).fill("green");
    const _noMatch = new Array(noMatches).fill("red");
    let _decodeRowHints = [..._matches, ..._exactMatch, ..._noMatch];
    // here update our hints array state with above array
    setUpdatedHints([..._decodeRowHints]);

    // console.log(
    //   "exac; ",
    //   exactMatches,
    //   "mstches: ",
    //   matches,
    //   "no mathces: ",
    //   noMatches
    // );
  };

  return (
    <div
      className={`row decode-row ${
        props.rowId === props.activatedRow
          ? "decode-row-activated"
          : "decode-row-disabled"
      }`}
    >
      <div className="row decode-row-pegs">
        {decodeRowPegs.fill().map((_, i) => {
          return (
            <Peg
              key={`decodeRow-${props.rowId}-${i}`}
              id={`decodeRow-${props.rowId}-${i}`}
              name={i}
              value={currentGuess[`decodeRow-${props.rowId}-${i}`]}
              onClick={(e) => handleDecodeRowClick(e)}
              pegLabelHandler={pegLabelHandler}
            />
          );
        })}
      </div>
      <div className="submit-pegs">
        {props.activatedRow === props.rowId &&
        Object.keys(currentGuess).length === props.PEGSINROW ? (
          <FaCheck color={"#B4BB69"} onClick={handleDecodeRowSubmit} />
        ) : null}
      </div>
      <div className="row hints">
        {(pegsSubmitted ? updatedHints : decodeRowHints).map((_, i) => {
          return <Hint key={i} backgroundColor={_} />;
        })}
      </div>
    </div>
  );
};

export default DecodeRow;

const Hint = (props) => {
  return (
    <div
      className="hint"
      style={{ backgroundColor: props.backgroundColor }}
    ></div>
  );
};
