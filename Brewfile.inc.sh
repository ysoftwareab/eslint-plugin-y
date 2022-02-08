#!/usr/bin/env bash

# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-minimal.inc.sh
# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-node.inc.sh
# shellcheck disable=SC1091
source ${YP_DIR}/bootstrap/brew-install-node.nvm.inc.sh

[[ "${YP_CI_PLATFORM:-}" != "github" ]] || {
    NODE_VSN=${GITHUB_MATRIX_NODE}
    echo_do "Activating node@${NODE_VSN} via NVM (as per GITHUB_MATRIX_NODE)..."
    yp::nvm_install ${NODE_VSN}
    nvm alias default ${NODE_VSN}
    unset NODE_VSN
    echo_done
}
