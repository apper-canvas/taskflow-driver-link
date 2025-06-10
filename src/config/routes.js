import Home from '../pages/Home';
import Today from '../pages/Today';
import Upcoming from '../pages/Upcoming';
import Archive from '../pages/Archive';
import Settings from '../pages/Settings';
import Personal from '../pages/Personal';
import Work from '../pages/Work';
import Shopping from '../pages/Shopping';

export const routes = {
  home: {
    id: 'home',
    label: 'All Tasks',
    path: '/home',
    icon: 'CheckSquare',
    component: Home
  },
  today: {
    id: 'today',
    label: 'Today',
    path: '/today',
    icon: 'Calendar',
    component: Today
  },
  upcoming: {
    id: 'upcoming',
    label: 'Upcoming',
    path: '/upcoming',
    icon: 'Clock',
    component: Upcoming
  },
  personal: {
    id: 'personal',
    label: 'Personal',
    path: '/personal',
    icon: 'User',
    component: Personal,
    isCustomList: true
  },
  work: {
    id: 'work',
    label: 'Work',
    path: '/work',
    icon: 'Briefcase',
    component: Work,
    isCustomList: true
  },
  shopping: {
    id: 'shopping',
    label: 'Shopping',
    path: '/shopping',
    icon: 'ShoppingCart',
    component: Shopping,
    isCustomList: true
  },
  archive: {
    id: 'archive',
    label: 'Archive',
    path: '/archive',
    icon: 'Archive',
    component: Archive
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  }
};

export const routeArray = Object.values(routes);