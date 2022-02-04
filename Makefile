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

CONFIGS += \
	async-await \
	babel \
	eslint \
	eslint-comments \
	fp \
	import \
	jasmine \
	jest \
	jsdoc \
	jsdoc-typescript \
	lodash \
	lodash-typescript \
	mocha \
	no-null \
	proper-arrows \
	protractor \
	typescript \
	vue \

TARGETS_SNAPSHOTS = $(patsubst %,snapshots/%,$(CONFIGS))
TARGETS_CHECK_NOT_CONFIGURED_RULES = $(patsubst %,check-not-configured-rules/%,$(CONFIGS))
TARGETS_CHECK_OUTDATED_RULES = $(patsubst %,check-outdated-rules/%,$(CONFIGS))
TARGETS_CHECK_CONFIGURED_OVERRIDES_RULES = $(patsubst %,check-configured-overrides-rules/%,$(CONFIGS))
TARGETS_CHECK_Y_CONFIG = $(patsubst %,check-y-config/%,$(CONFIGS))

YP_VENDOR_FILES_IGNORE += \
	-e "^\.github/workflows/main\.yml$$" \
	-e "^configs/index\.js$$" \
	-e "^package\.json$$" \
	-e "^rules/index\.js$$" \
	-e "^snapshots/" \

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

YP_CHECK_TPL_FILES += \
	.github/workflows/main.yml \
	configs/index.js \
	rules/index.js \
	snapshots \

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


.PHONY: snapshots/%
snapshots/%: noop
	$(ECHO_DO) "Snapshot $* config..."
	$(MKDIR) snapshots/$*
	$(GIT_ROOT)/bin/list-configured-own-rules $* > snapshots/$*/rules.configured-own.txt
	$(GIT_ROOT)/bin/list-own-rules $* > snapshots/$*/rules.own.txt
	$(COMM) -23 snapshots/$*/rules.configured-own.txt snapshots/$*/rules.own.txt > \
		snapshots/$*/rules.configured-outdated.txt
	$(GIT_ROOT)/bin/list-own-rules $* > snapshots/$*/rules.own.txt
	$(GIT_ROOT)/bin/list-configured-own-rules $* > snapshots/$*/rules.configured-own.txt
	$(COMM) -23 snapshots/$*/rules.own.txt snapshots/$*/rules.configured-own.txt > snapshots/$*/rules.not-configured.txt
	$(GIT_ROOT)/bin/list-configured-overrides-rules $* > snapshots/$*/rules.configured-overrides.txt
	if [[ -f "configs/$*.extends.js" ]]; then \
		$(ESLINT) --no-eslintrc -c configs/$*.extends.js --print-config foo.js > snapshots/$*/config.extends.txt; \
		$(ESLINT) --no-eslintrc -c configs/$*.js --print-config foo.js > snapshots/$*/config.extends-and-y.txt; \
		$(JD) snapshots/$*/config.extends.txt snapshots/$*/config.extends-and-y.txt > \
			snapshots/$*/config.extends-diff-extends-and-y.txt; \
		$(CAT) snapshots/$*/config.extends-diff-extends-and-y.txt | { $(GREP) "^@ " || true; } | \
			$(SED) "s/^@ //" | $(JQ) -r ".[1]" | $(SORT) > snapshots/$*/rules.configured-y.txt; \
	else \
		$(ESLINT) --no-eslintrc -c configs/$*.js --print-config foo.js > snapshots/$*/config.y.txt; \
		$(CAT) snapshots/$*/config.y.txt | $(JQ) -r ".rules | keys[]" | $(SORT) > snapshots/$*/rules.configured-y.txt; \
	fi
	$(ECHO_DONE)


.PHONY: snapshots
snapshots: $(TARGETS_SNAPSHOTS)
	:


.PHONY: check-outdated-rules/%
check-outdated-rules/%: noop
	$(CAT) snapshots/$*/rules.configured-outdated.txt | $(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
		$(ECHO_WARN) "The above rules are configured, but are not available in the $* eslint config."; \
		exit 0; \
	}


.PHONY: check-outdated-rules
check-outdated-rules: $(TARGETS_CHECK_OUTDATED_RULES)
	:


.PHONY: check-not-configured-rules/%
check-not-configured-rules/%: noop
	$(CAT) snapshots/$*/rules.not-configured.txt | $(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
		$(ECHO_WARN) "The above rules are available in the $* eslint config, but are not configured."; \
		exit 0; \
	}


.PHONY: check-not-configured-rules
check-not-configured-rules: $(TARGETS_CHECK_NOT_CONFIGURED_RULES)
	:


.PHONY: check-configured-overrides-rules/%
check-configured-overrides-rules/%: noop
	$(CAT) snapshots/$*/rules.configured-overrides.txt | $(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
		$(ECHO_WARN) "The above rules are overriden in the $* eslint config."; \
	}


.PHONY: check-configured-overrides-rules
check-configured-overrides-rules: $(TARGETS_CHECK_CONFIGURED_OVERRIDES_RULES)
	:


.PHONY: check-y-config/%
check-y-config/%: noop
	[[ ! -f "snapshots/$*/config.extends-diff-extends-and-y.txt" ]] || \
		$(CAT) snapshots/$*/config.extends-diff-extends-and-y.txt | $(YP_DIR)/bin/ifne --not --fail --print-on-fail || { \
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
	$(LS) -la snapshots/*/rules.not-configured.txt


.PHONY: list-outdated ## List outdated rules.
list-outdated:
	$(LS) -la snapshots/*/rules.configured-outdated.txt
