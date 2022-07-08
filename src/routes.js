import React from 'react'

const Home = React.lazy(() => import('./views/Home'))
const Devices = React.lazy(() => import('./views/Devices'))

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/home', name: 'Home', element: Home},
  {path: '/devices', name: 'Devices', element: Devices},

]

export default routes
