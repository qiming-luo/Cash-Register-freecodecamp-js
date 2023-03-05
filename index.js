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
        
        // build an array of cid object
        const cidObjs = [
            {
                unit: 100,
                unitNmae: 'ONE HUNDRED',
                amount: cidReverse[0][1],
                number: cidReverse[0][1]/100
            },
            {
                unit: 20,
                unitNmae: 'TWENTY',
                amount: cidReverse[1][1],
                number: cidReverse[1][1]/20
            },
            {
                unit: 10,
                unitNmae: 'TEN',
                amount: cidReverse[2][1],
                number: cidReverse[2][1]/10
            },
            {
                unit: 5,
                unitNmae: 'FIVE',
                amount: cidReverse[3][1],
                number: cidReverse[3][1]/5
            },
            {
                unit: 1,
                unitNmae: 'ONE',
                amount: cidReverse[4][1],
                number: cidReverse[4][1]/1
            },
            {
                unit: 0.25,
                unitNmae: 'QUARTER',
                amount: cidReverse[5][1],
                number: cidReverse[5][1]/0.25
            },
            {
                unit: 0.1,
                unitNmae: 'DIME',
                amount: cidReverse[6][1],
                number: cidReverse[6][1]/0.1
            },
            {
                unit: 0.05,
                unitNmae: 'NICKEL',
                amount: cidReverse[7][1],
                number: cidReverse[7][1]/0.05
            },
            {
                unit: 0.01,
                unitNmae: 'PENNY',
                amount: cidReverse[8][1],
                number: cidReverse[8][1]/0.01
            },
        ]

        
        //
        let dynamicChange = change;
        let realChange = [];
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
        
        if(dynamicChange > 0){
            console.log('{status: "INSUFFICIENT_FUNDS", change: []}');
        }else{
            console.log(realChange);
        }

    }
    
}

// test
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);