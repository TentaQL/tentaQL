import { resetTab } from "./textBoxActions";
import * as types from "./types.js";

describe("actions", () => {
  it("should create an action to resetTab", () => {
    const value = "resolvers";
    const expectedAction = {
      type: types.RESET_TAB,
      payload: value
    };
    expect(resetTab(value)).toEqual(expectedAction);
  });
});
