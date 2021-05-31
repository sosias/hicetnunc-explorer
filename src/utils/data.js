


//'https://api.tzkt.io/v1/accounts/tz1TWSNS44pKian45zE9c1baa3x7hihBAzm2/operations?type=transaction%2Creveal&limit=200&sort=1&quote=usd'
// 'https://api.tzkt.io/v1/operations/transactions?sender=tz1TWSNS44pKian45zE9c1baa3x7hihBAzm2&quote=usd&sort.desc=id&limit=50'


function getTransactionsOfAccount(userAddress){
    return fetch('https://api.tzkt.io/v1/accounts/'+userAddress+'/operations?type=transaction%2Creveal&limit=300&sort=1&quote=usd')
}

function getObjktBoughtPrice(userAddress){
    return getTransactionsOfAccount(userAddress)
        .then(resp=>resp.json())
        .then((trans)=>{
            let groupedOperations = {}
            for(let i=0;i<trans.length;i++){
                if(trans[i].parameter && (trans[i].parameter.entrypoint === "collect")){
                    if(groupedOperations[trans[i].hash]==undefined){ groupedOperations[trans[i].hash]={} }
                    groupedOperations[trans[i].hash].amount = {
                        'tezos': trans[i].amount,
                        'quote_dollar': trans[i].quote.usd
                    }
                    groupedOperations[trans[i].hash].timestamp = trans[i].timestamp
                }
                if(trans[i].parameter && 
                    (trans[i].parameter.entrypoint === "transfer") &&
                    trans[i].parameter.value[0].txs[0].to_ === userAddress ){
                    if(groupedOperations[trans[i].hash]==undefined){ groupedOperations[trans[i].hash]={} }
                    groupedOperations[trans[i].hash].token_id = trans[i].parameter.value[0].txs[0].token_id
                }
            }
            return groupedOperations
        })
        .then(groupedOperations=>{
            let groupedTokenId = {}
            for (let [key, value] of Object.entries(groupedOperations)) {
                if(value.token_id){
                    if(groupedTokenId[value.token_id]==undefined){groupedTokenId[value.token_id]=[]}
                    groupedTokenId[value.token_id].push({
                        'timestamp': value.timestamp,
                        'amount': value.amount,
                        'operation': key
                    })
                }
            }
            return groupedTokenId
        })
        //.catch(err=>{console.log(err)})
}

export {
    getObjktBoughtPrice
}
