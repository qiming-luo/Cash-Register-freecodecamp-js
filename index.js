function checkCashRegister(price, cash, cid) {
    const change = cash - price;
    const sumCid = cid.reduce((sum,ele) => 
        sum + ele[1],0);
    console.log(sumCid);

    //
    const diffCash = sumCid - change;

    //
    if(diffCash < 0){
        console.log('insufficent fund');
    }

    //
    if(diffCash === 0) {
        console.log('draw');
    }

    //
    if(diffCash > 0) {
        let cidReverse = [...cid].reverse();
        console.log(cidReverse);
        // build an array of cid object
        const cidObj = [
            {
                unit: 100,
                amount: cidReverse[0][1],
                number: amount/unit
            },
            {
                unit: 20,
                amount: cidReverse[1][1],
                number: amount/unit
            },
            {
                unit: 10,
                amount: cidReverse[2][1],
                number: amount/unit
            },
            {
                unit: 5,
                amount: cidReverse[3][1],
                number: amount/unit
            },
            {
                unit: 1,
                amount: cidReverse[4][1],
                number: amount/unit
            },
            {
                unit: 0.25,
                amount: cidReverse[5][1],
                number: amount/unit
            },
            {
                unit: 0.1,
                amount: cidReverse[6][1],
                number: amount/unit
            },
            {
                unit: 0.05,
                amount: cidReverse[7][1],
                number: amount/unit
            },
            {
                unit: 0.01,
                amount: cidReverse[8][1],
                number: amount/unit
            },
        ]

    }
    
}

// test
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);