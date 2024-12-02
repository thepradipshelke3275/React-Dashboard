import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import "../style.css";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  InputGroup,
  ModalFooter,
  Input,
} from "reactstrap";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../store/creators";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import ActionUsers from "./ActionUsers";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function Users() {
  const dispatch = useDispatch();
  const { users, isLoading, isPostLoading } = useSelector(
    (state) => state.entities?.users
  );
  const { login } = useSelector((state) => state?.login);

  const [pageSize, setPageSize] = React.useState(10);

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <ActionUsers data={params.row} index={params.row.id} />
          </>
        );
      },
    },
    { field: "id", headerName: "ID", width:100 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      headerAlign: "center",
    },

    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "mobile_no",
      headerName: "Mobile Number",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      headerAlign: "center",
    },
  ];
  const [searchFilter, setSearchFilter] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const rows = users?.isLoading
    ? []
    : users?.data?.length > 0
    ? users?.data?.filter((item) => {
        return (
          (searchValue && searchFilter
            ? item?.name
                ?.toLowerCase()
                .includes(searchValue.trim().toLowerCase())
            : item) ||
          (searchValue && searchFilter
            ? item?.email
                ?.toLowerCase()
                .includes(searchValue.trim().toLowerCase())
            : item) ||
          (searchValue && searchFilter
            ? item?.customer_type
                ?.toLowerCase()
                .includes(searchValue.trim().toLowerCase())
            : item)
        );
      })
    : [];

  let data = {
    token: login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(actions.usersGetData(data));
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const handleSubmit = (values, { setSubmitting }) => {
    let users = {
      name: values.name,
      email: values.email,
      mobile_no: values.mobile_no, 
      role: values.role,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    dispatch(actions.postUsersData(data, users, toggle, setSubmitting));
    setSubmitting(true);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-head p-2 text-dark">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2 text-white">Users Details</strong>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search by Name and Email"
            className="form-control"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            style={{ width: "50%" }}
          />
          <div>
            <Button
              type="button"
              color="success"
              className="mr-2"
              onClick={() => {
                setSearchFilter(true);
              }}
            >
              <b>Search</b>
            </Button>
            <Button
              type="reset"
              color="danger"
              onClick={() => {
                setSearchValue("");
                setSearchFilter(false);
              }}
            >
              <b>Reset</b>
            </Button>
          </div>
          <div>
            <Button
              className="btn-success p-2"
              onClick={() => {
                toggle();
              }}
            >
              <i className="fa fa-plus text-white mr-2" />
              Add New
            </Button>
          </div>
        </div>
        <Modal
          className="modal-lg"
          backdrop="static"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New
          </ModalHeader>

          {isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile_no: "",
                role: "",
                password: "",
                password_confirmation: "",
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
                password: Yup.string()
                  .min(8, "Password Enter at least 6 Digit/Character")
                  .required("Enter Your Password"),
                password_confirmation: Yup.string().when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                  ),
                }),
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
                              formProps.touched.mobile_no && formProps.errors.mobile_no
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

                    <Row className="form-group pt-2">
                      <Col md={6}>
                        <Label>Password *</Label>
                        <InputGroup>
                          <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            size="small"
                            id="password"
                            label="Password *"
                            name="password"
                            value={formProps.values.password}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.password &&
                              Boolean(formProps.errors.password)
                            }
                            helperText={
                              formProps.touched.password &&
                              formProps.errors.password
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <Label>Password Confirmation *</Label>
                        <InputGroup>
                          <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            size="small"
                            id="password_confirmation"
                            label="Password Confirmation *"
                            name="password_confirmation"
                            value={formProps.values.password_confirmation}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.password_confirmation &&
                              Boolean(formProps.errors.password_confirmation)
                            }
                            helperText={
                              formProps.touched.password_confirmation &&
                              formProps.errors.password_confirmation
                            }
                          />
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
          <ModalFooter>{isPostLoading && <LinerLoader />}</ModalFooter>
        </Modal>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
        />
      </CardBody>
    </Card>
  );
}
export default Users;
