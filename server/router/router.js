const router = require('express').Router()
const { addChallenge, fetchChallenges, deleteChallenge, getChallenge, editChallenge } = require('../controllers/controller.js')

router.post('/challenges', addChallenge)
router.get('/challenges', fetchChallenges)
router.delete('/challenges/:id', deleteChallenge)
router.get('/challenges/:id', getChallenge)
router.put('/challenges/:id', editChallenge)

module.exports = router