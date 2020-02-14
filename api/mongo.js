var mongoose = require("mongoose");

mongoose.connect('mongodb://mindreader:mind1234@49.50.166.165:27017',{
    useNewUrlParser: true,
    useFindAndModify: false
})

const db = mongoose.connection
const handleOpen = () => console.info('DB connected.')
const handleError = (err) => console.info(`DB Error : ${err}`)

db.once("open",handleOpen)
db.on("error",handleError)

const DomainSet = new mongoose.Schema({
    domainURL:{
        type:String,
    },
    views:{
        type:Number,
        default: 0
    }
})

const model = mongoose.model("DomainSet",DomainSet)

function isDomain(URL){
    model.exists({domainURL:URL}).then(res=>{
        //console.log(res)
        if (res){
            model.updateOne({domainURL:URL}, {$inc:{views:1}}).exec();
        } else {
            model.create({
                domainURL:URL,
                views:0
            });
        }
    })
}//end isDomain
//how to use method
isDomain("https://naver.com") //<< url as parameter

function getDomainInfo(URL){
    console.log(flag)
    if (flag){
        let returnURL = flag._conditions.domainURL
        let returnCnt = flag.mongooseCollectionNativeCollection
        console.log(returnCnt)
        //console.log(returnURL,returnCnt)
    }
}//end getDomainInfo

getDomainInfo("https://naver.com")