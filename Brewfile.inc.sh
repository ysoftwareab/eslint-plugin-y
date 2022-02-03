#!/usr/bin/env bash

# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-minimal.inc.sh
# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-node.inc.sh
# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-node.nvm.inc.sh

[[ -n "${GITHUB_MATRIX_NODE}" ]] || [[ -f .nvmrc ]] || GITHUB_MATRIX_NODE=node
# nvm install --reinstall-packages-from skips 'npm'
NPM_VSN=$(nvm use system >/dev/null; npm --version)
nvm install ${GITHUB_MATRIX_NODE} --reinstall-packages-from=current
(
    cd ${NVM_DIR}/versions/node/$(node --version)/lib
    npm install --global-style npm@${NPM_VSN}
)
unset NPM_VSN
