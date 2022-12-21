import Reccomendations from './compnents/Reccomendations/Reccomendations'
import WhatsHappening from './compnents/WhatsHappening/WhatsHappening'
import Navigation from './compnents/Navigation/Navigation'
import Feed from './compnents/Feed/Feed'
import React from 'react'
import './Home.css'

function Home() {
  return (
    <main className='home-container'>
      <Navigation />
      <Feed />
      <aside>
        <WhatsHappening />
        <Reccomendations />
      </aside>
    </main>
  )
}

export default Home
