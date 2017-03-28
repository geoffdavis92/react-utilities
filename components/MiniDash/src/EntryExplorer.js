// Explorer @flow
import React, { Component } from "react";

export default class EntryExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: this.props.selectedEntry
        };
    }
    componentDidMount() {
        console.log("EntryExplorer didMount");
        console.log(this.props.selectedEntry);
    }
    componentWillReceiveProps(nextProps) {
    	this.setState({
    		entry: nextProps.selectedEntry
    	})
    }
    render() {
        console.log("EntryExplorer renders");
        const theEntry = this.props.dataSource.filter(entry => {
            if (entry.date.getTime() === this.props.selectedEntry) {
                return entry;
            }
        })[0];
        return (
            <section>
                {this.props.selectedEntry &&
                    <article>{theEntry.date.getTime()}</article>}
            </section>
        );
    }
}
