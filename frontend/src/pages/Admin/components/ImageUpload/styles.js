const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#ccc",
  color: "#000",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#000",
};

const acceptStyle = {
  borderColor: "#000",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export { baseStyle, focusedStyle, acceptStyle, rejectStyle };
