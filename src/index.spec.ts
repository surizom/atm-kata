import { atm } from ".";

describe("ATM", function () {
  it("should return 10€ bill when requested 10€", function () {
    expect(atm(10)).toEqual({ 10: 1 });
  });
});
