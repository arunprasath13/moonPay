const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../database/db");

// // GET /balance - Retrieve account balance
router.get('/balance', authMiddleware, async (req, res) => {
    try {
        // Use findOne to get a single document
        const account = await Account.findOne({ userId: req.userId });
        
        // Log the account to debug
        console.log("Account is: ", account);

        // Check if account exists
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Return the balance
        res.json({ balance: account.balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post("/transfer",authMiddleware,async (req,res) => {
    const {amount,to} = req.body;
    console.log("To is: ",to)
    const account = await Account.findOne({
        userId:req.userId
    })
    if(account.balance < amount){
       return res.json({
        message:"Bro amount illa"
       })
    }
    const toAccount = await Account.findOne({
        userId:to
    });
    console.log("toAccount ", toAccount)
    if(!toAccount){
        return res.json({
            message:"Dei account illa da"
        })
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    })
    await Account.updateOne({
        userId:to
    },{
        $inc:{
            balance:amount
        }
    })
    res.json({
        message:"Panam poiruchu da pathuko"
    })
});

module.exports = router;
