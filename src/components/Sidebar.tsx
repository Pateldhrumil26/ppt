import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Presentation,
  Building2,
  FolderOpen,
  Users,
  DollarSign,
  Image,
  Eye,
  Download,
  Settings,
} from 'lucide-react';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/presentation', icon: Presentation, label: 'Presentation Details' },
  { path: '/company', icon: Building2, label: 'Company Details' },
  { path: '/project', icon: FolderOpen, label: 'Project Details' },
  { path: '/team', icon: Users, label: 'Team Details' },
  { path: '/financial', icon: DollarSign, label: 'Financial Details' },
  { path: '/images', icon: Image, label: 'Images & Documents' },
  { path: '/preview', icon: Eye, label: 'PPT Preview' },
  { path: '/download', icon: Download, label: 'Download PPT' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">AI Presentation</h1>
        <p className="text-sm text-gray-400 text-center mt-1">Generator Admin</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;