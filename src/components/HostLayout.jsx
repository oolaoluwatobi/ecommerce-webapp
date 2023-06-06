import React from 'react'
import { Outlet } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'

const HostLayout = () => {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default HostLayout