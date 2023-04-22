const User = require('../models/users.model');

exports.validExistUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'the user not found 😰',
    });
  }
  req.user = user;
  next();
};

