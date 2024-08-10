import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Admin from './pages/Admin';
import QuestionView from './pages/QuestionView';
import Home from './pages/Home';

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout/>,
  children: [
    {path: '/', element: <Home/>},
    { path: '/questions/:id', element: <QuestionView/>},
    { path: '/admin', element: <Admin/>},
  ]
},
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
