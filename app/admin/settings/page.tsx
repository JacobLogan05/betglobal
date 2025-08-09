'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { CogIcon, UserIcon, BellIcon, ShieldCheckIcon, ServerIcon, SparklesIcon, BoltIcon, FireIcon } from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [settings, setSettings] = useState({
    // Account Settings
    companyName: 'Bet Global OS',
    email: 'admin@betglobal.com',
    phone: '+1 (555) 123-4567',
    timezone: 'UTC-5',
    language: 'English',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    weeklyReports: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    
    // System Settings
    autoBackup: true,
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: '1000'
  })

  // Track mouse position for dynamic cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Revolutionary Backdrop */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"></div>
        
        {/* Multi-Dimensional Background Architecture */}
        <div className="fixed inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(119,255,198,0.2),transparent_50%)]"></div>
        </div>

        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-red-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Dynamic Cursor Follower */}
        <div 
          className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        ></div>

        <div className="relative z-10 space-y-16 p-8">
          {/* Revolutionary Hero Section */}
          <div className="relative">
            {/* Quantum Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl mb-8 shadow-2xl shadow-yellow-500/25 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                <CogIcon className="h-10 w-10 text-white relative z-10" />
              </div>
              
              <h1 className="text-7xl font-black mb-6 relative">
                <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                  SETTINGS
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  COMMAND
                </span>
              </h1>
              
              <div className="flex items-center justify-center space-x-4 text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium">Elite System Configuration Center</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="mt-4 text-sm text-gray-400 font-mono">
                CONFIGURATION MODE: ACTIVE
              </div>
            </div>
          </div>

          {/* Revolutionary Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Settings - Golden Quantum */}
            <div className="group relative">
              {/* Multi-layered Glow System */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-yellow-500/20 group-hover:border-yellow-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <UserIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400/20 to-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-4xl font-black bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl uppercase tracking-wider">ACCOUNT SETTINGS</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="group/field relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-2xl opacity-0 group-hover/field:opacity-100 transition-all duration-300"></div>
                    <div className="relative">
                      <label className="block text-lg font-black text-gray-200 mb-3 uppercase tracking-wider">COMPANY NAME</label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) => handleSettingChange('companyName', e.target.value)}
                        className="w-full px-6 py-4 bg-black/50 border-2 border-yellow-500/50 rounded-xl text-white text-lg font-bold placeholder-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 shadow-lg shadow-yellow-500/20"
                        placeholder="Enter your revolutionary company name"
                      />
                    </div>
                  </div>

                  <div className="group/field relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-2xl opacity-0 group-hover/field:opacity-100 transition-all duration-300"></div>
                    <div className="relative">
                      <label className="block text-lg font-black text-gray-200 mb-3 uppercase tracking-wider">EMAIL</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                        className="w-full px-6 py-4 bg-black/50 border-2 border-yellow-500/50 rounded-xl text-white text-lg font-bold placeholder-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 shadow-lg shadow-yellow-500/20"
                        placeholder="Enter your elite email"
                      />
                    </div>
                  </div>

                  <div className="group/field relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-2xl opacity-0 group-hover/field:opacity-100 transition-all duration-300"></div>
                    <div className="relative">
                      <label className="block text-lg font-black text-gray-200 mb-3 uppercase tracking-wider">PHONE</label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => handleSettingChange('phone', e.target.value)}
                        className="w-full px-6 py-4 bg-black/50 border-2 border-yellow-500/50 rounded-xl text-white text-lg font-bold placeholder-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 shadow-lg shadow-yellow-500/20"
                        placeholder="Enter your revolutionary phone"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group/field relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-2xl opacity-0 group-hover/field:opacity-100 transition-all duration-300"></div>
                      <div className="relative">
                        <label className="block text-gray-300 text-sm font-medium mb-3 uppercase tracking-wider">Timezone</label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => handleSettingChange('timezone', e.target.value)}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                        >
                          <option value="UTC-5">UTC-5 (Eastern)</option>
                          <option value="UTC-6">UTC-6 (Central)</option>
                          <option value="UTC-7">UTC-7 (Mountain)</option>
                          <option value="UTC-8">UTC-8 (Pacific)</option>
                        </select>
                      </div>
                    </div>

                    <div className="group/field relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-2xl opacity-0 group-hover/field:opacity-100 transition-all duration-300"></div>
                      <div className="relative">
                        <label className="block text-gray-300 text-sm font-medium mb-3 uppercase tracking-wider">Language</label>
                        <select
                          value={settings.language}
                          onChange={(e) => handleSettingChange('language', e.target.value)}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings - Emerald Sophistication */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <BellIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-4xl font-black bg-gradient-to-r from-white via-emerald-200 to-green-300 bg-clip-text text-transparent drop-shadow-2xl uppercase tracking-wider">NOTIFICATION SETTINGS</h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
                    { key: 'smsNotifications', label: 'SMS Notifications', description: 'Text message alerts' },
                    { key: 'weeklyReports', label: 'Weekly Reports', description: 'Automated weekly summaries' }
                  ].map((item) => (
                    <div key={item.key} className="group/toggle relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/10 to-green-500/10 rounded-2xl opacity-0 group-hover/toggle:opacity-100 transition-all duration-300"></div>
                      <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 group-hover/toggle:border-white/20 transition-all duration-300">
                        <div>
                          <h4 className="text-white font-bold text-lg">{item.label}</h4>
                          <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange(item.key, !settings[item.key as keyof typeof settings])}
                          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                            settings[item.key as keyof typeof settings] 
                              ? 'bg-gradient-to-r from-emerald-400 to-green-500' 
                              : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                              settings[item.key as keyof typeof settings] ? 'translate-x-9' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Settings - Orange Elegance */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-orange-500/20 group-hover:border-orange-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheckIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-orange-400/20 to-yellow-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-white via-orange-200 to-yellow-300 bg-clip-text text-transparent">Security</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="group/toggle relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover/toggle:opacity-100 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 group-hover/toggle:border-white/20 transition-all duration-300">
                      <div>
                        <h4 className="text-white font-bold text-lg">Two-Factor Authentication</h4>
                        <p className="text-gray-400 text-sm mt-1">Add extra security to your account</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                          settings.twoFactorAuth 
                            ? 'bg-gradient-to-r from-orange-400 to-yellow-500' 
                            : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                            settings.twoFactorAuth ? 'translate-x-9' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group/field relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover/field:opacity-100 transition-all duration-300"></div>
                      <div className="relative">
                        <label className="block text-gray-300 text-sm font-medium mb-3 uppercase tracking-wider">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                        />
                      </div>
                    </div>

                    <div className="group/field relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover/field:opacity-100 transition-all duration-300"></div>
                      <div className="relative">
                        <label className="block text-gray-300 text-sm font-medium mb-3 uppercase tracking-wider">Password Expiry (days)</label>
                        <input
                          type="number"
                          value={settings.passwordExpiry}
                          onChange={(e) => handleSettingChange('passwordExpiry', e.target.value)}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Settings - Red Sophistication */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 border border-red-500/20 group-hover:border-red-400/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-400 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <ServerIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-red-400/20 to-rose-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-white via-red-200 to-pink-300 bg-clip-text text-transparent">System</h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    { key: 'autoBackup', label: 'Auto Backup', description: 'Automatic daily backups' },
                    { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Enable system maintenance' },
                    { key: 'debugMode', label: 'Debug Mode', description: 'Enable debug logging' }
                  ].map((item) => (
                    <div key={item.key} className="group/toggle relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-400/10 to-pink-500/10 rounded-2xl opacity-0 group-hover/toggle:opacity-100 transition-all duration-300"></div>
                      <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 group-hover/toggle:border-white/20 transition-all duration-300">
                        <div>
                          <h4 className="text-white font-bold text-lg">{item.label}</h4>
                          <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange(item.key, !settings[item.key as keyof typeof settings])}
                          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                            settings[item.key as keyof typeof settings] 
                              ? 'bg-gradient-to-r from-red-400 to-pink-500' 
                              : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                              settings[item.key as keyof typeof settings] ? 'translate-x-9' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="group/field relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400/10 to-pink-500/10 rounded-2xl opacity-0 group-hover/field:opacity-100 transition-all duration-300"></div>
                    <div className="relative">
                      <label className="block text-gray-300 text-sm font-medium mb-3 uppercase tracking-wider">API Rate Limit (requests/hour)</label>
                      <input
                        type="number"
                        value={settings.apiRateLimit}
                        onChange={(e) => handleSettingChange('apiRateLimit', e.target.value)}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Save Button */}
          <div className="flex justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
              
              <button className="relative px-16 py-6 bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-600 rounded-3xl text-white font-black text-xl shadow-2xl group-hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-white/20">
                <div className="flex items-center space-x-4">
                  <SparklesIcon className="h-6 w-6" />
                  <span>SAVE CONFIGURATION</span>
                  <BoltIcon className="h-6 w-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}