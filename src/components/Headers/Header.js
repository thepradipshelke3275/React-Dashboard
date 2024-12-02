// reactstrap components
import CircularLoader from "components/Loaders/CircularLoader";
import "./style.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import * as actions from "../../store/creators";

const Header = (props) => {
  let data = {
    token: props.login?.login?.token,
  };
  useEffect(() => {
    if (window.location.hash === "#/admin/index") {
      // props.countGetData(data);
      props.usersGetData(data);
      props.onDeviceGetData(data);
      props.onLocationGetData(data);
    }
  }, []);
  return (
    <div
      className={`header bg-gradient-info ${
        window.location.hash === "#/admin/index"
          ? "pb-8 pt-5 pt-md-8"
          : "pb-4 pt-4 pt-md-6"
      }`}
    >
      <Container fluid>
        <div className="header-body">
          {window.location.hash === "#/admin/index" ? (
            <>
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Users
                          </CardTitle>
                          {props.users.isLoading ? (
                            <CircularLoader />
                          ) : (
                            <span className="h2 font-weight-bold mb-0">
                              {props.users?.users?.length}
                            </span>
                          )}
                          
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-user" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Device
                          </CardTitle>
                          {props.device.isLoading ? (
                            <CircularLoader />
                          ) : (
                            <span className="h2 font-weight-bold mb-0">
                              {props.device?.device?.length}
                            </span>
                          )}
                          
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-arrow-alt-circle-left" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Location
                          </CardTitle>
                          {props.location.isLoading ? (
                            <CircularLoader />
                          ) : (
                            <span className="h2 font-weight-bold mb-0">
                              {props.location?.location?.length}
                            </span>
                          )}
                          
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.entities.users,
    device: state.entities.device,
    location: state.entities.location,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    usersGetData: (data) => dispatch(actions.usersGetData(data)),
    onDeviceGetData: (data) => dispatch(actions.deviceGetData(data)),
    onLocationGetData: (data) => dispatch(actions.locationGetData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
