import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Drawer, ListItem, ListItemText,
    IconButton, Divider, Hidden, Grid,
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class MyDrawers extends Component {
    render() {
        return (
            <div>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={this.props.toggleDrawer}
                    className="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Hidden smUp implementation="css" className="hiddenDrawers">
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={this.props.openDrawer}
                        onClose={this.props.toggleDrawer}
                        className="drawer"
                    >
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={this.props.toggleDrawer}
                            className="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Grid container >
                            {this.props.subheaders.map((subhead, index) => {
                                return (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <ListItem button key={subhead} onClick={() => this.props.formatHeader(subhead, false)}>
                                            <ListItemText primary={subhead} />
                                        </ListItem>
                                    </Grid>
                                )
                            })}
                        </Grid>

                        {this.props.subheaders.map((subhead, index) => {
                            return (
                                <ExpansionPanel key={index}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <h5>{subhead}</h5>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <p>{subhead}</p>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })}
                    </Drawer>
                </Hidden>
            </div >
        )
    }
}
