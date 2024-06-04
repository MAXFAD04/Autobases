const RouterClass = require('express').Router
const bases = require("./bases.js")
const automobiles = require('./automobiles.js')
const Azs = require('./azs.js')

const router = new RouterClass()

// Automobiles
router.get('/automobiles/info', automobiles.getAutoById);
router.get('/automobiles/autotypes', automobiles.getAutoTypes);
router.get('/automobiles/automodels', automobiles.getAutoModels);
router.get('/automobiles/list/:base_id', automobiles.getAutoList);
router.get('/automobiles/list', automobiles.getAutoList);
router.post('/automobiles', automobiles.AddAuto);
router.put('/automobiles', automobiles.UpdateInfo);
router.delete('/automobiles/:autoid', automobiles.delAuto);

//АЗС
router.get('/azs/list/:base_id', Azs.getAzsList);
router.get('/azs/list', Azs.getAzsList);

//Базы
router.get('/bases', bases.getBaseList);
// router.post('/bases', bases.AddBase);
// router.put('/bases', bases.updatebase);
// router.delete('/bases', bases.deteleBase);

module.exports.router = router; 