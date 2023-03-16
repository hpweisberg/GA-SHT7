// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

// page components
import Landing from './pages/Landing/Landing'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import CreateParentProfile from './pages/CreateParentProfile/CreateParentProfile'
import CreateParentProfileSetup from './pages/CreateParentProfileSetup/CreateParentProfileSetup'
import CreateKidProfile from './pages/CreateKidProfile/CreateKidProfile'
import CreateKidProfileSetup from './pages/CreateKidProfileSetup/CreateKidProfileSetup'
import KidChores from './pages/KidChores/KidChores'
import Feed from './pages/Feed/Feed'
import Map from './pages/Map/Map'
import ParentProfile from './pages/ParentProfile/ParentProfile'

// TODO: Not being used currently

import ChoreBoard from './pages/ChoreBoard/ChoreBoard'
import Dashboard from './pages/Dashboard/Dashboard'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Onboarding from './pages/Onboarding/Onboarding'
import Chores from './pages/Chores/Chores'
import TaskList from './pages/TaskList/TaskList'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'
import * as taskService from './services/taskService'

// styles
import './App.css'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [profile, setProfile] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('profileID:', user.profile._id)
      console.log('profile:', user.profile)
      console.log('profile:', typeof user.profile)
    const profile = await profileService.showProfile(user.profile)
    setProfile(profile)
    }
    if (user) fetchProfile()
  }, [user])


  const handleAddChild = async (childData) => {
    try {
      await profileService.createChild(user.profile, childData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditProfile = async (profileData) => {
    try {
      await profileService.updateProfile(user.profile, profileData)
    } catch (error) {
      console.log(error)
    }
  }

  // const handleSetTempChildName = () => {
  //   s
  // }

  
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Landing user={user} Onboarding={Onboarding}/>} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/createparentprofile"
          element={
            //<ProtectedRoute user={user}>
              <CreateParentProfile profile={profile} handleEditProfile={handleEditProfile}/>
            //</ProtectedRoute>
          }
        />
        <Route
          path="/createparentprofile/setup"
          element={
            //<ProtectedRoute user={user}>
              <CreateParentProfileSetup profile={profile} />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/createkidprofile"
          element={
            //<ProtectedRoute user={user}>
              <CreateKidProfile />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/createkidprofile/setup"
          element={
            //<ProtectedRoute user={user}>
              <CreateKidProfileSetup />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            //<ProtectedRoute user={user}>
              <Feed />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            //<ProtectedRoute user={user}>
              <Map />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/parentprofile"
          element={
            //<ProtectedRoute user={user}>
              <ParentProfile />
            //</ProtectedRoute>
          }
        />


        {/* TODO: Routes not being used currently*/}
        <Route
          path="/choreboard"
          element={
            //<ProtectedRoute user={user}>
              <ChoreBoard />
            //</ProtectedRoute>
          }
        />  

        <Route
          path="/dashboard"
          element={
            //<ProtectedRoute user={user}>
              <Dashboard />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/tasklist"
          element={
            //<ProtectedRoute user={user}>
              <TaskList />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/profiles"
          element={
            //<ProtectedRoute user={user}>
              <Profiles profile={profile} CreateKidProfile={CreateKidProfile} handleAddChild={handleAddChild} handleLogout={handleLogout}/>
            //</ProtectedRoute>
          }
        />
        <Route 
          path="/chores"
          element= {
            <Chores />
          }
        />
        <Route 
          path="/kidChores"
          element= {
            <KidChores />
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
      </Routes>
          <NavBar user={user} handleLogout={handleLogout} profile={profile}/>
    </div>
  )
}

export default App
