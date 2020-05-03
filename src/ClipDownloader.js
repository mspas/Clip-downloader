import React from "react";

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
    console.log(this.state.url);
    fetch(`http://localhost:9000/download?URL=${this.state.url}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => window.open(json.url));
  };

  render() {
    return (
      <div>
        <h1 className="heading">Twitch Clip Downloader !</h1>
        <input
          className="URL-input"
          placeholder="https://clips.twitch.tv/WonderfulSpikyLlamaWTRuck"
          onChange={this.handleInputChange}
        />
        <button className="convert-button" onClick={this.handleGetClip}>
          Convert
        </button>
      </div>
    );
  }
}
export default ClipDownloader;
