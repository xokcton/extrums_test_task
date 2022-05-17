import React from 'react'
import moment from 'moment'

const Completed = ({ completed }) => {
  return (
    <div className='container mb-5'>
      <h3 className='text-center'>Completed challenges</h3>
      <div className="container mt-5 mb-3" style={{maxWidth: '1000px'}}>
      {
        completed.length > 0 ?
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Type</th>
              <th scope="col">When</th>
            </tr>
          </thead>
          <tbody>
            {
              completed.map((elem, idx) => (
                <tr key={idx + Date.now()}>
                  <th scope="row">{ idx + 1 }</th>
                  <td>{ elem.idea }</td>
                  <td>{ elem.category }</td>
                  <td>{ moment(elem.updatedAt).fromNow() }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        :
        <h4 className='text-center mt-5 text-warning'>We have nothing to show you at this point. You haven't done a single challenge yet.</h4>
      }
      </div>
    </div>
  )
}

export default Completed