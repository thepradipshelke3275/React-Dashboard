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
  CardFooter,
} from "reactstrap";
import { Redirect, withRouter, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as actions from "../../store/creators";
import CustomInput from "views/Views/CustomInput";
import LinerLoader from "components/Loaders/LinerLoader";

const mapStateToProps = (state) => {
  return {
    login: state.login,
    forgot: state.forgot, 
  };
};

const mapDispatchToProps = (dispatch) => ({
  postForgot: (data, toggle) => {
    dispatch(actions.postForgot(data, toggle));
  },
});
const ForgotPassword = (props) => {
  const history = useHistory();
  const toggle = () => {
    history.push("/auth/login");
  };
  const handleSubmit = (values) => {
    let data = {
      email: values.email,
    };
    console.log("forgot data", data);
    props.postForgot(data, toggle);
    return;
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h3>Forgot Password</h3>
            </div>
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                email: Yup.string().required("Enter Your Email"),
              })}
            >
              {(formProps) => (
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="company@email.com"
                        className={
                          "form-control" +
                          (formProps.errors.email && formProps.touched.email
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="email"
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
                      Submit
                    </Button>
                  </div>
                  {props.forgot?.isLoading && <LinerLoader />}
                </Form>
              )}
            </Formik>
          </CardBody>
         
        </Card>
      </Col>
    </>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
