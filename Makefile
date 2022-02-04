ifeq (,$(wildcard yplatform/Makefile))
INSTALL_SUPPORT_FIRECLOUD := $(shell git submodule update --init --recursive yplatform)
ifneq (,$(filter undefine,$(.FEATURES)))
undefine INSTALL_SUPPORT_FIRECLOUD
endif
endif

include yplatform/build.mk/generic.common.mk
include yplatform/build.mk/sh.check.shellcheck.mk
include yplatform/build.mk/node.common.mk
include yplatform/build.mk/js.check.eslint.mk
include yplatform/build.mk/core.misc.release.npg.mk

# ------------------------------------------------------------------------------

JS_CONFIG_FILES := $(shell $(FIND_Q) configs -type f -name "*.js" -print)
JS_CONFIG_FILES := $(filter-out configs/index.js,$(JS_CONFIG_FILES))
JS_RULE_FILES := $(shell $(FIND_Q) rules -type f -name "*.js" -print)
JS_RULE_FILES := $(filter-out rules/index.js,$(JS_RULE_FILES))
JS_RULE_TEST_FILES := $(shell $(FIND_Q) test -type f -name "*.test.js" -print)

PLUGINS += \
	async-await \
	babel \
	basic \
	eslint-comments \
	fp \
	import \
	jasmine \
	jest \
	jsdoc \
	lodash \
	mocha \
	no-null \
	proper-arrows \
	protractor \
	typescript \
	vue \

TARGETS_CHECK_NO_NEW_RULES = $(patsubst %,check-no-new-rules/%,$(PLUGINS))
TARGETS_CHECK_NO_OUTDATED_RULES = $(patsubst %,check-no-outdated-rules/%,$(PLUGINS))

YP_VENDOR_FILES_IGNORE += \
	-e "^\.github/workflows/main\.yml$$" \
	-e "^configs/index\.js$$" \
	-e "^package\.json$$" \
	-e "^rules/index\.js$$" \

YP_ECLINT_FILES_IGNORE += \
	-e "^rules/.*\.original\.js$$" \
	-e "^rules/array-bracket-newline\.js$$" \
	-e "^rules/array-element-newline\.js$$" \
	-e "^rules/import-specifier-newline\.js$$" \
	-e "^rules/no-for\.js$$" \
	-e "^rules/object-curly-newline\.js$$" \
	-e "^rules/object-property-newline\.js$$" \
	-e "^rules/order-imports\.js$$" \
	-e "^test/.*\.original\.js$$" \
	-e "^test/array-bracket-newline\.test\.js$$" \
	-e "^test/array-element-newline\.test\.js$$" \
	-e "^test/object-curly-newline\.test\.js$$" \
	-e "^test/object-property-newline\.test\.js$$" \
	-e "^test/order-imports\.test\.js$$" \

YP_DEPS_TARGETS += \
	.github/workflows/main.yml \
	configs/index.js \
	package.json \
	rules/index.js \

YP_CHECK_TPL_FILES += \
	.github/workflows/main.yml \
	configs/index.js \
	package.json \
	rules/index.js \

YP_CHECK_TARGETS += \
	check-no-outdated-rules \
	check-no-new-rules \

YP_TEST_TARGETS += \
	test-rules \

# ------------------------------------------------------------------------------

.github/workflows/main.yml: yplatform/package.json
.github/workflows/main.yml: $(wildcard .github/workflows.src/main*)
.github/workflows/main.yml: .github/workflows/main.yml.tpl
	$(call yp-generate-from-template)


configs/index.js: $(JS_CONFIG_FILES)
configs/index.js: configs/index.js.tpl
	$(call yp-generate-from-template)


package.json: $(JS_CONFIG_FILES) $(JS_RULES_FILES)
package.json: package.json.tpl
	$(call yp-generate-from-template)


rules/index.js: $(JS_RULE_FILES)
rules/index.js: rules/index.js.tpl
	$(call yp-generate-from-template)


.PHONY: check-no-outdated-rules/%
check-no-outdated-rules/%:
	$(COMM) -23 \
		<(${GIT_ROOT}/bin/list-configured-own-rules $*) \
		<(${GIT_ROOT}/bin/list-own-rules $*) | \
		$(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
			$(ECHO_ERR) "The above rules are configured, but are not available in the $* eslint rule set."; \
			exit 1; \
		}


.PHONY: check-no-outdated-rules
check-no-outdated-rules: $(TARGETS_CHECK_NO_OUTDATED_RULES)
	:


.PHONY: check-no-new-rules/%
check-no-new-rules/%:
	$(COMM) -23 \
		<(${GIT_ROOT}/bin/list-own-rules $*) \
		<(${GIT_ROOT}/bin/list-configured-own-rules $*) | \
		$(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
			$(ECHO_ERR) "The above rules are available in the $* eslint rule set, but are not configured."; \
			exit 1; \
		}


.PHONY: check-no-new-rules
check-no-new-rules: $(TARGETS_CHECK_NO_NEW_RULES)
	:


.PHONY: test-rules
test-rules:
	for f in $(JS_RULE_TEST_FILES); do \
		$(ECHO) "Running $${f}..." ; \
		$(NODE) $${f} ; \
	done
