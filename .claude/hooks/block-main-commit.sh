#!/usr/bin/env bash
# Blocks commits, pushes, and history rewrites on the default branch.
#
# The constitution requires every change to reach main through a pull request, because a push to
# main deploys to wellsofchange.com within minutes. Branch protection on GitHub is the real
# enforcement; this hook catches the mistake locally, before the push exists.
#
# Wired as a PreToolUse hook on Bash. Exit code 2 blocks the call and returns the message to Claude.

set -uo pipefail

command_line=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null) || exit 0
[ -n "$command_line" ] || exit 0

case "$command_line" in
  *git*commit*|*git*push*|*git*"reset --hard"*|*git*"merge"*) ;;
  *) exit 0 ;;
esac

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || exit 0
[ "$branch" = "main" ] || exit 0

cat >&2 <<'MESSAGE'
Blocked: you are on main.

The constitution (principle VI) requires every change to land through a pull request. A push to
main deploys to the live site.

Create a branch first:

  git checkout -b <type>/<short-description>

then commit, push, and open a pull request with `gh pr create`.
MESSAGE
exit 2
