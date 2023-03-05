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
        
        // build an array of cidReverse object
        const cidObjs = [
            {
                unit: 100,
                unitName: 'ONE HUNDRED',
                amount: cidReverse[0][1],
                number: cidReverse[0][1]/100
            },
            {
                unit: 20,
                unitName: 'TWENTY',
                amount: cidReverse[1][1],
                number: cidReverse[1][1]/20
            },
            {
                unit: 10,
                unitName: 'TEN',
                amount: cidReverse[2][1],
                number: cidReverse[2][1]/10
            },
            {
                unit: 5,
                unitName: 'FIVE',
                amount: cidReverse[3][1],
                number: cidReverse[3][1]/5
            },
            {
                unit: 1,
                unitName: 'ONE',
                amount: cidReverse[4][1],
                number: cidReverse[4][1]/1
            },
            {
                unit: 0.25,
                unitName: 'QUARTER',
                amount: cidReverse[5][1],
                number: cidReverse[5][1]/0.25
            },
            {
                unit: 0.1,
                unitName: 'DIME',
                amount: cidReverse[6][1],
                number: cidReverse[6][1]/0.1
            },
            {
                unit: 0.05,
                unitName: 'NICKEL',
                amount: cidReverse[7][1],
                number: cidReverse[7][1]/0.05
            },
            {
                unit: 0.01,
                unitName: 'PENNY',
                amount: cidReverse[8][1],
                number: cidReverse[8][1]/0.01
            },
        ]

        
        //
        let dynamicChange = change;
        let realChange = [];

        /*
        for(let i=0; i<cidObjs.length; i++){
            let x = Math.floor(dynamicChange/cidObjs[i].unit);
            if(x > 0){
                if(x >= cidObjs[i].number){
                    realChange.push([cidObjs[i].unitNmae, cidObjs[i].amount]);  // x > number, take all
                    dynamicChange = dynamicChange - cidObjs[i].amount;  // update dynamicChange
                }else{
                    realChange.push([cidObjs[i].unitNmae, cidObjs[i].unit * x]); // x < number, take x
                    dynamicChange = dynamicChange - cidObjs[i].unit * x;
                }
            }
        }
        */

        for(let i = 0; i<cidObjs.length; i++){
            if(dynamicChange >= cidObjs[i].unit && cidObjs[i].amount>0){
                if(dynamicChange >= cidObjs[i].amount){
                    realChange.push([cidObjs[i].unitName, cidObjs[i].amount]); // take all
                    dynamicChange -= cidObjs[i].amount;
                }else{
                    let amountTaking = 0;
                    while(dynamicChange >= cidObjs[i].unit){  // if dynamicChange < amount, take n*unit unless dynamicChange < unit
                        amountTaking += cidObjs[i].unit;
                        dynamicChange = dynamicChange - cidObjs[i].unit;
                    }
                    realChange.push([cidObjs[i].unitName, amountTaking]);
                }
            }
        }  // at the end, dynamicChange should be 0 or dynamicChange > 0.

        if(dynamicChange >= 0.01){
            console.log('{status: "INSUFFICIENT_FUNDS", change: []}');
        }else if(dynamicChange >0 && dynamicChange < 0.01){  // to deal with floating point number error
            realChange[realChange.length-1][1] += 0.01;
            console.log(realChange);
        }else{
            console.log(realChange);
        }
        

    }
    
}

// test
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])