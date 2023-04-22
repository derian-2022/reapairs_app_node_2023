const express = require('express');

const repairController = require('../controllers/repair.controller');
const RepairMiddleware = require('../middlewares/repair.middleware');
const validFieldRepair = require('../middlewares/validationRepair.middleware');
const authMiddleware = require("../middlewares/auth.middleware");


const routerRepair = express.Router();

routerRepair.use(authMiddleware.protect)
routerRepair.use(authMiddleware.restrictTo("employee"))

routerRepair
  .route('/')
  .get(repairController.allRepair)
  .post(
    validFieldRepair.createRepairValidation,
    repairController.createRepair
  );

routerRepair
  .route('/:id')
  .get(
    RepairMiddleware.ValidRepair,
    repairController.repairById,
  )
  .patch(
    RepairMiddleware.validExistRepair,
    repairController.repairUpDate
  )
  .delete(
    RepairMiddleware.validExistRepair,
    repairController.deleteRepair
  );

module.exports = routerRepair;
