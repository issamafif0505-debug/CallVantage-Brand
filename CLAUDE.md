# CALL'VANTAGE — Project Documentation

## Overview
**CALL'VANTAGE** is a B2B energy call center brand based in Marrakech, Morocco, specializing in qualified appointment generation for energy brokers and suppliers targeting the French market.

## Key Differentiator
Contract expiry date verification — if the appointment isn't qualified, it's not billed.

## Project Structure
```
CallVantage+/
├── brand/              # Brand identity (logo SVGs, brand guide)
│   └── assets/         # Logo files (primary, icon, white, dark, favicon)
├── website/            # Next.js static site (output: 'export')
├── prospection/        # Commercial prospecting kit
├── scripts-appel/      # Agent call scripts (interactive HTML)
├── social-media/       # LinkedIn, Facebook, Instagram content
│   ├── linkedin/
│   ├── facebook/
│   └── instagram/
├── templates/          # Reusable templates (email sig, business card)
├── juridique/          # Legal documents (CGV, contracts)
├── hub/                # HuggingFace Space hub page
└── upload-hf.py        # HF deployment script
```

## Brand Tokens
```css
--navy:          #0A1628
--navy-light:    #162340
--navy-mid:      #1E3A5F
--electric:      #00A8E8
--electric-light:#4DC9F6
--electric-dark: #0077B6
--gold:          #C9A84C
--gold-light:    #E8D48B
--white:         #F8F9FA
--grey-light:    #CED4DA
--success:       #2ECC71
--warning:       #F39C12
--danger:        #E74C3C
```

## Fonts (Google Fonts)
- **Headings**: Playfair Display (400, 600, 700)
- **Body**: Inter (300, 400, 500, 600)
- **Data/Numbers**: DM Mono (400)

## Tech Stack
- **Website**: Next.js (static export) + Tailwind CSS
- **Standalone modules**: Vanilla HTML (monolithic, inline CSS)
- **Deployment**: GitHub + HuggingFace Spaces + Hostinger VPS
- **Contact form**: n8n webhook
- **Fonts**: Google Fonts CDN

## Business Info
- **Address**: Gueliz - Av Yacoub el Mansour - Immeuble Amitaf B, Bureau 6, Marrakech, 40000
- **WhatsApp**: +212 664860353
- **GitHub**: issamafif0505-debug/CallVantage-Brand
- **HF Space**: issam0505/CallVantage-Hub

## Commands
```bash
# Website
cd website && npm run dev     # Dev server
cd website && npm run build   # Static export → out/

# HF Deploy
python upload-hf.py           # Requires HF_TOKEN
```

## Design Directive
The design must NEVER look AI-generated. Every visual must feel handcrafted, unique, worthy of a premium branding agency. No generic patterns, no template layouts. Every design choice must be intentional and surprising.
