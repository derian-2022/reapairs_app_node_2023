const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require("bcryptjs")
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.loginUser = catchAsync(async(req, res, next) => {
  const { email, password } = req.body 

   const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: "available"
    }
  })

  if(!user) {
    return next(new AppError("The user could not be found 😨", 404))
  }

  if(!(await bcrypt.compare(password, user.password))){
    return next(new AppError("Incorrect email or password 😓", 401))
  }

  const token = await generateJWT(user.id)

  return res.status(200).json({
    status: "success",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
})

exports.findAll = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
    attributes: {
      exclude: ["password"],
    }
  });

  res.status(200).json({
    message: 'The query has been done successs 😎',
    results: users.length,
    users,
  });
});

exports.userById = catchAsync(
  async (req, res) => {
    const { user } = req;

    res.status(200).json({
      status: 'success',
      message: 'The query has been done success 😍',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  }
);

exports.createUser = catchAsync(
  async (req, res) => {
    const { name, email, password, role } = req.body;

      const salt = await bcrypt.genSalt(12)
      const encryptedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
      role,
    });

    const token = await generateJWT(user.id)

    res.status(201).json({
      status: 'succes',
      message: 'The user has been created! 🤩',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  }
);

exports.upDateUser = catchAsync(
  async (req, res) => {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({
      name,
      email,
    });

    res.status(200).json({
      status: 'success',
      message: 'The user update 😎',
    });
  }
);

exports.deleteUser = catchAsync(
  async (req, res) => {
    const { user } = req;

    await user.update({
      status: 'disabled',
    });

    res.status(200).json({
      message: 'The user has been deleted 🤓',
    });
  }
);
