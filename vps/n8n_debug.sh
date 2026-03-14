#!/bin/bash

N8N="http://localhost:5678"

# Login
curl -s -c /tmp/n8n_cookie.txt -X POST "$N8N/rest/login" \
  -H "Content-Type: application/json" \
  -d '{"emailOrLdapLoginId":"issamafif0505@gmail.com","password":"CallVantage2026!"}' > /tmp/login.json

WF_ID="vKBonWUjuu12XqPC"

# Show raw POST /activate response
echo "=== POST /activate raw ==="
curl -s -b /tmp/n8n_cookie.txt -X POST "$N8N/rest/workflows/$WF_ID/activate" \
  -H "Content-Type: application/json" -d "{}"
echo ""

# Show full workflow state after activation attempt
echo "=== GET /workflows/$WF_ID ==="
curl -s -b /tmp/n8n_cookie.txt "$N8N/rest/workflows/$WF_ID" | python3 -c "
import json, sys
d = json.load(sys.stdin)
wf = d.get('data', d)
print('active:', wf.get('active'))
print('id:', wf.get('id'))
print('nodes:', len(wf.get('nodes', [])))
"

# Check n8n process environment
echo ""
echo "=== N8N Process check ==="
docker exec affiliate_n8n wget -qO- "http://localhost:5678/rest/workflows/$WF_ID" 2>/dev/null | python3 -c "
import json, sys
d = json.load(sys.stdin)
wf = d.get('data', d)
print('active:', wf.get('active'))
print('webhookId nodes:')
for n in wf.get('nodes', []):
    print(f'  {n[\"name\"]}: type={n[\"type\"]}, params={list(n.get(\"parameters\",{}).keys())}')
"

# Check if WEBHOOK_URL is set correctly for production webhooks
echo ""
echo "=== N8N Webhook env ==="
docker exec affiliate_n8n env | grep -E "WEBHOOK|N8N_HOST|PROTOCOL"
