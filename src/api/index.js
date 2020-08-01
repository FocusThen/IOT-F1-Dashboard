const express = require('express');
const monk = require('monk')
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI)
const carInfo = db.get('F1CarInfo')

const schema = Joi.object({
  temp: Joi.string().trim().required()
})

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.query);
    carInfo.insert(value)
    res.json({
      Status: "Success"
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
