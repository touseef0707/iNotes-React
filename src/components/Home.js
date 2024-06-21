import React from 'react'
import AddNote from './AddNote'
import AllNotes from './Notes'
import Hero from './Hero'

const Home = (props) => {

  return (
    <div className=''>
      {/* If not logged in display Hero Section */}
      {!localStorage.getItem('auth-token') ? (
        <Hero />
      ) : (
        <>
          <div id="add-note" className='pt-5'>
            <AddNote showAlert={props.showAlert} />
          </div>

          <div id="all-notes">
            <AllNotes showAlert={props.showAlert} />
          </div>
        </>
      )}
    </div>
  )
}

export default Home
