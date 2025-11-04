import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer></ToastContainer>
    </>
  )
}

export default App