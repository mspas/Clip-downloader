import React from "react";
import "./downloader.css";

const domain = "http://localhost:9000";

class Downloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      alertText: "Error",
      showAlert: false
    };
    this.handleGetClip = this.handleGetClip.bind(this);
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      url: value,
    });
  };

  handleGetClip = (event) => {
    event.preventDefault();
    this.setState({
      showAlert: false
    }, () => {
      switch (this.props.data.type) {
        case "twitch-clip":
          this.getTwitchClip(this.state.url);
          break;
        case "youtube":
          this.getYTVideo(this.state.url);
          break;
      }

    })
  };

  getTwitchClip(url) {
    let validateUrl = new RegExp("https:\/\/w{3}.twitch.tv\/.*").test(url);
    if (!validateUrl) validateUrl = new RegExp("https:\/\/clips.twitch.tv\/.*").test(url);
    if (validateUrl)
      fetch(domain + `/download/twitchclip?URL=${url}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.statusCode !== 200)
            this.setState({
              alertText: "Error " + json.statusCode + "! Cannot find a clip within this URL!",
              showAlert: true
            })
          else
            window.open(json.url);
        });
    else {
      this.setState({
        alertText: "Invalid clip URL!",
        showAlert: true
      })
    }
  }

  getYTVideo(url) {
    let validateUrl = new RegExp("https:\/\/w{3}.youtube.com\/.*").test(url);
    if (validateUrl) {
      fetch(domain + `/get-video-info?URL=${url}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.foundFlag)
            this.setState({
              alertText: "Error 404! Cannot find a video within this URL!",
              showAlert: true
            })
          else
            window.location.href = domain + `/download/ytvideo?URL=${url}`;
        });
    }
    else {
      this.setState({
        alertText: "Invalid video URL!",
        showAlert: true
      })
    }
  };

  render() {
    return (
      <div className="downloader-container">
        <h1 className="heading">
          {this.props.data.title} <span>Downloader</span>
        </h1>
        <p>URL:</p>
        <input
          className="URL-input"
          placeholder={"for ex. " + this.props.data.exampleURL}
          onChange={this.handleInputChange}
        />
        <button className="convert-button" onClick={this.handleGetClip}>
          Download
                </button>
        {this.state.showAlert ? <div className="alert">
          {this.state.alertText}
        </div> : " "}
      </div>
    );
  }
}
export default Downloader;