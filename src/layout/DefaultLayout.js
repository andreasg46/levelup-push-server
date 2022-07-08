import React from 'react'
import {AppContent, AppFooter, AppHeader} from '../components/index'

const DefaultLayout = () => {
  return (
    <>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent">
        <AppHeader/>
        <div className="body flex-grow-1 px-3">
          <AppContent/>
        </div>
        <AppFooter/>
      </div>
    </>
  )
}

export default DefaultLayout
