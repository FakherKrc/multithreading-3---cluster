const{parentPort, workerData} = require("worker_threads")

start = workerData.start
end = workerData.end

var sum = 0
for(var i = start; i<end; i++){
    for(var j = 2; j <= i/2; i++){
        if(i%j == 0){
            break
        }

    if(j > 2){
        sum+= i
    }
    }
}

parentPort.postMessage ({
    end : end,
    start : start,
    sum : sum,

})