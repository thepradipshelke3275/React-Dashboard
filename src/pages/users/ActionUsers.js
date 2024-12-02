import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";
import * as actions from "../../store/creators";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  InputGroup,
  Label,
} from "reactstrap";
import { MenuItem } from "@mui/material";
import Swal from "sweetalert2";
function ActionUsers(props) {
  const dispatch = useDispatch();
  const { isUpdateLoading } = useSelector((state) => state.entities?.users);
  const { login } = useSelector((state) => state?.login);

  let data = {
    token: login?.token,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  async function deleteSelectedItem(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onDeleteUsersData(id, data);
      }
    });
  }
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    let users = {
      name: values.name,
      email: values.email,
      mobile_no: values.mobile_no,
      role: values.role,
    };
    dispatch(actions.updateUsersData(data, users, toggle, setSubmitting));
    return;
  };

  return (
    <div>
      <div>
        <Button
          className="btn-success p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-edit" aria-hidden="true"></i>
        </Button>

        <Button
          className="bg-gradient-danger text-white p-1 mr-2"
          onClick={(id) => {
            deleteSelectedItem(data.id);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      </div>

      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit User
        </ModalHeader>
        {isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              name: props.data?.name,
              email: props.data?.email,
              mobile_no: props.data?.mobile_no,
              role: props.data?.role,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("This Field is Mandatory"),
              email: Yup.string().email().required("This Field is Mandatory"),
              role: Yup.string().required("This Field is Mandatory"),
              mobile_no: Yup.string()
                .required("required")
                .matches(phoneRegExp, "Mobile number is not valid")
                .min(10, "Too Short")
                .max(10, "Too Long"),
            })}
          >
            {(formProps) => {
              return (
                <Form>
                  {console.log(`formProps.values users`, formProps.values)}
                  <Row className="form-group pt-2">
                    <Col md={6}>
                      <Label>Name *</Label>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          id="name"
                          label="Enter Name *"
                          name="name"
                          value={formProps.values.name}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.name &&
                            Boolean(formProps.errors.name)
                          }
                          helperText={
                            formProps.touched.name && formProps.errors.name
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label>Email Address *</Label>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          id="email"
                          label="Enter Email *"
                          name="email"
                          value={formProps.values.email}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.email &&
                            Boolean(formProps.errors.email)
                          }
                          helperText={
                            formProps.touched.email && formProps.errors.email
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group pt-2">
                    <Col md={6}>
                      <Label>Mobile Number *</Label>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          id="mobile_no"
                          label="Enter Mobile Number *"
                          name="mobile_no"
                          value={formProps.values.mobile_no}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.mobile_no &&
                            Boolean(formProps.errors.mobile_no)
                          }
                          helperText={
                            formProps.touched.mobile_no &&
                            formProps.errors.mobile_no
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label>Select Role *</Label>
                      <InputGroup>
                        <TextField
                          fullWidth
                          select
                          variant="outlined"
                          size="small"
                          id="role"
                          label="Select Role *"
                          name="role"
                          value={formProps.values.role}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.role &&
                            Boolean(formProps.errors.role)
                          }
                          helperText={
                            formProps.touched.role && formProps.errors.role
                          }
                        >
                          <MenuItem value="">Select Role</MenuItem>
                          <MenuItem value="super-admin">Super Admin</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="employee">Employee</MenuItem>
                        </TextField>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row style={{ justifyContent: "center" }}>
                    <Col md={4}>
                      <Button type="reset" color="danger" block>
                        <b>Reset</b>
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        type="submit"
                        disabled={formProps.isSubmitting}
                        color="primary"
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
        <ModalFooter>{isUpdateLoading && <LinerLoader />}</ModalFooter>
      </Modal>
    </div>
  );
}
export default ActionUsers;
