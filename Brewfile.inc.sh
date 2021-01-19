#!/usr/bin/env bash

source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-minimal.inc.sh
source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-node.inc.sh
source ${SUPPORT_FIRECLOUD_DIR}/bootstrap/brew-install-node.nvm.inc.sh

GITHUB_MATRIX_NODE=${GITHUB_MATRIX_NODE:-node}
nvm install ${GITHUB_MATRIX_NODE}
nvm use ${GITHUB_MATRIX_NODE}
