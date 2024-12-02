import React from "react";
import { ScaleLoader } from "react-spinners";

class Scale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.isLoading,
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScaleLoader
            sizeUnit={"px"}
            size={100}
            color={"#36D7D7"}
            // loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default Scale;
