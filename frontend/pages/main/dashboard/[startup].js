import React from 'react'
import { useState,useEffect } from 'react'
import Dashboard from '../../../components/Dashboard/Dashboard'
import Stats from '../../../components/Dashboard/Stats'
import Profile from '../../../components/Profile/Profile'

const dashboard = () => {

  return (
    <Profile>
    <Dashboard />
    </Profile>
   
  )
}

export default dashboard