import Peg from "./Peg";

const Pegs = ({ colors, selectedPeg, setSelectedPeg }) => {
  // selected the peg and updated selected peg state
  const pegHandler = (e) => {
    setSelectedPeg(e.target.value);
  };

  return (
    <div>
      {colors.map((color, i) => {
        return (
          <Peg
            key={i}
            id={`Peg-${i}`}
            name={"Peg"}
            value={i}
            color={color}
            onClick={pegHandler}
          />
        );
      })}
    </div>
  );
};

export default Pegs;
