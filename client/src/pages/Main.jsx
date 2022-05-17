import React, { useState } from 'react'
import ChallengeForm from '../components/ChallengeForm'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import Achievements from '../components/Achievements'
import Completed from '../components/Completed'
import axios from 'axios'

const Main = () => {
  const [undoneIdeas, setUndoneIdeas] = useState([])
  const [inProgressIdeas, setInProgressIdeas] = useState([])
  const [completedChallenges, setCompletedChallenges] = useState(JSON.parse(localStorage.getItem('score')) || [])
  const [doneAchievements, setDoneAchievements] = useState(JSON.parse(localStorage.getItem('status')) || [
    { category: "Social", amount: 0 },
    { category: "Education", amount: 0 },
    { category: "Busywork", amount: 0 },
    { category: "Recreational", amount: 0 },
    { category: "Sport", amount: 0 },
    { category: "Relaxation", amount: 0 },
  ])

  const filterArrays = arr => {
    const done = []
    const undone = []
    const inProgress = []

    arr.forEach(elem => {
      if (elem.status === 'done') done.push(elem)
      if (elem.status === 'undone') undone.push(elem)
      if (elem.status === 'in progress') inProgress.push(elem)
    })

    return {
      done,
      undone,
      inProgress
    }
  }

  // const countDoneChallenges = () => {
  //   completedChallenges.forEach(element => {
  //     doneAchievements.forEach(done => {
  //       if (done.category === element.category) {
  //         console.log(done.category, element.category);
  //         done.amount++
  //       }
  //     })
  //   })
  //   localStorage.setItem('status', JSON.stringify(doneAchievements))
  //   localStorage.setItem('score', JSON.stringify(completedChallenges))
  // }

  const fetchHeroes = async () => {
    const uri = process.env.REACT_APP_SERVER_URI
    const { data } = await axios.get(uri)
    const result = filterArrays(data)
    
    setUndoneIdeas(result.undone)
    setInProgressIdeas(result.inProgress)
    setCompletedChallenges(result.done)
    
    localStorage.setItem('status', JSON.stringify(doneAchievements))
    localStorage.setItem('score', JSON.stringify(completedChallenges))
  }

  return (
    <>
      <ChallengeForm fetchHeroes={fetchHeroes}/>
      <div className="container mt-5 mb-5">
        <h3 className='text-center'>Choose fresh ideas to do</h3>
        <div className="row mt-5 d-flex align-items-center justify-content-center">
          {
            undoneIdeas.length > 0 ?
            undoneIdeas.map(idea => (
              <Card key={idea._id + Date.now()} idea={idea} showFooter={true} setClasses={true} fetchHeroes={fetchHeroes}/>
            ))
            :
            <h4 className='text-center mt-5 text-warning'>We have nothing to show you at this point. Please feel free to add new challenges above.</h4>
          }
        </div>
      </div>
      <div className='container mt-5 mb-5'>
        <h3 className='text-center'>Ideas in my List</h3>
        <div className="mt-5">
          {
            inProgressIdeas.length > 0 ?
            inProgressIdeas.length > 2 ?
            <Carousel>
              {
                inProgressIdeas.map(idea => (
                  <div key={idea._id + Date.now()}>
                    <Card idea={idea} showFooter={true} setClasses={false} fetchHeroes={fetchHeroes} doneAchievements={doneAchievements}/>
                  </div>
                ))
              }
            </Carousel>
            :
            <div className='row d-flex align-items-center justify-content-center'>
              {
                inProgressIdeas.map(idea => (
                  <Card key={idea._id + Date.now()} idea={idea} showFooter={true} setClasses={true} fetchHeroes={fetchHeroes} doneAchievements={doneAchievements}/>
                ))
              }
            </div>
            :
            <h4 className='text-center mt-5 text-warning'>We have nothing to show you at this point. Please feel free to choose any challenge above.</h4>
          }
        </div>
      </div>
      <Achievements doneAchievements={doneAchievements} />
      <Completed completed={completedChallenges} />
    </>
  )
}

export default Main