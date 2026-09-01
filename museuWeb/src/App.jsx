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
    path: '/upload/material',
    lazy: async () => {
      const { default: UploadMaterial } = await import('./pages/upload/UploadMaterial');
      return {
        Component: UploadMaterial
      }
    }
  },
  {
    path: '/upload/textura',
    lazy: async () => {
      const { default: UploadMaterial } = await import('./pages/upload/UploadMaterial');
      return {
        Component: UploadMaterial
      }
    }
  },
  {
    path: '/upload/som',
    lazy: async () => {
      const { default: UploadMaterial } = await import('./pages/upload/UploadMaterial');
      return {
        Component: UploadMaterial
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