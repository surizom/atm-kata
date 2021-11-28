const AVAILABLE_BILLS_OBJECT = { 10: "10", 20: "20", 50: "50", 100: "100", 200: "200", 500: "500" };

const AVAILABLE_BILLS: AvailableBill[] = [500, 200, 100, 50, 20, 10];

type AvailableBill = keyof typeof AVAILABLE_BILLS_OBJECT;

type DistributedBills = Record<AvailableBill, number>;

type DistributionState = {
  distributedBills: DistributedBills;
  remainingAmount: number;
};

const canDistribute = (amount: number, billType: AvailableBill) => amount >= billType;

const euclidianDivision = (n: number, quotient: number) => {
  const reste = n % quotient;

  return (n - reste) / quotient;
};

const distributeAmount = (
  currentDistribution: DistributionState,
  currentBillType: AvailableBill
): DistributionState => {
  const distributedBillsForCurrentBill = euclidianDivision(currentDistribution.remainingAmount, currentBillType);

  return {
    distributedBills: {
      ...currentDistribution.distributedBills,
      [currentBillType]: distributedBillsForCurrentBill,
    },
    remainingAmount: currentDistribution.remainingAmount - currentBillType * distributedBillsForCurrentBill,
  };
};

export const initialDistribution: DistributedBills = { 10: 0, 20: 0, 50: 0, 100: 0, 200: 0, 500: 0 };

export const atm = (requestedAmount: number): DistributedBills => {
  const initialState: DistributionState = {
    distributedBills: initialDistribution,
    remainingAmount: requestedAmount,
  };

  const distribution = AVAILABLE_BILLS.reduce<DistributionState>(distributeAmount, initialState);

  return distribution.distributedBills;
};
