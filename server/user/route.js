const express = require('express');
const { userRegister, userLogin, allUsers, deleteUser,createTransaction,userTransactions,allTransactions,updateBalance,addBalance ,OneUsers} = require('./controller');
// const Transaction{} = require('./transaction');
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
    router.get("/all", allUsers)
router.delete("/:email",deleteUser)
router.post("User/:email",OneUsers)
router.post('/transactions',createTransaction );
router.get('/transactions/:email', userTransactions);
router.get('/transactions/',allTransactions);
router.post('/updatebalance',updateBalance);
router.post('/addbalance',addBalance);




module.exports = router;