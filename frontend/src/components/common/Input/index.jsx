import PropTypes from "prop-types";

function Input({
  value,
  onChangeHandler,
  inputType,
  placeHolder,
}) {
  return (
    <div>
      <input
        type={inputType}
        value={value}
        onChange={(event) => onChangeHandler(event.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
}

Input.defaultProps = {
  inputType: "text",
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  inputType: PropTypes.oneOf(["text", "password"]),
  placeHolder: PropTypes.string.isRequired,
};

export default Input;
