const {Router}=require('express');
const { JobModel } = require('../models/Jobs.model');

const jobRoutes=Router();

jobRoutes.get("/",async(req,res)=>{
    let {role, order, page, language} = req.query;
    let payload={}
    if(language){
        payload["language"]=language
    }
    if(role){
        payload.role=role
    }
    let sortObj={};
    if(order=="asc"){
        sortObj["postedAt"]=1
    }else if(order=="desc"){
        sortObj["postedAt"]=-1
    }
    try {
        const jobs= await JobModel.find(payload).limit(10).skip((10*page)-10).sort(sortObj)
        res.send(jobs)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

jobRoutes.post('/add',async(req,res)=>{
    try {
        const job=new JobModel(req.body)
        await job.save()
        res.send({"msg":"Job Posted Successfully!!"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports=jobRoutes