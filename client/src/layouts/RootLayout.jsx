import { NavLink, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout() {
  return (
    <>
    <nav>
      <ul className='flex flex-row gap-4 mx-4 bg-black py-3 px-3'>
        <li className='bg-[#363636] hover:bg-[#303030] text-2xl px-2 py-1 rounded-full'><NavLink to='/'>Home</NavLink></li>
        <li className='bg-[#363636] hover:bg-[#303030] text-2xl px-2 py-1 rounded-full'><NavLink to='/admin'>Admin</NavLink></li>

      </ul>
    </nav>
      <ToastContainer />
      <Outlet />
    </>
  )
}
