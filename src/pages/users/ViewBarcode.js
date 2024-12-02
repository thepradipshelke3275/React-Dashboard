import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import Barcode from "react-barcode";
import printJS from "print-js";
// import jsPDF from "jspdf";

const ViewBarcode = (props) => {
  //console.log("props", props);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const [print, setPrint] = React.useState(false);

  const printPdf = () => {
    console.log("print11");
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "8pt",
      maxWidth: 1080,
      base64: true,
      honorMarginPadding: false,
      style: "@page {  options: footers;  }",
    });
  };

  // const generatePDF = () => {
  //   let doc = new jsPDF("p","pt","a4");
  //   doc.html(document.querySelector("#htmlToPdf2"),{
  //     callback: function(pdf){
  //       const pageCount = doc.internal.getNumberOfPages();
  //       pdf.deletePage(pageCount);
  //       pdf.save("tiajo.pdf");
  //     }
  //   })
  // };
  return (
    <React.Fragment>
      <div>
        <Button
          className="bg-gradient-yellow p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-eye" aria-hidden="true"></i>
        </Button>
      </div>
      <Modal className="modal-sm" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Barcode Details
        </ModalHeader>
        <ModalBody className="" style={{ padding: "5px" }}>
          <Card style={{ border: "1px solid black" }} id="htmlToPdf2">
            <CardBody style={{ padding: "2px" }}>
              <Row>
                <Col md={8}>
                  <Barcode value={props.data?.id} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ViewBarcode;
