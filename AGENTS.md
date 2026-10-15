<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# CodeGraph rules (token-cost optimization)

This project has a `.codegraph/` index. Follow these rules on every task to cut token cost and round-trips:

1. **Always call CodeGraph FIRST.** Before any grep/glob/read/find/task-based search, call `codegraph_explore` (MCP) with the project path, or `codegraph explore "<query>"` from the shell. It returns verbatim, line-numbered source plus call paths in ONE round-trip.
2. **Fall back ONLY if CodeGraph fails.** If CodeGraph returns nothing useful, empty results, or an error, THEN use grep/glob/read as the next step. Never skip step 1.
3. **Keep the tool graph updated.** Before heavy exploration and whenever files changed since the last index, run `codegraph sync` (incremental) or `codegraph status` to verify freshness. After committing changes, re-run `codegraph sync` so the graph stays current. Deep rebuild only when needed: `codegraph index`.
4. **When a query is important, verify the answer in the returned source** (treat CodeGraph output as already-Read). Do not re-read the same files unless the snippet is incomplete.
5. If CodeGraph output contradicts the actual file contents, the index may be stale — run `codegraph sync` and re-query before trusting other search tools.

<!-- END:codegraph-agent-rules -->

<!-- BEGIN:response-rules -->

# Response rules

Follow these rules for every interaction to keep output concise and usable:

1. **No chain of thought.** Never show or describe your internal reasoning, steps, or thought process. Only the final result.
2. **Work silently.** Make tool calls and edits without narrating what you are doing in the response.
3. **Keep it brief.** Reply in as few lines as possible (short sentences, one-liners, or a compact summary). No filler, no preamble, no closing pleasantries.
4. **End with a small change summary.** After completing a task, give a 1–3 line recap of what changed (`file_path:line` if useful) — do not restate the whole plan or transcript.
5. **Ask, don't guess.** If anything is ambiguous, blocking, or unclear as you work, stop and ask the question directly instead of assuming an answer.
6. **Match requested format.** If the user shows the output shape they want (e.g. a table, a heading, a list), mirror it — including language and structure.
7. **No self-praise or meta-commentary.** Skip statements like "Happy to help", "Good question", or explanations about your own abilities or rules.
8. **Show results, not process.** Tests/builds/commands are reported by their outcome (pass/fail) and what they did, never step-by-step.

<!-- END:response-rules -->
