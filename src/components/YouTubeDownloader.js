import React from "react";
import "./downloader.css";

const domain = "http://localhost:9000";

class YouTubeDownloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
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
    let validateUrl = new RegExp("https:\/\/w{3}.youtube.com\/.*").test(this.state.url);
    if (validateUrl) {
      fetch(domain + `/get-video-info?URL=${this.state.url}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (!json.foundFlag)
            alert("Error 404! Cannot find a video within this URL!");
          else
            window.location.href = domain + `/download/ytvideo?URL=${this.state.url}`;
        });
    }
  };

  render() {
    return (
      <div className="downloader-container">
        <h1 className="heading-youtube">
          YouTube <span>Downloader</span>
        </h1>
        <p>URL:</p>
        <input
          className="URL-input"
          placeholder="for ex. https://www.youtube.com/watch?v=lU0U3gogyOM"
          onChange={this.handleInputChange}
        />
        <button className="convert-button" onClick={this.handleGetClip}>
          Download
        </button>
      </div>
    );
  }
}
export default YouTubeDownloader;
