"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe('Version', () => {
    it('should return the correct application version', () => {
        expect((0, utils_1.getVersion)()).toBeTruthy();
    });
});
