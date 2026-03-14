# CALL'VANTAGE VPS — Guide d'installation

## Prérequis
- VPS Ubuntu 22.04 (76.13.38.126)
- Accès SSH root
- Domaine pointant vers l'IP du VPS

## Étape 1 — Fixer le mot de passe SSH

Le mot de passe SSH root n'est pas le même que le panel Hostinger.

1. Connecte-toi sur **https://hpanel.hostinger.com**
2. Va dans **VPS** → ton serveur → **SSH Access**
3. Clique sur **"Change Root Password"** ou **"Enable Password Authentication"**
4. Note le nouveau mot de passe SSH root

## Étape 2 — Connexion SSH

```bash
ssh root@76.13.38.126
# Entrer le nouveau mot de passe
```

## Étape 3 — Installation Docker

```bash
# Mise à jour système
apt update && apt upgrade -y

# Installation Docker
curl -fsSL https://get.docker.com | sh

# Installation Docker Compose
apt install docker-compose-plugin -y

# Vérification
docker --version
docker compose version
```

## Étape 4 — Déploiement CALL'VANTAGE Stack

```bash
# Créer le dossier
mkdir -p /opt/callvantage && cd /opt/callvantage

# Copier les fichiers (depuis ton PC Windows via scp ou git clone)
git clone https://github.com/issamafif0505-debug/CallVantage-Brand.git .
cd vps/

# Configurer les variables d'environnement
cp .env.example .env
nano .env   # Changer tous les mots de passe !

# Créer les dossiers nginx
mkdir -p nginx/conf.d nginx/ssl

# Démarrer les services
docker compose up -d

# Vérifier
docker compose ps
```

## Étape 5 — SSL Let's Encrypt

```bash
# Remplace callvantage.fr par ton vrai domaine
docker compose run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  -d n8n.callvantage.fr \
  -d blog.callvantage.fr \
  --email ton@email.com \
  --agree-tos --no-eff-email
```

## Étape 6 — Accès aux services

| Service | URL | Identifiants |
|---------|-----|--------------|
| N8N | https://n8n.callvantage.fr | admin / (voir .env) |
| WordPress | https://blog.callvantage.fr | Setup à la première visite |

## Étape 7 — Webhook N8N pour le formulaire de contact

Une fois N8N accessible :
1. Crée un nouveau workflow dans N8N
2. Ajoute un node **Webhook** (méthode POST)
3. Active le webhook → copie l'URL (ex: `https://n8n.callvantage.fr/webhook/contact-form`)
4. Mets à jour `website/app/contact/page.tsx` avec cette URL
5. Rebuild + redeploy le site sur HF

## URLs actuelles (avant domaine)

- **Site** : https://issam0505-callvantage-site.hf.space
- **Hub** : https://issam0505-callvantage-hub.hf.space
