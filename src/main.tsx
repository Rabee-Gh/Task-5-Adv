import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './Pages/Auth'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Items from './Pages/Items'
import ItemsIndex from './Pages/ItemsIndex'
import Additems from './Pages/Additems'
import Edititems from './Pages/Edititems'
import ItemInfo from './Pages/ItemInfo'


const routes=createBrowserRouter([
  {
    path: '/',
    element:<Auth />,
    children:[
      {
      path: "",
      element: <Login />
      },
      {
        path:"signup",
        element:<Signup />
      }
    ]
  },
  {
    path: '/dashboard',
    element:<Dashboard />,
    children:[
      {
        path:"items",
        element:<Items />,
        children:[
          {
            path:"",
            element:<ItemsIndex />
          },
          {
            path:"add",
            element:<Additems />
          },
          {
            path:"edit/:id",
            element:<Edititems />
          },
          {
            path:"iteminfo/:id",
            element:<ItemInfo />
          }
        ]
      }
    ]

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
