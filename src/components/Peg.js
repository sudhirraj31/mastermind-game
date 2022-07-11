import "./Peg.css";

const Peg = (props) => {
  return (
    <div className="peg">
      <label
        style={{ backgroundColor: `${props.color}` }}
        htmlFor={props.id}
        onClick={props.pegLabelHandler}
      >
        <input
          type="radio"
          id={props.id}
          name={props.name}
          value={props.value}
          onClick={props.onClick}
        />
      </label>
    </div>
  );
};

export default Peg;
