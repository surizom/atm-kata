import { atm, initialDistribution } from ".";

describe("ATM", function () {
  it("should return 10€ bill when requested 10€", function () {
    expect(atm(10)).toEqual({ 10: 1, ...initialDistribution });
  });

  it("should return 20€ bill when requested 20€", function () {
    expect(atm(20)).toEqual({ 20: 1, ...initialDistribution });
  });

  it("should return 2 * 20€ bill when requested 30€", function () {
    expect(atm(40)).toEqual({ 20: 2, ...initialDistribution });
  });

  it("should return 1 * 500€, 1 * 200€ and 1 * 20 when requested 720€", function () {
    expect(atm(720)).toEqual({ 500: 1, 200: 1, 20: 1, ...initialDistribution });
  });
});
