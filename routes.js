const express = require('express');
const router = express.Router();

const tab1Controller = require('./controllers/schema/tab1');
var tab2Cont=require('./controllers/tab2/tab2');
console.log("🚀 ~ tab2Cont", tab2Cont)

const platController=require('./controllers/Plat');

router.post('/schema/tab1', tab1Controller.tab1);
router.post('/schema/time1',tab2Cont.time1);

router.get('/scheme/plat/list',platController.platList)

module.exports = router;