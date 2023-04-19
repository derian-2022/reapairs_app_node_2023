const Repair = require('../models/reapir.model');
const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.allRepair = catchAsync(
  async (req, res) => {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });

    res.status(200).json({
      message: 'The query has been done successs',
      results: repairs.length,
      repairs,
    });
  }
);

exports.repairById = catchAsync(
  async (req, res) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        userId: id,
        status: 'pending',
      },
    });

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'The query has been done success',
      repair,
      user,
    });
  }
);

exports.repairUpDate = catchAsync(
  async (req, res) => {
    const { repair } = req;

    await repair.update({
      status: 'completed',
    });

    res.json({
      message: 'The repair has been update',
    });
  }
);

exports.createRepair = catchAsync(
  async (req, res) => {
    const {
      date,
      userId,
      description,
      motorsNumber,
    } = req.body;

    const repair = await Repair.create({
      date,
      userId,
      description,
      motorsNumber,
    });

    res.status(201).json({
      status: 'success',
      message: 'The repair has been created!',
      repair,
    });
  }
);

exports.deleteRepair = catchAsync(
  async (req, res) => {
    const { repair } = req;

    await repair.update({
      status: 'cancelled',
    });

    res.json({
      message: 'The repair has been deleted',
    });
  }
);
