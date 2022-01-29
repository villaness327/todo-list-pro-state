"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocalStorage = useLocalStorage;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useLocalStorage(itemName, initialValue) {
  var _React$useState = _react["default"].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      error = _React$useState2[0],
      setError = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(true),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      loading = _React$useState4[0],
      setLoading = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(initialValue),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      item = _React$useState6[0],
      setItem = _React$useState6[1];

  var _React$useState7 = _react["default"].useState(true),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      sincronizedItem = _React$useState8[0],
      setSincronizedItem = _React$useState8[1];

  _react["default"].useEffect(function () {
    setTimeout(function () {
      try {
        var localStorageItem = localStorage.getItem(itemName);
        var parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false); //Loading false, para que termine de mostrar meensaje de carga

        setSincronizedItem(true); //Todo queda sincronizado
      } catch (error) {
        setError(error); //Se setea el error en el estado.
      }
    }, 3000);
  }, [sincronizedItem]); //se ejecuta cada vez que el estado de sincronizacion cambia


  var saveItem = function saveItem(newItem) {
    try {
      var stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  var sincronizeItem = function sincronizeItem() {
    setLoading(true); // estado de loadin

    setSincronizedItem(false); //Cambia el estado por lo tanto el React.useEffect de carga de todos se ejecuta nuevamente
  };

  return {
    item: item,
    saveItem: saveItem,
    loading: loading,
    error: error,
    sincronizeItem: sincronizeItem
  };
}