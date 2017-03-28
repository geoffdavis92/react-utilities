// MiniDash @flow
import React, { Component } from "react";

import Visualizer from "./Visualizer";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import EntryExplorer from "./EntryExplorer";

class MiniDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: this.props.dataSource,
      explorer: { selectedEntry: false }
    };
    this.defaultXAxis = {
      range: [0, 10],
      label: "xAxis",
      tickCount: 5,
      tickFormat: x => x
    };
    this.defaultYAxis = {
      range: [0, 10],
      label: "yAxis",
      tickCount: 5,
      tickFormat: y => y
    };
    this.updateDashState = this.updateDashState.bind(this);
  }
  updateDashState(stateKey, newValue) {
    this.setState({
      [stateKey]: newValue
    });
  }
  render() {
    const {
      defaultXAxis,
      defaultYAxis,
      props,
      state: { entries, explorer: { selectedEntry } },
      updateDashState
    } = this;
    const { datasets, xAxis, yAxis } = props;
    return (
      <section className="MiniDash">
        <article className="MiniDash_Visualizer">
          <Visualizer
            dataSource={entries}
            datasets={datasets}
            xAxis={xAxis ? xAxis : defaultXAxis}
            yAxis={yAxis ? yAxis : defaultYAxis}
          />
        </article>
        <article className="MiniDash_Manager">
          <div className="MiniDash_Manager_PanelLeft">
            <EntryList
              entries={entries}
              selectEntryCallback={updateDashState}
            />
            <EntryForm submissionCallback={updateDashState} />
          </div>
          <div className="MiniDash_Manager_PanelRight">
            <EntryExplorer dataSource={entries} selectedEntry={this.state.explorer.selectedEntry} />
          </div>
        </article>
      </section>
    );
  }
}

export default MiniDash;
