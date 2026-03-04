import React, { useState } from 'react';
import { BarChart3, FileText, Users, AlertCircle, TrendingUp, Clock, CheckCircle, Home, Plus, Edit2, Trash2, Search, Filter, Download } from 'lucide-react';

const CAFirmPortal = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [tasks, setTasks] = useState([
    { id: 'TSK-001', title: 'Complete GST Return', assignee: 'John Doe', client: 'ABC Corp', dueDate: '15-03-2026', priority: 'High', status: 'In Progress', complete: 75 },
    { id: 'TSK-002', title: 'ITR Review', assignee: 'Jane Smith', client: 'XYZ Ltd', dueDate: '20-03-2026', priority: 'Medium', status: 'Pending', complete: 0 },
    { id: 'TSK-003', title: 'Audit Documentation', assignee: 'Bob Johnson', client: 'PQR Inc', dueDate: '31-03-2026', priority: 'High', status: 'Not Started', complete: 0 },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-001', client: 'ABC Corp', date: '01-02-2026', amount: 50000, dueDate: '15-02-2026', received: 50000, status: 'Paid' },
    { id: 'INV-002', client: 'XYZ Ltd', date: '10-02-2026', amount: 75000, dueDate: '24-02-2026', received: 25000, status: 'Partial' },
    { id: 'INV-003', client: 'PQR Inc', date: '15-02-2026', amount: 100000, dueDate: '01-03-2026', received: 0, status: 'Unpaid' },
  ]);

  const [appeals, setAppeals] = useState([
    { id: 'APL-001', client: 'ABC Corp', dueDate: '01-03-2026', status: 'Pending', responsible: 'John Doe', daysLeft: 26 },
    { id: 'APL-002', client: 'XYZ Ltd', dueDate: '15-03-2026', status: 'Filed', responsible: 'Jane Smith', daysLeft: 11 },
    { id: 'APL-003', client: 'PQR Inc', dueDate: '05-04-2026', status: 'Not Filed', responsible: 'Bob Johnson', daysLeft: 32 },
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: 'John Doe', designation: 'Senior CA', email: 'john@firm.com', tasks: 5, status: 'Active', utilization: 85 },
    { id: 2, name: 'Jane Smith', designation: 'CA Associate', email: 'jane@firm.com', tasks: 3, status: 'Active', utilization: 60 },
    { id: 3, name: 'Bob Johnson', designation: 'Junior CA', email: 'bob@firm.com', tasks: 2, status: 'On Leave', utilization: 0 },
  ]);

  const [clients, setClients] = useState([
    { id: 1, name: 'ABC Corp', contact: 'Mr. Sharma', email: 'sharma@abc.com', jobs: 2, revenue: 150000, outstanding: 50000 },
    { id: 2, name: 'XYZ Ltd', contact: 'Ms. Patel', email: 'patel@xyz.com', jobs: 1, revenue: 200000, outstanding: 75000 },
    { id: 3, name: 'PQR Inc', contact: 'Mr. Verma', email: 'verma@pqr.com', jobs: 3, revenue: 300000, outstanding: 100000 },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'In Progress': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Not Started': 'bg-gray-100 text-gray-800',
      'Completed': 'bg-green-100 text-green-800',
      'Paid': 'bg-green-100 text-green-800',
      'Unpaid': 'bg-red-100 text-red-800',
      'Partial': 'bg-orange-100 text-orange-800',
      'Filed': 'bg-blue-100 text-blue-800',
      'Active': 'bg-green-100 text-green-800',
      'On Leave': 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'text-red-600';
    if (priority === 'Medium') return 'text-orange-600';
    return 'text-green-600';
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReceived = invoices.reduce((sum, inv) => sum + inv.received, 0);
  const totalOutstanding = totalRevenue - totalReceived;
  const activeTasks = tasks.filter(t => t.status !== 'Completed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      {/* Navigation Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 p-6 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={24} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">CA Portal</h1>
          </div>
          <p className="text-xs text-slate-400">Firm Management System</p>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'tasks', label: 'Tasks', icon: CheckCircle },
            { id: 'invoices', label: 'Invoices', icon: FileText },
            { id: 'staff', label: 'Staff', icon: Users },
            { id: 'appeals', label: 'Appeals', icon: AlertCircle },
            { id: 'clients', label: 'Clients', icon: TrendingUp },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeModule === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {activeModule === 'dashboard' && 'Dashboard'}
                  {activeModule === 'tasks' && 'Task Management'}
                  {activeModule === 'invoices' && 'Invoice & Billing'}
                  {activeModule === 'staff' && 'Staff Management'}
                  {activeModule === 'appeals' && 'Appeal Tracking'}
                  {activeModule === 'clients' && 'Client Management'}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-all">
                  <Download size={18} />
                  <span className="text-sm">Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeModule === 'dashboard' && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 border border-blue-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-blue-200 text-sm font-medium">Active Tasks</p>
                      <p className="text-4xl font-bold text-white mt-2">{activeTasks}</p>
                      <p className="text-blue-300 text-xs mt-2">From {tasks.length} total</p>
                    </div>
                    <CheckCircle size={32} className="text-blue-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-xl p-6 border border-emerald-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-emerald-200 text-sm font-medium">Total Revenue</p>
                      <p className="text-4xl font-bold text-white mt-2">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                      <p className="text-emerald-300 text-xs mt-2">From {invoices.length} invoices</p>
                    </div>
                    <TrendingUp size={32} className="text-emerald-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-xl p-6 border border-orange-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-orange-200 text-sm font-medium">Outstanding</p>
                      <p className="text-4xl font-bold text-white mt-2">₹{(totalOutstanding / 100000).toFixed(1)}L</p>
                      <p className="text-orange-300 text-xs mt-2">Pending collection</p>
                    </div>
                    <Clock size={32} className="text-orange-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-6 border border-purple-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-purple-200 text-sm font-medium">Team Members</p>
                      <p className="text-4xl font-bold text-white mt-2">{staff.length}</p>
                      <p className="text-purple-300 text-xs mt-2">{staff.filter(s => s.status === 'Active').length} active</p>
                    </div>
                    <Users size={32} className="text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Payment Status</h3>
                  <div className="space-y-3">
                    {['Paid', 'Partial', 'Unpaid'].map((status, idx) => {
                      const count = invoices.filter(i => i.status === status).length;
                      const percentage = (count / invoices.length) * 100;
                      return (
                        <div key={status}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">{status}</span>
                            <span className="font-medium">{count} invoices</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                status === 'Paid' ? 'bg-emerald-500' : status === 'Partial' ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Task Distribution</h3>
                  <div className="space-y-3">
                    {['In Progress', 'Pending', 'Not Started'].map(status => {
                      const count = tasks.filter(t => t.status === status).length;
                      const percentage = (count / tasks.length) * 100;
                      return (
                        <div key={status}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">{status}</span>
                            <span className="font-medium">{count} tasks</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                status === 'In Progress' ? 'bg-blue-500' : status === 'Pending' ? 'bg-yellow-500' : 'bg-slate-600'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Tasks</h3>
                  <div className="space-y-2">
                    {tasks.slice(0, 3).map(task => (
                      <div key={task.id} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{task.title}</p>
                          <p className="text-xs text-slate-400">{task.client} • {task.assignee}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Appeal Deadlines</h3>
                  <div className="space-y-2">
                    {appeals.slice(0, 3).map(appeal => (
                      <div key={appeal.id} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{appeal.client}</p>
                          <p className="text-xs text-slate-400">Due: {appeal.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-orange-400">{appeal.daysLeft} days</p>
                          <p className="text-xs text-slate-400">{appeal.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeModule === 'tasks' && (
            <div className="space-y-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all">
                <Plus size={18} />
                <span>New Task</span>
              </button>

              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-800 border-b border-slate-700">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Task ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Assigned To</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Priority</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Progress</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {tasks.map(task => (
                        <tr key={task.id} className="hover:bg-slate-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-blue-400">{task.id}</td>
                          <td className="px-6 py-4 text-sm text-white">{task.title}</td>
                          <td className="px-6 py-4 text-sm text-slate-300">{task.assignee}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`font-semibold ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="w-20 bg-slate-700 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${task.complete}%` }} />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{task.complete}%</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">{task.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeModule === 'invoices' && (
            <div className="space-y-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all">
                <Plus size={18} />
                <span>New Invoice</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
                  <p className="text-slate-400 text-sm">Total Outstanding</p>
                  <p className="text-2xl font-bold text-red-400">₹{(totalOutstanding / 100000).toFixed(1)}L</p>
                </div>
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
                  <p className="text-slate-400 text-sm">Total Billed</p>
                  <p className="text-2xl font-bold text-blue-400">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                </div>
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
                  <p className="text-slate-400 text-sm">Collection Rate</p>
                  <p className="text-2xl font-bold text-emerald-400">{((totalReceived / totalRevenue) * 100).toFixed(0)}%</p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-800 border-b border-slate-700">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Invoice #</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Received</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Balance</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {invoices.map(invoice => (
                        <tr key={invoice.id} className="hover:bg-slate-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-blue-400">{invoice.id}</td>
                          <td className="px-6 py-4 text-sm text-white">{invoice.client}</td>
                          <td className="px-6 py-4 text-sm text-slate-300">{invoice.date}</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">₹{invoice.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm font-medium text-emerald-400">₹{invoice.received.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm font-medium text-orange-400">₹{(invoice.amount - invoice.received).toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeModule === 'staff' && (
            <div className="space-y-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all">
                <Plus size={18} />
                <span>Add Staff Member</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map(member => (
                  <div key={member.id} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-sm text-slate-400">{member.designation}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Email</p>
                        <p className="text-sm text-slate-300">{member.email}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800 rounded p-3">
                          <p className="text-xs text-slate-400">Tasks</p>
                          <p className="text-2xl font-bold text-blue-400">{member.tasks}</p>
                        </div>
                        <div className="bg-slate-800 rounded p-3">
                          <p className="text-xs text-slate-400">Utilization</p>
                          <p className="text-2xl font-bold text-emerald-400">{member.utilization}%</p>
                        </div>
                      </div>

                      <div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${member.utilization}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeModule === 'appeals' && (
            <div className="space-y-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all">
                <Plus size={18} />
                <span>New Appeal</span>
              </button>

              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-800 border-b border-slate-700">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Appeal ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Due Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Responsible</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Days Left</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {appeals.map(appeal => (
                        <tr key={appeal.id} className="hover:bg-slate-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-blue-400">{appeal.id}</td>
                          <td className="px-6 py-4 text-sm text-white">{appeal.client}</td>
                          <td className="px-6 py-4 text-sm text-slate-300">{appeal.dueDate}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(appeal.status)}`}>
                              {appeal.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">{appeal.responsible}</td>
                          <td className="px-6 py-4 text-sm font-bold">
                            <span className={appeal.daysLeft <= 7 ? 'text-red-400' : appeal.daysLeft <= 14 ? 'text-orange-400' : 'text-emerald-400'}>
                              {appeal.daysLeft} days
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeModule === 'clients' && (
            <div className="space-y-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all">
                <Plus size={18} />
                <span>Add Client</span>
              </button>

              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-800 border-b border-slate-700">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Client Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Active Jobs</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Revenue (YTD)</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Outstanding</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {clients.map(client => (
                        <tr key={client.id} className="hover:bg-slate-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-white">{client.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-300">{client.contact}</td>
                          <td className="px-6 py-4 text-sm text-slate-300">{client.email}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs font-semibold">{client.jobs}</span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-emerald-400">₹{client.revenue.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm font-medium text-orange-400">₹{client.outstanding.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CAFirmPortal;
