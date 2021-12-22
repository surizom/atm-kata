const AVAILABLE_BILLS_OBJECT = { 10: "10", 20: "20", 50: "50", 100: "100", 200: "200", 500: "500" };

const AVAILABLE_BILLS: AvailableBill[] = [500, 200, 100, 50, 20, 10];

type AvailableBill = keyof typeof AVAILABLE_BILLS_OBJECT;

type DistributedBills = Record<AvailableBill, number>;

type DistributionState = {
  distributedBills: DistributedBills;
  remainingAmount: number;
};

export const INITIAL_DISTRIBUTION: DistributedBills = { 10: 0, 20: 0, 50: 0, 100: 0, 200: 0, 500: 0 };

const distributeBills = ({ remainingAmount, distributedBills }: DistributionState): DistributionState => {
  if (remainingAmount === 0) {
    return {
      distributedBills,
      remainingAmount,
    };
  }

  const billToDistribute = AVAILABLE_BILLS.find((bill) => bill <= remainingAmount);

  return distributeBills({
    distributedBills: {
      ...distributedBills,
      [billToDistribute]: distributedBills[billToDistribute] + 1,
    },
    remainingAmount: remainingAmount - billToDistribute,
  });
};

export const atm = (requestedAmount: number) =>
  distributeBills({ remainingAmount: requestedAmount, distributedBills: INITIAL_DISTRIBUTION }).distributedBills;
