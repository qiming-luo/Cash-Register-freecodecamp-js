function checkCashRegister(price, cash, cid) {
    // *100 is to get rid of the problem like this: console.log(1.1+0.1+0.1) --> log: 1.3000000000000003
    // while console.log((1.1*10+0.1*10+0.1*10)/10)  ---> log: 1.3
    const change = (cash*100 - price*100)/100;

    let sumCid = cid.reduce((sum,ele) => 
        sum + ele[1]*100,0);  
    sumCid = sumCid/100;
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
        
        // build an array of cidReverse object
        const cidObjs = [
            {
                unit: 100,
                unitName: 'ONE HUNDRED',
                amount: cidReverse[0][1]
            },
            {
                unit: 20,
                unitName: 'TWENTY',
                amount: cidReverse[1][1]
            },
            {
                unit: 10,
                unitName: 'TEN',
                amount: cidReverse[2][1]
            },
            {
                unit: 5,
                unitName: 'FIVE',
                amount: cidReverse[3][1]
            },
            {
                unit: 1,
                unitName: 'ONE',
                amount: cidReverse[4][1]
            },
            {
                unit: 0.25,
                unitName: 'QUARTER',
                amount: cidReverse[5][1]
            },
            {
                unit: 0.1,
                unitName: 'DIME',
                amount: cidReverse[6][1]
            },
            {
                unit: 0.05,
                unitName: 'NICKEL',
                amount: cidReverse[7][1]
            },
            {
                unit: 0.01,
                unitName: 'PENNY',
                amount: cidReverse[8][1]
            }
        ]

        
        //
        let dynamicChange = change*100;
        let realChange = [];

        for(let i = 0; i<cidObjs.length; i++){
            if(dynamicChange >= cidObjs[i].unit*100 && cidObjs[i].amount>0){
                if(dynamicChange >= cidObjs[i].amount*100){
                    realChange.push([cidObjs[i].unitName, cidObjs[i].amount]); // take all
                    dynamicChange -= cidObjs[i].amount*100;
                }else{
                    let amountTaking = 0;
                    while(dynamicChange >= cidObjs[i].unit*100){  // if dynamicChange < amount, take n*unit unless dynamicChange < unit
                        amountTaking += cidObjs[i].unit*100;
                        dynamicChange = dynamicChange - cidObjs[i].unit*100;
                    }
                    realChange.push([cidObjs[i].unitName, amountTaking/100]);
                }
            }
        }  // at the end, dynamicChange should be 0 or dynamicChange > 0.

        if(dynamicChange > 0){
            console.log('{status: "INSUFFICIENT_FUNDS", change: []}');
        }else{
            console.log(realChange);
        }
        
    }
    
}

// test
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])