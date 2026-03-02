#!/usr/bin/env bash
set -euo pipefail

# ---- EDITA ESTO si hace falta ----
GITHUB_USER="lolamentoquepaso6-del"   # <- tu usuario
REPO="cc08b604de05250df0e12906818281ec"  # <- nombre del repo que creaste
BRANCH="main"
ROOT_DIR="${PWD}/cointv_static_repo"   # carpeta local que se creará
# ----------------------------------

mkdir -p "$ROOT_DIR"
cd "$ROOT_DIR"

# 1) manifest.json
cat > manifest.json <<'EOF'
{
  "id": "org.lolamento.cointv.static",
  "version": "1.0.0",
  "name": "Cointv Static ARG",
  "description": "Canales deportivos ARG que abren externalUrl.",
  "contactEmail": "tu@email",
  "icon": "https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg",
  "resources": ["meta", "stream"],
  "types": ["channel"],
  "catalogs": [],
  "behaviorHints": { "noSubtitles": true }
}
EOF

mkdir -p meta/channel stream/channel

declare -A CHANNELS
CHANNELS["cointv:espn_arg"]="ESPN ARG|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg|https://cointv.site/cvattde.html?get=RVNQTjJIRA"
CHANNELS["cointv:espn2_arg"]="ESPN 2 ARG|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg|https://cointv.site/cvattde.html?get=RVNQTjJfQXJn"
CHANNELS["cointv:espn3_arg"]="ESPN 3 ARG|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg|https://cointv.site/cvattde.html?get=RVNQTjM"
CHANNELS["cointv:espn4_arg"]="ESPN 4 ARG|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg|https://cointv.site/cvattde.html?get=RVNQTkhE"
CHANNELS["cointv:espn5_arg"]="ESPN 5 ARG|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg|https://cointv.site/cvattde.html?get=RVNQTjQ="
CHANNELS["cointv:espn6_arg"]="ESPN 6 ARG|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg|https://cointv.site/cvattde.html?get=Rm94U3BvcnRzM19VWQ=="
CHANNELS["cointv:espn7_arg"]="ESPN 7 ARG|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_wordmark.svg|https://cointv.site/cvattde.html?get=Rm94U3BvcnRzMl9VWQ=="
CHANNELS["cointv:espn_deportes"]="ESPN Deportes|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_Deportes.svg|https://cointv.site/canales/espn-deportes/"
CHANNELS["cointv:espn_premium"]="ESPN Premium|https://commons.wikimedia.org/wiki/Special:FilePath/ESPN_Premium_logo.svg|https://cointv.site/cvattde.html?get=Rm94X1Nwb3J0c19QcmVtaXVuX0hE"
CHANNELS["cointv:tnt_sport_premium"]="TNT Sport Premium|https://commons.wikimedia.org/wiki/Special:FilePath/TNT_Sports_Logo.svg|https://cointv.site/cvattde.html?get=VE5UX1Nwb3J0c19IRA"
CHANNELS["cointv:tyc_sport"]="TyC Sport|https://commons.wikimedia.org/wiki/Special:FilePath/TyC_Sports_logo.svg|https://cointv.site/cvattde.html?get=VHlDU3BvcnQ"
CHANNELS["cointv:foxsport_arg"]="Fox Sport ARG|https://commons.wikimedia.org/wiki/Special:FilePath/FOX_Sports_2022.svg|https://cointv.site/cvattde.html?get=Rm94U3BvcnRz"
CHANNELS["cointv:foxsport2_arg"]="Fox Sport 2 ARG|https://commons.wikimedia.org/wiki/Special:FilePath/FOX_Sports_2022.svg|https://cointv.site/cvattde.html?get=Rm94U3BvcnRzMkhE"
CHANNELS["cointv:foxsport3_arg"]="Fox Sport 3 ARG|https://commons.wikimedia.org/wiki/Special:FilePath/FOX_Sports_2022.svg|https://cointv.site/cvattde.html?get=Rm94U3BvcnRzM0hE"
CHANNELS["cointv:dsport"]="Ds Sport|https://commons.wikimedia.org/wiki/Special:FilePath/DSports_logo_2022.svg|https://cointv.site/canales.php?id=directv"
CHANNELS["cointv:dsport2"]="Ds Sport 2|https://commons.wikimedia.org/wiki/Special:FilePath/DSports_logo_2022.svg|https://cointv.site/canales.php?id=directv2"
CHANNELS["cointv:dsport_plus"]="Ds Sport Plus|https://commons.wikimedia.org/wiki/Special:FilePath/DSports_logo_2022.svg|https://cointv.site/canales.php?id=directvplus"

for id in "${!CHANNELS[@]}"; do
  IFS='|' read -r name logo url <<< "${CHANNELS[$id]}"
  fname=$(python3 - <<PY
import urllib.parse,sys
print(urllib.parse.quote(sys.argv[1], safe=''))
PY
"$id")
  cat > "meta/channel/${fname}.json" <<EOF
{
  "meta": {
    "id": "${id}",
    "type": "channel",
    "name": "${name}",
    "poster": "${logo}",
    "logo": "${logo}"
  }
}
EOF
  cat > "stream/channel/${fname}.json" <<EOF
{
  "streams": [
    {
      "title": "${name}",
      "externalUrl": "${url}"
    }
  ]
}
EOF
done

echo "Generado en: $ROOT_DIR"
echo "Siguiente: git init, agregar remote y push al repo en GitHub (instrucciones abajo)"
