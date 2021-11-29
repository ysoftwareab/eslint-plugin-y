#!/usr/bin/env bash

SUPPORT_FIRECLOUD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/support-firecloud" && pwd)"
[[ -e ${SUPPORT_FIRECLOUD_DIR}/Makefile ]] || \
    git submodule update --init --recursive ${SUPPORT_FIRECLOUD_DIR}
# shellcheck disable=SC1091
source ${SUPPORT_FIRECLOUD_DIR}/sh/common.inc.sh

# function ci_run_<step>() {
# }

# shellcheck disable=SC1091
source "${SUPPORT_FIRECLOUD_DIR}/repo/dot.ci.sh.sf"
