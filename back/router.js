const RouterClass = require('express').Router
const {checkAuth} = require('./users')
const Automobiles = require("./automobiles.js")
const AZS = require("./azs.js")
const Bases = require("./bases.js")


const mainRouter = new RouterClass()


// Automobiles
mainRouter.get('/automobiles', automobiles.getAutoList);
mainRouter.get('/automobiles', automobiles.getAutoById);
mainRouter.post('/automobiles', automobiles.AddAuto);
mainRouter.put('/automobiles', automobiles.UpdateAuto);

//АЗС
mainRouter.get('/azs', azs.getAZSList);
mainRouter.post('/azs', automobiles.AddAZS);
mainRouter.put('/azs', automobiles.updateAZS);
mainRouter.delete('/azs', automobiles.deleteAZS);
//Базы
mainRouter.get('/bases', automobiles.getBase);
mainRouter.post('/bases', automobiles.AddBase);
mainRouter.put('/bases', automobiles.updatebase);
mainRouter.delete('/bases', automobiles.deteleBase);