const getDecimals = (amount: number | null) => {
    if (!amount) return 0.0;
    if (amount === 0) return 0.0;
    return (amount / 100).toFixed(2);
};

export default getDecimals;
