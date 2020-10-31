import { expect } from "chai";
import { getResources } from "./getResources";

describe("getResources()", () => {
  const EMPTY_RESOURCES = {
    stone: 0,
    wood: 0,
  };

  it("should return player's resources", () => {
    const resources = getResources();
    expect(resources).to.deep.equal(EMPTY_RESOURCES);
  });
});
