import React from 'react'

const Achievements = ({doneAchievements}) => {
  return (
    <div className='container mt-5 mb-5'>
      <h3 className='text-center'>Achievements</h3>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='row mb-5 mt-5 d-flex justify-content-between' style={{maxWidth: '1000px'}}>
          {
            doneAchievements.map(element => (
              <div key={element.category} className="col-sm-4 mx-1 roundedAchievement d-flex flex-column align-items-center justify-content-center">
                <div className="circle">
                  { element.amount }
                </div>
                <h4>
                { element.category }
                </h4>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Achievements