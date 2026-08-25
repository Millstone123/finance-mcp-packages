#!/usr/bin/env node
import { createInterface } from 'node:readline';
import { snapshots } from '@millstone123/finance-market-runtime-v32';

const send = value => process.stdout.write(JSON.stringify(value) + '\n');
const input = createInterface({ input: process.stdin, crlfDelay: Infinity });
input.on('line', line => {
  let req;
  try { req = JSON.parse(line); } catch { return send({ jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' } }); }
  if (!Object.hasOwn(req, 'id')) return;
  if (req.method === 'initialize') return send({ jsonrpc: '2.0', id: req.id, result: { protocolVersion: req.params?.protocolVersion || '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'finance-tools', version: '3.2.0' } } });
  if (req.method === 'tools/list') return send({ jsonrpc: '2.0', id: req.id, result: { tools: [{ name: 'get_market_snapshot', description: 'Return a deterministic synthetic market snapshot.', inputSchema: { type: 'object', properties: { symbol: { type: 'string' } }, required: ['symbol'], additionalProperties: false } }] } });
  if (req.method === 'tools/call' && req.params?.name === 'get_market_snapshot') return send({ jsonrpc: '2.0', id: req.id, result: { content: [{ type: 'text', text: JSON.stringify(snapshots[String(req.params.arguments?.symbol || '').toUpperCase()] || null) }] } });
  send({ jsonrpc: '2.0', id: req.id, error: { code: -32601, message: 'Method not found' } });
});
