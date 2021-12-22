import { atm, INITIAL_DISTRIBUTION } from ".";

describe("ATM", function () {
  it("should return 10€ bill when requested 10€", function () {
    expect(atm(10)).toEqual({ ...INITIAL_DISTRIBUTION, 10: 1 });
  });

  it("should return 20€ bill when requested 20€", function () {
    expect(atm(20)).toEqual({ ...INITIAL_DISTRIBUTION, 20: 1 });
  });

  it("should return 2 * 20€ bill when requested 30€", function () {
    expect(atm(40)).toEqual({ ...INITIAL_DISTRIBUTION, 20: 2 });
  });

  it("should return 1 * 50€ + 1*10 bill when requested 60€", function () {
    expect(atm(60)).toEqual({ ...INITIAL_DISTRIBUTION, 50: 1, 10: 1 });
  });

  it("should return 1 * 500€ + 1 * 200€ and 1 * 20 when requested 720€", function () {
    expect(atm(720)).toEqual({ ...INITIAL_DISTRIBUTION, 500: 1, 200: 1, 20: 1 });
  });
});
