#!/usr/bin/env bash

YP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/yplatform" && pwd)"
[[ -e ${YP_DIR}/Makefile ]] || \
    git submodule update --init --recursive ${YP_DIR}
# shellcheck disable=SC1091
source ${YP_DIR}/sh/common.inc.sh

## see ci/README.md
# export YP_CI_ECHO_BENCHMARK=${GIT_ROOT}/yp-ci-echo-benchmark

## see bootstrap/README.md
export YP_LOG_BOOTSTRAP=true
# export YP_PRINTENV_BOOTSTRAP=true
export YP_SKIP_SUDO_BOOTSTRAP=true
export YP_SKIP_BREW_BOOTSTRAP=true
# export V=1

## to override an existing phase implementation
# function ci_run_<phase>() {
# }

## to wrap an existing phase implementation
# eval "original_$(declare -f ci_run_<phase>)"
# function ci_run_<phase>() {
#   ...
#   original_ci_run_<phase>
#   ...
# }
#

[[ "$1" = "before_install" ]] || {
    NODE_VSN=${GITHUB_MATRIX_NODE}
    echo_do "Activating node ${NODE_VSN} via NVM (as per GITHUB_MATRIX_NODE)..."
    exe nvm use ${GITHUB_MATRIX_NODE}
    echo_done
    unset NODE_VSN
}

# shellcheck disable=SC1091
source "${YP_DIR}/repo/dot.ci.sh.yp"
