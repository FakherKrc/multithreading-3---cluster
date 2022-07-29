const express = require("express")
const app = express()
const {Worker} = require("worker_threads")




function runworker(workerData){
    return new Promise((resolve, reject) => {
        const worker = new Worker("./worker.js", {workerData })
        worker.on("message", resolve)
        worker.on("error", reject)
        worker.on("exit", code => {
            if(code != 0){
                reject(new Error("worker exited with code ${code}"))
            }
        })
    })

}
function workerAndDivideSum(){
    const start1 = 2
    const end1 = 150000
    const start2 = 150001
    const end2 = 300000
    const start3 = 300001
    const end3 = 450000
    const start4 = 450001
    const end4 = 600000

     //allocating each worker seperate parts
  const worker1 = runworker({ start: start1, end: end1 })
  const worker2 = runworker({ start: start2, end: end2 })
  const worker3 = runworker({ start: start3, end: end3 })
  const worker4 = runworker({ start: start4, end: end4 })

  return Promise.all([worker1, worker2, worker3, worker4])
}




app.get('/sum', async (req, res) => {
    const result = await workerAndDivideSum().then((values) => values.reduce((accumulator, part)=> accumulator + part.sum, 0))
    .then(finalanswer => finalanswer)
    res.json({result : result})
})

app.listen(6002, () => console.log("Server Started"))
