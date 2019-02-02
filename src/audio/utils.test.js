import { initSequences } from "./utils";

describe("initSequences", () => {
  it("renders the correct amount of rows", () => {
    const rowAmount = 5;
    expect(initSequences(rowAmount).length).toBe(rowAmount);
  });

  it("renders the correct amount of steps", () => {
    const rowAmount = 5;
    const stepAmount = 3;
    expect(initSequences(rowAmount, stepAmount)[0].length).toBe(stepAmount);
  });
});
