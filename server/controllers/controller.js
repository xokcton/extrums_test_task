const Challenge = require('../models/schema.js')
const mongoose = require('mongoose')

const addChallenge = async (req, res) => {
  try {
    const { idea, category, status } = req.body
    const newChallenge = new Challenge({ idea, category, status })
    await newChallenge.save()

    return res.status(201).json({ message: 'Challenge was successfully saved!' })
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

const fetchChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({})

    if (challenges)
      return res.status(200).json(challenges)
    else
      throw new Error('Can\'t fetch!')
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

const deleteChallenge = async (req, res) => {
  try {
    const id = req.params.id
    await Challenge.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Challenge has been removed!' })
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

const getChallenge = async (req, res) => { }

const editChallenge = async (req, res) => {
  try {
    const id = req.params.id
    const { idea, category, status } = req.body
    const response = await Challenge.findByIdAndUpdate(id, { idea, category, status })
    return res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

module.exports = { addChallenge, fetchChallenges, deleteChallenge, getChallenge, editChallenge }