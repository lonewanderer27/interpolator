import './App.css'

import { createContext, useState } from 'react';

import AboutUsPage from './components/AboutUsPage';
import LagrangePage from './components/LagrangePage';
import NewtonPage from './components/NewtonPage'
import SideBar from './components/SideBar'
import { pageContextInterface } from './interfaces';
import { pageEnum } from './enums';

export const PageContext = createContext<pageContextInterface>({
  page: pageEnum.NEWTON,
  setPage: () => {},
});

function App() {
  const [page, setPage] = useState<pageEnum>(pageEnum.NEWTON)

  return (
    <PageContext.Provider value={{page, setPage}}>
      <div className="App row">
        <div className="col-12 col-lg-4">
          <SideBar/>
        </div>
        <div className="col-12 col-lg-8">
          {page === pageEnum.NEWTON && <NewtonPage/>}
          {page === pageEnum.LAGRANGE && <LagrangePage/>}
          {page === pageEnum.ABOUT_US && <AboutUsPage/>}
        </div>
      </div>
    </PageContext.Provider>
  )
}

export default App
