import { roseColor } from "assets/styles/material-dashboard-react.jsx";

const dialogStyle = () => ({
  main: {
    width: "1000px"
  },
  horizontal: {
    display: "flex"
  },
  dialog: {
    maxWidth: "1000px"
  },
  dialogContent: {
    paddingTop: "20px",
    paddingBottom: "15px"
  },
  inputLTR: {
    direction: "ltr"
  },
  cardTitleWhite: {
    width: "70%",
    height: "30px",
    float: "left",
    marginTop: "12px",
    marginBottom: "12px",
    marginRight: "5px",
    fontSize: "17px"
  },
  divider: {
    marginTop: "15px",
    marginBottom: "10px"
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
  chipItem: {
    margin: "5px",
    paddingLeft: "15px",
    paddingRight: "10px",
    background: roseColor,
    color: "white",
    "&:focus": {
      background: roseColor
    }
  },
  addButton: {
    height: "40px",
    float: "left",
    marginTop: "7px",
    marginLeft: "15px",
    minWidth: "130px"
  },
  addButtonBig: {
    width: "100%",
    height: "40px",
    float: "left",
    marginTop: "10px",
    marginBottom: "20px",
    minWidth: "130px"
  },
  deleteButton: {
    width: "100%",
    height: "40px",
    float: "left",
    marginTop: "15px",
    marginLeft: "15px"
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
  },
  submitButton: {
    height: "40px",
    float: "right"
  },
  formBox: {
    position: "relative",
    width: "100%",
    paddingTop: "100%",
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
  moveDown: {
    width: "25px",
    cursor: "pointer",
    color: "rgba(0, 0, 0, 0.26)",
    "&:hover": {
      color: "rgba(0, 0, 0, 0.4)"
    },
    WebkitTapHighlightColor: "transparent"
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
  tab: {
    minWidth: 10
  },
  imageTitle: {
    color: "#303030",
    fontSize: "14px",
    marginTop: "10px"
  },
  chart: {
    height: "300px",
    margin: "20px"
  },
  hintText: {
    color: "#BABABA",
    fontSize: "14px"
  },
  centerLoadingBox: {
    height: "30px"
  },
  centerLoadingDialog: {
    position: "absolute",
    left: "50%",
    marginLeft: "-15px"
  },
  suggestionList: {
    width: "130px",
    minHeight: "300px",
    fontSize: "14px",
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: "#FAFAFA",
    borderRadius: "10px",
    margin: "5px"
  },
  suggestionItem: {
    width: "calc(100% - 20px)",
    fontSize: "14px",
    textAlign: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: "10px",
    padding: "5px",
    margin: "5px",
    cursor: "pointer"
  },
  suggestionItemSelected: {
    width: "calc(100% - 20px)",
    fontSize: "12px",
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#4caf50",
    borderRadius: "10px",
    padding: "5px",
    margin: "5px",
    cursor: "pointer"
  },
  nextButton: {
    width: "120px",
    height: "40px",
    float: "right"
  },
  previousButton: {
    width: "120px",
    height: "40px",
    float: "left"
  },
  psychiatristItem: {
    height: "200px",
    width: "calc(100% - 40px)",
    padding: "20px"
  },
  psychiatristBox: {
    height: "200px",
    width: "calc(100% - 40px)",
    padding: "20px"
  },
  psychiatristImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50px",
    position: "absolute",
    left: "50%",
    marginLeft: "-50px"
  },
  psychiatristName: {
    width: "100%",
    textAlign: "center",
    fontSize: "17px",
    position: "absolute",
    top: "130px",
    left: "0px"
  },
  psychiatristButton: {
    width: "90px",
    height: "35px",
    marginRight: "10px",
    position: "absolute",
    left: "50%",
    marginTop: "170px",
    marginLeft: "-45px"
  }
});

export default dialogStyle;
