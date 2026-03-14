#!/bin/bash
# Update Nginx on VPS to handle callvantage.fr (when domain is bought)
# For now, configures N8N webhook accessible from the internet

NGINX_DIR="/opt/affiliate-stack/nginx/conf.d"

# Create CALLVANTAGE N8N config (accessible via IP for now)
cat > "$NGINX_DIR/callvantage.conf" << 'NGINXEOF'
# ================================================================
# CALL'VANTAGE — N8N Webhook accessible publiquement
# ================================================================

# N8N accessible sur /n8n/ path (jusqu'a l'achat du domaine)
# Une fois le domaine callvantage.fr acheté:
# 1. Décommenter le bloc "server" ci-dessous
# 2. Commenter le "location /n8n/"
# 3. Configurer le SSL Let's Encrypt

# CURRENT: N8N sur port 5678 directement (deja accessible)
# URL webhook: http://76.13.38.126:5678/webhook/callvantage-contact

# FUTURE (avec domaine callvantage.fr):
# server {
#     listen 80;
#     server_name n8n.callvantage.fr;
#
#     location /.well-known/acme-challenge/ {
#         root /var/www/certbot;
#     }
#
#     location / {
#         return 301 https://$host$request_uri;
#     }
# }
#
# server {
#     listen 443 ssl http2;
#     server_name n8n.callvantage.fr;
#
#     ssl_certificate     /etc/letsencrypt/live/n8n.callvantage.fr/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/n8n.callvantage.fr/privkey.pem;
#     ssl_protocols TLSv1.2 TLSv1.3;
#
#     location / {
#         proxy_pass         http://affiliate_n8n:5678;
#         proxy_http_version 1.1;
#         proxy_set_header   Upgrade $http_upgrade;
#         proxy_set_header   Connection "upgrade";
#         proxy_set_header   Host $host;
#         proxy_set_header   X-Real-IP $remote_addr;
#         proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header   X-Forwarded-Proto $scheme;
#         proxy_read_timeout 86400;
#         client_max_body_size 10M;
#     }
# }
NGINXEOF

echo "Config CALLVANTAGE créée dans $NGINX_DIR/callvantage.conf"
echo ""
echo "=== Status N8N ==="
curl -s http://localhost:5678/healthz
echo ""
echo ""
echo "=== Test webhook CALLVANTAGE ==="
curl -s -X POST http://localhost:5678/webhook/callvantage-contact \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test Final","email":"test@callvantage.fr","message":"Infrastructure OK"}'
echo ""
echo ""
echo "=== URLs disponibles ==="
echo "N8N UI:       http://76.13.38.126:5678"
echo "  Login:      issamafif0505@gmail.com / CallVantage2026!"
echo "Portainer:    http://76.13.38.126:9000"
echo "WordPress:    http://76.13.38.126"
echo "Webhook:      http://76.13.38.126:5678/webhook/callvantage-contact"
echo "OpenClaw:     ws://76.13.38.126:18789"
