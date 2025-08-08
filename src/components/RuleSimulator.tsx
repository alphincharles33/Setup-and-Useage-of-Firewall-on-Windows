import React, { useState } from 'react';
import { Play, Plus, Trash2, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface FirewallRule {
  id: number;
  action: 'allow' | 'deny' | 'reject';
  direction: 'inbound' | 'outbound';
  protocol: 'tcp' | 'udp' | 'any';
  port: string;
  sourceIP: string;
  destinationIP: string;
  description: string;
}

interface TestPacket {
  sourceIP: string;
  destinationIP: string;
  port: string;
  protocol: 'tcp' | 'udp';
  direction: 'inbound' | 'outbound';
}

const RuleSimulator: React.FC = () => {
  const [rules, setRules] = useState<FirewallRule[]>([
    {
      id: 1,
      action: 'allow',
      direction: 'inbound',
      protocol: 'tcp',
      port: '22',
      sourceIP: 'any',
      destinationIP: 'any',
      description: 'Allow SSH'
    },
    {
      id: 2,
      action: 'allow',
      direction: 'inbound',
      protocol: 'tcp',
      port: '80',
      sourceIP: 'any',
      destinationIP: 'any',
      description: 'Allow HTTP'
    },
    {
      id: 3,
      action: 'deny',
      direction: 'inbound',
      protocol: 'any',
      port: 'any',
      sourceIP: 'any',
      destinationIP: 'any',
      description: 'Default deny all'
    }
  ]);

  const [newRule, setNewRule] = useState<Partial<FirewallRule>>({
    action: 'allow',
    direction: 'inbound',
    protocol: 'tcp',
    port: '',
    sourceIP: 'any',
    destinationIP: 'any',
    description: ''
  });

  const [testPacket, setTestPacket] = useState<TestPacket>({
    sourceIP: '192.168.1.100',
    destinationIP: '192.168.1.1',
    port: '80',
    protocol: 'tcp',
    direction: 'inbound'
  });

  const [testResult, setTestResult] = useState<{
    allowed: boolean;
    matchedRule: FirewallRule | null;
    message: string;
  } | null>(null);

  const addRule = () => {
    if (newRule.port && newRule.description) {
      const rule: FirewallRule = {
        id: Date.now(),
        action: newRule.action || 'allow',
        direction: newRule.direction || 'inbound',
        protocol: newRule.protocol || 'tcp',
        port: newRule.port,
        sourceIP: newRule.sourceIP || 'any',
        destinationIP: newRule.destinationIP || 'any',
        description: newRule.description
      };
      setRules([...rules, rule]);
      setNewRule({
        action: 'allow',
        direction: 'inbound',
        protocol: 'tcp',
        port: '',
        sourceIP: 'any',
        destinationIP: 'any',
        description: ''
      });
    }
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const testPacketAgainstRules = () => {
    for (const rule of rules) {
      // Check direction
      if (rule.direction !== testPacket.direction) continue;

      // Check protocol
      if (rule.protocol !== 'any' && rule.protocol !== testPacket.protocol) continue;

      // Check port
      if (rule.port !== 'any' && rule.port !== testPacket.port) continue;

      // Check source IP (simplified check)
      if (rule.sourceIP !== 'any' && rule.sourceIP !== testPacket.sourceIP) continue;

      // Check destination IP (simplified check)
      if (rule.destinationIP !== 'any' && rule.destinationIP !== testPacket.destinationIP) continue;

      // Rule matched
      const allowed = rule.action === 'allow';
      setTestResult({
        allowed,
        matchedRule: rule,
        message: `Packet ${allowed ? 'ALLOWED' : 'BLOCKED'} by rule: ${rule.description}`
      });
      return;
    }

    // No rule matched - default deny
    setTestResult({
      allowed: false,
      matchedRule: null,
      message: 'Packet BLOCKED - No matching rule found (default deny)'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Firewall Rule Simulator
        </h2>
        <p className="text-gray-300 mb-6">
          Create firewall rules and test how packets would be processed. Rules are evaluated from top to bottom.
        </p>

        {/* Add New Rule */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium mb-3">Add New Rule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Action</label>
              <select
                value={newRule.action}
                onChange={(e) => setNewRule({...newRule, action: e.target.value as 'allow' | 'deny' | 'reject'})}
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white"
              >
                <option value="allow">Allow</option>
                <option value="deny">Deny</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Direction</label>
              <select
                value={newRule.direction}
                onChange={(e) => setNewRule({...newRule, direction: e.target.value as 'inbound' | 'outbound'})}
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white"
              >
                <option value="inbound">Inbound</option>
                <option value="outbound">Outbound</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Protocol</label>
              <select
                value={newRule.protocol}
                onChange={(e) => setNewRule({...newRule, protocol: e.target.value as 'tcp' | 'udp' | 'any'})}
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white"
              >
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
                <option value="any">Any</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Port</label>
              <input
                type="text"
                value={newRule.port}
                onChange={(e) => setNewRule({...newRule, port: e.target.value})}
                placeholder="80, 22, any"
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Source IP</label>
              <input
                type="text"
                value={newRule.sourceIP}
                onChange={(e) => setNewRule({...newRule, sourceIP: e.target.value})}
                placeholder="192.168.1.100, any"
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination IP</label>
              <input
                type="text"
                value={newRule.destinationIP}
                onChange={(e) => setNewRule({...newRule, destinationIP: e.target.value})}
                placeholder="192.168.1.1, any"
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                value={newRule.description}
                onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                placeholder="Rule description"
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
          </div>
          <button
            onClick={addRule}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Rule
          </button>
        </div>

        {/* Rules List */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium mb-3">Current Rules (evaluated top to bottom)</h3>
          <div className="space-y-2">
            {rules.map((rule, index) => (
              <div key={rule.id} className="bg-gray-600 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-gray-400">#{index + 1}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rule.action === 'allow' 
                      ? 'bg-green-600 text-green-100' 
                      : rule.action === 'deny'
                      ? 'bg-red-600 text-red-100'
                      : 'bg-yellow-600 text-yellow-100'
                  }`}>
                    {rule.action.toUpperCase()}
                  </span>
                  <span className="text-sm">
                    {rule.direction} | {rule.protocol.toUpperCase()} | 
                    Port: {rule.port} | 
                    From: {rule.sourceIP} | 
                    To: {rule.destinationIP}
                  </span>
                  <span className="text-sm text-gray-300">- {rule.description}</span>
                </div>
                <button
                  onClick={() => removeRule(rule.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Packet Testing */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3">Test Packet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Source IP</label>
              <input
                type="text"
                value={testPacket.sourceIP}
                onChange={(e) => setTestPacket({...testPacket, sourceIP: e.target.value})}
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination IP</label>
              <input
                type="text"
                value={testPacket.destinationIP}
                onChange={(e) => setTestPacket({...testPacket, destinationIP: e.target.value})}
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Port</label>
              <input
                type="text"
                value={testPacket.port}
                onChange={(e) => setTestPacket({...testPacket, port: e.target.value})}
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Protocol</label>
              <select
                value={testPacket.protocol}
                onChange={(e) => setTestPacket({...testPacket, protocol: e.target.value as 'tcp' | 'udp'})}
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white"
              >
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Direction</label>
              <select
                value={testPacket.direction}
                onChange={(e) => setTestPacket({...testPacket, direction: e.target.value as 'inbound' | 'outbound'})}
                className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white"
              >
                <option value="inbound">Inbound</option>
                <option value="outbound">Outbound</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={testPacketAgainstRules}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors mb-4"
          >
            <Play className="w-4 h-4" />
            Test Packet
          </button>

          {/* Test Result */}
          {testResult && (
            <div className={`rounded-lg p-4 border ${
              testResult.allowed 
                ? 'bg-green-900 border-green-600' 
                : 'bg-red-900 border-red-600'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {testResult.allowed ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className="font-medium">
                  {testResult.allowed ? 'PACKET ALLOWED' : 'PACKET BLOCKED'}
                </span>
              </div>
              <p className="text-sm mb-2">{testResult.message}</p>
              {testResult.matchedRule && (
                <div className="text-xs font-mono bg-black bg-opacity-30 p-2 rounded">
                  Matched Rule: {testResult.matchedRule.description}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuleSimulator;