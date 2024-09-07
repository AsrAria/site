const profileStyle = () => ({
  inputLTR: {
    direction: "ltr"
  },
  mainBox: {
    width: "500px"
  },
  horizontal: {
    display: "flex"
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
  },
  photoBox: {
    position: "relative",
    width: "100%",
    paddingTop: "133%",
    marginTop: "10px",
    marginBottom: "10px"
  },
  imageCard: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#F0F0F0",
    objectFit: "cover"
  },
  imageTitle: {
    color: "#303030",
    fontSize: "14px",
    marginTop: "10px"
  },
  imageAddIcon: {
    width: "80px",
    height: "80px",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-40px",
    marginLeft: "-40px",
    border: "none",
    fontSize: "80px",
    color: "#C0C0C0",
    opacity: "0.5"
  },
  imageDeleteIcon: {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "10px",
    left: "10px",
    border: "none",
    fontSize: "30px",
    color: "#FF0000",
    opacity: "0.9",
    padding: "7px",
    borderRadius: "15px",
    backgroundColor: "#FFFFFF",
    cursor: "pointer"
  },
  fileInput: {
    display: "none"
  },
  fileButton: {
    height: "40px",
    float: "left",
    marginTop: "20px",
    marginLeft: "15px"
  },
  checkItem: {
    marginTop: "12px",
    borderBottom: "1px solid #dbdbdb"
  },
  checkBox: {
    float: "left"
  },
  checkTitle: {
    lineHeight: "45px",
    marginRight: "0px",
    fontSize: "15px",
    color: "black",
    textAlign: "left"
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  selectButton: {
    height: "40px",
    float: "left",
    marginTop: "20px",
    marginLeft: "15px"
  },
  downloadButton: {
    height: "40px",
    float: "left",
    marginTop: "20px",
    marginRight: "15px"
  }
});

export default profileStyle;
