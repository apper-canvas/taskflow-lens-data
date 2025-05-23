import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, isAfter, isBefore, addDays } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create a modern, responsive landing page for the product launch',
      priority: 'high',
      status: 'inProgress',
      dueDate: addDays(new Date(), 2),
      tags: ['design', 'urgent']
    },
    {
      id: '2',
      title: 'Review user feedback',
      description: 'Analyze customer feedback from the last quarter',
      priority: 'medium',
      status: 'todo',
      dueDate: addDays(new Date(), 5),
      tags: ['research', 'analysis']
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    tags: []
  })
  const [draggedTask, setDraggedTask] = useState(null)

  const statusColumns = [
    { id: 'todo', title: 'To Do', icon: 'Circle', color: 'bg-surface-500' },
    { id: 'inProgress', title: 'In Progress', icon: 'Clock', color: 'bg-accent' },
    { id: 'completed', title: 'Completed', icon: 'CheckCircle', color: 'bg-green-500' }
  ]

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }

  const handleCreateTask = (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) {
      toast.error('Task title is required')
      return
    }

    const task = {
      id: Date.now().toString(),
      ...newTask,
      status: 'todo',
      dueDate: new Date(newTask.dueDate),
      tags: newTask.tags.filter(tag => tag.trim() !== '')
    }

    setTasks(prev => [...prev, task])
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      tags: []
    })
    setShowForm(false)
    toast.success('Task created successfully!')
  }

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
    toast.success('Task deleted successfully!')
  }

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
    toast.success('Task status updated!')
  }

  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, status) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== status) {
      handleStatusChange(draggedTask.id, status)
    }
    setDraggedTask(null)
  }

  const addTag = () => {
    setNewTask(prev => ({ ...prev, tags: [...prev.tags, ''] }))
  }

  const updateTag = (index, value) => {
    setNewTask(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }))
  }

  const removeTag = (index) => {
    setNewTask(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const getFilteredAndSortedTasks = () => {
    let filtered = tasks

    if (filter !== 'all') {
      filtered = tasks.filter(task => {
        if (filter === 'overdue') {
          return isBefore(task.dueDate, new Date()) && task.status !== 'completed'
        }
        if (filter === 'upcoming') {
          return isAfter(task.dueDate, new Date()) && isBefore(task.dueDate, addDays(new Date(), 3))
        }
        return task.priority === filter || task.status === filter
      })
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return a.title.localeCompare(b.title)
    })
  }

  const isOverdue = (date, status) => {
    return isBefore(date, new Date()) && status !== 'completed'
  }

  return (
    <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-neu-light dark:shadow-neu-dark border border-surface-200 dark:border-surface-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Task Management Board
            </h2>
            <p className="text-white/80">
              Organize your workflow with our interactive Kanban board
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 shadow-soft hover:shadow-card"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 sm:p-6 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {['all', 'overdue', 'upcoming', 'high', 'medium', 'low'].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  filter === option
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-600'
                }`}
              >
                {option === 'all' ? 'All Tasks' : option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-lg text-sm focus-ring"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Task Creation Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700"
          >
            <form onSubmit={handleCreateTask} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus-ring"
                    placeholder="Enter task title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus-ring"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus-ring resize-none"
                  rows="3"
                  placeholder="Describe your task..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Tags
                  </label>
                  <div className="space-y-2">
                    {newTask.tags.map((tag, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => updateTag(index, e.target.value)}
                          className="flex-1 px-3 py-2 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-lg text-sm focus-ring"
                          placeholder="Enter tag..."
                        />
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <ApperIcon name="X" className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTag}
                      className="inline-flex items-center px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-xl hover:shadow-card transition-all duration-300"
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 sm:flex-none px-6 py-3 bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300 font-medium rounded-xl hover:bg-surface-300 dark:hover:bg-surface-500 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Board */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {statusColumns.map((column) => (
            <div
              key={column.id}
              className="bg-surface-50 dark:bg-surface-700/50 rounded-2xl p-4 min-h-[400px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${column.color} rounded-lg flex items-center justify-center`}>
                    <ApperIcon name={column.icon} className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-surface-800 dark:text-surface-200">
                    {column.title}
                  </h3>
                </div>
                <span className="text-sm text-surface-500 dark:text-surface-400 bg-surface-200 dark:bg-surface-600 px-2 py-1 rounded-full">
                  {getFilteredAndSortedTasks().filter(task => task.status === column.id).length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                <AnimatePresence>
                  {getFilteredAndSortedTasks()
                    .filter(task => task.status === column.id)
                    .map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-soft border border-surface-200 dark:border-surface-600 cursor-move hover:shadow-card transition-all duration-300 group"
                      >
                        {/* Task Header */}
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-surface-800 dark:text-surface-200 flex-1 pr-2">
                            {task.title}
                          </h4>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-surface-400 hover:text-red-500 transition-all duration-200"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Task Description */}
                        {task.description && (
                          <p className="text-sm text-surface-600 dark:text-surface-400 mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        {/* Task Meta */}
                        <div className="space-y-2">
                          {/* Priority and Due Date */}
                          <div className="flex items-center justify-between text-xs">
                            <span className={`px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            <span className={`flex items-center space-x-1 ${
                              isOverdue(task.dueDate, task.status) 
                                ? 'text-red-500' 
                                : 'text-surface-500 dark:text-surface-400'
                            }`}>
                              <ApperIcon name="Calendar" className="w-3 h-3" />
                              <span>{format(task.dueDate, 'MMM dd')}</span>
                            </span>
                          </div>

                          {/* Tags */}
                          {task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {task.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              {task.tags.length > 3 && (
                                <span className="px-2 py-0.5 bg-surface-200 dark:bg-surface-500 text-surface-500 dark:text-surface-400 rounded text-xs">
                                  +{task.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainFeature