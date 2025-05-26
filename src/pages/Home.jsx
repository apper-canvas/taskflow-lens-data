import React from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Organize Your Tasks
            </span>
            <br />
            <span className="text-surface-700 dark:text-surface-300">
              Like Never Before
            </span>
          </h1>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl"></div>
        </div>
        
        <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed">
          Experience the future of task management with our intuitive Kanban board, 
          smart prioritization, and seamless workflow automation.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-soft border border-surface-200 dark:border-surface-700 text-center group hover:shadow-card transition-all duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <ApperIcon name="Target" className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-surface-800 dark:text-surface-200 mb-2">98%</h3>
          <p className="text-surface-600 dark:text-surface-400">Task Completion Rate</p>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-soft border border-surface-200 dark:border-surface-700 text-center group hover:shadow-card transition-all duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <ApperIcon name="Clock" className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-surface-800 dark:text-surface-200 mb-2">40%</h3>
          <p className="text-surface-600 dark:text-surface-400">Time Saved Weekly</p>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-soft border border-surface-200 dark:border-surface-700 text-center group hover:shadow-card transition-all duration-300 sm:col-span-1 col-span-1">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-surface-800 dark:text-surface-200 mb-2">2.5x</h3>
          <p className="text-surface-600 dark:text-surface-400">Productivity Boost</p>
        </div>
      </div>

      {/* Main Feature Component */}
      <MainFeature />

      {/* Feature Highlights */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-surface-800 dark:text-surface-200">
          Why Choose Taskify 7?
        </h2>

        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="group">
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 lg:p-8 shadow-soft border border-surface-200 dark:border-surface-700 hover:shadow-card transition-all duration-300 h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="Layout" className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                Intuitive Kanban Board
              </h3>
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                Visualize your workflow with our beautiful drag-and-drop interface. 
                Move tasks seamlessly between To Do, In Progress, and Completed columns.
              </p>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 lg:p-8 shadow-soft border border-surface-200 dark:border-surface-700 hover:shadow-card transition-all duration-300 h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="AlertTriangle" className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                Smart Prioritization
              </h3>
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                Set priority levels and due dates to stay focused on what matters most. 
                Our system helps you identify urgent tasks at a glance.
              </p>
            </div>
          </div>
          
          <div className="group md:col-span-2 lg:col-span-1">
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 lg:p-8 shadow-soft border border-surface-200 dark:border-surface-700 hover:shadow-card transition-all duration-300 h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="Filter" className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                Advanced Filtering
              </h3>
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                Find exactly what you're looking for with powerful filters by priority, 
                due date, category, and project. Never lose track of important tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home