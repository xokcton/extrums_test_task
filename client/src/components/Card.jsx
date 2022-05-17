import React, { useState } from 'react'
import axios from 'axios'

const Card = ({ idea, showFooter, setClasses, fetchHeroes, doneAchievements }) => {
  const [trigger, setTrigger] = useState(false)
  
  const handleClick = async e => {
    const uri = process.env.REACT_APP_SERVER_URI
    const id = e.target.dataset.id
    setTrigger(true)
    
    if (idea.status === 'in progress' && trigger === true) {
      doneAchievements.forEach(element => {
        if (element.category === idea.category) element.amount++
      })
      idea.status = 'done'
      await axios.put(`${uri}/${id}`, idea)
      fetchHeroes()
      setTrigger(false)
      localStorage.setItem('status', JSON.stringify(doneAchievements))
    }

    if (idea.status === 'undone' && trigger === true) {
      idea.status = 'in progress'
      await axios.put(`${uri}/${id}`, idea)
      fetchHeroes()
      setTrigger(false)
    }
  }

  return (
    <div className={setClasses === true ? 'card col-sm-4 mb-3 mx-1' : 'card'} style={{maxWidth: '400px'}}>
      <button style={{cursor: 'pointer'}} type="button" className="close changeStatusBtn" aria-label="Close">
        <span onClick={handleClick} data-id={idea._id} aria-hidden="true">&#9998;</span>
      </button>
      <div className="card-body">
        <h5 className="card-title text-center">{idea.idea}</h5>
      </div>
      {
        showFooter && 
        <div className="card-footer text-center">
          {idea.category}
        </div>
      }
    </div>
  )
}

export default Card