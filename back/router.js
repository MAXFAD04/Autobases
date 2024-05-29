const RouterClass = require('express').Router
const automobiles = require("./automobiles.js")
const azs = require("./azs.js")
const bases = require("./bases.js")


const router = new RouterClass()

// Automobiles
router.get('/automobiles/info', automobiles.getAutoById);
router.get('/automobiles/list/:base_id', automobiles.getAutoList);
router.get('/automobiles/list', automobiles.getAutoList);
router.post('/automobiles', automobiles.AddAuto);
router.put('/automobiles', automobiles.UpdateInfo);

//АЗС
router.get('/azs', azs.getAZSList);
// router.post('/azs', automobiles.AddAZS);
// router.put('/azs', automobiles.updateAZS);
// router.delete('/azs', automobiles.deleteAZS);

//Базы
router.get('/bases', bases.getBaseList);
// router.post('/bases', bases.AddBase);
// router.put('/bases', bases.updatebase);
// router.delete('/bases', bases.deteleBase);

module.exports.router = router; 