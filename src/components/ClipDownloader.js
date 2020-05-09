import React from "react";
import "./downloader.css";

class ClipDownloader extends React.Component {
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
    let validateUrl = true;
    if (validateUrl)
      fetch(`http://localhost:9000/download/twitchclip?URL=${this.state.url}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          window.open(json.url);
        });
    else window.alert("Invalid clip URL!");
  };

  render() {
    return (
      <div className="downloader-container">
        <h1 className="heading-twitch">
          Twitch Clip <span>Downloader</span>
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
export default ClipDownloader;


/*new RegExp("https:\/\/(w{3}).twitch.tv\/.*").test(
      this.state.url
    );
    if (!validateUrl)
      validateUrl = new RegExp("https:\/\/clips.twitch.tv\/.*").test(
        this.state.url
      );*/