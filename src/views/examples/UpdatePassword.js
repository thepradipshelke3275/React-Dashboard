import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import * as Yup from "yup";
import * as actions from "../../store/creators";
import LinerLoader from "components/Loaders/LinerLoader";

const UpdatePassword = (props) => {
  const token = window.location.href.split("=")[1];
  const handleSubmit = (values, setSubmitting) => {
    let data = {
      token: token,
      password: values.password,
      confirmation_password: values.confirmation_password,
    };
    props.postUpdate(data);
    setSubmitting(false);
    return;
  };
  return (
    <React.Fragment>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h3>Update Password</h3>
            </div>
            <Formik
              initialValues={{
                password: "",
                confirmation_password: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                password: Yup.string().required("This field is required"),
                confirmation_password: Yup.string().when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                  ),
                }),
              })}
            >
              {(formProps) => (
                <Form role="form">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        placeholder="Password"
                        type="password"
                        id="password"
                        name="password"
                        // autoComplete="new-password"
                        className={
                          "form-control" +
                          (formProps.errors.password &&
                          formProps.touched.password
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        placeholder="Confirm Password"
                        type="password"
                        id="confirmation_password"
                        name="confirmation_password"
                        // autoComplete="new-confirmation_password"
                        className={
                          "form-control" +
                          (formProps.errors.confirmation_password &&
                          formProps.touched.confirmation_password
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="confirmation_password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>

                  <div className="text-center">
                    <Button
                      className="my-4"
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                    >
                      Update Password
                    </Button>
                  </div>
                  {props.update?.isLoading && <LinerLoader />}
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    update: state.update,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postUpdate: (data, toggle) => {
    dispatch(actions.postUpdate(data, toggle));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
