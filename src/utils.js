export function getBalance(wallet, denom, decimal = 1000000) {
    if (wallet && wallet.balance) {
        let balance = wallet.balance.find((b)=>b.denom == denom);
        return balance?.amount / decimal;
    } else {
        return 0;
    }
}