function count(coins, n, sum) {
    let bank = new Array(sum + 1);
    bank.fill(0);
    bank[0] = 1;
    for (let i = 0; i < n; i++) {
        for (let j = coins[i]; j <= sum; j++) {
            bank[j] += bank[j - coins[i]];
        }
    }
    return bank[sum];
}
//function countChange(money, coins) {
//    let n = coins.length;
//    return count(coins, n, money);
//}


//function countChange(money, coins) {
//	const coin = coins.pop()

//	if(!coin) return 0
//	if (money <  0) return 0
//	if (money == 0) return 1

//	return countChange(money - coin, [coin,...coins]) + countChange(money, coins)
//}

const time = performance.now()
console.log(countChange1(20000, [50, 100, 200, 500]))
console.log(performance.now() - time)


