#!/usr/bin/env bash

# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-minimal.inc.sh
# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-node.inc.sh
# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-node.nvm.inc.sh

[[ "${YP_CI_PLATFORM:-}" != "github" ]] || {
    NODE_VSN=${GITHUB_MATRIX_NODE}
    echo_do "Activating node ${NODE_VSN} via NVM (as per GITHUB_MATRIX_NODE)..."

    # nvm install --reinstall-packages-from skips 'npm'
    SYSTEM_NPM_VSN=$(nvm use system >/dev/null; npm --version)
    exe nvm install ${NODE_VSN} --reinstall-packages-from=current
    exe node --version
    exe npm --version
    (
        cd ${NVM_DIR}/versions/node/$(node --version)/lib
        npm install --global-style npm@${SYSTEM_NPM_VSN}
    )
    unset SYSTEM_NPM_VSN

    exe npm --version

    nvm alias default ${NODE_VSN}
    unset NODE_VSN

    echo_done
}
