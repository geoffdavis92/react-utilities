// Visualizer @flow
import React, { Component } from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryBar,
  VictoryTheme
} from "victory";

const gas = [
  { date: new Date("21:31 12/23/2016"), costGal: 2.299, costFill: 23.69 },
  { date: new Date("14:53 12/31/2016"), costGal: 2.399, costFill: 24.4 },
  { date: new Date("19:50 12/31/2016"), costGal: 2.199, costFill: 21.43 },
  { date: new Date("19:03 01/18/2017"), costGal: 2.099, costFill: 21.95 },
  { date: new Date("17:16 03/19/2017"), costGal: 2.049, costFill: 21.16 }
];

const gasMin = new Date("12/22/2016");
const gasMax = new Date("03/21/2017");

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { dataSource, datasets, xAxis, yAxis } = this.props;
    const ChartComponents = datasets.map((dataset,i) => {
      const {
        xKey,
        yKey,
        type,
        scale,
        style,
      } = dataset;

      if (type === "Line") {
        return <VictoryLine key={i} data={dataSource} x={xKey} y={yKey} scale={scale ? scale : null} style={style} />;
      } else if (type === "Bar") {
        return <VictoryBar key={i} data={dataSource} x={xKey} y={yKey} scale={scale ? scale : null} style={style} />;
      }
    });
    return (
      <div className="MiniDash_Visualizer_Chart">
        <VictoryChart theme={VictoryTheme.grayscale}>
          <VictoryAxis
            domain={xAxis.range}
            label={xAxis.label}
            style={{
              axisLabel: { padding: 33 },
              ticks: { size: 5, stroke: "#666" }
            }}
            tickCount={xAxis.tickCount}
            tickFormat={xAxis.tickFormat}
          />
          <VictoryAxis
            dependentAxis
            domain={yAxis.range}
            label={yAxis.label}
            style={{
              axisLabel: { padding: 27.5 },
              tickLabels: { fontSize: 10, padding: 3 },
              ticks: { size: 2.5, stroke: "#666" }
            }}
            tickCount={yAxis.tickCount}
            tickFormat={yAxis.tickFormat}
          />
          {ChartComponents}
        </VictoryChart>
      </div>
    );
  }
}
