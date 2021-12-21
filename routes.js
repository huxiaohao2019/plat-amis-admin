const express = require('express');
const router = express.Router();

const tab1Controller = require('./controllers/schema/tab1');
var tab2Cont=require('./controllers/tab2/tab2');
console.log("🚀 ~ tab2Cont", tab2Cont)

const platController=require('./controllers/Plat');
const siteController=require('./controllers/Site');

router.post('/schema/tab1', tab1Controller.tab1);
router.post('/schema/time1',tab2Cont.time1);

router.get('/scheme/plat/list',platController.platList)
router.get('/scheme/site/list',siteController.pageList)

router.get('/schema/plat-device-tabs/:platId',platController.platDeviceTabs)

module.exports = router;