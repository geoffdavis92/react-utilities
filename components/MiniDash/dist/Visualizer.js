"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _victory = require("victory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Visualizer 


var gas = [{ date: new Date("21:31 12/23/2016"), costGal: 2.299, costFill: 23.69 }, { date: new Date("14:53 12/31/2016"), costGal: 2.399, costFill: 24.4 }, { date: new Date("19:50 12/31/2016"), costGal: 2.199, costFill: 21.43 }, { date: new Date("19:03 01/18/2017"), costGal: 2.099, costFill: 21.95 }, { date: new Date("17:16 03/19/2017"), costGal: 2.049, costFill: 21.16 }];

var gasMin = new Date("12/22/2016");
var gasMax = new Date("03/21/2017");

var Visualizer = function (_Component) {
  _inherits(Visualizer, _Component);

  function Visualizer(props) {
    _classCallCheck(this, Visualizer);

    return _possibleConstructorReturn(this, (Visualizer.__proto__ || Object.getPrototypeOf(Visualizer)).call(this, props));
  }

  _createClass(Visualizer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          dataSource = _props.dataSource,
          datasets = _props.datasets,
          xAxis = _props.xAxis,
          yAxis = _props.yAxis;

      var ChartComponents = datasets.map(function (dataset, i) {
        var xKey = dataset.xKey,
            yKey = dataset.yKey,
            type = dataset.type,
            scale = dataset.scale,
            style = dataset.style;


        if (type === "Line") {
          return _react2.default.createElement(_victory.VictoryLine, { key: i, data: dataSource, x: xKey, y: yKey, scale: scale ? scale : null, style: style });
        } else if (type === "Bar") {
          return _react2.default.createElement(_victory.VictoryBar, { key: i, data: dataSource, x: xKey, y: yKey, scale: scale ? scale : null, style: style });
        }
      });
      return _react2.default.createElement(
        "div",
        { className: "MiniDash_Visualizer_Chart" },
        _react2.default.createElement(
          _victory.VictoryChart,
          { theme: _victory.VictoryTheme.grayscale },
          _react2.default.createElement(_victory.VictoryAxis, {
            domain: xAxis.range,
            label: xAxis.label,
            style: {
              axisLabel: { padding: 33 },
              ticks: { size: 5, stroke: "#666" }
            },
            tickCount: xAxis.tickCount,
            tickFormat: xAxis.tickFormat
          }),
          _react2.default.createElement(_victory.VictoryAxis, {
            dependentAxis: true,
            domain: yAxis.range,
            label: yAxis.label,
            style: {
              axisLabel: { padding: 27.5 },
              tickLabels: { fontSize: 10, padding: 3 },
              ticks: { size: 2.5, stroke: "#666" }
            },
            tickCount: yAxis.tickCount,
            tickFormat: yAxis.tickFormat
          }),
          ChartComponents
        )
      );
    }
  }]);

  return Visualizer;
}(_react.Component);

exports.default = Visualizer;