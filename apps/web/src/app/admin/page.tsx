"use client";

import { useState } from "react";
import {
  Music,
  Users,
  GraduationCap,
  CreditCard,
  BarChart3,
  Settings,
  BookOpen,
  UserPlus,
  FileText,
  ChevronRight,
  Menu,
  X,
  Home,
} from "lucide-react";

type Tab = "dashboard" | "students" | "teachers" | "lessons" | "payments";

const stats = [
  { label: "Total Students", value: "124", change: "+12 this month", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Teachers", value: "8", change: "+2 this month", icon: GraduationCap, color: "text-green-600", bg: "bg-green-50" },
  { label: "Lessons Completed", value: "1,847", change: "156 this week", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Monthly Revenue", value: "$12,450", change: "+8% vs last month", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
];

const students = [
  { id: "1", name: "Maria Garcia", teacher: "Ana Lopez", lessons: 12, progress: 65, status: "active", payment: "paid" },
  { id: "2", name: "John Smith", teacher: "Ana Lopez", lessons: 8, progress: 40, status: "active", payment: "paid" },
  { id: "3", name: "Emma Wilson", teacher: "Carlos Ruiz", lessons: 15, progress: 82, status: "active", payment: "pending" },
  { id: "4", name: "Alex Brown", teacher: "Carlos Ruiz", lessons: 3, progress: 15, status: "inactive", payment: "overdue" },
  { id: "5", name: "Sophie Chen", teacher: "Ana Lopez", lessons: 20, progress: 95, status: "active", payment: "paid" },
];

const teachers = [
  { id: "1", name: "Ana Lopez", students: 24, lessons: 480, rating: 4.8 },
  { id: "2", name: "Carlos Ruiz", students: 18, lessons: 360, rating: 4.6 },
  { id: "3", name: "Laura Martinez", students: 32, lessons: 640, rating: 4.9 },
  { id: "4", name: "Diego Fernandez", students: 15, lessons: 300, rating: 4.5 },
];

const recentActivity = [
  { student: "Maria Garcia", action: "Completed lesson: Take Off", time: "2 hours ago" },
  { student: "John Smith", action: "Started Unit 2: Dynamics", time: "4 hours ago" },
  { student: "Emma Wilson", action: "Payment received: $50", time: "1 day ago" },
  { student: "Sophie Chen", action: "Completed lesson: Beethoven's Ninth", time: "1 day ago" },
  { student: "Alex Brown", action: "Teacher note added by Carlos Ruiz", time: "2 days ago" },
];

function Sidebar({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "students", label: "Students", icon: Users },
    { id: "teachers", label: "Teachers", icon: GraduationCap },
    { id: "lessons", label: "Lessons", icon: BookOpen },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} bg-slate-900 text-white flex flex-col transition-all`}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Music className="text-blue-400" size={24} />
            <span className="font-bold text-lg">PlayingKeys</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-slate-400 hover:text-white">
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      <nav className="flex-1 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <tab.icon size={18} />
            {!collapsed && <span>{tab.label}</span>}
          </button>
        ))}
      </nav>
      <div className="p-2 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white">
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}

function DashboardTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`${stat.color}`} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    {activity.student.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.student}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: "Add New Student", icon: UserPlus, color: "text-blue-600" },
              { label: "Create Lesson", icon: FileText, color: "text-green-600" },
              { label: "View Reports", icon: BarChart3, color: "text-purple-600" },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
              >
                <action.icon size={18} className={action.color} />
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
                <ChevronRight size={14} className="ml-auto text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Students</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <UserPlus size={16} />
          Add Student
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Teacher</th>
              <th className="px-5 py-3">Lessons</th>
              <th className="px-5 py-3">Progress</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{s.teacher}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{s.lessons}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs text-gray-500">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    s.payment === "paid" ? "bg-green-100 text-green-700" :
                    s.payment === "pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {s.payment}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    s.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeachersTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Teachers</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <UserPlus size={16} />
          Add Teacher
        </button>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teachers.map((t) => (
          <div key={t.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">Rating: {t.rating}/5</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-gray-900">{t.students}</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-gray-900">{t.lessons}</p>
                <p className="text-xs text-gray-500">Lessons</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LessonsTab() {
  const units = [
    { name: "Unit 1: Higher & Lower", lessons: 4, completed: 2 },
    { name: "Unit 2: Dynamics", lessons: 3, completed: 0 },
    { name: "Unit 3: Slurs & Octaves", lessons: 2, completed: 0 },
    { name: "Unit 4: Intervals - 2nds", lessons: 3, completed: 0 },
    { name: "Unit 5: Intervals - 3rds", lessons: 2, completed: 0 },
    { name: "Unit 6: Time Signatures", lessons: 3, completed: 0 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Lesson Curriculum</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <BookOpen size={16} />
          Create Unit
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {units.map((unit, i) => (
          <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">{unit.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {unit.completed}/{unit.lessons} lessons completed
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(unit.completed / unit.lessons) * 100}%` }}
                />
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-5 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Payment Status</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Due Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-900">{s.name}</td>
                <td className="px-5 py-4 text-sm text-gray-600">$50.00</td>
                <td className="px-5 py-4 text-sm text-gray-600">2026-08-01</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    s.payment === "paid" ? "bg-green-100 text-green-700" :
                    s.payment === "pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {s.payment}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    {s.payment === "paid" ? "View Receipt" : "Mark Paid"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab />;
      case "students": return <StudentsTab />;
      case "teachers": return <TeachersTab />;
      case "lessons": return <LessonsTab />;
      case "payments": return <PaymentsTab />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === "dashboard" && "Overview of your piano learning platform"}
              {activeTab === "students" && "Manage student accounts and progress"}
              {activeTab === "teachers" && "Manage teacher profiles and assignments"}
              {activeTab === "lessons" && "Create and organize curriculum content"}
              {activeTab === "payments" && "Track membership payments and status"}
            </p>
          </div>
          {renderTab()}
        </div>
      </main>
    </div>
  );
}