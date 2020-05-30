import React from "react";
import "./downloader.css";
import Loader from "react-loader-spinner";

class Downloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      alertText: "Error",
      showAlert: false,
      isLoading: false,
      selectedFormat: "mp4",
    };
    this.handleGetClip = this.handleGetClip.bind(this);
    this.handleFormatChange = this.handleFormatChange.bind(this);
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      url: value,
    });
  };

  handleGetClip = (event) => {
    event.preventDefault();
    this.setState(
      {
        showAlert: false,
        isLoading: true,
      },
      () => {
        switch (this.props.data.type) {
          case "twitch-clip":
            this.getTwitchClip(this.state.url);
            break;
          case "youtube":
            this.getYTVideo(this.state.url);
            break;
        }
      }
    );
  };

  getTwitchClip(url) {
    let videoId = "";
    let validateUrl = new RegExp("https://w{3}.twitch.tv/.*").test(url);

    if (validateUrl) {
      let temp = url.split("/");
      videoId = temp[temp.length - 1].split("?")[0];
    } else {
      validateUrl = new RegExp("https://clips.twitch.tv/.*").test(url);
      let temp = url.split("/");
      videoId = temp[temp.length - 1];
    }

    if (validateUrl)
      fetch(`/api/download/twitchclip?videoId=${videoId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.statusCode !== 200)
            this.setState({
              alertText:
                "Error " +
                json.statusCode +
                "! Cannot find a clip within this URL!",
              showAlert: true,
              isLoading: false,
            });
          else {
            window.open(json.url);
            this.setState({
              isLoading: false,
            });
          }
        });
    else {
      this.setState({
        alertText: "Invalid clip URL!",
        showAlert: true,
        isLoading: false,
      });
    }
  }

  getYTVideo(url) {
    let videoId = "";
    let validateUrl = new RegExp("https://w{3}.youtube.com/.*").test(url);
    if (validateUrl) {
      let temp = url.split("/");
      videoId = temp[temp.length - 1].split("?v=")[1];
    } else {
      validateUrl = new RegExp("https://youtu.be/.*").test(url);
      let temp = url.split("/");
      videoId = validateUrl ? temp[temp.length - 1].split("?")[0] : "";
    }

    if (validateUrl) {
      fetch(`/api/get-video-info?videoId=${videoId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.foundFlag)
            this.setState({
              alertText: "Error 404! Cannot find a video within this URL!",
              showAlert: true,
              isLoading: false,
            });
          else {
            fetch(`/api/download/ytvideo?URL=${url}&videoId=${videoId}&format=${this.state.selectedFormat}`, {
              method: "GET",
            })
              .then((res) => {
                const reader = res.body.getReader();
                return new ReadableStream({
                  start(controller) {
                    return pump();
                    function pump() {
                      return reader.read().then(({ done, value }) => {
                        if (done) {
                          controller.close();
                          return;
                        }
                        controller.enqueue(value);
                        return pump();
                      });
                    }
                  }
                })
              })
              .then(stream => new Response(stream))
              .then(response => response.blob())
              .then(blob => URL.createObjectURL(blob))
              .then(url => {
                let a = document.createElement("a");
                a.href = url;
                a.download = `${videoId}.${this.state.selectedFormat}`;
                a.click();
                window.URL.revokeObjectURL(url);
              })
              .catch(err => console.error(err))
              .then(() => {
                this.setState({
                  isLoading: false,
                });
              });
          }
        });
    } else {
      this.setState({
        alertText: "Invalid video URL!",
        showAlert: true,
        isLoading: false,
      });
    }
  }

  handleFormatChange(event) {
    this.setState({
      selectedFormat: event.target.value,
    });
  }

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
        {this.props.data.type === "youtube" ? (
          <div className="format-selector">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="mp4"
                  checked={this.state.selectedFormat === "mp4"}
                  onChange={this.handleFormatChange}
                />
                MP4
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="mp3"
                  checked={this.state.selectedFormat === "mp3"}
                  onChange={this.handleFormatChange}
                />
                MP3
              </label>
            </div>
          </div>
        ) : (
            " "
          )}
        <button className="convert-button" onClick={this.handleGetClip}>
          Download
        </button>
        {this.state.showAlert ? (
          <div className="alert">{this.state.alertText}</div>
        ) : (
            " "
          )}
        {this.state.isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
            " "
          )}
      </div>
    );
  }
}
export default Downloader;
