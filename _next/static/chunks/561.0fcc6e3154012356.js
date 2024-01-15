"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[561],{

/***/ 8050:
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: function() { return /* binding */ AcurastPriceOracle; }
/* harmony export */ });
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2412);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);
o1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// The public key of our trusted data provider
const ORACLE_PUBLIC_KEY = 'B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC';
// const ORACLE_SYMBOL = 'BTC';
class AcurastPriceOracle extends o1js__WEBPACK_IMPORTED_MODULE_0__/* .SmartContract */ .C3 {
    constructor() {
        super(...arguments);
        // Define contract state
        this.oraclePublicKey = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
        // @state(CircuitString) symbol = State<CircuitString>();
        this.counter = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
        this.priceDataBTC = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
        this.priceDataETH = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
        this.priceDataMINA = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
        // Define contract events
        this.events = {
            newCounter: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
            newPriceDataBTC: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
            newPriceDataETH: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
            newPriceDataMINA: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
        };
    }
    init() {
        super.init();
        // Initialize contract state
        this.oraclePublicKey.set(o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58(ORACLE_PUBLIC_KEY));
        // this.symbol.set(CircuitString.fromString(ORACLE_SYMBOL));
        this.counter.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
        this.priceDataBTC.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
        this.priceDataETH.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
        this.priceDataMINA.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
        // Specify that caller should include signature with tx instead of proof
        this.requireSignature();
    }
    update(nextCounter, priceDataBTC, priceDataETH, priceDataMINA, signature) {
        // Get the oracle public key from the contract state
        const oraclePublicKey = this.oraclePublicKey.get();
        this.oraclePublicKey.assertEquals(oraclePublicKey);
        // Get the internal counter from the contract state
        const internalCounter = this.counter.get();
        this.counter.assertEquals(internalCounter);
        // Increase internal counter by one and assert if it's the same that the user passed
        const internalNextCounter = internalCounter.add(1);
        internalNextCounter.assertEquals(nextCounter, 'Next counter is not valid');
        // Update counter
        this.counter.set(internalNextCounter);
        // Check if the signature is valid for the provided data
        const validSignature = signature.verify(oraclePublicKey, [
            nextCounter,
            priceDataBTC,
            priceDataETH,
            priceDataMINA,
        ]);
        validSignature.assertTrue('Signature is not valid');
        // Store priceData on chain
        this.priceDataBTC.set(priceDataBTC);
        this.priceDataETH.set(priceDataETH);
        this.priceDataMINA.set(priceDataMINA);
        // Emit price Data event
        this.emitEvent('newCounter', internalNextCounter);
        this.emitEvent('newPriceDataBTC', priceDataBTC);
        this.emitEvent('newPriceDataETH', priceDataETH);
        this.emitEvent('newPriceDataMINA', priceDataMINA);
    }
}
__decorate([
    (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh),
    __metadata("design:type", Object)
], AcurastPriceOracle.prototype, "oraclePublicKey", void 0);
__decorate([
    (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], AcurastPriceOracle.prototype, "counter", void 0);
__decorate([
    (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], AcurastPriceOracle.prototype, "priceDataBTC", void 0);
__decorate([
    (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], AcurastPriceOracle.prototype, "priceDataETH", void 0);
__decorate([
    (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], AcurastPriceOracle.prototype, "priceDataMINA", void 0);
__decorate([
    o1js__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .Signature */ .Pc]),
    __metadata("design:returntype", void 0)
], AcurastPriceOracle.prototype, "update", null);
//# sourceMappingURL=AcurastPriceOracle.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6561:
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AcurastPriceOracle: function() { return /* reexport safe */ _AcurastPriceOracle__WEBPACK_IMPORTED_MODULE_0__.e; }
/* harmony export */ });
/* harmony import */ var _AcurastPriceOracle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8050);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AcurastPriceOracle__WEBPACK_IMPORTED_MODULE_0__]);
_AcurastPriceOracle__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


//# sourceMappingURL=index.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

}]);