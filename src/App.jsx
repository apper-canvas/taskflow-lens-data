import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ApperIcon from './components/ApperIcon'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 transition-colors duration-300">
          {/* Header */}
          <header className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-soft">
                    <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Taskify 2
                  </h1>
                </div>
                
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-all duration-200 shadow-soft"
                >
                  <ApperIcon 
                    name={darkMode ? "Sun" : "Moon"} 
                    className="w-5 h-5 text-surface-600 dark:text-surface-300" 
                  />
                </button>
              </div>
            </div>
          </header>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Toast Container */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={darkMode ? "dark" : "light"}
            className="text-sm"
            toastClassName="shadow-soft rounded-xl"
          />
        </div>
      </Router>
    </div>
  )
}

export default App