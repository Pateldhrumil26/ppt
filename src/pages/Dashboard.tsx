// import { Presentation, Building2, FolderOpen, Users, DollarSign } from 'lucide-react';
import {
  Presentation,
  Building2,
  FolderOpen,
  Users,
  DollarSign,
  Eye,
  Download,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { useFormData } from '../context/FormContext';


const Dashboard = () => {
  const { formData } = useFormData();

  const stats = [
    { label: 'Presentation', icon: Presentation, value: formData.presentation.title || 'Not set' },
    { label: 'Company', icon: Building2, value: formData.company.companyName || 'Not set' },
    { label: 'Project', icon: FolderOpen, value: formData.project.projectName || 'Not set' },
    { label: 'Team Leader', icon: Users, value: formData.team.teamLeader || 'Not set' },
    { label: 'Budget', icon: DollarSign, value: formData.financial.budget || 'Not set' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to AI Presentation Generator Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <stat.icon className="text-primary-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-900 truncate">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/presentation"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Presentation className="mx-auto mb-2 text-primary-600" size={32} />
            <p className="font-medium text-gray-700">Start New Presentation</p>
          </a>
          <a
            href="/preview"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Eye className="mx-auto mb-2 text-primary-600" size={32} />
            <p className="font-medium text-gray-700">Preview PPT</p>
          </a>
          <a
            href="/download"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Download className="mx-auto mb-2 text-primary-600" size={32} />
            <p className="font-medium text-gray-700">Download PPT</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;