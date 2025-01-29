import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './pages/Navbar/Navbar'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Subsciption from './pages/Subscription/Subsciption'
function App() {

  return (
    <>
    <Navbar/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/project/:projectId' element={<ProjectDetails/>}/>
        <Route path='/project/:projectId/issue/:issueId' element={<IssueDetails/>}/>

        <Route path="/upgrade_plan" element={<Subsciption/>}/>
    </Routes>
    </>
  )
}

export default App
