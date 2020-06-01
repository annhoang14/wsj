import React, { Component } from 'react';

//https://stackoverflow.com/questions/60007058/react-bootstrap-tab-showing-all-content-at-once
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import {
  Drawer, List, ListItem, ListItemText,
  IconButton, Divider, Hidden, Grid
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { blue, green, brown, red } from '@material-ui/core/colors';



import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "home",
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
    console.log(window.innerWidth, window.innerHeight)
    console.log(this.state.windowDimensions)
  }

  setKey = (k) => {
    this.setState({ key: k })
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

  formatDrawer = () => {
    return (
      <div>
        <IconButton
          color="inherit"
          edge="start"
          onClick={this.toggleDrawer}
          className="menu"
        >
          <MenuIcon />
        </IconButton>
        <Hidden smUp implementation="css" className="hiddenDrawers">
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.openDrawer}
            onClose={this.toggleDrawer}
            className="drawer"
          >
            <IconButton
              color="inherit"
              edge="start"
              onClick={this.toggleDrawer}
              className="menu"
            >
              <MenuIcon />
            </IconButton>
            <Grid container >
              {this.state.subheaders.map(subhead => {
                return (
                  <Grid item xs={12} sm={6}>
                    <ListItem button key={subhead} onClick={() => this.formatHeader(subhead, false)}>
                      <ListItemText primary={subhead} />
                    </ListItem>
                  </Grid>
                )

              })}

            </Grid>
          </Drawer>
        </Hidden>
      </div>
    )
  }

  showTabs = () => {
    return (
      <Tabs
        id="tabs"
        activeKey={this.state.key}
        onSelect={(k) => this.setKey(k)}>
        {this.state.subheaders.map(subhead => {
          return (
            <Tab eventKey={subhead} title={subhead}>
              {subhead}
            </Tab>
          )
        })}
      </Tabs >
    )
  }

  render() {
    return (
      <div className="App">
        {(this.state.windowDimensions.width <= 900) ?

          <div>
            <div className="smallScreenHeader">
              <div className="menuB">{this.formatDrawer()}</div>
              <header className="smallHeader">{this.state.smallHeader}{this.state.section}</header>
            </div>
          </div>
          :
          <div>
            <div className="largerScreenHeader">
              <header className="largeHeader">{this.state.largeHeader}{this.state.section}</header>

              <div className="subheader">
                {this.showTabs()}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

