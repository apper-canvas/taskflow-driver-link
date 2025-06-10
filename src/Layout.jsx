import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './components/ApperIcon';
import { routes } from './config/routes';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const mainRoutes = [routes.home, routes.today, routes.upcoming];
  const customLists = [routes.personal, routes.work, routes.shopping];
  const bottomRoutes = [routes.archive, routes.settings];

  const getActiveRoute = () => {
    return Object.values(routes).find(route => route.path === location.pathname) || routes.today;
  };

  const activeRoute = getActiveRoute();

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
          {/* Main Routes */}
          <div>
            <ul className="space-y-2">
              {mainRoutes.map((route) => (
                <li key={route.id}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-700 hover:bg-surface hover:text-gray-900'
                      }`
                    }
                  >
                    <ApperIcon name={route.icon} className="w-5 h-5" />
                    <span>{route.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom Lists */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Lists
            </h3>
            <ul className="space-y-2">
              {customLists.map((route) => (
                <li key={route.id}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-700 hover:bg-surface hover:text-gray-900'
                      }`
                    }
                  >
                    <ApperIcon name={route.icon} className="w-5 h-5" />
                    <span>{route.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Routes */}
          <div className="pt-4 border-t border-gray-200">
            <ul className="space-y-2">
              {bottomRoutes.map((route) => (
                <li key={route.id}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-700 hover:bg-surface hover:text-gray-900'
                      }`
                    }
                  >
                    <ApperIcon name={route.icon} className="w-5 h-5" />
                    <span>{route.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 flex flex-col z-50 lg:hidden"
          >
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation - Same as desktop */}
            <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
              <div>
                <ul className="space-y-2">
                  {mainRoutes.map((route) => (
                    <li key={route.id}>
                      <NavLink
                        to={route.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-gray-700 hover:bg-surface hover:text-gray-900'
                          }`
                        }
                      >
                        <ApperIcon name={route.icon} className="w-5 h-5" />
                        <span>{route.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Lists
                </h3>
                <ul className="space-y-2">
                  {customLists.map((route) => (
                    <li key={route.id}>
                      <NavLink
                        to={route.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-gray-700 hover:bg-surface hover:text-gray-900'
                          }`
                        }
                      >
                        <ApperIcon name={route.icon} className="w-5 h-5" />
                        <span>{route.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <ul className="space-y-2">
                  {bottomRoutes.map((route) => (
                    <li key={route.id}>
                      <NavLink
                        to={route.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-gray-700 hover:bg-surface hover:text-gray-900'
                          }`
                        }
                      >
                        <ApperIcon name={route.icon} className="w-5 h-5" />
                        <span>{route.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <ApperIcon name="Menu" className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{activeRoute.label}</h2>
                <p className="text-sm text-gray-500">Manage your tasks efficiently</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-surface p-4 lg:p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;