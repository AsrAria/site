const loginStyle = () => ({
  inputLTR: {
    direction: "ltr"
  },
  background: {
    height: "calc(100vh - 40px)",
    margin: "10px",
    position: "relative"
  },
  mainBox: {
    maxWidth: "400px",
    margin: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  cardTitleWhite: {
    width: "50%",
    height: "30px",
    float: "left",
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "5px",
    fontSize: "17px"
  },
  logoutButton: {
    cursor: "pointer",
    color: "blue"
  },
  loadingItem: {
    width: "50%",
    marginTop: "12px",
    marginBottom: "12px",
    float: "right"
  },
  bottomOptions: {
    width: "100%"
  },
  submitButton: {
    height: "40px",
    float: "right"
  },
  remainingTitle: {
    marginLeft: "10px"
  }
});

export default loginStyle;
