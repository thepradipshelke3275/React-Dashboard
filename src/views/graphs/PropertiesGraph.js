import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/creators";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import moment from "moment";
import { Pie, Bar } from "react-chartjs-2";
import Scale from "../../components/Loaders/Scale";

const mapPropsToDispatch = (dispatch) => {
  return {
    // allPropStatsGetData: (token) =>
    //   dispatch(actions.allPropStatsGetData(token)),
  };
};

const mapStateToProps = (state) => {
  return {
    propCount: state.propCount,
    login: state.login,
  };
};

function PropertiesGraph(props) {
  console.log("props properties", props);
  const token = props.login?.login?.token;

  useEffect(() => {
    // props.allPropStatsGetData(token);
  }, []);
  let lineData = {
    labels: [
      "Shop",
      "Showroom",
      "Office",
      "Villa",
      "Flat",
      "House",
      "FarmHouse",
      "Other",
    ],
    datasets: [
      {
        label: "Properties",
        borderWidth: 1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(256, 160, 65, 0.2)",
          "rgba(257, 161, 66, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(256, 160, 65, 1)",
          "rgba(257, 161, 66, 1)",
        ],
        pointBorderColor: "rgb(238,210,2)",
        pointBackgroundColor: "rgb(238,210,2)",
        data: [
          props.propCount?.propCount?.data?.shop_count ?? "2",
          props.propCount?.propCount?.data?.showroom_count ?? "5",
          props.propCount?.propCount?.data?.office_count ?? "6",
          props.propCount?.propCount?.data?.villa_count ?? "9",
          props.propCount?.propCount?.data?.flat_count ?? "0",
          props.propCount?.propCount?.data?.house_count ?? "1",
          props.propCount?.propCount?.data?.farm_house_count ?? "2",
          props.propCount?.propCount?.data?.other_count ?? "1",
        ],
      },
    ],
  };
  console.log("lineData prop", lineData);
  return (
    <Card>
      <CardBody>
        {props?.propCount?.isLoading ? (
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
                <CardTitle> Industy  Summary</CardTitle>
                {/* <CardSubtitle>Summary of the month</CardSubtitle> */}
              </div>
              <div className="ml-auto d-flex align-items-center">
                <ul className="list-inline font-12 dl mr-3 mb-0">
                  <li className="border-0 p-0 text-warning list-inline-item">
                    <i className="fa fa-circle"></i>  Industy 
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
                    <Pie
                      data={lineData}
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

export default connect(mapStateToProps, mapPropsToDispatch)(PropertiesGraph);
