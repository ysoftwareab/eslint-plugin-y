ifeq (,$(wildcard support-firecloud/Makefile))
INSTALL_SUPPORT_FIRECLOUD := $(shell git submodule update --init --recursive support-firecloud)
ifneq (,$(filter undefine,$(.FEATURES)))
undefine INSTALL_SUPPORT_FIRECLOUD
endif
endif

include support-firecloud/build.mk/generic.common.mk
include support-firecloud/build.mk/sh.check.shellcheck.mk
include support-firecloud/build.mk/node.common.mk
include support-firecloud/build.mk/js.check.eslint.mk
include support-firecloud/build.mk/core.misc.release.npg.mk

# ------------------------------------------------------------------------------

JS_RULE_TEST_FILES := $(shell $(FIND_Q) test -type f -name "*.test.js" -print)

SF_VENDOR_FILES_IGNORE += \
	-e "^configs/index\.js$$" \
	-e "^rules/index\.js$$" \

SF_ECLINT_FILES_IGNORE += \
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

SF_DEPS_TARGETS += \
	.github/workflows/main.yml \
	configs/index.js \
	rules/index.js \

SF_CHECK_TPL_FILES += \
	.github/workflows/main.yml \
	configs/index.js \
	rules/index.js \

SF_TEST_TARGETS += \
	test-rules \

# ------------------------------------------------------------------------------

.github/workflows/main.yml: .github/workflows/main.yml.tpl .github/workflows.src/main.yml support-firecloud/package.json
	$(call sf-generate-from-template)


.PHONY: configs/index.js
configs/index.js: configs/tpl.index.js
	$(call sf-generate-from-template)


.PHONY: rules/index.js
rules/index.js: rules/tpl.index.js
	$(call sf-generate-from-template)


.PHONY: test-rules
test-rules:
	for f in $(JS_RULE_TEST_FILES); do \
		$(ECHO) "Running $${f}..." ; \
		$(NODE) $${f} ; \
	done
