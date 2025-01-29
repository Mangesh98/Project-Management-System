import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './pages/Navbar/Navbar'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Subsciption from './pages/Subscription/Subsciption'
import Auth from './pages/Auth/Auth'
function App() {

  return (
    <>
      {
        false ?
          <div className="">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/project/:projectId' element={<ProjectDetails />} />
              <Route path='/project/:projectId/issue/:issueId' element={<IssueDetails />} />

              <Route path="/upgrade_plan" element={<Subsciption />} />
            </Routes>
          </div>
          : <Auth />
      }
    </>
  )
}

export default App
