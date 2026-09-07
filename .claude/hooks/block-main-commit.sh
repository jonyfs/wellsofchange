#!/usr/bin/env bash
# Blocks commits, pushes, and history rewrites that would reach the default branch.
#
# The constitution requires every change to reach main through a pull request, because main is what
# gets deployed and later published. Branch protection on GitHub is the real enforcement; this hook
# catches the mistake locally, before the push exists.
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

# Heredoc bodies are data, not commands. A commit message, a pull request comment, or a
# documentation edit can quote a push to the default branch without performing one, so everything
# from the first heredoc marker onward is ignored.
invocation=${command_line%%<<*}

# A push can target the default branch from any branch through a refspec, so the current branch is
# not the whole picture: a refspec push from a feature branch deploys just as surely.
targets_default=0
while IFS= read -r line; do
  case "$line" in
    *git*push*) ;;
    *) continue ;;
  esac

  seen_push=0
  for token in $line; do
    if [ "$seen_push" -eq 0 ]; then
      [ "$token" = "push" ] && seen_push=1
      continue
    fi
    # The push ends at the next shell operator. Beyond it is a different command, and a chained
    # `gh pr create --base main` is not a push to main.
    case "$token" in
      "&&"|"||"|";"|"|"|"&") seen_push=0; continue ;;
    esac
    case "$token" in
      main|*:main|*:refs/heads/main) targets_default=1 ;;
    esac
  done
done <<< "$invocation"

[ "$branch" = "main" ] || [ "$targets_default" -eq 1 ] || exit 0

cat >&2 <<'MESSAGE'
Blocked: this targets the default branch.

The constitution (principle VI) requires every change to land through a pull request. The default
branch is what gets deployed and later published.

Create a branch first:

  git checkout -b <type>/<short-description>

then commit, push, and open a pull request with `gh pr create`.
MESSAGE
exit 2
