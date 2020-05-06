import React from "react";
import "./downloader.css";

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
    console.log(this.state.url);
    fetch(`http://localhost:9000/download/twitchclip?URL=${this.state.url}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => window.open(json.url));
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
          placeholder="for ex. https://clips.twitch.tv/WonderfulSpikyLlamaWTRuck"
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
