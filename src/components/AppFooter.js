import React from 'react'
import {CFooter, CImage} from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter>
      <CImage src={'favicon.png'} width={'40px'}/>
      <div>
        <span className="ms-1">Level Up Push Notifications Server</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://silversky3d.com" target="_blank" rel="noopener noreferrer">
          Silversky3D
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
