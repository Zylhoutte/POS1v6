const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const SubAdmin = require('../models/subadminModel')
const mongoose = require('mongoose')


// @desc    Auth subadmin & get token
// @route   POST /api/subadmin/subadmin
// @access  Public
const loginSubAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const subadmin = await SubAdmin.findOne({ email })

  if (subadmin && (await bcrypt.compare(password, subadmin.password))) {
    res.json({
      _id: subadmin._id,
      name: subadmin.name,
      email: subadmin.email,
      isSubAdmin: subadmin.isSubAdmin,
      token: generateToken(subadmin._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
})


// Generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
  })
}

module.exports = {
  loginSubAdmin,
  
}