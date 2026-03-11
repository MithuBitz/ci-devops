"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe('Host name', () => {
    it('should return the correct hostname', () => {
        expect((0, utils_1.getHostName)()).toBeTruthy();
    });
});
