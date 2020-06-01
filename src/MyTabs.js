import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';

export default class MyTabs extends Component {
    render() {
        return (
            <Tabs
                id="tabs"
                activeKey={this.props.sectionKey}
                onSelect={(k) => this.props.setKey(k)}>
                {this.props.subheaders.map(subhead => {
                    return (
                        <Tab eventKey={subhead} title={subhead}>
                            {subhead}
                        </Tab>
                    )
                })}
            </Tabs >
        )
    }
}