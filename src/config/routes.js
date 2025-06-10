import HomePage from '@/components/pages/HomePage';
import TodayPage from '@/components/pages/TodayPage';
import UpcomingPage from '@/components/pages/UpcomingPage';
import ArchivePage from '@/components/pages/ArchivePage';
import SettingsPage from '@/components/pages/SettingsPage';
import PersonalPage from '@/components/pages/PersonalPage';
import WorkPage from '@/components/pages/WorkPage';
import ShoppingPage from '@/components/pages/ShoppingPage';

export const routes = {
home: {
    id: 'home',
    label: 'All Tasks',
    path: '/home',
    icon: 'CheckSquare',
    component: HomePage
  },
  today: {
    id: 'today',
    label: 'Today',
    path: '/today',
    icon: 'Calendar',
    component: TodayPage
  },
upcoming: {
    id: 'upcoming',
    label: 'Upcoming',
    path: '/upcoming',
    icon: 'Clock',
    component: UpcomingPage
  },
  personal: {
    id: 'personal',
    label: 'Personal',
    path: '/personal',
    icon: 'User',
    component: PersonalPage,
    isCustomList: true
  },
work: {
    id: 'work',
    label: 'Work',
    path: '/work',
    icon: 'Briefcase',
    component: WorkPage,
    isCustomList: true
  },
  shopping: {
    id: 'shopping',
    label: 'Shopping',
    path: '/shopping',
    icon: 'ShoppingCart',
    component: ShoppingPage,
    isCustomList: true
  },
archive: {
    id: 'archive',
    label: 'Archive',
    path: '/archive',
    icon: 'Archive',
    component: ArchivePage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: SettingsPage
  }
};

export const routeArray = Object.values(routes);