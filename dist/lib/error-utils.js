"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderError = void 0;
var global_constants_1 = require("./global-constants");
var getData = function (type) {
    switch (type) {
        case "not-found":
            return { img: "/img/obi-wan.jpg", errorMsg: global_constants_1.NOT_FOUND_ERR };
        case "unauth":
            return { img: "/img/han.jpg", errorMsg: global_constants_1.UNAUTH_REQ_ERR };
        case "server-err":
            return { img: "/img/lando.jpg", errorMsg: global_constants_1.PAGE_ERR };
    }
};
var renderError = function (type, res, isAuth) {
    var props = getData(type);
    props.isAuth = isAuth;
    res.render("error", props);
};
exports.renderError = renderError;
