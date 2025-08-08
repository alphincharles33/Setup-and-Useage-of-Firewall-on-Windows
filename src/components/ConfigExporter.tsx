import React, { useState } from 'react';
import { Download, FileText, Copy, CheckCircle } from 'lucide-react';

const ConfigExporter: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const windowsWebServerScript = `@echo off
REM Windows Firewall Configuration Script for Web Server
REM Run as Administrator

echo Configuring Windows Firewall for Web Server...

REM Enable firewall for all profiles
netsh advfirewall set allprofiles state on

REM Set default policies
netsh advfirewall set allprofiles firewallpolicy blockinbound,allowoutbound

REM Allow HTTP (port 80)
netsh advfirewall firewall add rule name="Web Server HTTP" dir=in action=allow protocol=TCP localport=80

REM Allow HTTPS (port 443)
netsh advfirewall firewall add rule name="Web Server HTTPS" dir=in action=allow protocol=TCP localport=443

REM Allow RDP from local network (adjust IP range as needed)
netsh advfirewall firewall add rule name="Remote Desktop" dir=in action=allow protocol=TCP localport=3389 remoteip=192.168.1.0/24

REM Allow ping (ICMP)
netsh advfirewall firewall add rule name="Allow ICMP Ping" dir=in action=allow protocol=icmpv4:8,any

REM Block common attack ports
netsh advfirewall firewall add rule name="Block Telnet" dir=in action=block protocol=TCP localport=23
netsh advfirewall firewall add rule name="Block TFTP" dir=in action=block protocol=UDP localport=69
netsh advfirewall firewall add rule name="Block NetBIOS Public" dir=in action=block protocol=TCP localport=139 profile=public
netsh advfirewall firewall add rule name="Block SMB Public" dir=in action=block protocol=TCP localport=445 profile=public

REM Enable logging
netsh advfirewall set allprofiles logging allowedconnections enable
netsh advfirewall set allprofiles logging droppedconnections enable
netsh advfirewall set allprofiles logging filename C:\\Windows\\system32\\LogFiles\\Firewall\\pfirewall.log

echo Windows Firewall configuration completed!
echo Please review the rules in Windows Firewall with Advanced Security console.
pause`;

  const linuxWebServerScript = `#!/bin/bash
# UFW Configuration Script for Web Server
# Run with sudo privileges

echo "Configuring UFW for Web Server..."

# Reset UFW to default state
ufw --force reset

# Set default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (adjust port if you use non-standard port)
ufw allow ssh
# ufw allow 2222  # Uncomment if using custom SSH port

# Allow web traffic
ufw allow http
ufw allow https

# Allow FTP if needed (consider SFTP instead)
# ufw allow ftp

# Allow specific ports for applications
# ufw allow 8080  # Alternative HTTP port
# ufw allow 8443  # Alternative HTTPS port

# Rate limiting to prevent brute force attacks
ufw limit ssh

# Allow from specific management network (adjust as needed)
# ufw allow from 192.168.10.0/24 to any port ssh

# Block common attack vectors
ufw deny 135   # RPC
ufw deny 139   # NetBIOS
ufw deny 445   # SMB

# Enable logging
ufw logging medium

# Enable UFW
ufw enable

echo "UFW Web Server configuration completed!"
echo "Use 'sudo ufw status verbose' to verify configuration"`;

  const windowsDatabaseScript = `@echo off
REM Windows Firewall Configuration Script for Database Server
REM Run as Administrator

echo Configuring Windows Firewall for Database Server...

REM Enable firewall for all profiles
netsh advfirewall set allprofiles state on

REM Set restrictive default policies
netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound

REM Allow essential outbound connections
netsh advfirewall firewall add rule name="Allow DNS Out" dir=out action=allow protocol=UDP localport=53
netsh advfirewall firewall add rule name="Allow HTTP Out" dir=out action=allow protocol=TCP localport=80
netsh advfirewall firewall add rule name="Allow HTTPS Out" dir=out action=allow protocol=TCP localport=443
netsh advfirewall firewall add rule name="Allow NTP Out" dir=out action=allow protocol=UDP localport=123

REM Allow RDP from management network only
netsh advfirewall firewall add rule name="RDP Management" dir=in action=allow protocol=TCP localport=3389 remoteip=192.168.10.0/24

REM Allow MySQL from application servers
netsh advfirewall firewall add rule name="MySQL Database" dir=in action=allow protocol=TCP localport=3306 remoteip=192.168.20.0/24

REM Allow SQL Server from application servers
netsh advfirewall firewall add rule name="SQL Server" dir=in action=allow protocol=TCP localport=1433 remoteip=192.168.20.0/24

REM Allow PostgreSQL from application servers
netsh advfirewall firewall add rule name="PostgreSQL" dir=in action=allow protocol=TCP localport=5432 remoteip=192.168.20.0/24

REM Enable comprehensive logging
netsh advfirewall set allprofiles logging allowedconnections enable
netsh advfirewall set allprofiles logging droppedconnections enable
netsh advfirewall set allprofiles logging maxfilesize 4096

echo Database Server firewall configuration completed!
pause`;

  const linuxDatabaseScript = `#!/bin/bash
# UFW Configuration Script for Database Server
# Run with sudo privileges

echo "Configuring UFW for Database Server (Restrictive)..."

# Reset UFW
ufw --force reset

# Set restrictive default policies
ufw default deny incoming
ufw default deny outgoing

# Allow essential outbound connections
ufw allow out 53        # DNS
ufw allow out 80        # HTTP for updates
ufw allow out 443       # HTTPS for updates
ufw allow out 123       # NTP for time synchronization

# Allow SSH from management network only
ufw allow from 192.168.10.0/24 to any port ssh

# Database specific rules (adjust as needed)

# MySQL - allow from application servers
ufw allow from 192.168.20.0/24 to any port 3306

# PostgreSQL - allow from application servers
ufw allow from 192.168.20.0/24 to any port 5432

# MongoDB - if used
# ufw allow from 192.168.20.0/24 to any port 27017

# Redis - if used
# ufw allow from 192.168.20.0/24 to any port 6379

# Enable comprehensive logging
ufw logging high

# Enable UFW
ufw enable

echo "Database Server UFW configuration completed!"
echo "Database server is now secured with restrictive firewall rules"`;

  const configs = [
    {
      title: 'Windows Web Server Script',
      filename: 'windows-webserver-firewall.bat',
      content: windowsWebServerScript,
      type: 'windows-web'
    },
    {
      title: 'Linux Web Server Script',
      filename: 'linux-webserver-firewall.sh',
      content: linuxWebServerScript,
      type: 'linux-web'
    },
    {
      title: 'Windows Database Server Script',
      filename: 'windows-database-firewall.bat',
      content: windowsDatabaseScript,
      type: 'windows-db'
    },
    {
      title: 'Linux Database Server Script',
      filename: 'linux-database-firewall.sh',
      content: linuxDatabaseScript,
      type: 'linux-db'
    }
  ];

  const testingCommands = `# Windows Testing Commands
# Test port connectivity
telnet google.com 80
Test-NetConnection -ComputerName google.com -Port 443

# View active connections
netstat -an | findstr LISTENING
netstat -ano

# Check firewall status
netsh advfirewall show allprofiles
netsh advfirewall firewall show rule name=all

# View firewall logs
type C:\\Windows\\system32\\LogFiles\\Firewall\\pfirewall.log

# Linux Testing Commands
# Test port connectivity
nc -zv google.com 80
telnet google.com 80

# Check listening services
ss -tuln
netstat -tuln

# Check UFW status
sudo ufw status verbose
sudo ufw status numbered

# View UFW logs
sudo tail -f /var/log/ufw.log
sudo grep 'BLOCK' /var/log/ufw.log

# Monitor network traffic
sudo tcpdump -i eth0 port 22
sudo ss -tlp`;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-blue-400" />
          Export Configuration Files
        </h2>
        <p className="text-gray-300 mb-6">
          Download ready-to-use firewall configuration scripts for common scenarios. 
          Remember to review and adjust IP addresses and ports according to your environment.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {configs.map((config) => (
            <div key={config.type} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  {config.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(config.content, config.type)}
                    className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied === config.type ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => downloadFile(config.content, config.filename)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-800 rounded p-3 max-h-40 overflow-y-auto">
                <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
                  {config.content.substring(0, 500)}...
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testing Commands */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-green-400" />
          Testing Commands Reference
        </h3>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Common Testing Commands</span>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(testingCommands, 'testing')}
                className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
                title="Copy to clipboard"
              >
                {copied === 'testing' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => downloadFile(testingCommands, 'firewall-testing-commands.txt')}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded p-3 max-h-60 overflow-y-auto">
            <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
              {testingCommands}
            </pre>
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Usage Instructions</h3>
        <div className="space-y-4 text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">Windows Scripts (.bat files)</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Download the script file</li>
              <li>Right-click the file and select "Run as Administrator"</li>
              <li>Review the output for any errors</li>
              <li>Verify rules in Windows Defender Firewall with Advanced Security</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Linux Scripts (.sh files)</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Download and make the script executable: <code className="bg-gray-700 px-1 rounded">chmod +x script.sh</code></li>
              <li>Run with sudo privileges: <code className="bg-gray-700 px-1 rounded">sudo ./script.sh</code></li>
              <li>Check UFW status: <code className="bg-gray-700 px-1 rounded">sudo ufw status verbose</code></li>
              <li>Monitor logs: <code className="bg-gray-700 px-1 rounded">sudo tail -f /var/log/ufw.log</code></li>
            </ol>
          </div>
          <div className="bg-yellow-900 border border-yellow-600 rounded p-3">
            <p className="text-yellow-200 text-sm">
              <strong>Important:</strong> Always review and customize these scripts for your specific environment. 
              Adjust IP addresses, ports, and rules according to your security requirements before running them in production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigExporter;