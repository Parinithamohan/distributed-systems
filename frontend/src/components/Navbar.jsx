import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ mode = 'user' }) => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isCaptain = location.pathname.includes('captain')

  return (
    <header className='w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10'>
      <div className='flex items-center justify-between gap-2 px-4 sm:px-6 py-3'>
        <Link to='/' className='flex items-center gap-2 flex-shrink-0' onClick={() => setMenuOpen(false)}>
          <span className='text-xl font-black tracking-tight text-white'>Ride<span className='text-blue-400'>X</span></span>
        </Link>

        <nav className='hidden md:flex items-center gap-6 text-sm text-gray-300'>
          <Link to='/' className='hover:text-white transition-colors'>Home</Link>
          <Link to='/signup' className='hover:text-white transition-colors'>Ride</Link>
          <Link to='/captain-signup' className='hover:text-white transition-colors'>Drive</Link>
        </nav>

        <div className='hidden sm:flex items-center gap-2 flex-shrink-0'>
          <Link
            to={isCaptain ? '/login' : '/captain-login'}
            className='text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors border border-white/20 px-3 py-1.5 rounded-full bg-white/5 whitespace-nowrap'
          >
            {isCaptain ? 'Switch to Rider' : 'Switch to Captain'}
          </Link>
          {location.pathname !== '/login' && location.pathname !== '/captain-login' && (
            <Link
              to={isCaptain ? '/captain-login' : '/login'}
              className='text-xs sm:text-sm font-medium hover:text-gray-300 transition-colors whitespace-nowrap'
            >
              Log in
            </Link>
          )}
          {location.pathname !== '/signup' && location.pathname !== '/captain-signup' && (
            <Link
              to={isCaptain ? '/captain-signup' : '/signup'}
              className='bg-white text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-all whitespace-nowrap'
            >
              Sign up
            </Link>
          )}
        </div>

        <button
          type='button'
          className='sm:hidden h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white'
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
        </button>
      </div>

      {menuOpen && (
        <div className='sm:hidden px-4 pb-4 space-y-2 border-t border-white/10'>
          <Link to='/' onClick={() => setMenuOpen(false)} className='block py-2 text-sm text-gray-300'>Home</Link>
          <Link to='/signup' onClick={() => setMenuOpen(false)} className='block py-2 text-sm text-gray-300'>Ride</Link>
          <Link to='/captain-signup' onClick={() => setMenuOpen(false)} className='block py-2 text-sm text-gray-300'>Drive</Link>
          <Link
            to={isCaptain ? '/login' : '/captain-login'}
            onClick={() => setMenuOpen(false)}
            className='block py-2 text-sm text-gray-300'
          >
            {isCaptain ? 'Switch to Rider' : 'Switch to Captain'}
          </Link>
          {location.pathname !== '/login' && location.pathname !== '/captain-login' && (
            <Link
              to={isCaptain ? '/captain-login' : '/login'}
              onClick={() => setMenuOpen(false)}
              className='block py-2 text-sm text-white font-medium'
            >
              Log in
            </Link>
          )}
          {location.pathname !== '/signup' && location.pathname !== '/captain-signup' && (
            <Link
              to={isCaptain ? '/captain-signup' : '/signup'}
              onClick={() => setMenuOpen(false)}
              className='block text-center bg-white text-black font-bold text-sm px-4 py-2.5 rounded-full'
            >
              Sign up
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
