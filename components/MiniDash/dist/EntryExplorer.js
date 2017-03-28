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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Explorer 


var EntryExplorer = function (_Component) {
    _inherits(EntryExplorer, _Component);

    function EntryExplorer(props) {
        _classCallCheck(this, EntryExplorer);

        var _this = _possibleConstructorReturn(this, (EntryExplorer.__proto__ || Object.getPrototypeOf(EntryExplorer)).call(this, props));

        _this.state = {
            entry: _this.props.selectedEntry
        };
        return _this;
    }

    _createClass(EntryExplorer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log("EntryExplorer didMount");
            console.log(this.props.selectedEntry);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                entry: nextProps.selectedEntry
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            console.log("EntryExplorer renders");
            var theEntry = this.props.dataSource.filter(function (entry) {
                if (entry.date.getTime() === _this2.props.selectedEntry) {
                    return entry;
                }
            })[0];
            return _react2.default.createElement(
                "section",
                null,
                this.props.selectedEntry && _react2.default.createElement(
                    "article",
                    null,
                    theEntry.date.getTime()
                )
            );
        }
    }]);

    return EntryExplorer;
}(_react.Component);

exports.default = EntryExplorer;