import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
// import PincodeGraph from "./graphs/PincodeGraph";
// import PropertiesGraph from "./graphs/PropertiesGraph";

const Index = () => {
  return (
    <>
      {/* <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <PincodeGraph />
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <PropertiesGraph />
            </Card>
          </Col>
        </Row>
      </Container> */}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    count: state.count,
    bpoGraph: state.bpoGraph,
    GBQGraph: state.GBQGraph,
    project: state.project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
