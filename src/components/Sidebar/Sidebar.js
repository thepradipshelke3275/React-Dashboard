/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [caseCollapsed, setCaseCollapsed] = useState(false);
  const [reportCollapsed, setReportCollapsed] = useState(false);
  const [reportCollapsed2, setReportCollapsed2] = useState(false);
  const [userMasterCollapsed, setUserMasterCollapsed] = useState(false);
  const [OrderHistorreyCollapsed, setOrderHistoryCollapsed] = useState(false);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  if (props.login?.login?.user?.role === "admin") {
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-1-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem> */}

                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <PerfectScrollbar className="sidebar-nav">
              <Nav vertical navbar>
                <li>
                  <NavItem>
                    <NavLink
                      to="/"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      Dashboard
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/users"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-single-02 text-blue" />
                      Users
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/locations"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-pin-3 text-blue" />
                      Locations
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/device"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-laptop text-blue" />
                      Device
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/sensor"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-key-25 text-blue" />
                      Sensor
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/alert"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-notification-70 text-blue" />
                      Alert
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/lead"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-compass-04 text-blue" />
                      Lead
                    </NavLink>
                  </NavItem>
                </li>
                {/* <li>
                  <NavItem>
                    <NavLink
                      to="/admin/logs"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-badge text-blue" />
                      Logs
                    </NavLink>
                  </NavItem>
                </li> */}
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/report"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-chart-bar-32 text-blue" />
                      Report
                    </NavLink>
                  </NavItem>
                </li>
              </Nav>
            </PerfectScrollbar>
          </Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-1-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <PerfectScrollbar className="sidebar-nav">
              <Nav vertical navbar>
                <li>
                  <NavItem>
                    <NavLink
                      to="/"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-user-run text-blue" />
                      Dashboard
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/users"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-single-02 text-blue" />
                      Users
                    </NavLink>
                  </NavItem>
                </li>

                <li>
                  <NavItem>
                    <NavLink
                      to="/"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-compass-04 text-green" />
                      Version - 2803
                    </NavLink>
                  </NavItem>
                </li>
                {/* <li>
                  <NavItem>
                    <NavLink
                      to="/admin/types"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-box-2 text-blue" />
                      Types
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/trolley-master"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-cart text-blue" />
                      Trolley Master
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/cylinder-master"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-money-coins text-blue" />
                      Cylinder Master
                    </NavLink>
                  </NavItem>
                </li>
                <li>
                  <NavItem>
                    <NavLink
                      to="/admin/transactions"
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className="ni ni-ui-04 text-blue" />
                      Transactions
                    </NavLink>
                  </NavItem>
                </li> */}
              </Nav>
            </PerfectScrollbar>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

export default connect(mapStateToProps)(Sidebar);
