import React from "react";
import "./App.css";
import Switch from "./components/Switch";
import Downloader from "./components/Downloader";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeOption: 0,
      options: [
        {
          type: "twitch-clip",
          exampleURL: "https://clips.twitch.tv/WonderfulSpikyLlamaWTRuck",
          title: "Twitch Clips",
        },
        {
          type: "youtube",
          exampleURL: "https://www.youtube.com/watch?v=lU0U3gogyOM",
          title: "YouTube",
        },
      ],
    };
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  handleOptionClick(data, index) {
    this.setState(
      {
        activeOption: index,
      },
      () => {
        document.querySelector("html").style.backgroundColor =
          this.state.activeOption === 0 ? "#cfb0ff" : "#ffbdbd";
      }
    );
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
          <Downloader
            data={this.state.options[this.state.activeOption]}
            key={this.state.options[this.state.activeOption].type}
          />
        </div>
      </main>
    );
  }
}

export default App;
