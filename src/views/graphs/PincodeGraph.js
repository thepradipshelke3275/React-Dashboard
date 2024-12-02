import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/creators";
import { Card, CardBody, CardTitle, CardSubtitle, Col, Row } from "reactstrap";
import moment from "moment";
import { Line, Bar } from "react-chartjs-2";
import Scale from "../../components/Loaders/Scale";

const mapPropsToDispatch = (dispatch) => {
  return {
    // allPincodeStatsGetData: (token) =>
    //   dispatch(actions.allPincodeStatsGetData(token)),
  };
};

const mapStateToProps = (state) => {
  return {
    pincodeCount: state.pincodeCount,
    login: state.login,
  };
};

function PincodeGraph(props) {
  //token
  const token = props.login?.login?.token;

  useEffect(() => {
    // props.allPincodeStatsGetData(token);
  }, []);

  let startDate = moment().subtract(1, "months").format("YYYY-MM-DD");
  let endDate = moment().add(1, "day").format("YYYY-MM-DD");

  // let startDate = moment("2021-04-23").format("YYYY-MM-DD");
  // console.log("+-=-=", startDate);
  // let endDate = moment("2021-05-03").format("YYYY-MM-DD");

  let enumerateDaysBetweenDates = function (startDate, endDate) {
    let dates = [];

    let currDate = moment(startDate).startOf("day");
    let lastDate = moment(endDate).startOf("day");

    while (currDate.add(1, "days").diff(lastDate) < 0) {
      // console.log(currDate.format("YYYY-MM-DD"));
      dates.push(currDate.clone().format("YYYY-MM-DD"));
    }

    return dates;
  };

  const dates = enumerateDaysBetweenDates(startDate, endDate);
  console.log("++++", dates.length);

  //Line chart
  let lineData = {
    labels: props?.pincodeCount?.pincodeCount?.data?.map(
      (el) => el.prop_pincode
    ),

    // labels: props?.allStats?.allStats?.enquiries?.map((o) => o.Created_Day),
    //labels: [10, 20, 30, 40, 50],
    datasets: [
      {
        label: "Properties",
        borderWidth: 1,
        backgroundColor: "rgba(238,210,2,.1)",
        borderColor: "rgb(238,210,2)",
        pointBorderColor: "rgb(238,210,2)",
        pointBackgroundColor: "rgb(238,210,2)",
        data: props?.pincodeCount?.pincodeCount?.data?.map((o) => ({
          y: o.prop_counts,
          x: o.prop_pincode,
        })),
        // data: [1, 2, 5, 7, 8, 10],
      },
    ],
  };
  console.log("lineData pin", lineData);
// testing data
  // const labels = Utils.months({ count: 7 });
 const  labels = [10, 20, 30, 40, 50];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card>
      <CardBody>
        {props?.pincodeCount?.isLoading ? (
          // <div>Loading..</div>
          <div
            className="chart-wrapper"
            style={{
              width: "100%",
              margin: "0 auto",
              height: 250,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Scale />
          </div>
        ) : (
          <>
            <div className="d-flex align-items-center">
              <div className="d-flex flex-column">
                <CardTitle>Numbers Summary</CardTitle>
                {/* <CardSubtitle>Summary of the month</CardSubtitle> */}
              </div>
              <div className="ml-auto d-flex align-items-center">
                <ul className="list-inline font-12 dl mr-3 mb-0">
                  <li className="border-0 p-0 text-warning list-inline-item">
                    <i className="fa fa-circle"></i> Numbers
                  </li>
                </ul>
              </div>
            </div>
            <Row>
              <Col lg="12">
                <div className="campaign ct-charts">
                  <div
                    className="chart-wrapper"
                    style={{ width: "100%", margin: "0 auto", height: 250 }}
                  >
                    <Bar
                      data={data}
                      options={{
                        tooltips: {
                          mode: "x-axis",
                        },
                        maintainAspectRatio: false,
                        legend: {
                          display: false,
                          labels: { fontFamily: "Nunito Sans" },
                        },
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default connect(mapStateToProps, mapPropsToDispatch)(PincodeGraph);
