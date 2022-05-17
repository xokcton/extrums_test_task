const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
  idea: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

const Challenge = mongoose.model('Challenge', challengeSchema)

module.exports = Challenge