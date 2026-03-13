"""
CALL'VANTAGE — Upload Hub vers Hugging Face
=============================================
1. Va sur : https://huggingface.co/settings/tokens
2. Cree un token "Write" si tu n'en as pas
3. Colle ton token dans HF_TOKEN ci-dessous
4. Lance : python upload-hf.py
"""

from huggingface_hub import HfApi
import os

# COLLE TON TOKEN ICI (hf_xxxxxxxxxxxx)
HF_TOKEN = os.environ.get("HF_TOKEN", "")

REPO_ID = "issam0505/CallVantage-Hub"
SPACE_TYPE = "static"

if not HF_TOKEN:
    print("Token manquant ! Ouvre ce fichier et colle ton token HF_TOKEN.")
    print("   -> https://huggingface.co/settings/tokens")
    print("   Ou definis la variable d'environnement HF_TOKEN")
    exit(1)

api = HfApi(token=HF_TOKEN)

# Creer le Space s'il n'existe pas
try:
    api.repo_info(repo_id=REPO_ID, repo_type="space")
    print(f"Space {REPO_ID} existe deja.")
except Exception:
    print(f"Creation du Space {REPO_ID}...")
    api.create_repo(
        repo_id=REPO_ID,
        repo_type="space",
        space_sdk="static",
        private=False
    )
    print(f"Space cree !")

# Upload hub/index.html comme page principale
print("Upload du hub central...")
api.upload_file(
    path_or_fileobj="hub/index.html",
    path_in_repo="index.html",
    repo_id=REPO_ID,
    repo_type="space",
    commit_message="Deploy CALL'VANTAGE Hub Central"
)

print("Hub deploye avec succes !")
print(f"URL : https://issam0505-callvantage-hub.hf.space")
