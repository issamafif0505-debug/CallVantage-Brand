"""
CALL'VANTAGE — Deploy website (Next.js static export) to HuggingFace Spaces
Space: issam0505/CallVantage-Site
"""
from huggingface_hub import HfApi
import os

HF_TOKEN = os.environ.get("HF_TOKEN", "")  # Export HF_TOKEN avant de lancer
REPO_ID  = "issam0505/CallVantage-Site"

api = HfApi(token=HF_TOKEN)

# Create Space if needed
try:
    api.repo_info(repo_id=REPO_ID, repo_type="space")
    print(f"Space {REPO_ID} existe deja.")
except Exception:
    print(f"Creation du Space {REPO_ID}...")
    api.create_repo(
        repo_id=REPO_ID,
        repo_type="space",
        space_sdk="static",
        private=False,
    )
    print("Space cree !")

# Upload entire out/ folder
print("Upload du site statique (website/out/)...")
api.upload_folder(
    folder_path="website/out",
    repo_id=REPO_ID,
    repo_type="space",
    commit_message="Deploy CALL'VANTAGE Site v1.0 — Next.js static export",
)

print("\nSite deploye avec succes !")
print(f"URL : https://issam0505-callvantage-site.hf.space")
