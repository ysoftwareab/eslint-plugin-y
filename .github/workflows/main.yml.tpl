#!/usr/bin/env bash
set -euo pipefail

GIT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
YP_DIR="$(cd "${GIT_ROOT}/yplatform" && pwd)"

SRC_FILE=.github/workflows.src/main.yml

export ENVSUBST_SF_VSN=$(cat ${YP_DIR}/package.json | jq -r ".version")

echo "# WARNING: DO NOT EDIT. AUTO-GENERATED CODE (${SRC_FILE})"
cat ${GIT_ROOT}/${SRC_FILE} | \
  envsubst "$(printenv | grep "^ENVSUBST_" | sed "s/=.*//g" | sed "s/^/\${/g" | sed "s/\$/}/g")" | \
  ${YP_DIR}/bin/yaml-expand
