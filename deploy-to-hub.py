"""
CALL'VANTAGE — Deploy website to CallVantage-Hub (main space)
Le site Next.js remplace l'index du hub.
L'ancienne page hub est accessible dans /hub/
"""
from huggingface_hub import HfApi
import os

HF_TOKEN = os.environ.get("HF_TOKEN", "")
REPO_ID  = "issam0505/CallVantage-Hub"

api = HfApi(token=HF_TOKEN)

print(f"Deploiement vers {REPO_ID}...")

# 1. Upload all website out/ files to root (replaces hub index)
print("Upload du site web (out/) vers la racine...")
api.upload_folder(
    folder_path="website/out",
    repo_id=REPO_ID,
    repo_type="space",
    commit_message="Deploy CALL'VANTAGE website to main space (logo fix + space merge)",
)

# 2. Upload old hub to /hub/ subfolder
print("Upload du hub central vers /hub/...")
api.upload_file(
    path_or_fileobj="hub/index.html",
    path_in_repo="hub/index.html",
    repo_id=REPO_ID,
    repo_type="space",
    commit_message="Move hub to /hub/index.html",
)

print("\nDeploi complet !")
print(f"Site principal : https://issam0505-callvantage-hub.hf.space")
print(f"Hub des assets : https://issam0505-callvantage-hub.hf.space/hub/")
