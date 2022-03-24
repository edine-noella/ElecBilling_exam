import { generateToken, getDays } from "../../utils/index";

describe("generateToken", () => {
  it("should return a string of 8 characters", () => {
    expect(typeof generateToken()).toBe("string");
    expect(generateToken().length).toBe(8);
  });
});

describe("get days", () => {
  it("It should generate days for electricity based on amount passed", () => {
    expect(getDays(100).getDate()).toEqual(getDate(1));
    expect(getDays(300).getDate()).toEqual(getDate(3));
  });
});

function getDate(num: number) {
  const today = new Date();
  const tmr = new Date();

  tmr.setDate(today.getDate() + num);
  return tmr.getDate();
}
