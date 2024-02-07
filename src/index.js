"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _throttle = _interopRequireDefault(require("lodash/throttle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var AnimatedWave = /*#__PURE__*/_react["default"].memo(function (props) {
  var _props$phase = props.phase,
    phase = _props$phase === void 0 ? 10 : _props$phase,
    _props$amplitude = props.amplitude,
    amplitude = _props$amplitude === void 0 ? 60 : _props$amplitude,
    _props$speed = props.speed,
    speed = _props$speed === void 0 ? 10 : _props$speed,
    _props$frequency = props.frequency,
    frequency = _props$frequency === void 0 ? 0.0005 : _props$frequency,
    className = props.className;
  var myDivRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)({
      width: 0,
      height: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    dimensions = _useState2[0],
    setDimensions = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    value = _useState4[0],
    setValue = _useState4[1];
  (0, _react.useEffect)(function () {
    var handleResize = function handleResize() {
      // This function will be called whenever the window is resized
      if (myDivRef.current) {
        var _myDivRef$current = myDivRef.current,
          offsetWidth = _myDivRef$current.offsetWidth,
          offsetHeight = _myDivRef$current.offsetHeight;
        setDimensions({
          width: offsetWidth,
          height: offsetHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return function () {
      // Cleanup function to remove the event listener when component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (myDivRef.current) {
      var _myDivRef$current2 = myDivRef.current,
        offsetWidth = _myDivRef$current2.offsetWidth,
        offsetHeight = _myDivRef$current2.offsetHeight;
      setDimensions({
        width: offsetWidth,
        height: offsetHeight
      });
    }
  }, []);
  (0, _react.useEffect)(function () {
    var updateValue = function updateValue() {
      setValue(function (prev) {
        return prev + 0.01;
      }); // Increment the value
    };
    var throttledUpdate = (0, _throttle["default"])(updateValue, speed);
    var intervalId = setInterval(throttledUpdate, speed);
    return function () {
      clearInterval(intervalId);
      throttledUpdate.cancel();
    };
  }, [speed]);
  var wavePath = function wavePath(x) {
    var y = dimensions.height / 1.5 + amplitude * Math.sin(2 * Math.PI * frequency * x + (phase + value));
    return "".concat(x, " ").concat(y);
  };
  var points = Array.from({
    length: dimensions.width
  }, function (_, i) {
    return wavePath(i);
  }).join(' ');
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-block',
      position: 'absolute'
    },
    ref: myDivRef,
    className: "".concat(className, " animated-wave"),
    "aria-label": "Animated wave"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: dimensions.width,
    height: dimensions.height
  }, props.children, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0 ".concat(dimensions.height, " ").concat(points, " L").concat(dimensions.width, " ").concat(dimensions.height),
    fill: props.fill || '#000000'
  })));
});
var _default = exports["default"] = AnimatedWave;
//# sourceMappingURL=index__.js.map