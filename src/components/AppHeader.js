import React from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {
  CButtonGroup,
  CFormCheck,
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem, CImage,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {cilMoon, cilSun} from '@coreui/icons'

const AppHeader = () => {
  const dispatch = useDispatch()

  const theme = useSelector((state) => state.theme)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CImage src={'levelup-logo.png'} width={'40'}/>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/home" component={NavLink}>
              Home
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/devices" component={NavLink}>
              Devices
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto me-4">
          <CButtonGroup aria-label="Theme switch">
            <CFormCheck
              type="radio"
              button={{color: 'primary'}}
              name="theme-switch"
              id="btn-light-theme"
              autoComplete="off"
              label={<CIcon icon={cilSun}/>}
              checked={theme === 'default'}
              onChange={() => dispatch({type: 'set', theme: 'light'})}
            />
            <CFormCheck
              type="radio"
              button={{color: 'primary'}}
              name="theme-switch"
              id="btn-dark-theme"
              autoComplete="off"
              label={<CIcon icon={cilMoon}/>}
              checked={theme === 'dark'}
              onChange={() => dispatch({type: 'set', theme: 'dark'})}
            />
          </CButtonGroup>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
