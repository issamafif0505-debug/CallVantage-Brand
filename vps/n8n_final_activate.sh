#!/bin/bash

N8N="http://localhost:5678"
WF_ID="vKBonWUjuu12XqPC"

# Login
curl -s -c /tmp/n8n_cookie.txt -X POST "$N8N/rest/login" \
  -H "Content-Type: application/json" \
  -d '{"emailOrLdapLoginId":"issamafif0505@gmail.com","password":"CallVantage2026!"}' > /tmp/login.json

# Get workflow and extract versionId
curl -s -b /tmp/n8n_cookie.txt "$N8N/rest/workflows/$WF_ID" > /tmp/wf.json

VERSION_ID=$(python3 -c "
import json
with open('/tmp/wf.json') as f:
    d = json.load(f)
wf = d.get('data', d)
print(wf.get('versionId', ''))
")
echo "versionId: $VERSION_ID"

# Activate with versionId
echo "Activating workflow..."
curl -s -b /tmp/n8n_cookie.txt -X POST "$N8N/rest/workflows/$WF_ID/activate" \
  -H "Content-Type: application/json" \
  -d "{\"versionId\":\"$VERSION_ID\"}" > /tmp/activate_resp.json

python3 -c "
import json
with open('/tmp/activate_resp.json') as f:
    d = json.load(f)
wf = d.get('data', d)
print('Result - active:', wf.get('active'), '| id:', wf.get('id','?'))
"

sleep 2

# Test production webhook
echo ""
echo "=== Testing production webhook ==="
RESP=$(curl -s -X POST "http://localhost:5678/webhook/callvantage-contact" \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test Issam","email":"issamafif0505@gmail.com","telephone":"+212664860353","societe":"CALLVANTAGE","message":"Webhook production OK!"}')
echo "Response: $RESP"

if echo "$RESP" | grep -q "ok"; then
  echo ""
  echo "SUCCESS! Webhook CALLVANTAGE operationnel!"
  echo "URL: http://76.13.38.126:5678/webhook/callvantage-contact"
else
  echo "WARNING: Webhook not responding as expected"
fi
