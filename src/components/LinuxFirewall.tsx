import React from 'react';
import { Terminal, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface LinuxFirewallProps {
  activeSection: string;
}

const LinuxFirewall: React.FC<LinuxFirewallProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-400" />
                UFW (Uncomplicated Firewall) Overview
              </h2>
              <p className="text-gray-300 mb-4">
                UFW is a user-friendly frontend for iptables, designed to make firewall 
                configuration simple and accessible for Ubuntu and other Debian-based systems.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-green-400 mb-2">Default Policy</h3>
                  <p className="text-sm text-gray-300">Deny incoming, allow outgoing</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-400 mb-2">Rule Syntax</h3>
                  <p className="text-sm text-gray-300">Simple, human-readable commands</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Simple command-line interface
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  IPv4 and IPv6 support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Application profiles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Rate limiting capabilities
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Logging and monitoring
                </li>
              </ul>
            </div>
          </div>
        );

      case 'setup':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Installation & Initial Setup</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Install UFW (if not installed)</h3>
                  <CodeBlock
                    language="bash"
                    code={`# Ubuntu/Debian
sudo apt update
sudo apt install ufw

# CentOS/RHEL (EPEL repository needed)
sudo yum install epel-release
sudo yum install ufw

# Fedora
sudo dnf install ufw`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. Check UFW Status</h3>
                  <CodeBlock
                    language="bash"
                    code={`# Check if UFW is active
sudo ufw status

# Verbose status with numbered rules
sudo ufw status numbered

# Show raw iptables rules
sudo ufw show raw`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. Set Default Policies</h3>
                  <CodeBlock
                    language="bash"
                    code={`# Set default policies (recommended)
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Alternative: more restrictive outgoing policy
sudo ufw default deny incoming
sudo ufw default deny outgoing`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">4. Enable UFW</h3>
                  <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium text-yellow-400">Important</span>
                    </div>
                    <p className="text-sm text-yellow-300">
                      Make sure you have SSH access rules in place before enabling UFW to avoid being locked out!
                    </p>
                  </div>
                  <CodeBlock
                    language="bash"
                    code={`# Allow SSH first (if connecting remotely)
sudo ufw allow ssh

# Enable UFW
sudo ufw enable

# Disable UFW if needed
sudo ufw disable`}
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
              <h2 className="text-xl font-semibold mb-4">Creating and Managing Rules</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-green-400">Allow Rules</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Allow by port number</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Allow specific port
sudo ufw allow 22          # SSH
sudo ufw allow 80          # HTTP
sudo ufw allow 443         # HTTPS

# Allow port range
sudo ufw allow 1000:2000/tcp

# Allow specific protocol
sudo ufw allow 53/udp      # DNS`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Allow by service name</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Common services
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow ftp

# Check available application profiles
sudo ufw app list`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Allow from specific IP/subnet</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Allow from specific IP
sudo ufw allow from 192.168.1.100

# Allow from subnet
sudo ufw allow from 192.168.1.0/24

# Allow from IP to specific port
sudo ufw allow from 192.168.1.100 to any port 22

# Allow from subnet to specific service
sudo ufw allow from 192.168.1.0/24 to any port ssh`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Allow outgoing connections</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Allow outgoing to specific port
sudo ufw allow out 25      # SMTP
sudo ufw allow out 53      # DNS

# Allow outgoing to specific destination
sudo ufw allow out to 8.8.8.8 port 53`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-red-400">Deny Rules</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Block specific ports or services</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Deny specific port
sudo ufw deny 23           # Telnet
sudo ufw deny 21           # FTP

# Deny from specific IP
sudo ufw deny from 192.168.1.50

# Deny to specific port from IP
sudo ufw deny from 10.0.0.0/8 to any port 22`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Reject vs Deny</h4>
                      <CodeBlock
                        language="bash"
                        code={`# DENY: Drop packets silently
sudo ufw deny 135

# REJECT: Send rejection response
sudo ufw reject 135

# REJECT with specific response
sudo ufw reject out smtp`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Advanced Rules</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Interface-specific rules</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Allow on specific interface
sudo ufw allow in on eth0 to any port 22

# Allow between interfaces
sudo ufw allow in on eth1 out on eth0`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Rate limiting (DDoS protection)</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Rate limit SSH connections
sudo ufw limit ssh

# Rate limit specific port
sudo ufw limit 22/tcp

# Custom rate limiting
sudo ufw limit in on eth0 to any port 80 proto tcp`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Rule Management</h3>
                  <CodeBlock
                    language="bash"
                    code={`# List rules with numbers
sudo ufw status numbered

# Delete rule by number
sudo ufw delete 1

# Delete rule by specification
sudo ufw delete allow ssh
sudo ufw delete allow 80

# Insert rule at specific position
sudo ufw insert 1 allow from 192.168.1.100

# Reset all rules
sudo ufw --force reset`}
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
                  <h3 className="text-lg font-medium mb-3">Basic Connectivity Tests</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Port scanning and testing</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Test if port is open locally
sudo netstat -tulpn | grep :22

# Test connection to remote port
telnet google.com 80

# Use nc (netcat) for testing
nc -zv google.com 80        # Test TCP
nc -uzv google.com 53       # Test UDP

# Scan multiple ports
nmap -p 22,80,443 targethost`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Test from different locations</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Test SSH from allowed IP
ssh user@target-server

# Test HTTP service
curl http://target-server

# Test with specific source IP (if multiple interfaces)
curl --interface eth1 http://target-server

# Use wget for testing
wget --timeout=5 http://target-server`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Monitoring and Logging</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Enable UFW logging</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Enable logging (levels: off, low, medium, high, full)
sudo ufw logging on
sudo ufw logging medium

# Check log location
ls /var/log/ufw*

# View UFW logs
sudo tail -f /var/log/ufw.log

# View system logs for firewall activity
sudo journalctl -f -u ufw`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Analyze logs</h4>
                      <CodeBlock
                        language="bash"
                        code={`# Search for blocked connections
sudo grep 'BLOCK' /var/log/ufw.log

# Search for specific IP
sudo grep '192.168.1.100' /var/log/ufw.log

# Count blocked attempts by IP
sudo awk '/BLOCK/ {print $12}' /var/log/ufw.log | sort | uniq -c | sort -nr

# Real-time monitoring
sudo tail -f /var/log/ufw.log | grep --color=always 'BLOCK\\|ALLOW'`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Network Diagnostics</h3>
                  <CodeBlock
                    language="bash"
                    code={`# Check active connections
ss -tuln                    # Modern replacement for netstat
netstat -tuln              # Traditional tool

# Check listening services
ss -tlp                    # TCP listening with processes
ss -ulp                    # UDP listening with processes

# Monitor network traffic
sudo tcpdump -i eth0 port 22

# Check routing table
ip route show

# Test DNS resolution
dig google.com
nslookup google.com`}
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
                  <h3 className="text-lg font-medium mb-3">Web Server Setup</h3>
                  <CodeBlock
                    language="bash"
                    code={`#!/bin/bash
# Web server firewall configuration

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (adjust port if changed)
sudo ufw allow ssh

# Allow web traffic
sudo ufw allow http
sudo ufw allow https

# Allow FTP if needed (consider SFTP instead)
sudo ufw allow ftp

# Rate limit SSH to prevent brute force
sudo ufw limit ssh

# Enable firewall
sudo ufw enable

echo "Web server firewall configured!"`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Database Server Setup</h3>
                  <CodeBlock
                    language="bash"
                    code={`#!/bin/bash
# Database server firewall configuration

# Set restrictive defaults
sudo ufw default deny incoming
sudo ufw default deny outgoing

# Allow essential outgoing connections
sudo ufw allow out 53        # DNS
sudo ufw allow out 80        # HTTP for updates
sudo ufw allow out 443       # HTTPS for updates
sudo ufw allow out 123       # NTP for time sync

# Allow SSH from management network only
sudo ufw allow from 192.168.10.0/24 to any port ssh

# MySQL - allow from application servers only
sudo ufw allow from 192.168.20.0/24 to any port 3306

# PostgreSQL - allow from specific subnet
sudo ufw allow from 192.168.20.0/24 to any port 5432

# Enable firewall
sudo ufw enable

echo "Database server firewall configured!"`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">DMZ Server Configuration</h3>
                  <CodeBlock
                    language="bash"
                    code={`#!/bin/bash
# DMZ server - more restrictive configuration

# Deny everything by default
sudo ufw default deny incoming
sudo ufw default deny outgoing

# Allow SSH from internal management network only
sudo ufw allow from 10.0.1.0/24 to any port ssh

# Allow web traffic from anywhere
sudo ufw allow in 80
sudo ufw allow in 443

# Allow specific outgoing connections
sudo ufw allow out 53        # DNS
sudo ufw allow out 80        # HTTP
sudo ufw allow out 443       # HTTPS
sudo ufw allow out 123       # NTP

# Allow connection to internal database
sudo ufw allow out to 10.0.2.100 port 3306

# Rate limiting for web services
sudo ufw limit 80/tcp
sudo ufw limit 443/tcp

# Enable logging for monitoring
sudo ufw logging medium

# Enable firewall
sudo ufw enable

echo "DMZ server firewall configured with strict rules!"`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Development Server Setup</h3>
                  <CodeBlock
                    language="bash"
                    code={`#!/bin/bash
# Development server - balanced security and accessibility

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH
sudo ufw allow ssh

# Allow common development ports
sudo ufw allow 3000          # React dev server
sudo ufw allow 3001          # Alternative dev port
sudo ufw allow 4200          # Angular dev server
sudo ufw allow 8000          # Django dev server
sudo ufw allow 8080          # Alternative HTTP
sudo ufw allow 9000          # Various dev tools

# Allow database connections (development)
sudo ufw allow 3306          # MySQL
sudo ufw allow 5432          # PostgreSQL
sudo ufw allow 27017         # MongoDB
sudo ufw allow 6379          # Redis

# Allow Docker if used
sudo ufw allow 2375          # Docker daemon
sudo ufw allow 2376          # Docker daemon (TLS)

# Enable firewall
sudo ufw enable

echo "Development server firewall configured!"`}
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

export default LinuxFirewall;