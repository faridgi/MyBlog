const Category = require("../models/category.model");

exports.addCategory = (req, res)=>{
    const { title, description } = req.body;
    const newCategory = new Category({
        ...req.body
    })

    newCategory.save((err, category)=>{
        if(err){
            console.log(err.message);
        }

        req.flash('success', 'Great, category has been added !');
        res.redirect('/add-category');
    })
}