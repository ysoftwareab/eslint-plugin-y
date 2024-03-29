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
include yplatform/build.mk/js.check.tsc.mk
include yplatform/build.mk/core.misc.release.npg.mk

# ------------------------------------------------------------------------------

RULES_PLUGIN_OVERRIDES_TXT = 22.rules.plugin-overrides.txt
RULES_PLUGIN_CONFIGURED_OUTDATED_TXT = 23.rules.plugin-configured-outdated.txt
RULES_PLUGIN_NOT_CONFIGURED_TXT = 24.rules.plugin-not-configured.txt
CONFIG_EXTENDS_DIFF_TXT = 32.config.extends-diff.txt

JS_CONFIG_FILES := $(shell $(FIND_Q) configs -type f -name "*.js" -print)
JS_CONFIG_FILES := $(filter-out configs/index.js,$(JS_CONFIG_FILES))
JS_RULE_FILES := $(shell $(FIND_Q) rules -type f -name "*.js" -print)
JS_RULE_FILES := $(filter-out rules/index.js,$(JS_RULE_FILES))
JS_RULE_TEST_FILES := $(shell $(FIND_Q) test -type f -name "*.test.js" -print)

CONFIGS := $(wildcard configs/*)
CONFIGS := $(filter-out configs/%.extends.js,$(CONFIGS))
CONFIGS := $(filter-out configs/index.js,$(CONFIGS))
CONFIGS := $(filter-out configs/index.js.tpl,$(CONFIGS))
CONFIGS := $(filter-out configs/typescript-recommended-restore-eslint.js,$(CONFIGS))
CONFIGS := $(filter-out configs/util.js,$(CONFIGS))
CONFIGS := $(patsubst configs/%.js,%,$(CONFIGS))

TARGETS_ESLINTRC = $(patsubst %,eslintrc/%,$(CONFIGS))
TARGETS_SNAPSHOTS = $(patsubst %,snapshots/%,$(CONFIGS))
TARGETS_CHECK_NOT_CONFIGURED_RULES = $(patsubst %,check-not-configured-rules/%,$(CONFIGS))
TARGETS_CHECK_OUTDATED_RULES = $(patsubst %,check-outdated-rules/%,$(CONFIGS))
TARGETS_CHECK_CONFIGURED_OVERRIDES_RULES = $(patsubst %,check-configured-overrides-rules/%,$(CONFIGS))
TARGETS_CHECK_Y_CONFIG = $(patsubst %,check-y-config/%,$(CONFIGS))

CONFIGS_EXTERNAL := $(wildcard eslintrc.external/*.eslintrc.js)
CONFIGS_EXTERNAL := $(patsubst eslintrc.external/%.eslintrc.js,%,$(CONFIGS_EXTERNAL))
TARGETS_SNAPSHOTS_EXTERNAL := $(patsubst %,snapshots/external/%,$(CONFIGS_EXTERNAL))
TARGETS_SNAPSHOTS += $(TARGETS_SNAPSHOTS_EXTERNAL)

YP_VENDOR_FILES_IGNORE += \
	-e "^\.github/workflows/main\.yml$$" \
	-e "^configs/index\.js$$" \
	-e "^eslintrc/" \
	-e "^package\.json$$" \
	-e "^rules/index\.js$$" \
	-e "^snapshots/" \
	-e "^snapshots\.external/" \

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
	rules/index.js \
	eslintrc \
	snapshots \
	snapshots/external \

YP_CHECK_TPL_FILES += \
	.github/workflows/main.yml \
	configs/index.js \
	rules/index.js \

YP_CHECK_TARGETS += \
	check-outdated-rules \
	check-not-configured-rules \
	check-configured-overrides-rules \
	check-y-config \
	list-outdated \
	list-not-configured \

YP_TEST_TARGETS += \
	test-rules \

# ------------------------------------------------------------------------------

.PHONY: deps-npm-peer
deps-npm-peer:
# we only support npm@6+, so no reason to check for older npm versions)
ifeq (6,$(shell $(NPM) --version | $(CUT) -d. -f1))
	$(NPX) install-peerdeps --dev eslint-config-airbnb
	$(NPX) install-peerdeps --dev eslint-config-airbnb-base
	$(NPX) install-peerdeps --dev eslint-config-airbnb-typescript
	$(NPX) install-peerdeps --dev eslint-config-canonical
	$(NPX) install-peerdeps --dev eslint-config-standard@^17.0.0-1
	$(NPX) install-peerdeps --dev eslint-plugin-flowtype
	$(NPX) install-peerdeps --dev @graphql-eslint/eslint-plugin
else
	$(ECHO_INFO) "$(NPM) version $(shell $(NPM) --version) should be automatically install peer dependencies."
	$(ECHO_SKIP) "$(NPX) install-peerdeps"
endif


.github/workflows/main.yml: yplatform/package.json
.github/workflows/main.yml: $(wildcard .github/workflows.src/main*)
.github/workflows/main.yml: .github/workflows/main.yml.tpl
	$(call yp-generate-from-template)


configs/index.js: $(JS_CONFIG_FILES)
configs/index.js: configs/index.js.tpl
	$(call yp-generate-from-template)


rules/index.js: $(JS_RULE_FILES)
rules/index.js: rules/index.js.tpl
	$(call yp-generate-from-template)


.PHONY: eslintrc/%
eslintrc/%: noop
	$(MKDIR) $$(dirname $@)
	$(ECHO) "module.exports = {root: true, extends: ['plugin:y/$*']};" > $@.eslintrc.js


.PHONY: eslintrc
eslintrc: $(TARGETS_ESLINTRC)
	:


.PHONY: snapshots/%
snapshots/%: noop ## Generate snapshots for a specific config.
	$(ECHO_DO) "Snapshot $* config..."
	$(MKDIR) snapshots/$*
	$(GIT_ROOT)/bin/snapshot $* snapshots/$*
	$(ECHO_DONE)


.PHONY: snapshots
snapshots: $(TARGETS_SNAPSHOTS) ## Generate snapshots (internal).
	:


.PHONY: snapshots/external/%
snapshots/external/%: noop ## Generate snapshots for a specific external config.
	$(ECHO_DO) "Snapshot external $* config..."
	$(MKDIR) snapshots.external/$*
	$(GIT_ROOT)/bin/snapshot $* snapshots.external/$*
	$(ECHO_DONE)


.PHONY: snapshots/external
snapshots/external: $(TARGETS_SNAPSHOTS_EXTERNAL) ## Generate snapshots (external).
	:


.PHONY: check-outdated-rules/%
check-outdated-rules/%: noop
	[[ ! -f "snapshots/$*/${RULES_PLUGIN_CONFIGURED_OUTDATED_TXT}" ]] || \
		$(CAT) snapshots/$*/${RULES_PLUGIN_CONFIGURED_OUTDATED_TXT} | $(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
			$(ECHO_WARN) "The above rules are configured, but are not available in the $* eslint config."; \
			exit 0; \
		}


.PHONY: check-outdated-rules
check-outdated-rules: $(TARGETS_CHECK_OUTDATED_RULES)
	:


.PHONY: check-not-configured-rules/%
check-not-configured-rules/%: noop
	[[ ! -f "snapshots/$*/${RULES_PLUGIN_NOT_CONFIGURED_TXT}" ]] || \
		$(CAT) snapshots/$*/${RULES_PLUGIN_NOT_CONFIGURED_TXT} | $(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
			$(ECHO_WARN) "The above rules are available in the $* eslint config, but are not configured."; \
			exit 0; \
		}


.PHONY: check-not-configured-rules
check-not-configured-rules: $(TARGETS_CHECK_NOT_CONFIGURED_RULES)
	:


.PHONY: check-configured-overrides-rules/%
check-configured-overrides-rules/%: noop
	[[ ! -f "snapshots/$*/${RULES_PLUGIN_OVERRIDES_TXT}" ]] || \
		$(CAT) snapshots/$*/${RULES_PLUGIN_OVERRIDES_TXT} | $(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
			$(ECHO_WARN) "The above rules are overriden in the $* eslint config."; \
		}


.PHONY: check-configured-overrides-rules
check-configured-overrides-rules: $(TARGETS_CHECK_CONFIGURED_OVERRIDES_RULES)
	:


.PHONY: check-y-config/%
check-y-config/%: noop
	[[ ! -f "snapshots/$*/${CONFIG_EXTENDS_DIFF_TXT}" ]] || \
		$(CAT) snapshots/$*/${CONFIG_EXTENDS_DIFF_TXT} | $(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
			$(ECHO_WARN) "The above diffs are is our custom config on top of the extended $* eslint config."; \
			exit 0; \
		}


.PHONY: check-y-config
check-y-config: $(TARGETS_CHECK_Y_CONFIG)
	:


.PHONY: test-rules
test-rules:
	for f in $(JS_RULE_TEST_FILES); do \
		$(ECHO) "Running $${f}..." ; \
		$(NODE) $${f} ; \
	done


.PHONY: list-not-configured ## List not-configured rules (possibly new).
list-not-configured:
	$(ECHO_DO) "Listing rules.not-configured..."
	$(LS) -la snapshots/*/${RULES_PLUGIN_NOT_CONFIGURED_TXT}
	$(ECHO_DONE)


.PHONY: list-outdated ## List outdated rules.
list-outdated:
	$(ECHO_DO) "Listing rules.configured-outdated..."
	$(LS) -la snapshots/*/${RULES_PLUGIN_CONFIGURED_OUTDATED_TXT}
	$(ECHO_DONE)
