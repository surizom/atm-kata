import { atm } from ".";

describe("ATM", function () {
  it("should return 10€ bill when requested 10€", function () {
    expect(atm(10)).toEqual({ 10: 1 });
  });

  it("should return 20€ bill when requested 20€", function () {
    expect(atm(20)).toEqual({ 20: 1 });
  });
});
