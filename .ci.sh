#!/usr/bin/env bash

YP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/yplatform" && pwd)"
[[ -e ${YP_DIR}/Makefile ]] || \
    git submodule update --init --recursive ${YP_DIR}
# shellcheck disable=SC1091
source ${YP_DIR}/sh/common.inc.sh

# function ci_run_<step>() {
# }

# shellcheck disable=SC1091
source "${YP_DIR}/repo/dot.ci.sh.yp"
