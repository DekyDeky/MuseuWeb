import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'


const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { default: Home } = await import('./pages/home/Home');
      return {
        Component: Home
      }
    }
  },
  {
    path: '/home',
    lazy: async () => {
      const { default: Home } = await import('./pages/home/Home');
      return {
        Component: Home
      }
    }
  },
  {
    path: '/upload',
    lazy: async () => {
      const { default: Upload } = await import('./pages/upload/Upload');
      return {
        Component: Upload
      }
    }
  },
  {
    path: '/artefato',
    lazy: async () => {
      const { default: Preview } = await import('./pages/preview/Preview');
      return {
        Component: Preview
      }
    }
  },
])

function App() {
  return <RouterProvider router={router}/>
}

export default App

/*

{
    path: '/',
    lazy: async () => {
      const { default: Login } = await import('./pages/login/Login');
      return {
        Component: Login
      }
    }
  },*/