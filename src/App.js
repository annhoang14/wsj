import React, { Component } from 'react';
import MyDrawers from "./MyDrawers.js";
import MyTabs from "./MyTabs.js";

//https://stackoverflow.com/questions/60007058/react-bootstrap-tab-showing-all-content-at-once
import 'bootstrap/dist/css/bootstrap.min.css';
import { blue, green, brown, red } from '@material-ui/core/colors';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionKey: "home",
      largeHeader: "The Wall Street Journal",
      smallHeader: "WSJ",
      openDrawer: false,
      subheaders: ["Home", "World", "U.S.", "Politics",
        "Economy", "Business", "Tech", "Markets",
        "Opinion", "Life & Arts", "Real Estate", "WSJ Magazine"],
      section: null,
      windowDimensions: { width: window.innerWidth, height: window.innerHeight },
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({
      windowDimensions:
        { width: window.innerWidth, height: window.innerHeight }
    });
  }

  setKey = (k) => {
    this.setState({ sectionKey: k })
    this.formatHeader(k, true);
  }

  formatHeader = (k, isLarge) => {
    let newHeader = ""
    let section;
    if (k === "Home") {
      if (isLarge) {
        newHeader = "The Wall Street Journal"
        this.setState({ largeHeader: newHeader })
      }
      else {
        newHeader = "WSJ"
        this.setState({ smallHeader: newHeader })
        this.toggleDrawer()
      }
      this.setState({ section: "" })
    }
    else {
      newHeader = <div>WSJ | </div>
      if (isLarge) {
        this.setState({ largeHeader: newHeader })
      }
      else {
        this.setState({ smallHeader: newHeader })
        this.toggleDrawer()
      }

      if (k === "World") {
        section = <div style={{ color: blue[400] }}>WORLD</div>
      } else if (k === "U.S.") {
        section = <div style={{ color: blue[100] }}>U.S.</div>
      } else if (k === "Politics") {
        section = <div style={{ color: blue[700] }}>POLITICS</div>
      } else if (k === "Economy") {
        section = <div style={{ color: green[900] }}>ECONOMY</div>
      } else if (k === "Business") {
        section = <div style={{ color: green[100] }}>BUSINESS</div>
      } else if (k === "Tech") {
        section = <div style={{ color: blue[800] }}>TECH</div>
      } else if (k === "Markets") {
        section = <div style={{ color: green[400] }}>MARKETS</div>
      } else if (k === "Opinion") {
        section = <div style={{ color: brown[400] }}>OPINION</div>
      } else if (k === "Life & Arts") {
        section = <div style={{ color: red[400] }}>LIFE & ARTS</div>
      } else if (k === "Real Estate") {
        section = <div style={{ color: brown[100] }}>REAL ESTATE</div>
      } else if (k === "WSJ Magazine") {
        section = <div>MAGAZINE</div>
      }
      this.setState({ section: section })
    }
  }

  toggleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer })
  }

  render() {
    return (
      <div className="App">
        {(this.state.windowDimensions.width <= 900) ?

          <div>
            <div className="smallScreenHeader">
              <div className="menuB">
                <MyDrawers
                  toggleDrawer={this.toggleDrawer}
                  openDrawer={this.state.openDrawer}
                  subheaders={this.state.subheaders}
                  formatHeader={this.formatHeader}
                />
              </div>
              <header className="smallHeader">{this.state.smallHeader}{this.state.section}</header>
            </div>
          </div>
          :
          <div>
            <div className="largerScreenHeader">
              <header className="largeHeader">{this.state.largeHeader}{this.state.section}</header>

              <div className="subheader">
                <MyTabs
                  sectionKey={this.state.sectionKey}
                  setKey={this.setKey}
                  subheaders={this.state.subheaders}
                />
                {console.log(this.state.sectionKey)}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

