

function getPageList(start,count) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log(start,count)
      resolve(start)
    }, 1000);
  })
}
function getPrice(start,count){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log(start,count)
      resolve(start)
    }, 2000);
  })

}

function doWork(){
  let start= new Date().getTime()
  getPageList(10,20).then(res=>{
    getPrice(res,20).then(res=>{
      console.log(res)
    })
  })
  let end=new Date().getTime()
  console.log(end-start,'sss')
}

doWork()
async function doWorkAsync(){
  let start= new Date().getTime()
  let res=await getPageList(10,20)
  let price=await getPrice(res,20)
  console.log(price)
  let end=new Date().getTime()
  console.log(end-start,'aaa')
}
doWorkAsync()