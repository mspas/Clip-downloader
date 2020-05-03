import React from "react";
import "./App.css";
import ClipDownloader from "./components/ClipDownloader";
import YouTubeDownloader from "./components/YouTubeDownloader";
import Switch from "./components/Switch";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeOption: 0,
      options: [{ title: "Twitch Clips" }, { title: "YouTube" }],
    };
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  handleOptionClick(data, index) {
    this.setState({
      activeOption: index,
    });
  }

  render() {
    return (
      <main className={this.state.activeOption === 0 ? "twitch" : "youtube"}>
        <Switch
          activeOption={this.state.activeOption}
          options={this.state.options}
          onOptionClick={this.handleOptionClick}
        />
        <div className="downloader-wrap">
          {this.state.activeOption === 0 && <ClipDownloader />}
          {this.state.activeOption === 1 && <YouTubeDownloader />}
        </div>
      </main>
    );
  }
}

export default App;
