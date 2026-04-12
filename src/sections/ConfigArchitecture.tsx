import { useState } from 'react'
import { SectionHeader } from './CorePipeline'
import { Folder, File, FolderOpen, X, Info, ChevronRight } from 'lucide-react'

type ConfigExample = {
  title: string
  desc: string
  color: string
  code: string
}

const configExamples: Record<string, ConfigExample> = {
  'CLAUDE.md': {
    title: 'CLAUDE.md',
    desc: 'Project-level context cho AI — tech stack, commands, conventions, testing rules. File này giúp AI hiểu dự án của bạn.',
    color: 'border-indigo/30',
    code: `# Project: MyApp Backend

## Tech Stack
- NestJS 11 + TypeScript 5
- Prisma ORM (MongoDB)
- Socket.io cho WebSocket
- Jest cho testing

## Commands
- \`npm run start:dev\` — dev server (port 4000)
- \`npm run test\` — run jest unit tests
- \`npm run test:e2e\` — run e2e tests
- \`npx prisma db push\` — push schema changes
- \`npx prisma generate\` — regenerate Prisma client

## Project Structure
src/
├── modules/
│   └── [feature]/
│       ├── [feature].module.ts
│       ├── [feature].controller.ts
│       ├── [feature].service.ts
│       └── dto/
├── common/
│   ├── decorators/
│   ├── guards/
│   └── filters/
└── prisma/
    └── schema.prisma

## Conventions
- Module pattern: mỗi feature = 1 NestJS module
- DTO validation: class-validator decorators
- Response format: { data, message, statusCode }
- Error format: { statusCode, message, error }
- Naming: kebab-case files, PascalCase classes, camelCase methods

## Testing Rules
- Unit tests cho mọi service method
- KHÔNG mock Prisma trong e2e — dùng test DB
- Mock external services (email, payment, etc.)
- Coverage: >=80% cho business logic

## Security
- Input validation: class-validator trên MỌI DTO
- Auth guard: @UseGuards(JwtAuthGuard) trên protected routes
- KHÔNG expose internal IDs trong error messages
- CORS: whitelist specific origins`,
  },
  'settings.json': {
    title: '.claude/settings.json',
    desc: 'Shared config — commit vào git. Chứa hooks tự động chạy khi edit file, trước commit, và khi start session.',
    color: 'border-amber/30',
    code: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|Bash",
        "hooks": [
          {
            "type": "command",
            "command": "code-review-graph update --skip-flows"
          }
        ],
        "timeout": 5000
      }
    ],
    "PreCommit": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint -- --quiet && npm run test -- --passWithNoTests --silent"
          }
        ],
        "timeout": 30000
      }
    ],
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "code-review-graph status"
          }
        ],
        "timeout": 3000
      }
    ]
  }
}

// Giải thích:
// PostToolUse: Sau mỗi Edit/Write/Bash → update knowledge graph
// PreCommit: Trước commit → auto lint + test, block nếu fail
// SessionStart: Khi bắt đầu session → check graph status`,
  },
  'settings.local.json': {
    title: '.claude/settings.local.json',
    desc: 'Personal config — KHÔNG commit vào git. Chứa permissions cho phép/chặn các commands cụ thể.',
    color: 'border-red/30',
    code: `{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(npx prisma *)",
      "Bash(git status)",
      "Bash(git log *)",
      "Bash(git diff *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git push *)",
      "Bash(git checkout *)",
      "Bash(git branch *)",
      "Bash(docker compose *)",
      "Bash(curl localhost:*)",
      "WebFetch(localhost:*)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)",
      "Bash(git reset --hard *)"
    ]
  },
  "prefersReducedMotion": true
}

// Giải thích:
// allow: Các command AI được tự động chạy không cần hỏi
// deny: Các command nguy hiểm bị chặn hoàn toàn
// Thêm command nào bạn hay dùng vào allow để tiết kiệm thời gian`,
  },
  'launch.json': {
    title: '.claude/launch.json',
    desc: 'Dev server configurations — dùng với preview tools để AI có thể start/verify server tự động.',
    color: 'border-cyan/30',
    code: `{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "backend-dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:dev"],
      "port": 4000
    },
    {
      "name": "frontend-dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    },
    {
      "name": "storybook",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "storybook"],
      "port": 6006
    }
  ]
}

// Giải thích:
// name: Tên để reference (dùng trong preview_start)
// runtimeExecutable + runtimeArgs: Command để start server
// port: Port server chạy (dùng để verify server đã ready)`,
  },
  'specs/': {
    title: 'docs/superpowers/specs/',
    desc: 'Design spec documents — output từ brainstorming skill. Mỗi file là một tài liệu thiết kế đã được approve.',
    color: 'border-purple/30',
    code: `# Chunk Load Tickets — Design Spec
**Date:** 2026-04-12 | **Status:** Approved

## Problem
API hiện tại load toàn bộ 100-2000 tickets cùng lúc, gây chậm.

## Tech Stack
NestJS 11, Prisma (MongoDB), class-validator

## Architecture
Cursor-based pagination, backward compatible.
Không có \`limit\` param: giữ nguyên behavior cũ.
Có \`limit\`: trả về { data, nextCursor, hasMore }.

## API Contract
GET /tickets?limit=20&cursor=abc123
Response: {
  data: Ticket[],
  nextCursor: string | null,
  hasMore: boolean
}

## Edge Cases
- Empty collection → { data: [], nextCursor: null, hasMore: false }
- Invalid cursor → 400 Bad Request
- Concurrent creation → safe (cursor-based)
- Fewer items than limit → hasMore: false

## Out of Scope
- Offset-based pagination
- Sort parameter
- Full-text search`,
  },
  'plans/': {
    title: 'docs/superpowers/plans/',
    desc: 'Implementation plans — output từ writing-plans skill. Mỗi file chứa các TDD tasks bite-sized.',
    color: 'border-emerald/30',
    code: `# Chunk Load Tickets — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development to implement.

**Goal:** Thêm cursor-based pagination cho GET /tickets
**Architecture:** Thêm findAllChunked() vào service, update controller
**Tech Stack:** NestJS, TypeORM 0.2.x, class-validator, PostgreSQL

---

## Task 1: Service — findAllChunked()

- [ ] Viết failing test: findAllChunked() trả về đúng format
- [ ] Run test → confirm RED (đúng lý do)
- [ ] Implement findAllChunked() với cursor-based QueryBuilder
- [ ] Run test → GREEN
- [ ] Run ALL tests → ALL pass
- [ ] Commit: "feat(tickets): add findAllChunked service method"

## Task 2: Controller — accept limit/cursor params

- [ ] Viết failing test: controller accept limit? và cursor? params
- [ ] Run test → RED
- [ ] Update controller: validate inline, route đến findAllChunked()
- [ ] Run test → GREEN
- [ ] Verify TypeScript compilation
- [ ] Commit: "feat(tickets): add pagination params to controller"

## Task 3: Final Verification

- [ ] Run lint: npm run lint
- [ ] Run full test suite: npm run test
- [ ] Manual checklist:
  - [ ] GET /tickets (không params) → behavior cũ
  - [ ] GET /tickets?limit=5 → 5 items + nextCursor
  - [ ] GET /tickets?limit=5&cursor=X → next page
  - [ ] GET /tickets?cursor=X (không limit) → 400
- [ ] Commit: "test(tickets): add e2e pagination tests"`,
  },
  'commands/': {
    title: '.claude/commands/',
    desc: 'Custom slash commands — mỗi file .md là một command. Dùng để tạo shortcuts cho workflows thường dùng.',
    color: 'border-text-dim',
    code: `// Ví dụ: .claude/commands/quick-review.md

Chạy code review nhanh cho các file đã thay đổi:

1. Xem git diff để biết files nào đã thay đổi
2. Với mỗi file đã thay đổi, kiểm tra:
   - Code style theo conventions trong CLAUDE.md
   - Security issues (injection, XSS, auth bypass)
   - Test coverage cho logic mới
3. Tạo summary ngắn gọn với findings

---

// Ví dụ: .claude/commands/db-migrate.md

Thực hiện database migration:

1. Chạy \`npx prisma db push\`
2. Chạy \`npx prisma generate\`
3. Verify schema changes trong Prisma Studio
4. Chạy test suite để confirm không breaking changes
5. Commit schema changes

---

// Cách dùng: gõ /quick-review hoặc /db-migrate trong Claude`,
  },
  'model-config': {
    title: 'Model Configuration',
    desc: 'Cấu hình model mặc định cho Claude Code. Có thể set global hoặc per-project.',
    color: 'border-purple/30',
    code: `# ===== Cài đặt Model =====

# Cách 1: Set model khi chạy Claude Code
claude --model claude-opus-4-6          # Dùng Opus (mạnh nhất)
claude --model claude-sonnet-4-6        # Dùng Sonnet (nhanh + tốt)

# Cách 2: Toggle trong session
# Gõ /model trong conversation để chuyển model
# Gõ /fast để toggle fast mode (cùng model, output nhanh hơn)

# ===== Model nào dùng khi nào? =====

# claude-opus-4-6 (Opus)
# → Architecture decisions, complex debugging
# → Code review cần judgment cao
# → Brainstorming, viết spec/plan phức tạp
# → Cost cao hơn nhưng quality tốt nhất

# claude-sonnet-4-6 (Sonnet)
# → Day-to-day coding, implement features
# → Simple bug fixes, refactoring
# → Nhanh hơn Opus, cost thấp hơn
# → Đủ cho hầu hết development tasks

# claude-haiku-4-5 (Haiku)
# → Subagent tasks đơn giản (1-2 files)
# → Mechanical changes, rename, format
# → Nhanh nhất, cost thấp nhất

# ===== Trong SDD: chọn model theo task =====
# Controller chọn model khi dispatch subagent:
# - Cheap (haiku): task 1-2 files, mechanical
# - Standard (sonnet): multi-file, integration
# - Capable (opus): architecture, complex review`,
  },
  'superpowers-install': {
    title: 'Superpowers Installation',
    desc: 'Cài đặt Superpowers plugin — bộ skills cho SDLC workflow. Hỗ trợ nhiều platform và OS.',
    color: 'border-primary/30',
    code: `# ╔══════════════════════════════════════════════╗
# ║         INSTALL SUPERPOWERS PLUGIN            ║
# ╚══════════════════════════════════════════════╝

# ===== Bước 0: Cài đặt Claude Code =====

# macOS (Homebrew)
brew install claude-code

# macOS / Linux (npm)
npm install -g @anthropic-ai/claude-code

# Windows (npm — cần Node.js 18+)
npm install -g @anthropic-ai/claude-code

# Verify Claude Code đã cài:
claude --version

# Đăng nhập lần đầu:
claude login                    # Mở browser OAuth
claude login --api-key          # Hoặc dùng API key

# ===== Bước 1: Install Superpowers =====

# Cách 1: Trong Claude Code session (RECOMMENDED)
# Mở terminal, chạy \`claude\`, rồi gõ:
/install superpowers

# Cách 2: CLI command
claude plugin install superpowers@claude-plugins-official

# Cách 3: Cho Cursor IDE
# Superpowers tự detect Cursor, skills load qua .cursorrules

# Cách 4: Cho GitHub Copilot CLI
# Copy skills/ folder vào ~/.copilot/skills/superpowers/

# Cách 5: Cho Codex (OpenAI)
git clone https://github.com/claude-plugins-official/superpowers \\
  ~/.codex/superpowers
# Symlink: ln -s ~/.codex/superpowers/skills ~/.agents/skills/superpowers

# Cách 6: Cho OpenCode
# Thêm vào opencode.json:
# { "plugins": ["superpowers@claude-plugins-official"] }

# Cách 7: Cho Gemini CLI
# Copy GEMINI.md vào project root, skills load tự động

# ===== Bước 2: Verify Installation =====

/skills                         # List tất cả skills
# Phải thấy: brainstorming, writing-plans, test-driven-development,
#            subagent-driven-development, systematic-debugging, ...

# ===== 14 Skills sau khi install =====
#
# Process:        brainstorming, systematic-debugging
# Implementation: writing-plans, test-driven-development,
#                 subagent-driven-development, executing-plans
# Quality:        requesting-code-review, receiving-code-review,
#                 verification-before-completion
# Infrastructure: using-git-worktrees, finishing-a-development-branch,
#                 dispatching-parallel-agents
# Meta:           using-superpowers, writing-skills

# ===== Cách dùng =====
# Skills TỰ ĐỘNG activate khi context phù hợp.
# VD: "implement feature X"
#     → using-superpowers detect
#     → invoke brainstorming → tạo spec
#     → invoke writing-plans → tạo plan
#     → invoke SDD → execute tasks

# ===== Setup thứ tự khuyến nghị =====
# 1. Cài Claude Code (brew/npm)
# 2. claude login
# 3. /install superpowers
# 4. Tạo CLAUDE.md cho project (tech stack, conventions)
# 5. Tạo .claude/settings.json (hooks)
# 6. Bắt đầu brainstorming cho feature đầu tiên

# ===== Update / Uninstall =====
claude plugin update superpowers
claude plugin uninstall superpowers

# ===== Troubleshooting =====
# Skills không load?
#   → Chạy \`/skills\` verify
#   → Restart Claude Code session
#   → Re-install: claude plugin install superpowers@claude-plugins-official
#
# Windows: dùng Git Bash hoặc WSL cho hooks
# Hooks không chạy? → Check .claude/settings.json syntax`,
  },
  '.worktrees/': {
    title: '.worktrees/',
    desc: 'Git worktrees directory — nơi chứa các worktree cách ly cho feature development. PHẢI có trong .gitignore.',
    color: 'border-text-dim',
    code: `# Cấu trúc worktree khi đang phát triển

.worktrees/
├── feature-social-feed/          # Worktree cho social feed feature
│   ├── src/                      # Copy đầy đủ source code
│   ├── node_modules/             # Dependencies riêng
│   ├── package.json
│   └── ...
└── bugfix-auth-token/            # Worktree cho auth bug fix
    ├── src/
    └── ...

# Workflow:
# 1. AI tạo worktree: git worktree add .worktrees/feature-X -b feature-X
# 2. Install deps: cd .worktrees/feature-X && npm install
# 3. Verify baseline: npm test (all pass)
# 4. Develop trong isolation
# 5. Finish: merge/PR rồi cleanup worktree

# QUAN TRỌNG: Thêm vào .gitignore
echo ".worktrees/" >> .gitignore

# Verify đã ignore:
git check-ignore -q .worktrees/  # Không output = OK`,
  },
}

type TreeNode = {
  name: string
  type: 'folder' | 'file'
  color?: string
  desc?: string
  exampleId?: string
  children?: TreeNode[]
}

const tree: TreeNode[] = [
  {
    name: 'project-root/',
    type: 'folder',
    children: [
      { name: 'CLAUDE.md', type: 'file', color: 'text-indigo', desc: 'Project context: stack, commands, conventions, rules', exampleId: 'CLAUDE.md' },
      {
        name: '.claude/',
        type: 'folder',
        children: [
          { name: 'settings.json', type: 'file', color: 'text-amber', desc: 'Hooks, MCP servers (shared, commit vào git)', exampleId: 'settings.json' },
          { name: 'settings.local.json', type: 'file', color: 'text-red', desc: 'Personal permissions (KHÔNG commit)', exampleId: 'settings.local.json' },
          { name: 'launch.json', type: 'file', color: 'text-cyan', desc: 'Dev server configurations', exampleId: 'launch.json' },
          { name: 'commands/', type: 'folder', color: 'text-text-muted', desc: 'Custom slash commands (optional)', exampleId: 'commands/' },
          {
            name: 'plugins/',
            type: 'folder',
            color: 'text-primary',
            desc: 'Installed plugins (superpowers, etc.)',
            children: [
              { name: 'superpowers/', type: 'folder', color: 'text-primary', desc: 'SDLC workflow skills plugin', exampleId: 'superpowers-install' },
            ],
          },
        ],
      },
      {
        name: 'docs/',
        type: 'folder',
        children: [
          {
            name: 'superpowers/',
            type: 'folder',
            children: [
              { name: 'specs/', type: 'folder', color: 'text-purple', desc: 'Design specs từ brainstorming', exampleId: 'specs/' },
              { name: 'plans/', type: 'folder', color: 'text-emerald', desc: 'Implementation plans từ writing-plans', exampleId: 'plans/' },
            ],
          },
        ],
      },
      { name: '.worktrees/', type: 'folder', color: 'text-text-dim', desc: 'Git worktrees (phải có trong .gitignore)', exampleId: '.worktrees/' },
      { name: 'src/', type: 'folder', desc: 'Source code' },
    ],
  },
]

function TreeItem({ node, depth = 0, onSelect }: { node: TreeNode; depth?: number; onSelect: (id: string) => void }) {
  const Icon = node.type === 'folder' ? (depth === 0 ? FolderOpen : Folder) : File
  const color = node.color || (node.type === 'folder' ? 'text-text-muted' : 'text-text-dim')
  const clickable = !!node.exampleId

  const content = (
    <div
      className={`flex items-start gap-2 py-1.5 rounded px-2 -mx-2 transition-colors ${
        clickable ? 'hover:bg-indigo/10 cursor-pointer group' : 'hover:bg-surface-2/40'
      }`}
      style={{ paddingLeft: `${depth * 20 + 8}px` }}
      onClick={clickable ? () => onSelect(node.exampleId!) : undefined}
    >
      <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${color}`} strokeWidth={1.5} />
      <span className={`text-xs font-mono font-medium ${color} ${clickable ? 'group-hover:text-indigo' : ''}`}>{node.name}</span>
      {node.desc && (
        <span className="text-[10px] text-text-dim ml-2 hidden sm:inline">{'\u2014'} {node.desc}</span>
      )}
      {clickable && (
        <Info className="w-3 h-3 text-text-dim opacity-0 group-hover:opacity-60 ml-auto shrink-0 transition-opacity" />
      )}
    </div>
  )

  return (
    <div>
      {content}
      {node.children?.map((child) => (
        <TreeItem key={child.name} node={child} depth={depth + 1} onSelect={onSelect} />
      ))}
    </div>
  )
}

function ConfigModal({ example, onClose }: { example: ConfigExample | null; onClose: () => void }) {
  if (!example) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 cursor-pointer" onClick={onClose}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />
      <div
        className="relative w-full max-w-3xl card flex flex-col cursor-default animate-[fadeInUp_200ms_ease-out]"
        style={{ animationFillMode: 'both', maxHeight: 'calc(100vh - 48px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-6 py-5 border-b border-border">
          <div className="min-w-0">
            <span className="text-[10px] font-bold tracking-[0.15em] text-indigo uppercase">Config Example</span>
            <h2 className="text-lg sm:text-xl font-bold text-text mt-0.5 font-mono font-heading">{example.title}</h2>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">{example.desc}</p>
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-xl bg-surface-2 flex items-center justify-center text-text-dim hover:text-text cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto modal-scroll">
          <pre className="px-6 py-5 overflow-x-auto">
            <code className="text-[11px] leading-relaxed font-mono text-text-muted whitespace-pre">{example.code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export function ConfigArchitecture() {
  const [activeExample, setActiveExample] = useState<ConfigExample | null>(null)

  return (
    <section id="config" className="py-16">
      <SectionHeader
        badge="CONFIG"
        title="Kiến Trúc Cấu Hình"
        desc="Cấu trúc project và config files cho AI-assisted development. Click vào file/folder để xem example."
      />

      {/* Setup Guide */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={() => setActiveExample(configExamples['model-config'])}
          className="card p-5 text-left cursor-pointer bg-purple/8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-purple/15 flex items-center justify-center text-lg">{'🧠'}</span>
              <div>
                <h4 className="text-sm font-bold text-text font-heading">Model Configuration</h4>
                <span className="text-[10px] text-text-dim">Opus / Sonnet / Haiku — khi nào dùng gì</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-text-dim" />
          </div>
          <p className="text-[11px] text-text-muted">Set model mặc định, chọn model theo task complexity trong SDD workflow</p>
        </button>
        <button onClick={() => setActiveExample(configExamples['superpowers-install'])}
          className="card p-5 text-left cursor-pointer bg-primary/8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center text-lg">{'⚡'}</span>
              <div>
                <h4 className="text-sm font-bold text-text font-heading">Install Superpowers</h4>
                <span className="text-[10px] text-text-dim">/install superpowers — 14 skills cho SDLC</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-text-dim" />
          </div>
          <p className="text-[11px] text-text-muted">Install plugin, verify skills, cách kết hợp với CLAUDE.md</p>
        </button>
      </div>

      {/* File tree */}
      <div className="mt-6 card p-5">
        <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest mb-3">Project Structure</h3>
        {tree.map((node) => (
          <TreeItem key={node.name} node={node} onSelect={(id) => {
            const ex = configExamples[id]
            if (ex) setActiveExample(ex)
          }} />
        ))}
        <p className="text-[10px] text-text-dim mt-3 italic">Click vào file/folder có highlight để xem example config</p>
      </div>

      <ConfigModal example={activeExample} onClose={() => setActiveExample(null)} />
    </section>
  )
}
