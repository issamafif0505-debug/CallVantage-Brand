#!/bin/bash

N8N="http://localhost:5678"
EMAIL="issamafif0505@gmail.com"
PASS="CallVantage2026!"

# Login
curl -s -c /tmp/n8n_cookie.txt -X POST "$N8N/rest/login" \
  -H "Content-Type: application/json" \
  -d "{\"emailOrLdapLoginId\":\"$EMAIL\",\"password\":\"$PASS\"}" > /tmp/login.json
echo "Login: $(python3 -c "import json; d=json.load(open('/tmp/login.json')); print(d.get('data',{}).get('email','FAILED'))")"

# Get workflow ID
curl -s -b /tmp/n8n_cookie.txt "$N8N/rest/workflows" > /tmp/wfs.json
WF_ID=$(python3 -c "import json; d=json.load(open('/tmp/wfs.json')); wfs=d.get('data',[]); print(wfs[0]['id'] if wfs else 'NONE')")
WF_NAME=$(python3 -c "import json; d=json.load(open('/tmp/wfs.json')); wfs=d.get('data',[]); print(wfs[0]['name'] if wfs else 'NONE')")
echo "Workflow: $WF_NAME (ID: $WF_ID)"

# Get full workflow and patch with active=true
curl -s -b /tmp/n8n_cookie.txt "$N8N/rest/workflows/$WF_ID" > /tmp/wf_full.json

# Patch workflow to set active=true
python3 - <<'PYEOF'
import json

with open('/tmp/wf_full.json') as f:
    resp = json.load(f)

wf = resp.get('data', resp)
wf['active'] = True

with open('/tmp/wf_patch.json', 'w') as f:
    json.dump(wf, f)

print(f"Workflow prepared: active={wf.get('active')}, nodes={len(wf.get('nodes',[]))}")
PYEOF

WF_ID=$(python3 -c "import json; d=json.load(open('/tmp/wf_full.json')); print(d.get('data',d).get('id','?'))")

# Use PATCH to update
curl -s -b /tmp/n8n_cookie.txt -X PATCH "$N8N/rest/workflows/$WF_ID" \
  -H "Content-Type: application/json" \
  -d "{\"active\":true}" > /tmp/patch_resp.json

echo "Patch response:"
python3 -c "import json; d=json.load(open('/tmp/patch_resp.json')); dd=d.get('data',d); print(f'active={dd.get(\"active\",\"?\")} id={dd.get(\"id\",\"?\")}')"

# Also try PUT to activate
curl -s -b /tmp/n8n_cookie.txt -X PUT "$N8N/rest/workflows/$WF_ID/activate" \
  -H "Content-Type: application/json" \
  -d "{}" > /tmp/act_resp.json 2>&1
echo "PUT activate: $(cat /tmp/act_resp.json | head -c 200)"

sleep 2

# Test webhook
echo ""
echo "Testing webhook (production)..."
curl -s -X POST "$N8N/webhook/callvantage-contact" \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","email":"test@test.com","message":"OK"}'
echo ""
