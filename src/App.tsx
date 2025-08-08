import React, { useState } from 'react';
import { Shield, Monitor, Terminal, Download, Play, CheckCircle, XCircle } from 'lucide-react';
import WindowsFirewall from './components/WindowsFirewall';
import LinuxFirewall from './components/LinuxFirewall';
import RuleSimulator from './components/RuleSimulator';
import ConfigExporter from './components/ConfigExporter';

function App() {
  const [activeTab, setActiveTab] = useState('windows');
  const [activeSection, setActiveSection] = useState('overview');

  const tabs = [
    { id: 'windows', label: 'Windows Firewall', icon: Monitor },
    { id: 'linux', label: 'Linux UFW', icon: Terminal },
    { id: 'simulator', label: 'Rule Simulator', icon: Play },
    { id: 'export', label: 'Export Configs', icon: Download }
  ];

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'setup', label: 'Setup' },
    { id: 'rules', label: 'Rules' },
    { id: 'testing', label: 'Testing' },
    { id: 'examples', label: 'Examples' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">Firewall Configuration Guide</h1>
              <p className="text-gray-400">Configure and test basic firewall rules on Windows and Linux</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {(activeTab === 'windows' || activeTab === 'linux') && (
            <aside className="lg:col-span-1">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </aside>
          )}

          {/* Main Content */}
          <div className={`${(activeTab === 'windows' || activeTab === 'linux') ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {activeTab === 'windows' && (
              <WindowsFirewall activeSection={activeSection} />
            )}
            {activeTab === 'linux' && (
              <LinuxFirewall activeSection={activeSection} />
            )}
            {activeTab === 'simulator' && (
              <RuleSimulator />
            )}
            {activeTab === 'export' && (
              <ConfigExporter />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;