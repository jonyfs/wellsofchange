#!/usr/bin/env bash
# Runs the TypeScript compiler after a TypeScript file is edited.
#
# The project has no linter and no test suite, so tsc is the only automated gate. Running it on edit
# surfaces a type error while the change is still in context instead of at pull request time.
# Compilation is incremental, so repeat runs are cheap.
#
# Wired as a PostToolUse hook on Edit and Write. Non-zero exit returns the output to Claude.

set -uo pipefail

file_path=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null) || exit 0

case "$file_path" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
[ -d node_modules ] || exit 0

output=$(npm run check 2>&1)
status=$?
[ $status -eq 0 ] && exit 0

echo "Typecheck failed after editing $file_path:" >&2
echo "$output" | grep -E "error TS" | head -20 >&2
exit 2
