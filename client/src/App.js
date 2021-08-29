import React from "react";
import Switch from "./components/Switch";
import Downloader from "./components/Downloader";
import styles from './app.module.css';

class App extends React.Component {
  constructor() {
    super();
    this.mainRef = React.createRef();

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
    let value;
    console.log(window.innerWidth)
    if (window.innerWidth > 1599) {
      value = index === 1 ? "-90vw" : "0";
      this.mainRef.current.style.transform = `translate(${value},0)`;
    }
    else {
      value = index === 1 ? "-85vh" : "0";
      this.mainRef.current.style.transform = `translate(0,${value})`;
    }
    this.setState({
        activeOption: index,
    });
  }

  render() {
    return (
      <div className={this.state.activeOption === 0 ? styles.twitch : styles.youtube}>
        <nav>
        <Switch
          activeOption={this.state.activeOption}
          options={this.state.options}
          onOptionClick={this.handleOptionClick}
        />
        </nav>
        <main ref={this.mainRef} className={styles.contentMain}>
          <section className={styles.downloaderWrap}>
            <div className={styles.waveVertical}>
              <svg width="250" height="1080" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <g>
                  <path id="svg_1" strokeLinecap="round" fill="#FFBDBD" d="m172,1080l-15.7,-25.7c-15.6,-25.6 -47,-77 -63.6,-128.5c-16.7,-51.5 -18.7,-103.1 -14,-154.6c4.6,-51.5 16,-102.9 32,-154.2c16,-51.3 36.6,-102.7 52.1,-154c15.5,-51.3 25.9,-102.7 28.7,-154.2c2.8,-51.5 -1.8,-103.1 -18.3,-154.6c-16.5,-51.5 -44.9,-102.9 -59,-128.5l-14.2,-25.7l150,0l0,25.7c0,25.6 0,77 0,128.5c0,51.5 0,103.1 0,154.6c0,51.5 0,102.9 0,154.2c0,51.3 0,102.7 0,154c0,51.3 0,102.7 0,154.2c0,51.5 0,103.1 0,154.6c0,51.5 0,102.9 0,128.5l0,25.7l-78,0z"/>
                  <path id="svg_2" strokeLinecap="round" fill="#FFBDBD" d="m172,1080l-15.7,-25.7c-15.6,-25.6 -47,-77 -63.6,-128.5c-16.7,-51.5 -18.7,-103.1 -14,-154.6c4.6,-51.5 16,-102.9 32,-154.2c16,-51.3 36.6,-102.7 52.1,-154c15.5,-51.3 25.9,-102.7 28.7,-154.2c2.8,-51.5 -1.8,-103.1 -18.3,-154.6c-16.5,-51.5 -44.9,-102.9 -59,-128.5l-14.2,-25.7l150,0l0,25.7c0,25.6 0,77 0,128.5c0,51.5 0,103.1 0,154.6c0,51.5 0,102.9 0,154.2c0,51.3 0,102.7 0,154c0,51.3 0,102.7 0,154.2c0,51.5 0,103.1 0,154.6c0,51.5 0,102.9 0,128.5l0,25.7l-78,0z"/>
                  <path opacity="0.48" id="svg_3" strokeLinecap="round" fill="#FFBDBD" d="m158,1080l-15.7,-25.7c-15.6,-25.6 -47,-77 -63.6,-128.5c-16.7,-51.5 -18.7,-103.1 -14,-154.6c4.6,-51.5 16,-102.9 32,-154.2c16,-51.3 36.6,-102.7 52.1,-154c15.5,-51.3 25.9,-102.7 28.7,-154.2c2.8,-51.5 -1.8,-103.1 -18.3,-154.6c-16.5,-51.5 -44.9,-102.9 -59,-128.5l-14.2,-25.7l150,0l0,25.7c0,25.6 0,77 0,128.5c0,51.5 0,103.1 0,154.6c0,51.5 0,102.9 0,154.2c0,51.3 0,102.7 0,154c0,51.3 0,102.7 0,154.2c0,51.5 0,103.1 0,154.6c0,51.5 0,102.9 0,128.5l0,25.7l-78,0z"/>
                  <path opacity="0.28" id="svg_4" strokeLinecap="round" fill="#FFBDBD" d="m151,1031l-15.7,-25.7c-15.6,-25.6 -47,-77 -63.6,-128.5c-16.7,-51.5 -18.7,-103.1 -14,-154.6c4.6,-51.5 16,-102.9 32,-154.2c16,-51.3 36.6,-102.7 52.1,-154c15.5,-51.3 25.9,-102.7 28.7,-154.2c2.8,-51.5 -1.8,-103.1 -18.3,-154.6c-16.5,-51.5 -44.9,-102.9 -59,-128.5l-14.2,-25.7l150,0l0,25.7c0,25.6 0,77 0,128.5c0,51.5 0,103.1 0,154.6c0,51.5 0,102.9 0,154.2c0,51.3 0,102.7 0,154c0,51.3 0,102.7 0,154.2c0,51.5 0,103.1 0,154.6c0,51.5 0,102.9 0,128.5l0,25.7l-78,0z"/>
                </g>
              </svg>
            </div>
            <div className={styles.waveHorizontal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path fill="#FFBDBD" d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                </svg>
            </div>
            <Downloader
              data={this.state.options[0]}
              key={this.state.options[0].type}
            />
          </section>
          <section className={styles.downloaderWrap}>
            <Downloader
              data={this.state.options[1]}
              key={this.state.options[1].type}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
