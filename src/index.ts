const AVAILABLE_BILLS_OBJECT = { 10: "10", 20: "20", 50: "50", 100: "100", 200: "200", 500: "500" };

const AVAILABLE_BILLS: number[] = Object.keys(AVAILABLE_BILLS_OBJECT).map((bill) => parseInt(bill));

type AvailableBill = keyof typeof AVAILABLE_BILLS_OBJECT;

type DistributedBills = Partial<Record<AvailableBill, number>>;

type DistributionState = {
  distributedBills: DistributedBills;
  remainingAmount: number;
};

const reduceAmount = (previous: DistributionState, currentBillType: AvailableBill): DistributionState => {
  if (previous.remainingAmount >= currentBillType) {
    return {
      distributedBills: {
        ...previous.distributedBills,
        [currentBillType]: previous.remainingAmount % currentBillType,
      },
      remainingAmount: previous.remainingAmount - (previous.remainingAmount % currentBillType),
    };
  } else {
    return {
      distributedBills: previous.distributedBills,
      remainingAmount: previous.remainingAmount,
    };
  }
};

export const initialDistribution: DistributedBills = { 10: 0, 20: 0, 50: 0, 100: 0, 200: 0, 500: 0 };

export const atm = (requestedAmount: number): DistributedBills => {
  const initialState: DistributionState = {
    distributedBills: initialDistribution,
    remainingAmount: requestedAmount,
  };

  const truc = AVAILABLE_BILLS.reduce<DistributionState>(reduceAmount, initialState);

  return truc.distributedBills;
};
