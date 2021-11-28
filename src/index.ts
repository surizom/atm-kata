type availableBill = 10 | 20 | 50 | 100 | 200 | 500;

type distributedBill = Partial<Record<availableBill, number>>;

export const atm = (requestedAmount: number): distributedBill => {
  return { [requestedAmount]: 1 };
};
