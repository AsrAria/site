// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
// MARK: project ui import
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import BasePage from "views/Base/BasePage";
import GregorianDatePicker from "components/Calendar/GregorianDatePicker.jsx";
import PsychiatristTimeBoxDialog from "views/Psychiatrist/TimeBox/PsychiatristTimeBoxDialog.jsx";
import profileStyle from "assets/styles/views/profileStyle.jsx";
// MARK: project imports
import { formatDateTime } from "helper/timeHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class PsychiatristTimeBoxesPage extends BasePage {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      date: new Date().toISOString().slice(0, 10)
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <div>
                  <div className={classes.cardTitleWhite}>Time schedule</div>
                  {this.props.app.loading > 0 ? (
                    <ReactLoading
                      className={classes.loadingItem}
                      type={"spin"}
                      height={30}
                      width={30}
                    />
                  ) : null}
                </div>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <GregorianDatePicker
                      date={this.state["date"]}
                      onChange={e => {
                        this.setState({
                          counter: this.state.counter + 1,
                          date: e
                        });
                      }}
                      title={"Date"}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Pagination
                      key={this.state.counter}
                      baseUrl={
                        "/psychiatrist/" +
                        this.props.user.profile.id +
                        "/time_box"
                      }
                      baseFilter={"&date=" + this.state.date}
                      title={"Time schedule"}
                      tableSize={[12, 12, 12]}
                      tableHead={[
                        {
                          name: "Start",
                          size: "100px"
                        },
                        {
                          name: "End",
                          size: "100px"
                        }
                      ]}
                      getItemId={item => {
                        return item.id;
                      }}
                      getItemName={() => {
                        return "Time box";
                      }}
                      getItemRow={item => {
                        return [
                          {
                            type: "text",
                            value: formatDateTime(item.start_time)
                          },
                          {
                            type: "text",
                            value: formatDateTime(item.end_time)
                          }
                        ];
                      }}
                      addDialog={PsychiatristTimeBoxDialog}
                      enableAdd={true}
                      enableEdit={false}
                      enableDelete={true}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

PsychiatristTimeBoxesPage.defaultProps = {
  app: {
    loading: 0
  },
  classes: {}
};

PsychiatristTimeBoxesPage.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  PsychiatristTimeBoxesPage,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  profileStyle
);
