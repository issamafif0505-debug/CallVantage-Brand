#!/bin/bash
set -e

N8N="http://localhost:5678"
EMAIL="issamafif0505@gmail.com"
PASS="CallVantage2026!"

echo "=== N8N CALLVANTAGE SETUP ==="

# Login
curl -s -c /tmp/n8n_cookie.txt -X POST "$N8N/rest/login" \
  -H "Content-Type: application/json" \
  -d "{\"emailOrLdapLoginId\":\"$EMAIL\",\"password\":\"$PASS\"}" > /tmp/n8n_login.json
echo "Login: $(python3 -c "import json; d=json.load(open('/tmp/n8n_login.json')); print(d.get('data',{}).get('email','FAILED'))")"

# Get workflow ID
curl -s -b /tmp/n8n_cookie.txt "$N8N/rest/workflows" > /tmp/n8n_workflows.json
WF_ID=$(python3 -c "import json; d=json.load(open('/tmp/n8n_workflows.json')); wfs=d.get('data',[]); print(wfs[0]['id'] if wfs else 'NONE')")
echo "Workflow ID: $WF_ID"

if [ "$WF_ID" = "NONE" ]; then
  echo "ERROR: No workflow found!"
  exit 1
fi

# Activate workflow
curl -s -b /tmp/n8n_cookie.txt -X POST "$N8N/rest/workflows/$WF_ID/activate" \
  -H "Content-Type: application/json" \
  -d "{}" > /tmp/n8n_activate.json
ACTIVE=$(python3 -c "import json; d=json.load(open('/tmp/n8n_activate.json')); print(d.get('data',d).get('active','?'))")
echo "Workflow active: $ACTIVE"

# Wait a moment for activation
sleep 2

# Test the live webhook
echo "Testing webhook..."
RESP=$(curl -s -X POST "$N8N/webhook/callvantage-contact" \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test Issam","email":"issamafif0505@gmail.com","telephone":"+212664860353","societe":"CALLVANTAGE","message":"Test webhook OK"}')
echo "Webhook response: $RESP"

echo ""
echo "=== DONE ==="
echo "Webhook URL: http://76.13.38.126:5678/webhook/callvantage-contact"
