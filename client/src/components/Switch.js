import React from "react";
import styles from "./switch.module.css";

class Switch extends React.Component {
  render() {
    let options = this.props.options.map((data, index) => {
      return (
        <div
          className={
            this.props.activeOption === index
              ? `${styles.switchOption} ${styles.active}`
              : styles.switchOption
          }
          key={index}
          onClick={this.props.onOptionClick.bind(null, data, index)}
        >
          <p className={styles.title}>{data.title}</p>
          <p className={styles.titleSm}>Downloader</p>
        </div>
      );
    });
    return <div className={styles.switchContainer}>{options}</div>;
  }
}
export default Switch;
