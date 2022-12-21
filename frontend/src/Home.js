import Reccomendations from './compnents/Reccomendations/Reccomendations'
import WhatsHappening from './compnents/WhatsHappening/WhatsHappening'
import Navigation from './compnents/Navigation/Navigation'
import Feed from './compnents/Feed/Feed'
import React from 'react'

function Home() {
  return (
    <>
      <Navigation />
      <Feed />
      <Reccomendations />
      <WhatsHappening />
    </>
  )
}

export default Home
