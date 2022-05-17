import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const ChallengeForm = ({ fetchHeroes }) => {
  const [showBtn, setShowBtn] = useState(true)
  const [value, setValue] = useState('')
  const { register, handleSubmit } = useForm()

  const handleOnSubmit = async d => {
    const uri = process.env.REACT_APP_SERVER_URI
    const result = {
      idea: d.idea.trim(),
      category: d.category,
      status: 'undone'
    }
    
    await axios.post(uri, result)

    fetchHeroes()
    setShowBtn(true)
    setValue('')
  }

  const handleFetch = (e) => {
    e.preventDefault()
    fetchHeroes()
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    if (value.trim().length > 5) setShowBtn(false)
    else setShowBtn(true)
  }

  return (
    <>
      <div className='conatiner-fluid mt-3'>
        <h1 className='text-center'>Here you can create and view your challenges.</h1>
        <div className="row d-flex mt-5 justify-content-center align-items-center">
          <div className="col-4">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="mb-3">
                <label htmlFor="idea" className="form-label">Your fresh idea</label>
                <input {...register('idea')} required type="text" className="form-control" id="idea" onChange={handleChange} value={value} />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Choose a category for your idea</label>
                <select {...register('category')} className="form-select" id="category">
                  <option value="Social">Social</option>
                  <option value="Education">Education</option>
                  <option value="Busywork">Busywork</option>
                  <option value="Recreational">Recreational</option>
                  <option value="Sport">Sport</option>
                  <option value="Relaxation">Relaxation</option>
                </select>
              </div>
              <div className="d-flex justify-content-evenly">
                <button type="submit" className="btn btn-success btn-lg" disabled={showBtn}>Store It!</button>
                <button onClick={handleFetch} className="btn btn-primary btn-lg">Fetch Challenges!</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChallengeForm