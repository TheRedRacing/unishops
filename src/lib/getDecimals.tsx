const getDecimals = (amount: number | undefined | null): string => {
    if (!amount) return "0.00";
    if (amount === 0) return "0.00";

    // if number is 1000, we want to return 10.00 and if number is 100000, we want to return 1'000.00
    return (amount / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

export default getDecimals;
