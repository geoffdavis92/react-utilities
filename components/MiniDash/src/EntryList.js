// EntryList @flow
import React, { Component } from "react";

class Entry extends Component {
    constructor(props) {
        super(props);
        this.entryID = this.props.id;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.props.onClickCallback("explorer", { selectedEntry: this.entryID });
    }
    render() {
        const { handleClick, props: { entry: { date } } } = this;
        return (
            <li onClick={handleClick}>
                <strong>
                    {
                        `${date.getHours()}:${date
                            .getMinutes()
                            .toString().length < 2 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                    }
                </strong>
            </li>
        );
    }
}

export default class EntryList extends Component {
    render() {
        const { props: { entries } } = this;
        const dataEntries = entries.map(entry => {
            const { date } = entry;
            const identifier = date.getTime();
            return (
                <Entry
                    key={identifier}
                    entry={{ date }}
                    id={identifier}
                    onClickCallback={this.props.selectEntryCallback}
                />
            );
        });
        return (
            <ol>
                {dataEntries}
            </ol>
        );
    }
}
