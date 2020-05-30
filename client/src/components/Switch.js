import React from "react";
import "./switch.css";

class Switch extends React.Component {
  render() {
    let options = this.props.options.map((data, index) => {
      return (
        <div
          className={
            this.props.activeOption === index
              ? "switch-option active"
              : "switch-option"
          }
          key={index}
          onClick={this.props.onOptionClick.bind(null, data, index)}
        >
          <p className="title">{data.title}</p>
          <p className="title-sm">Downloader</p>
        </div>
      );
    });
    return <div className="switch-container">{options}</div>;
  }
}
export default Switch;
