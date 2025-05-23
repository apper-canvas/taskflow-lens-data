import React from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          {/* 404 Icon */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-soft">
            <ApperIcon name="AlertTriangle" className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          
          {/* 404 Text */}
          <h1 className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-surface-800 dark:text-surface-200 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
            Oops! It looks like this task got lost in the workflow. 
            Let's get you back to your dashboard where you can stay productive.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-soft hover:shadow-card transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-surface-300 dark:border-surface-600 text-base font-medium rounded-xl text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 shadow-soft hover:shadow-card transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound