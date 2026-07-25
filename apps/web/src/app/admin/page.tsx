import React from 'react';
import { BookOpen, Users, CreditCard, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Students', value: '124', icon: Users, color: 'text-blue-600' },
    { name: 'Active Teachers', value: '8', icon: Users, color: 'text-green-600' },
    { name: 'Lessons Completed', value: '1,847', icon: BookOpen, color: 'text-purple-600' },
    { name: 'Revenue', value: '$12,450', icon: CreditCard, color: 'text-yellow-600' },
  ];

  const recentActivity = [
    { student: 'Maria Garcia', action: 'Completed Lesson 3', time: '2 hours ago' },
    { student: 'John Smith', action: 'Started Unit 2', time: '4 hours ago' },
    { student: 'Emma Wilson', action: 'Payment Received', time: '1 day ago' },
    { student: 'Alex Brown', action: 'Teacher Note Added', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your piano learning platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Admin</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="bg-white overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((activity, index) => (
                <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {activity.student.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {activity.student}
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.action}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Manage Lessons</h3>
                  <p className="text-sm text-gray-500">Create, edit, and organize lessons</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Manage Teachers</h3>
                  <p className="text-sm text-gray-500">Assign students and track performance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">View Analytics</h3>
                  <p className="text-sm text-gray-500">Track platform usage and growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}