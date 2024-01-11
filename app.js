const express = require('express');
const mongoose = require("mongoose");
const app = express(); 
const port = 3030 ;
const menuModel = require("./DB/menu.model.js");

const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', async(req, res)=>{
    const items = await menuModel.find({});
    res.json({items:items})
})
app.post('/menu', async(req, res)=>{
    const {name , category ,price} = req.body;
    await new menuModel({name:name , category:category , price:price}).save();
    res.json({message:"تم اضافه عنصر بنجاح"})
})
app.post('/menu/:id', async(req, res)=>{
    const id = req.params.id ;
    const {name , category ,price} = req.body;
    const item = await menuModel.find({_id:id});
    if(item){
        await menuModel.findOneAndUpdate({_id:id},{name:name , category:category , price:price});
        res.json({message:"تم التعديل بنجاح"})
    }else{
        res.json({message:"هناك خطأ في التعديل"})
    }
})
app.get('/menu/:id', async(req, res)=>{
    const id = req.params.id ;
    const item = await menuModel.findById({_id:id});
    if(item){
        res.json({items:item})
    }else{
        res.json({message:"هناك خطأ في العنصر"})
    }
})
app.delete('/menu/:id', async(req, res)=>{
    const id = req.params.id ;
    const item = await menuModel.find({_id:id});
    if(item){
        await menuModel.findOneAndDelete({_id:id});
        res.json({message:"تم حذف العنصر بنجاح"})
    }else{
        res.json({message:"هناك خطأ في حذف العنصر"})
    }
})

app.listen(port, async () => {
    try {
        await mongoose.connect('mongodb+srv://mohamedfelhamzawy:01029505696@cluster0.zti9wu1.mongodb.net/')
        .then(() => console.log("DB conected")).then(() => console.log(`Running on port ${port} ...`));
    } catch (error) {
        return new HttpError(`Unexpected Error: ${error}`, 500);
    }
});