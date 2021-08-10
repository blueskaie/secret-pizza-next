export function getBalance(wallet, denom, decimal = 1000000) {
    if (wallet && wallet.balance) {
        let balance = wallet.balance.find((b)=>b.denom == denom);
        return balance?.amount / decimal;
    } else {
        return 0;
    }
}

export function getRecipients(transactions) {
    if (transactions) {
        let donorTransactions = transactions.filter(t=>t.type=="withdraw");
        return donorTransactions.length;
    } else {
        return 0;
    }
}

export function getDonors(transactions) {
    if (transactions) {
        let donorTransactions = transactions.filter(t=>t.type=="donate");
        return donorTransactions.length;
    } else {
        return 0;
    }
}