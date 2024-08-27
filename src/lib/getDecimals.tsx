const getDecimals = (amount: number | undefined | null): string => {
    if (!amount) return "0.00";
    if (amount === 0) return "0.00";
    return (amount / 100).toFixed(2);
};

export default getDecimals;
