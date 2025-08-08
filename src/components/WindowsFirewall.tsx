import React from 'react';
import { Copy, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface WindowsFirewallProps {
  activeSection: string;
}

const WindowsFirewall: React.FC<WindowsFirewallProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Windows Firewall Overview
              </h2>
              <p className="text-gray-300 mb-4">
                Windows Defender Firewall with Advanced Security provides host-based, 
                two-way network traffic filtering for Windows computers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-green-400 mb-2">Inbound Rules</h3>
                  <p className="text-sm text-gray-300">Control incoming network connections</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-red-400 mb-2">Outbound Rules</h3>
                  <p className="text-sm text-gray-300">Control outgoing network connections</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Profile-based filtering (Domain, Private, Public)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Application-based rules
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Port and protocol filtering
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Connection security rules (IPSec)
                </li>
              </ul>
            </div>
          </div>
        );

      case 'setup':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Initial Setup & Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Access Windows Firewall</h3>
                  <p className="text-gray-300 mb-3">Open Windows Defender Firewall with Advanced Security:</p>
                  <CodeBlock
                    language="batch"
                    code={`# Run as Administrator
wf.msc

# Or via Control Panel
control firewall.cpl`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. Enable/Disable Firewall</h3>
                  <CodeBlock
                    language="batch"
                    code={`# Enable firewall for all profiles
netsh advfirewall set allprofiles state on

# Disable firewall for all profiles (NOT RECOMMENDED)
netsh advfirewall set allprofiles state off

# Enable specific profile
netsh advfirewall set domainprofile state on
netsh advfirewall set privateprofile state on
netsh advfirewall set publicprofile state on`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. View Current Status</h3>
                  <CodeBlock
                    language="batch"
                    code={`# Show firewall status for all profiles
netsh advfirewall show allprofiles

# Show current firewall state
netsh advfirewall show currentprofile`}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Creating Firewall Rules</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-green-400">Inbound Rules</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Allow incoming HTTP traffic (port 80)</h4>
                      <CodeBlock
                        language="batch"
                        code={`netsh advfirewall firewall add rule name="Allow HTTP Inbound" dir=in action=allow protocol=TCP localport=80`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Allow incoming HTTPS traffic (port 443)</h4>
                      <CodeBlock
                        language="batch"
                        code={`netsh advfirewall firewall add rule name="Allow HTTPS Inbound" dir=in action=allow protocol=TCP localport=443`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Allow specific application</h4>
                      <CodeBlock
                        language="batch"
                        code={`netsh advfirewall firewall add rule name="Allow MyApp" dir=in action=allow program="C:\\Path\\To\\MyApp.exe"`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Allow from specific IP address</h4>
                      <CodeBlock
                        language="batch"
                        code={`netsh advfirewall firewall add rule name="Allow from IP" dir=in action=allow protocol=TCP localport=22 remoteip=192.168.1.100`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-red-400">Outbound Rules</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Block outbound traffic to specific port</h4>
                      <CodeBlock
                        language="batch"
                        code={`netsh advfirewall firewall add rule name="Block Port 445" dir=out action=block protocol=TCP localport=445`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Allow outbound for specific application</h4>
                      <CodeBlock
                        language="batch"
                        code={`netsh advfirewall firewall add rule name="Allow Browser Out" dir=out action=allow program="C:\\Program Files\\Mozilla Firefox\\firefox.exe"`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Rule Management</h3>
                  <CodeBlock
                    language="batch"
                    code={`# List all firewall rules
netsh advfirewall firewall show rule name=all

# Delete a specific rule
netsh advfirewall firewall delete rule name="Allow HTTP Inbound"

# Delete all rules matching criteria
netsh advfirewall firewall delete rule name="Allow HTTP Inbound" protocol=TCP localport=80`}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Testing Firewall Rules</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Testing Tools</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Telnet (Test Port Connectivity)</h4>
                      <CodeBlock
                        language="batch"
                        code={`# Test if port 80 is open on target server
telnet google.com 80

# Test local port
telnet localhost 8080`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Test-NetConnection (PowerShell)</h4>
                      <CodeBlock
                        language="powershell"
                        code={`# Test TCP connection
Test-NetConnection -ComputerName google.com -Port 80

# Test with detailed information
Test-NetConnection -ComputerName 192.168.1.1 -Port 443 -InformationLevel Detailed`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Netstat (View Active Connections)</h4>
                      <CodeBlock
                        language="batch"
                        code={`# Show all listening ports
netstat -an | findstr LISTENING

# Show processes using ports
netstat -ano

# Show specific port usage
netstat -an | findstr :80`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Monitoring & Logging</h3>
                  <CodeBlock
                    language="batch"
                    code={`# Enable firewall logging
netsh advfirewall set allprofiles logging allowedconnections enable
netsh advfirewall set allprofiles logging droppedconnections enable

# Set log file location and size
netsh advfirewall set allprofiles logging filename C:\\Windows\\system32\\LogFiles\\Firewall\\pfirewall.log
netsh advfirewall set allprofiles logging maxfilesize 4096`}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'examples':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Common Configuration Examples</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Web Server Configuration</h3>
                  <CodeBlock
                    language="batch"
                    code={`# Allow HTTP and HTTPS inbound
netsh advfirewall firewall add rule name="Web Server HTTP" dir=in action=allow protocol=TCP localport=80
netsh advfirewall firewall add rule name="Web Server HTTPS" dir=in action=allow protocol=TCP localport=443

# Allow FTP if needed
netsh advfirewall firewall add rule name="FTP Server" dir=in action=allow protocol=TCP localport=21`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Database Server Configuration</h3>
                  <CodeBlock
                    language="batch"
                    code={`# MySQL Server
netsh advfirewall firewall add rule name="MySQL Server" dir=in action=allow protocol=TCP localport=3306 remoteip=192.168.1.0/24

# SQL Server
netsh advfirewall firewall add rule name="SQL Server" dir=in action=allow protocol=TCP localport=1433 remoteip=localsubnet

# PostgreSQL
netsh advfirewall firewall add rule name="PostgreSQL" dir=in action=allow protocol=TCP localport=5432`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Remote Desktop Configuration</h3>
                  <CodeBlock
                    language="batch"
                    code={`# Allow RDP from specific network
netsh advfirewall firewall add rule name="Remote Desktop" dir=in action=allow protocol=TCP localport=3389 remoteip=192.168.1.0/24

# Enable RDP through Windows features
# This is typically done through GUI: System Properties > Remote Settings`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Security Hardening</h3>
                  <CodeBlock
                    language="batch"
                    code={`# Block common attack ports
netsh advfirewall firewall add rule name="Block Telnet" dir=in action=block protocol=TCP localport=23
netsh advfirewall firewall add rule name="Block TFTP" dir=in action=block protocol=UDP localport=69
netsh advfirewall firewall add rule name="Block SNMP" dir=in action=block protocol=UDP localport=161

# Block NetBIOS and SMB for public profile
netsh advfirewall firewall add rule name="Block NetBIOS" dir=in action=block protocol=TCP localport=139 profile=public
netsh advfirewall firewall add rule name="Block SMB" dir=in action=block protocol=TCP localport=445 profile=public`}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default WindowsFirewall;