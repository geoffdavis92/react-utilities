// @flow
import React, { Component } from "react";
import { render } from "react-dom";

// react-utilities modules
import withFormSpree from "./hocs/withFormSpree";
import MiniDash from "./components/MiniDash";

// example components
import Form from "./examples/Form";
import MyButton from "./examples/MyButton";

const FormTest = withFormSpree(Form);
const ButtonTest = withFormSpree(MyButton, "your_email@provider.com");

// MiniDash data
const gas = [
    { date: new Date("21:31 12/23/2016"), costGal: 2.299, costFill: 23.69 },
    { date: new Date("14:53 12/31/2016"), costGal: 2.399, costFill: 24.4 },
    { date: new Date("19:50 12/31/2016"), costGal: 2.199, costFill: 21.43 },
    { date: new Date("19:03 01/18/2017"), costGal: 2.099, costFill: 21.95 },
    { date: new Date("17:16 03/19/2017"), costGal: 2.049, costFill: 21.16 }
];

const dateMin = new Date("12/22/2016");
const dateMax = new Date("03/21/2017");

const xAxis = {
    range: [dateMin, dateMax],
    label: "Date",
    scale: "time",
    tickCount: 5,
    tickFormat: date => {
        let d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
};

const yAxis = {
    range: [2, 25],
    label: "Cost ($USD)",
    tickCount: 10,
    tickFormat: cost => `$${cost}`
};

render(
    <MiniDash
        xAxis={xAxis}
        yAxis={yAxis}
        dataSource={gas}
        datasets={[
            {
                xKey: "date",
                yKey: "costGal",
                type: "Line",
                style: { data: { stroke: "#FA4E5B" } }
            },
            {
                xKey: "date",
                yKey: "costFill",
                type: "Bar",
                style: { data: { fill: "#2A91C7", opacity: ".5" } }
            }
        ]}
    />,
    document.getElementById("app")
);
