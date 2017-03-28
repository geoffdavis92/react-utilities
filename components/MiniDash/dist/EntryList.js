"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // EntryList 


var Entry = function (_Component) {
    _inherits(Entry, _Component);

    function Entry(props) {
        _classCallCheck(this, Entry);

        var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, props));

        _this.entryID = _this.props.id;
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(Entry, [{
        key: "handleClick",
        value: function handleClick(e) {
            e.preventDefault();
            this.props.onClickCallback("explorer", { selectedEntry: this.entryID });
        }
    }, {
        key: "render",
        value: function render() {
            var handleClick = this.handleClick,
                date = this.props.entry.date;

            return _react2.default.createElement(
                "li",
                { onClick: handleClick },
                _react2.default.createElement(
                    "strong",
                    null,
                    date.getHours() + ":" + (date.getMinutes().toString().length < 2 ? "0" + date.getMinutes() : date.getMinutes()) + " " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
                )
            );
        }
    }]);

    return Entry;
}(_react.Component);

var EntryList = function (_Component2) {
    _inherits(EntryList, _Component2);

    function EntryList() {
        _classCallCheck(this, EntryList);

        return _possibleConstructorReturn(this, (EntryList.__proto__ || Object.getPrototypeOf(EntryList)).apply(this, arguments));
    }

    _createClass(EntryList, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var entries = this.props.entries;

            var dataEntries = entries.map(function (entry) {
                var date = entry.date;

                var identifier = date.getTime();
                return _react2.default.createElement(Entry, {
                    key: identifier,
                    entry: { date: date },
                    id: identifier,
                    onClickCallback: _this3.props.selectEntryCallback
                });
            });
            return _react2.default.createElement(
                "ol",
                null,
                dataEntries
            );
        }
    }]);

    return EntryList;
}(_react.Component);

exports.default = EntryList;