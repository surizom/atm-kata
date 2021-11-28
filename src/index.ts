const AVAILABLE_BILLS_OBJECT = { 10: "10", 20: "20", 50: "50", 100: "100", 200: "200", 500: "500" };

const AVAILABLE_BILLS: number[] = Object.keys(AVAILABLE_BILLS_OBJECT).map((bill) => parseInt(bill));

type AvailableBill = keyof typeof AVAILABLE_BILLS_OBJECT;

type DistributedBills = Record<AvailableBill, number>;

type DistributionState = {
  distributedBills: DistributedBills;
  remainingAmount: number;
};

const canDistribute = (amount: number, billType: AvailableBill) => amount >= billType;

const distributeAmount = (
  currentDistribution: DistributionState,
  currentBillType: AvailableBill
): DistributionState => {
  if (canDistribute(currentDistribution.remainingAmount, currentBillType)) {
    const distributedBills = currentDistribution.remainingAmount % currentBillType;

    return {
      distributedBills: {
        [currentBillType]: distributedBills,
        ...currentDistribution.distributedBills,
      },
      remainingAmount: currentDistribution.remainingAmount - currentBillType * distributedBills,
    };
  } else {
    return {
      distributedBills: currentDistribution.distributedBills,
      remainingAmount: currentDistribution.remainingAmount,
    };
  }
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
