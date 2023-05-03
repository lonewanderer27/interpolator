import './App.css'

import MainDiv from './components/Main'
import SideBar from './components/SideBar'

function App() {
  return (
    <div className="App row">
      <div className="col-12 col-lg-4">
        <SideBar/>
      </div>
      <div className="col-12 col-lg-8">
        <MainDiv/>
      </div>
    </div>
  )
}

export default App
