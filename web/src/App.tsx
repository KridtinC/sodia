import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/header'
import ChatBar from './components/chatbar'
import SideBar from './components/sidebar'
import Feed from './components/feed'

function App() {

  return (
    <div>
      <Header></Header>
      <div className="flex justify-between pt-14 h-screen">
        <SideBar />
        <Feed />
        <ChatBar />
      </div>
    </div>
  )
}

export default App
