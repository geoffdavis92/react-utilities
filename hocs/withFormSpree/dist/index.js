'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withFormSpree;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withFormSpree(ComponentToWrap, formSpreeEmail) {
	return function (_Component) {
		_inherits(FormSpreeWrapper, _Component);

		function FormSpreeWrapper(props) {
			_classCallCheck(this, FormSpreeWrapper);

			var _this = _possibleConstructorReturn(this, (FormSpreeWrapper.__proto__ || Object.getPrototypeOf(FormSpreeWrapper)).call(this, props));

			_this.handleSubmit = _this.handleSubmit.bind(_this);
			return _this;
		}

		_createClass(FormSpreeWrapper, [{
			key: 'handleSubmit',
			value: function handleSubmit() {
				var formData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { submission: true };
				var callback = arguments[1];

				// TODO: add _replyto, _cc, and _subject to default formData and
				// 	add check for fulfilled formData.

				var fetchSendBody = new FormData();

				Object.keys(formData).forEach(function (key) {
					fetchSendBody.append(key, formData[key]);
				});

				if (window.fetch) {
					// use Fetch API

					// Init header class
					var headers = new Headers();

					// Append Accept header
					headers.append('Accept', 'application/json');

					// Start fetch pipeline
					fetch('https://formspree.io/' + formSpreeEmail, {
						method: 'POST',
						headers: headers,
						body: fetchSendBody
					}).then(function (res) {
						if (callback) {
							callback(res.json());
						}
					});
				} else {
					// use XMLHttpRequest
					var XHR = new XMLHttpRequest();
					var method = 'POST';
					var endpoint = 'https://formspree.io/' + formSpreeEmail;
					XHR.open(method, endpoint, true);
					XHR.setRequestHeader('Accept', 'application/json');
					XHR.onreadystatechange = function checkReadyState() {
						if (XHR.readyState == XMLHttpRequest.DONE && XHR.status == 200) {
							if (callback) {
								callback(JSON.parse(XHR.response));
							}
						}
					};
					XHR.send(fetchSendBody);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					ComponentToWrap,
					_extends({
						formSpreeCallback: this.handleSubmit
					}, { formSpreeEmail: formSpreeEmail }, this.props),
					this.props.children
				);
			}
		}]);

		return FormSpreeWrapper;
	}(_react.Component);
};