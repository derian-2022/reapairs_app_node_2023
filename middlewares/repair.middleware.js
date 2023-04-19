const Repair = require('../models/reapir.model');

exports.validExistRepair = async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    id,
    status: 'pending',
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair not found 🥶',
    });
  }
  req.repair = repair;
  next();
};
