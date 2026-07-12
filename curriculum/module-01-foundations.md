# Module 01 — Foundations of Go Backend Engineering

Module 01 introduces the language, tools, and environment you will use throughout the On2Code Go Backend Engineering Program. It establishes first-principles knowledge and practical setup so students can follow along with the rest of the course.

Module learning outcomes:
- Understand Go's role in backend development and real-world tradeoffs.
- Install and configure the Go toolchain and common productivity tools.
- Initialize a Go module, build and run a simple HTTP server, and write basic tests.
- Understand project structure and the On2Code starter repository conventions.

Lessons (Module 01):
1. Lesson 1 — Introduction to Go & Local Development Setup (this file: complete)
2. Lesson 2 — Go Tooling: go CLI, modules, vet, fmt, doc
3. Lesson 3 — Go Syntax & Types (primitives, composite types, methods)
4. Lesson 4 — Control Flow, Error Handling, and Effective Go
5. Lesson 5 — Packages, Modules, and Project Structure
6. Lesson 6 — Concurrency Basics: Goroutines and Channels
7. Lesson 7 — Building Simple HTTP Services with net/http
8. Lesson 8 — Working with Databases: SQL, drivers, and GORM overview
9. Lesson 9 — Testing Basics: unit tests, table tests, and mocks
10. Lesson 10 — Local Dev Workflow: Docker, docker-compose, and VS Code

---

## Lesson 1 — Introduction to Go & Local Development Setup

Lesson Overview
- Duration: 2–3 hours
- Level: Beginner
- Scope: Introduce Go, why it's used for backend systems, install toolchain, initialize a project, create a minimal HTTP endpoint, and write a unit test.

Learning Objectives
- Explain Go's strengths for backend engineering (performance, static typing, fast compilation, concurrency primitives).
- Install Go and verify the installation on Windows (PowerShell) and other platforms.
- Initialize a `go mod` module and understand module semantics.
- Build and run a simple HTTP server and a unit test using `net/http/httptest`.

Prerequisites
- Comfortable using a terminal (PowerShell, bash, or similar).
- Basic programming knowledge (variables, functions, strings).

Real-world Motivation
- Production backends must be reliable and efficient. Go is used at scale (Docker, Kubernetes components, many cloud-native services). Getting the environment right and understanding the language basics reduces friction when building real services.

Comprehensive Student Notes

1) Why Go for backend?
- Compiled, statically typed, efficient runtime and garbage collector.
- Simple concurrency model with goroutines and channels.
- Batteries-included standard library for writing HTTP servers, JSON, and more.
- Fast build cycle and small deployment artifacts.

2) Installing Go
- Official downloads: https://go.dev/dl/ — pick the installer for your OS.
- Windows: run MSI installer, ensure `C:\Go\bin` is in `PATH`.
- Verify installation in a terminal: `go version` should print `go1.21`+ (course targets 1.21+).

3) GOPATH vs Modules
- Modern Go uses modules (`go.mod`) and does not require GOPATH for new projects.
- `go mod init github.com/yourname/project` initializes the module.

4) Minimal HTTP server (concepts)
- Use `net/http` package, register handlers via `http.HandleFunc`, and call `http.ListenAndServe`.
- Use `httptest` for unit testing handlers without network calls.

5) Editor / Tooling recommendations
- Use VS Code with the Go extension (gopls), or GoLand.
- Install: `gopls`, `delve` (for debugging), and test runners.

Instructor Video Outline (5–10 minutes)
- Intro (30s): what students will achieve.
- Why Go (60s): tradeoffs and ecosystem examples.
- Demo overview (30s): show the starter repo structure.
- Live demo (3–4m): create module, run server, run tests.
- Wrap-up (30s): next steps and housekeeping (Go version, editor setup).

Live Coding Demonstration

Goal: Initialize a module, create a simple HTTP endpoint at `/health` and test it.

Complete code (create `main.go` and `main_test.go`):

-- go.mod --
module github.com/on2code/go-foundations-starter

go 1.21

-- main.go --
package main

import (
    "fmt"
    "net/http"
    "os"
)

func main() {
    http.HandleFunc("/health", healthHandler)
    port := getPort()
    fmt.Printf("Starting server on %s\n", port)
    if err := http.ListenAndServe(port, nil); err != nil {
        fmt.Fprintf(os.Stderr, "server error: %v\n", err)
        os.Exit(1)
    }
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    _, _ = w.Write([]byte(`{"status":"ok"}`))
}

func getPort() string {
    if p := os.Getenv("PORT"); p != "" {
        return ":" + p
    }
    return ":8080"
}

-- main_test.go --
package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestHealthHandler(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/health", nil)
    rr := httptest.NewRecorder()

    healthHandler(rr, req)

    if rr.Code != http.StatusOK {
        t.Fatalf("expected status 200; got %d", rr.Code)
    }

    expected := `{"status":"ok"}`
    if rr.Body.String() != expected {
        t.Fatalf("unexpected body: %s", rr.Body.String())
    }
}

Line-by-line explanation (concise):
- `package main` — executable program entry package.
- imports — `net/http` for server, `fmt` for logging, `os` to read env vars.
- `main()` — registers `/health` and starts server on `:8080` (or `$PORT`).
- `healthHandler` — sets JSON content-type and writes a small status JSON with 200.
- `getPort` — helper to support env-driven ports for cloud-hosted services.
- test — constructs a fake request and response recorder, calls handler directly, and asserts status and body.

Visual Learning Suggestions
- Diagram: simple request flow: client -> net/http -> handler -> response.
- Sequence diagram for test: create request -> handler -> record -> assert.
- Highlight the difference between integration (network) tests and handler unit tests with `httptest`.

Practice Exercises (5–10)
1. Run the server locally and curl `/health`.
2. Change the JSON payload to include `uptime` (static placeholder) and update the test.
3. Add a `/version` endpoint reading from a constant variable and write tests.
4. Modify `getPort()` to accept a default via a constant and demonstrate by running with `PORT=9090`.
5. Add logging to print remote address for each request (use middleware-like handler wrapper).

Coding Challenges (3–5, increasing difficulty)
1. Add graceful shutdown to the server on SIGINT/SIGTERM using `http.Server` and `context` with timeout.
2. Implement a middleware that limits request body size to 1MB and write tests simulating large bodies.
3. Add a JSON encoder approach using `encoding/json` and ensure the test uses the same encoding (avoid raw string compare).

10-question Quiz (with answers & brief explanations)
1) Q: What command initializes a module? A: `go mod init <module-path>` — creates go.mod.
2) Q: How do you run tests? A: `go test ./...` — runs tests in packages recursively.
3) Q: True/False: `net/http` handlers must always start goroutines to handle requests. A: False — `net/http` starts goroutines per connection.
4) Q: What is `httptest.NewRecorder()` used for? A: Recording handler responses in tests.
5) Q: Which type is used to write HTTP response headers? A: `http.ResponseWriter`.
6) Q: How to set response status code? A: `w.WriteHeader(http.StatusOK)`.
7) Q: Where is `go`'s module version recorded? A: In `go.mod`.
8) Q: What environment variable pattern is commonly used to configure ports? A: `PORT` env var.
9) Q: What is the default port used in our example? A: `:8080`.
10) Q: Name a reason to use `httptest` over making real network calls. A: Faster, deterministic, avoids flaky network dependencies.

Answers (concise explanations):
1: `go mod init` — sets module path and initializes dependencies; 2: `go test` — runs tests; 3: False — server handles concurrency; 4: Records responses; 5: `http.ResponseWriter` provides headers/body methods; 6: `WriteHeader` sets status; 7: `go.mod` tracks module and versions; 8: `PORT` is conventional; 9: `:8080` is common default for local dev; 10: `httptest` isolates logic and is faster.

Assignment

Objective: Create a small repository that exposes `/health` and `/version`, includes tests, and is CI-friendly.

Requirements:
- `go.mod` with module path `github.com/<your-gh-username>/on2code-go-foundations-starter`.
- `main.go` with `/health` and `/version` endpoints.
- `main_test.go` covering both endpoints with table-driven tests.
- `Makefile` or `scripts` with `test` target (`go test ./...`) and `run` target.
- README with setup, run, and test instructions.

Acceptance Criteria / Rubric:
- Project builds: `go build` exits 0. (20 pts)
- Tests pass: `go test ./...` passes. (30 pts)
- Endpoints respond correctly (manual curl or automated test). (30 pts)
- Clear README and run instructions. (20 pts)

Hints:
- Use `httptest.NewRequest` and `httptest.NewRecorder` for handler tests.
- Use `encoding/json` to marshal responses rather than raw strings for robustness.

Submission Instructions
- Push your starter repo to GitHub with branch `lesson-01` and open a PR against `main`. Include the `go test` output in PR body.

GitHub Starter Project

Repo name: `on2code-go-foundations-starter`

Suggested folder structure:
- README.md
- go.mod
- main.go
- main_test.go
- Makefile (optional)
- .github/workflows/ci.yml (simple CI running `go test ./...`)

README content (concise):
- Project description
- Prereqs: Go 1.21+
- Setup: `go mod download`
- Run: `go run .` (or `make run`)
- Test: `go test ./...`

Automated Tests
- Unit test included in `main_test.go` (see above). Example CI workflow (`.github/workflows/ci.yml`):
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Go
        uses: actions/setup-go@v4
        with:
          go-version: '1.21'
      - name: Run tests
        run: go test ./... -v

Lesson Summary
- You installed Go, initialized a module, implemented a minimal HTTP server, and wrote tests that exercise handlers using `httptest`.

Next Lesson Preview
- Lesson 2: We'll dive into the `go` toolchain: `go build`, `go test` nuances, `go vet`, `gofmt`, and using `gopls` for productivity. We'll examine dependency management and semantic import versioning.

---

End of Module 01 — Lesson 1

## Lesson 2 — Go Tooling & Local Workflow

Lesson Overview
- Duration: 2–4 hours
- Level: Beginner → Intermediate
- Scope: Deep dive into the Go toolchain (`go` CLI), module dependency management, common developer tools (`gofmt`, `go vet`, `golangci-lint`, `gopls`), and CI integration basics.

Learning Objectives
- Run and interpret `go build`, `go test`, `go vet`, and `go list` outputs.
- Use `go mod` to add, upgrade, and tidy dependencies; understand semantic import versioning.
- Configure editor tooling (`gopls`) and format code deterministically with `gofmt`/`go fmt`.
- Add basic CI that runs tests and linters in GitHub Actions.

Prerequisites
- Completed Lesson 1 (local Go installed and a starter module initialized).

Real-world Motivation
- Reliable builds, consistent formatting, and automated tests are core to team productivity and reducing integration friction. Tooling ensures code quality at scale.

Comprehensive Student Notes

1) `go` CLI fundamentals
- `go build` — compiles packages and dependencies; for `package main` produces an executable.
- `go run .` — compiles and runs in one step (convenient for local dev).
- `go test ./...` — discover and run tests across packages; use `-v` for verbose output.
- `go list -m all` — list all modules in the build list (useful to inspect versions).

2) Modules and dependency management
- `go mod init` creates `go.mod`.
- `go get example.com/pkg@v1.2.3` adds or upgrades dependencies (modules-aware).
- `go mod tidy` removes unused dependencies and ensures `go.sum` matches.
- Semantic import versioning: for v2+ modules, import path must include `/vN` (e.g., `github.com/pkg/errors/v2`).

3) Formatting, vetting, and linting
- `gofmt` (or `go fmt`) formats code to the canonical style.
- `go vet` identifies suspicious constructs; always run in CI.
- `golangci-lint` bundles linters for complexity, style, and potential bugs.

4) Editor integration
- `gopls` provides IDE features: completion, diagnostics, and code navigation. Configure via VS Code Go extension settings.

Instructor Video Outline (6–12 minutes)
- Explain `go` CLI basics with live demos (2 minutes).
- Show `go mod` workflows: add, tidy, and upgrade dependency (2 minutes).
- Demo formatting and vetting tools and resolving a `go vet` warning (3 minutes).
- Walkthrough adding a simple CI workflow that runs tests and linters on push (2–3 minutes).

Live Coding Demonstration

Goals:
- Show `go build`, `go test`, `go vet` on the starter repo.
- Add a linter step and a GitHub Actions CI workflow.

Commands to run locally:
```powershell
go build ./...
go test ./... -v
go vet ./...
go list -m all
``` 

Example: using `go get` to add a dependency and `go mod tidy`:
```powershell
go get github.com/google/uuid@v1.3.0
go mod tidy
``` 

Example CI (`.github/workflows/ci.yml`):
```yaml
name: CI
on: [push, pull_request]
jobs:
   test:
      runs-on: ubuntu-latest
      steps:
         - uses: actions/checkout@v4
         - name: Set up Go
            uses: actions/setup-go@v4
            with:
               go-version: '1.21'
         - name: Install linters
            run: curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(pwd)/bin v1.54.2
         - name: Run tests
            run: go test ./... -v
         - name: Run vet
            run: go vet ./...
         - name: Run golangci-lint
            run: ./bin/golangci-lint run ./...
```

Practice Exercises
1. Run `go build` and inspect the produced binary (on Windows, `.inary.exe`).
2. Add `github.com/google/uuid` to the starter project and use it in `/version` endpoint to return a request id; tidy modules.
3. Intentionally introduce a `go vet`-detectable issue (unused import or suspicious format) and fix it.
4. Configure VS Code to run `gofmt` on save.

Coding Challenges
1. Create a small tool (in a `cmd/` directory) that reads a JSON file and prints a summary — add tests and ensure `go vet` and `gofmt` pass.
2. Integrate `golangci-lint` with a custom config that disables `gocyclo` and run it in CI.

Quiz (8 questions)
1) Q: What command removes unused module requirements? A: `go mod tidy`.
2) Q: True/False: `gofmt` changes code behavior. A: False — formatting only.
3) Q: What does `go vet` do? A: Static analysis for suspicious constructs.
4) Q: How do you list modules in your build list? A: `go list -m all`.
5) Q: When importing a v2+ module, what must you include? A: `/vN` suffix in the module path.
6) Q: Which tool provides language server features? A: `gopls`.
7) Q: Name one benefit of running linters in CI. A: Catch style/bug regressions early.
8) Q: What file ensures reproducible checksums of module downloads? A: `go.sum`.

Answers (brief): 1: `go mod tidy`; 2: False; 3: Static checks; 4: `go list -m all`; 5: `/vN`; 6: `gopls`; 7: Early detection; 8: `go.sum`.

Assignment

Objective: Harden the starter repo with proper tooling: modules, formatting, vet, lints, and CI.

Requirements:
- `go.mod` and `go.sum` present and tidy.
- `gofmt` applied to all source files.
- Add `golangci-lint` configuration (`.golangci.yml`) and ensure CI runs it.
- Create `.github/workflows/ci.yml` as shown and ensure tests pass locally.

Acceptance Criteria:
- `go test ./...` passes locally. (40 pts)
- `go vet ./...` passes with no errors. (20 pts)
- `gofmt` reports no changes (`gofmt -l .` empty). (20 pts)
- CI workflow file exists in the repo. (20 pts)

Hints:
- Use `gofmt -w .` to apply formatting across files.

Submission
- Push to branch `lesson-02` and open a PR; CI should pass on GitHub Actions.

Lesson Summary
- Tooling and CI are foundational for reliable teams. `go` CLI, `go mod`, `gofmt`, `go vet`, and linters reduce friction.

Next Lesson Preview
- Lesson 3: We'll cover Go syntax, types, methods, interfaces, and composition — the language mechanics you need to build safe, testable services.

## Lesson 3 — Go Syntax & Types

Lesson Overview
- Duration: 3–5 hours
- Level: Beginner → Intermediate
- Scope: Core language syntax, types (primitives, composite types, maps, slices, arrays), structs and methods, pointers, interfaces, and idiomatic Go patterns.

Learning Objectives
- Understand Go's type system: zero values, pointers, slices vs arrays, maps, structs.
- Define methods on types and understand pointer vs value receivers.
- Use interfaces for decoupling and testing.
- Apply idiomatic patterns: error handling, option types, and small interfaces.

Prerequisites
- Lessons 1–2 completed.

Comprehensive Student Notes

1) Basic syntax and zero values
- `var x int` declares x with zero value `0`.
- Short declaration: `x := 5` (in functions only).

2) Primitives and composite types
- Primitives: `int`, `int64`, `float64`, `string`, `bool`.
- Arrays: fixed-length: `var a [3]int`.
- Slices: dynamic, built on arrays: `s := []int{1,2,3}`; capacity and length.
- Maps: `m := map[string]int{"a":1}`; use `make` for empty maps.

3) Structs, methods, and receivers
- Define `type User struct { ID int; Name string }`.
- Methods: `func (u User) Display() string {}` vs `func (u *User) UpdateName(n string) {}` — pointer receiver when mutating or to avoid copying.

4) Pointers
- Use `&` and `*` to take and dereference addresses. Avoid excessive pointer usage; prefer value semantics for small structs.

5) Interfaces and mocking
- Small interfaces are preferred. Example: `type Store interface { Get(id int) (*User, error) }`.
- Interfaces enable test doubles; supply a fake `Store` in tests.

6) Idioms
- Error handling: return `error`; use `errors.Is` and `errors.As` for comparisons.
- Table-driven tests: iterate over test cases in a slice.

Live Coding Demonstration

Goals: Define `User` struct, add methods, define a `Store` interface, implement an in-memory store and a unit test with a fake.

Files: `models.go`, `store.go`, `store_test.go` (snippets below)

-- models.go --
package main

type User struct {
   ID   int
   Name string
}

func (u User) Display() string {
   return u.Name
}

func (u *User) UpdateName(n string) {
   u.Name = n
}

-- store.go --
package main

import "errors"

var ErrNotFound = errors.New("not found")

type Store interface {
   Get(id int) (*User, error)
   Save(u *User) error
}

type InMemoryStore struct {
   data map[int]*User
}

func NewInMemoryStore() *InMemoryStore {
   return &InMemoryStore{data: make(map[int]*User)}
}

func (s *InMemoryStore) Get(id int) (*User, error) {
   if u, ok := s.data[id]; ok {
      return u, nil
   }
   return nil, ErrNotFound
}

func (s *InMemoryStore) Save(u *User) error {
   s.data[u.ID] = u
   return nil
}

-- store_test.go --
package main

import "testing"

func TestInMemoryStore(t *testing.T) {
   s := NewInMemoryStore()
   u := &User{ID: 1, Name: "Alice"}
   if err := s.Save(u); err != nil {
      t.Fatalf("save failed: %v", err)
   }
   got, err := s.Get(1)
   if err != nil {
      t.Fatalf("get failed: %v", err)
   }
   if got.Name != "Alice" {
      t.Fatalf("unexpected name: %s", got.Name)
   }
}

Practice Exercises
1. Implement `Delete(id int)` on `InMemoryStore` and write tests for delete and subsequent `Get` returning `ErrNotFound`.
2. Implement `List()` which returns all users as a slice; consider copy semantics to avoid exposing internal map.
3. Create a fake `Store` for testing higher-level services; use it in a table-driven test.

Coding Challenges
1. Implement a thread-safe `InMemoryStore` using `sync.RWMutex` and update tests to run concurrent `Save` and `Get` operations.
2. Create an adapter that implements `Store` backed by a SQL DB using `database/sql`, and write integration tests using `dockertest`.

Quiz (10 questions)
1) Q: What is the zero value for a `string`? A: `""` (empty string).
2) Q: How do you declare a slice of ints? A: `[]int{}` or `var s []int`.
3) Q: Value receiver vs pointer receiver: when to use pointer? A: When mutating the receiver or avoiding copy.
4) Q: How do you create an empty map? A: `make(map[string]int)`.
5) Q: True/False: Interfaces in Go are satisfied implicitly. A: True.
6) Q: How do you check if a key exists in a map? A: `v, ok := m[key]`.
7) Q: What is a common pattern for table-driven tests? A: Define a slice of test cases and iterate with `t.Run`.
8) Q: How to return multiple values from a function? A: `func f() (int, error)`.
9) Q: Why are small interfaces preferred? A: They are easier to mock and compose.
10) Q: How to declare a method on a type `T`? A: `func (t T) Method() {}` or `func (t *T) Method() {}`.

Answers (brief): 1:""; 2: `[]int{}`; 3: pointer when mutating/avoid copy; 4: `make(map[string]int)`; 5: True; 6: `v, ok := m[key]`; 7: slice of cases with `t.Run`; 8: multiple returns in signature; 9: easier testing/composition; 10: method syntax shown.

Assignment

Objective: Build a small package `store` with interface, in-memory implementation, and tests demonstrating concurrency safety.

Requirements:
- `store` package with `Store` interface and `InMemoryStore` implementation.
- Unit tests covering `Get`, `Save`, `Delete`, and concurrent access.
- Use `go test -race` to verify no data races.

Acceptance Criteria:
- All tests pass including race detector. (50 pts)
- Correct API and thread safety. (30 pts)
- Clear README and example usage. (20 pts)

Next Lesson Preview
- Lesson 4: Control flow, error handling, and idiomatic Go patterns for robust services.

## Lesson 4 — Control Flow & Error Handling

Lesson Overview
- Duration: 3–5 hours
- Level: Intermediate
- Scope: Deep dive into control flow constructs, idiomatic error handling, wrapping and unwrapping errors, sentinel vs typed errors, and patterns for robust error propagation.

Learning Objectives
- Understand `if`, `switch`, `for`, and `select` usage and idioms in Go.
- Use and design error values, wrapping (`fmt.Errorf("...: %w", err)`), and unwrapping with `errors.Is` and `errors.As`.
- Differentiate sentinel errors and typed errors; design for testability.

Comprehensive Student Notes

1) Control flow
- `for` is the only loop construct: iterator, index, or range.
- `switch` is expressive and supports fallthrough when explicitly requested.
- `select` for multiplexing channels in concurrent code.

2) Error handling
- Prefer returning `error` as the last return value: `func Do() (T, error)`.
- Wrap errors to add context: `fmt.Errorf("read config: %w", err)`.
- Check errors with `errors.Is(err, ErrNotFound)` and extract typed errors with `errors.As`.

3) Design patterns
- Use sentinel errors (package-level vars) for simple comparisons when appropriate.
- Use typed errors for richer programmatic handling (attach fields).
- Avoid panics for recoverable errors; use panics only for programmer errors.

Live Coding Demonstration

Goals: Implement a function that reads configuration, wraps errors for context, and demonstrates tests that assert on wrapped errors using `errors.Is`.

Snippet (config.go):

package main

import (
   "errors"
   "fmt"
)

var ErrMissingKey = errors.New("missing key")

func ReadConfig(m map[string]string, key string) (string, error) {
   v, ok := m[key]
   if !ok {
      return "", fmt.Errorf("failed to read config %s: %w", key, ErrMissingKey)
   }
   return v, nil
}

Snippet (config_test.go):

package main

import (
   "errors"
   "testing"
)

func TestReadConfig_Missing(t *testing.T) {
   _, err := ReadConfig(map[string]string{}, "port")
   if err == nil {
      t.Fatal("expected error")
   }
   if !errors.Is(err, ErrMissingKey) {
      t.Fatalf("expected ErrMissingKey; got %v", err)
   }
}

Practice Exercises
1. Write `ParseIntOrDefault(s string, def int) (int, error)` that returns default when empty and errors on invalid input; test failures.
2. Implement a function that wraps multiple errors and unpacks them with `errors.As`.

Coding Challenge
1. Design a typed error `type ValidationError struct { Field string; Msg string }` that implements `Error()` and write code that detects `ValidationError` via `errors.As`.

Quiz (8 questions)
1) Q: How do you wrap an error with additional context? A: `fmt.Errorf("...: %w", err)`.
2) Q: How to check wrapped errors? A: `errors.Is`.
3) Q: When should you use panic? A: For unrecoverable programmer errors, not runtime/user errors.

Answers: 1: `%w` wrap; 2: `errors.Is`; 3: unrecoverable programmer errors.

Next Lesson Preview
- Lesson 5: Packages, modules, and project structure — we'll design multi-package repos and discuss visibility, testing across packages, and export decisions.

## Lesson 5 — Packages, Modules, and Project Structure

Lesson Overview
- Duration: 3–5 hours
- Level: Intermediate
- Scope: Organizing Go code into packages, designing public APIs, module layout conventions, testing across packages, and best practices for multi-package applications.

Learning Objectives
- Design package boundaries and public APIs for maintainability.
- Use `go mod` to structure multi-module repositories and replace directives for local development.
- Understand package visibility rules and naming conventions.
- Structure repositories for services, libraries, and CLI tools under one workspace.

Comprehensive Student Notes

1) Packages and responsibilities
- Keep packages small and focused: each package should represent a coherent responsibility (e.g., `auth`, `store`, `api`).
- Avoid monolithic packages named `util` or `helpers` — prefer domain-specific packages.

2) Exported identifiers and visibility
- Identifiers starting with uppercase are exported; lowercase are package-private.
- Design stable exported APIs: once public, changing signatures is a breaking change for consumers.

3) Project layout patterns
- Common layout for services:
   - `cmd/servicename/main.go` — entrypoint
   - `internal/` — packages for private application logic (unimportable by external modules)
   - `pkg/` — public libraries intended for reuse (optional)
   - `api/` — HTTP handlers, request/response DTOs
   - `configs/`, `migrations/`, `scripts/` — infra and tooling

4) Multi-module repositories and `replace`
- Use single `go.mod` for most apps. For larger monorepos, multiple modules help isolate dependencies.
- Use `replace ./module/path => ../local/module` during local development to iterate across modules.

5) Testing across packages
- Use external tests (`package foo_test`) to test the public API surface.
- Use `internal/` to prevent accidental external usage and ensure clear boundaries.

Instructor Video Outline (6–10 minutes)
- Explain layout choices and tradeoffs (2 minutes).
- Demo converting a single-package repo into `cmd/`, `internal/`, and `pkg/` structure (3–4 minutes).
- Show `go mod` usage with `replace` and run tests across modules (2–3 minutes).

Live Coding Demonstration

Goals: Restructure starter project to `cmd/`, `internal/store`, `api/`, and add an external API consumer package in `pkg/`.

Example layout:
```
on2code-go-foundations-starter/
├─ go.mod
├─ cmd/
│  └─ web/
│     └─ main.go
├─ internal/
│  └─ store/
│     └─ store.go
├─ api/
│  └─ handlers.go
├─ pkg/
│  └─ client/
│     └─ client.go
└─ README.md
```

Commands to run for local replace workflow:
```powershell
# inside module-a
go mod edit -replace=github.com/yourorg/module-b=../module-b
go test ./...
```

Practice Exercises
1. Move `InMemoryStore` into `internal/store` and update imports.
2. Create a `cmd/web` that wires `internal/store` and exposes HTTP handlers under `api/`.
3. Write external tests (`package store_test`) that only use exported methods to validate behavior.

Coding Challenge
1. Create a second module in the repo under `tools/` with its own `go.mod` producing a CLI; use `replace` to wire it for local development and CI to test both modules.

Quiz (8 questions)
1) Q: What is the purpose of `internal/`? A: Packages under `internal/` cannot be imported by external modules, enforcing encapsulation.
2) Q: True/False: `pkg/` is always required. A: False — it's optional, used for public libraries.
3) Q: How do you make an identifier exported? A: Start with an uppercase letter.

Answers: 1: enforce private internal APIs; 2: False; 3: Uppercase identifier.

Assignment

Objective: Restructure the starter repo into `cmd/`, `internal/`, and `api/`, and add external tests.

Requirements:
- `cmd/web/main.go` that runs the HTTP server.
- `internal/store` containing store implementation.
- `api/handlers.go` wiring endpoints to `internal/store`.
- External tests that exercise only exported package APIs.

Acceptance Criteria:
- Project builds and tests pass after restructuring. (50 pts)
- Clear separation of internal vs public code. (30 pts)
- README updated with layout explanation. (20 pts)

Next Lesson Preview
- Lesson 6: Concurrency basics — goroutines, channels, and patterns for safe concurrent programming.

## Lesson 6 — Concurrency Basics: Goroutines and Channels

Lesson Overview
- Duration: 3–5 hours
- Level: Intermediate
- Scope: Introduce goroutines, channels, synchronization, and common concurrency patterns in Go. Emphasize safe communication and patterns for backend services.

Learning Objectives
- Launch concurrent work using goroutines and manage lifecycle.
- Use channels for communication, buffering, and synchronization.
- Understand race conditions, deadlocks, and how to avoid them.
- Apply idiomatic concurrency patterns such as worker pools and fan-in/fan-out.

Comprehensive Student Notes

1) Goroutines
- Run functions concurrently with `go doWork()`.
- Goroutines are lightweight threads managed by the Go runtime.
- Always remember that goroutines may outlive the function that spawned them.

2) Channels
- Create channels with `make(chan T)`.
- Use `<-` to send and receive: `ch <- value` and `value := <-ch`.
- Buffered channels allow sending without immediate receiver (`make(chan int, 5)`).

3) Synchronization and common pitfalls
- Use `sync.WaitGroup` to wait for goroutines to finish.
- Avoid deadlocks by ensuring every send has a corresponding receive.
- Use `select` to multiplex channels and handle cancellation.

4) Concurrency patterns
- Fan-out/fan-in: multiple workers process input, combine results.
- Worker pool: fixed number of goroutines pulling tasks from a job channel.
- Cancellation: prefer `context.Context` to stop work cleanly.

Live Coding Demonstration

Goals: Build a simple worker pool that fetches data in parallel, uses a channel to collect results, and cancels remaining work on error.

Snippet (concurrency.go):

package main

import (
    "context"
    "errors"
    "fmt"
    "sync"
    "time"
)

type result struct {
    index int
    value string
    err   error
}

func worker(ctx context.Context, id int, jobs <-chan int, results chan<- result, wg *sync.WaitGroup) {
    defer wg.Done()

    for {
        select {
        case <-ctx.Done():
            return
        case job, ok := <-jobs:
            if !ok {
                return
            }
            time.Sleep(100 * time.Millisecond)
            if job == 3 {
                results <- result{index: job, err: errors.New("failed job")}
                return
            }
            results <- result{index: job, value: fmt.Sprintf("processed %d", job)}
        }
    }
}

func runWorkers(ctx context.Context, count int, jobs []int) ([]result, error) {
    var wg sync.WaitGroup
    jobChan := make(chan int)
    resultChan := make(chan result, len(jobs))

    ctx, cancel := context.WithCancel(ctx)
    defer cancel()

    for i := 0; i < count; i++ {
        wg.Add(1)
        go worker(ctx, i, jobChan, resultChan, &wg)
    }

    go func() {
        for _, job := range jobs {
            select {
            case <-ctx.Done():
                return
            case jobChan <- job:
            }
        }
        close(jobChan)
    }()

    go func() {
        wg.Wait()
        close(resultChan)
    }()

    var collected []result
    for res := range resultChan {
        if res.err != nil {
            cancel()
            return nil, res.err
        }
        collected = append(collected, res)
    }

    return collected, nil
}

Practice Exercises
1. Build a cancellable worker pool that stops all workers when one job fails.
2. Create a publisher/subscriber queue using channels and `select`.
3. Add a timeout to a long-running goroutine using `context.WithTimeout`.

Coding Challenges
1. Implement a concurrent fetcher that reads API endpoints in parallel and aggregates JSON results safely.
2. Write a map-reduce style pipeline with goroutines and channels where one stage transforms data and the next stage aggregates it.

Quiz (8 questions)
1) Q: How do you start a goroutine? A: `go function()`.
2) Q: What is a buffered channel? A: A channel with capacity that can hold sends before receives.
3) Q: True/False: `select` can wait on multiple channel operations. A: True.

Answers: 1: `go function()`; 2: channel with capacity; 3: True.

Assignment

Objective: Build a small concurrent worker pool service that processes tasks with cancellation and reporting.

Requirements:
- Worker pool implementation using goroutines and channels.
- Signal cancellation on first error using `context.Context`.
- Unit tests demonstrating correct aggregation and cancellation.

Acceptance Criteria:
- `go test ./...` passes. (50 pts)
- Concurrency is safe and deterministic. (30 pts)
- Documentation explains patterns and edge cases. (20 pts)

Next Lesson Preview
- Lesson 7: Simple HTTP services with `net/http`, routing, middleware, and request handling.

## Lesson 7 — Building Simple HTTP Services with net/http

Lesson Overview
- Duration: 3–4 hours
- Level: Intermediate
- Scope: Introduce Go's `net/http` server, request routing, handler functions, middleware patterns, JSON APIs, and graceful shutdown.

Learning Objectives
- Build HTTP handlers with `http.ResponseWriter` and `*http.Request`.
- Use `http.ServeMux` and custom routers to dispatch requests.
- Implement middleware for logging, timeouts, and request validation.
- Parse JSON request bodies and write JSON responses.
- Add basic error handling and graceful shutdown to an HTTP service.

Prerequisites
- Lessons 1–6 completed.
- Familiarity with Go functions, error handling, and concurrency basics.

Real-world Motivation
Backend services are exposed as HTTP APIs. Understanding how to build and test HTTP servers is essential for writing production-ready services, integrating with frontend apps, and exposing data to other systems.

Student Notes
### net/http fundamentals
- `net/http` is part of Go's standard library and provides a complete HTTP server implementation.
- A handler is any type implementing `ServeHTTP(ResponseWriter, *Request)`.
- Common handler functions are simple wrappers: `func(w http.ResponseWriter, r *http.Request)`.

### Request handling and routing
- The default `http.ServeMux` maps patterns to handlers.
- Use exact paths or trailing slash conventions carefully: `/health` and `/health/` are distinct patterns.
- For more advanced routing, third-party routers exist, but the standard library is enough for most services.

### Writing JSON responses
- Set `Content-Type: application/json` before writing a JSON body.
- Use `json.NewEncoder(w).Encode(data)` to serialize values safely.
- Report errors with a sensible HTTP status code and JSON error payload.

### Parsing JSON requests
- Use `json.NewDecoder(r.Body).Decode(&dest)` and close the request body when needed.
- Validate decoded input and return `http.StatusBadRequest` for malformed requests.
- Protect handlers from large request bodies using `http.MaxBytesReader`.

### Middleware patterns
- Middleware wraps handlers, enabling cross-cutting concerns like logging, authentication, or panic recovery.
- A middleware function signature often looks like:
  `func(next http.Handler) http.Handler`
- Chain middleware to apply layers consistently across routes.

### Graceful shutdown
- Use `http.Server` instead of `http.ListenAndServe` to support shutdown.
- Use `context.WithTimeout` and `server.Shutdown(ctx)` to stop accepting new requests while allowing inflight requests to finish.

## Instructor Video Outline
1. Explain the request lifecycle from client to handler.
2. Build a simple `/health` endpoint and test it.
3. Add a JSON endpoint that accepts structured input.
4. Demonstrate middleware for logging.
5. Show graceful shutdown using `http.Server` and `context`.
6. Recap why `net/http` remains the foundation for Go HTTP services.

## Live Coding Demonstration
### Example server
```go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "time"
)

type echoRequest struct {
    Message string `json:"message"`
}

type echoResponse struct {
    Message string `json:"message"`
    Received bool   `json:"received"`
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/health", healthHandler)
    mux.HandleFunc("/echo", echoHandler)

    handler := loggingMiddleware(mux)

    server := &http.Server{
        Addr:    getPort(),
        Handler: handler,
    }

    go func() {
        fmt.Printf("starting HTTP server on %s\n", server.Addr)
        if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            fmt.Fprintf(os.Stderr, "server error: %v\n", err)
            os.Exit(1)
        }
    }()

    stop := make(chan os.Signal, 1)
    signal.Notify(stop, os.Interrupt)

    <-stop
    fmt.Println("shutting down server...")

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := server.Shutdown(ctx); err != nil {
        fmt.Fprintf(os.Stderr, "shutdown error: %v\n", err)
    }
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func echoHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
        return
    }

    var req echoRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid JSON"})
        return
    }

    resp := echoResponse{Message: req.Message, Received: true}
    writeJSON(w, http.StatusOK, resp)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    _ = json.NewEncoder(w).Encode(v)
}

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        fmt.Printf("%s %s %s\n", r.Method, r.URL.Path, time.Since(start))
    })
}

func getPort() string {
    if p := os.Getenv("PORT"); p != "" {
        return ":" + p
    }
    return ":8080"
}
```

### Explanation
- `http.NewServeMux` routes requests to registered handlers.
- `loggingMiddleware` wraps the mux and records request timing.
- The server is started in a goroutine so the main thread can handle signals.
- `server.Shutdown` allows existing requests to finish before exiting.
- `writeJSON` centralizes response formatting and content type handling.

## Visual Learning Suggestions
- Diagram of HTTP request flow: client → mux → middleware → handler → response.
- Sequence diagram showing `ListenAndServe`, signal handling, and graceful shutdown.
- Table of common status codes (`200`, `400`, `404`, `405`, `500`).

## Practice Exercises
1. Add a `/version` endpoint that returns service name and version in JSON.
2. Implement `http.MaxBytesReader` in `echoHandler` to cap request body size.
3. Add a middleware that recovers from panics and returns `500`.
4. Use `http.MethodPut` and `http.MethodDelete` in a simple item API with request validation.
5. Write unit tests for `healthHandler` and `echoHandler` using `httptest`.

## Coding Challenges
1. Build a small in-memory `items` API with routes for `GET /items`, `POST /items`, and `DELETE /items/{id}`.
2. Implement a custom `statusRecorder` type to capture response status codes in middleware and log them.
3. Create a middleware that rejects requests missing a custom header like `X-Request-ID`.
4. Add a JSON error helper that uses a typed response struct and include `requestId` in the payload.
5. Write table-driven tests covering success and failure cases for your JSON POST endpoint.

## Quiz
1. Multiple Choice: What does `http.HandleFunc("/health", healthHandler)` do?
   - A) Starts the server
   - B) Registers a handler function for the `/health` path ✅
   - C) Sends a response
   - D) Reads request body
   - **Answer:** B.
2. True/False: `http.Server.Shutdown` immediately kills all running requests.
   - **Answer:** False. It allows inflight requests a grace period to finish.
3. Multiple Choice: Which type does a handler function receive?
   - A) `http.RequestWriter`
   - B) `http.Request`
   - C) `http.ResponseWriter` and `*http.Request` ✅
   - D) `net.Conn`
   - **Answer:** C.
4. Short Answer: How do you write JSON to a response in Go?
   - **Answer:** set `Content-Type`, call `json.NewEncoder(w).Encode(value)`.
5. Multiple Choice: Which status code means method not allowed?
   - A) `200`
   - B) `404`
   - C) `401`
   - D) `405` ✅
   - **Answer:** D.
6. True/False: Middleware can modify the request or response before the handler runs.
   - **Answer:** True.
7. Short Answer: Why should you validate JSON payloads before using them?
   - **Answer:** to avoid runtime errors, malformed data, and security issues.
8. Multiple Choice: What is `ServeMux` used for?
   - A) Logging requests
   - B) Routing requests to handlers ✅
   - C) Managing database connections
   - D) Formatting JSON
   - **Answer:** B.
9. Debugging: Your handler returns `404` but the path exists. What is one likely cause?
   - **Answer:** route registration mismatch or path pattern mismatch.
10. Short Answer: Why is `Content-Type: application/json` important?
    - **Answer:** it tells clients how to parse the response.

## Assignment
### Objectives
- Build a working HTTP API with routing, middleware, and tests.
- Demonstrate correct JSON handling and service shutdown.

### Requirements
- Create `main.go` with a simple HTTP server using `http.Server`.
- Add routes for `/health`, `/echo`, and at least one additional JSON endpoint.
- Implement logging middleware and panic recovery middleware.
- Write `httptest` unit tests for each handler and middleware.
- Add a `README.md` that documents how to run and test the server.

### Acceptance Criteria
- Server starts and responds correctly to expected requests.
- Handlers return proper JSON and status codes.
- Tests cover success and failure cases. (40 pts)
- Middleware is applied consistently. (30 pts)
- `README.md` includes run/test commands. (30 pts)

### Hints
- Use `http.NewServeMux` for routing.
- Keep response helpers small and reusable.
- Test malformed requests as well as valid ones.

### Common Mistakes
- Forgetting to set `Content-Type` before writing JSON.
- Ignoring request body limits.
- Not testing method restrictions or error responses.

### Submission Instructions
- Push `main.go`, handler tests, and `README.md`.
- Include sample `curl` commands and expected responses.

## Next Lesson Preview
- Lesson 8: Working with databases, SQL drivers, and GORM overview. You'll learn how backend services persist data safely and interact with relational stores.

## Lesson Overview
This lesson explains the journey of software from source code to running application. Students will learn about compilation, interpreters, execution flow, memory, and the roles of the operating system and hardware.

## Learning Objectives
- Describe the difference between source code and executable programs.
- Explain how compilers and runtimes transform code.
- Identify the key stages of program execution.
- Understand the role of memory, stack, and heap.

## Prerequisites
- Lesson 1.1 completed.
- Familiarity with the idea of writing and running code.

## Real-world Motivation
Every backend service depends on software executing reliably. Engineers need to understand how programs run so they can diagnose performance issues, fix crashes, and optimize deployment.

## Student Notes
### Source code vs executable
Source code is the human-readable instructions you write. An executable is the machine-readable program that actually runs.

### Compilation and interpretation
- Compilation converts source code into machine code ahead of time.
- Interpretation reads and executes code line by line.
- Go uses compilation to create fast, standalone binaries.

### Execution flow
- The CPU reads instructions from memory.
- The operating system loads the program into memory.
- The process has its own stack and heap.

### Stack vs heap
- Stack stores local variables, function calls, and control flow.
- Heap stores dynamic data such as arrays, objects, and allocations.

### Why this matters
Backend engineers troubleshoot crashing services and memory leaks by understanding how their code uses system resources.

### Common mistakes
- Assuming high-level code maps directly to CPU behavior.
- Ignoring how memory allocation impacts performance.
- Forgetting that functions return values to the stack.

## Instructor Video Outline
1. Introduction: why execution matters for backend systems.
2. Explain source code, compiler, and binary.
3. Visualize stack and heap with diagrams.
4. Show a simple Go compile-run cycle.
5. Recap and transition to binary data.
6. Assignment introduction.

## Live Coding Demonstration
```go
package main

import "fmt"

func main() {
    message := "Go is compiled"
    fmt.Println(message)
}
```
- Explain package declaration and imports.
- Show `go build` producing a binary.
- Run `./main` or `main.exe` and observe output.
- Describe how the OS loads the binary into memory.

## Visual Learning Suggestions
- Stack diagram with `main()` calling functions.
- Heap diagram with dynamically allocated buffers.
 - Compilation pipeline from source to binary.

## Practice Exercises
1. Write the compilation steps in your own words.
2. Label a diagram for source, compiler, binary, and CPU.
3. Describe one difference between stack and heap.
4. Explain why Go programs usually start faster than Java programs.
5. Identify a real system where understanding execution flow would help fix a bug.

## Coding Challenges
1. Create `compile_flow.md` describing how Go source becomes a binary.
2. Write a `hello.go` program with a comment for each line.
3. Build a simple executable and note the binary size.
4. Add a second function and explain how the stack changes.
5. Compare two programs: one with a large slice and one with local variables.

## Quiz
1. Multiple Choice: What does `go build` do?
   - A) Runs tests
   - B) Compiles source into a binary ✅
   - C) Uploads code
   - D) Starts a server
   - **Answer:** B.
2. True/False: The stack is used for dynamic memory allocation.
   - **Answer:** False. The heap is used for dynamic memory.
3. Multiple Choice: Which is true about Go?
   - A) It is interpreted
   - B) It produces native binaries ✅
   - C) It requires a JVM
   - D) It cannot be compiled
   - **Answer:** B.
4. Short Answer: What role does the operating system play when a program starts?
   - **Answer:** It loads the binary into memory, sets up process resources, and begins execution.
5. Debugging: If a program crashes on start, what are two likely causes?
   - **Answer:** missing dependencies, invalid memory access, bad environment variables.
6. Multiple Choice: Where are local function variables stored?
   - A) Heap
   - B) Stack ✅
   - C) Database
   - D) Disk
   - **Answer:** B.
7. True/False: A binary executable contains only human-readable code.
   - **Answer:** False.
8. Short Answer: Why does backend engineering benefit from compiled languages?
   - **Answer:** because they provide speed, smaller runtime overhead, and simpler deployment.
9. Multiple Choice: Which of these is an example of a runtime action?
   - A) Writing source code
   - B) Loading a binary into memory ✅
   - C) Editing a file
   - D) Committing code
   - **Answer:** B.
10. Short Answer: What is the difference between `go run` and `go build`?
    - **Answer:** `go run` compiles and executes in one step; `go build` only creates a binary.

## Assignment
### Objectives
- Describe the Go execution model.
- Demonstrate compiling and running Go programs.
- Produce a reference note explaining stack and heap.

### Requirements
- Add `execution-flow.md` to the module repository.
- Include a `go-build` example and output.
- Add a diagram of stack vs heap.
- Write a short explanation of how the OS loads a Go program.
- Commit changes in a separate branch.

### Acceptance Criteria
- `execution-flow.md` contains accurate execution steps.
- Example code compiles and runs.
- Diagrams clearly differentiate stack and heap.

### Marking Rubric
- Accuracy: 40%
- Clarity of diagrams: 30%
- Code execution: 20%
- Git workflow: 10%

### Hints
- Use `go run` for quick testing and `go build` for compilation.
- Capture the binary file name after building.
- Keep the diagram simple and label memory regions.

### Common Mistakes
- Missing the OS role in loading binaries.
- Confusing stack and heap usage.
- Forgetting to include build output.

### Submission Instructions
- Push the branch to GitHub.
- Add `execution-flow.md` to the repository.
- Include the compiled `hello` command output.

## GitHub Project
### Repository Name
`on2code-foundations-journal`

### Folder Structure
```
backend-facts/
  execution-flow.md
  hello.go
  README.md
  diagrams/
    stack-vs-heap.png
    compile-pipeline.png
```

### README
- Add a section explaining compilation vs runtime.
- List files and how to run the example.

### Expected Output
A small notes repository with diagrams, a sample Go program, and a documented explanation of execution flow.

### Commit Milestones
- `add execution flow notes`
- `add stack vs heap diagram`
- `add go build example`

### Branch Strategy
- `module-1-execution`
- `main`

### Pull Request Instructions
- Title: `Add execution flow notes and Go build example`
- Description: `Document Go runtime flow with code and diagrams.`

## Automated Tests
### Testing Requirements
- Confirm `go run hello.go` prints expected text.
- Validate `execution-flow.md` contains both stack and heap explanations.
- Ensure diagrams are present in the repository.

### Expected Results
- No runtime errors.
- Clear memory region descriptions.

## Lesson Summary
Software is not just text: it is a sequence of instructions that the operating system and CPU execute. Understanding compilation, memory, and execution flow is essential to building reliable backend systems.

## Next Lesson Preview
Lesson 1.3 will teach computer science thinking, introducing problem decomposition, abstraction, algorithms, and how engineers reason about code.

---

# Lesson 1.3: Computer Science Thinking for Engineers

## Lesson Overview
This lesson teaches the engineering mindset needed to solve backend problems systematically. Students learn abstraction, decomposition, algorithmic thinking, and practical debugging strategies.

## Learning Objectives
- Define problem decomposition and abstraction.
- Apply algorithmic thinking to backend tasks.
- Use step-by-step reasoning to debug software.
- Identify edge cases and defend design decisions.

## Prerequisites
- Lessons 1.1 and 1.2 completed.
- Basic understanding of code execution.

## Real-world Motivation
Every professional backend engineer must solve complex problems, break them into manageable pieces, and choose the right abstractions. This is what separates a developer from an engineer.

## Student Notes
### Problem decomposition
Break a big problem into smaller modules. Example: processing a user registration request can be split into validation, persistence, and notification.

### Abstraction
Abstraction means hiding complexity behind a stable interface. For example, a `UserStore` interface hides whether data is stored in PostgreSQL, Redis, or a file.

### Algorithmic thinking
Algorithms are recipes for solving problems. Backend engineers use algorithms for sorting, searching, pagination, throttling, and scheduling.

### Debugging strategies
- Reproduce the problem reliably.
- Read logs and trace execution.
- Narrow the scope of failure.
- Check assumptions and inspect data.

### Practical advice
- Write small, testable functions.
- Prefer clarity over cleverness.
- Use examples to validate logic.

## Instructor Video Outline
1. Introduction to engineering thinking.
2. Explain decomposition with a real backend example.
3. Show abstraction using interfaces.
4. Live debugging example with a simple bug.
5. Recap and assign practice.

## Live Coding Demonstration
```go
package main

import "fmt"

type Task struct {
    ID   int
    Name string
}

func fetchTasks() []Task {
    return []Task{{ID: 1, Name: "Restore database"}, {ID: 2, Name: "Implement API"}}
}

func formatTaskNames(tasks []Task) []string {
    names := make([]string, 0, len(tasks))
    for _, task := range tasks {
        names = append(names, task.Name)
    }
    return names
}

func main() {
    tasks := fetchTasks()
    names := formatTaskNames(tasks)
    fmt.Println(names)
}
```
- Explain each function as a separate responsibility.
- Describe how `formatTaskNames` abstracts iteration.
- Introduce a bug: change `len(tasks)` to `len(names)` and debug.

## Visual Learning Suggestions
- Flowchart for request decomposition.
- Diagram of abstraction layers.
- Debugging tree showing hypothesis, evidence, and fix.

## Practice Exercises
1. Split a login feature into at least three smaller tasks.
2. Describe an abstraction from a service you use every day.
3. List three debugging questions to ask when an API fails.
4. Write pseudocode for searching a user in a list.
5. Identify edge cases for email validation.

## Coding Challenges
1. Create a function that filters requests by status.
2. Write a safe function to parse integers from strings.
3. Design an interface for a notification sender.
4. Implement a step-by-step calculator for request cost.
5. Write a small program that prints only tasks with even IDs.

## Quiz
1. Multiple Choice: What is decomposition?
   - A) Combining functions
   - B) Breaking a problem into smaller parts ✅
   - C) Deleting code
   - D) Running tests
   - **Answer:** B.
2. True/False: Abstraction increases complexity for users.
   - **Answer:** False. Abstraction simplifies usage.
3. Multiple Choice: Which is an example of a backend abstraction?
   - A) CSS class
   - B) `UserStore` interface ✅
   - C) HTML button
   - D) JSON payload
   - **Answer:** B.
4. Short Answer: Why should engineers test assumptions?
   - **Answer:** Because incorrect assumptions often cause bugs.
5. Debugging: What is the first step when a function returns wrong data?
   - **Answer:** Reproduce the problem and inspect inputs.
6. Multiple Choice: Which strategy helps when code is hard to understand?
   - A) Rename variables clearly ✅
   - B) Add more nested loops
   - C) Remove comments
   - D) Use fewer functions
   - **Answer:** A.
7. True/False: A good backend function should do as much as possible.
   - **Answer:** False. It should do one clear job.
8. Short Answer: Name one benefit of abstraction.
   - **Answer:** It hides complexity and makes code easier to change.
9. Multiple Choice: What does algorithmic thinking focus on?
   - A) Graphic design
   - B) Step-by-step solutions ✅
   - C) Marketing
   - D) Color theory
   - **Answer:** B.
10. Short Answer: What is an edge case?
    - **Answer:** A rare input or condition that a program must handle.

## Assignment
### Objectives
- Practice decomposition and abstraction.
- Build a small Go utility with a clean structure.
- Document the design decisions.

### Requirements
- Add `design-notes.md` with a decomposition breakdown.
- Create `task_formatter.go` with a `Task` type and formatting function.
- Add `main.go` that uses the formatter.
- Write a short justification for your design.

### Acceptance Criteria
- Code is separated into clear functions.
- Design notes explain each responsibility.
- Program output matches expectations.

### Marking Rubric
- Structure: 40%
- Explanation: 30%
- Functionality: 20%
- Code readability: 10%

### Hints
- Keep each function focused.
- Name things for intent.
- Use comments to explain the abstraction.

### Common Mistakes
- Putting too much logic in `main()`.
- Using vague variable names.
- Not documenting design choices.

### Submission Instructions
- Commit `task_formatter.go`, `main.go`, and `design-notes.md`.
- Push branch `module-1-thinking`.

## GitHub Project
### Repository Name
`on2code-foundations-journal`

### Folder Structure
```
module-1-thinking/
  design-notes.md
  main.go
  task_formatter.go
```

### README
- Document the decomposition process.
- Explain why the chosen functions exist.

### Expected Output
The program prints formatted task names.

### Commit Milestones
- `add task formatter`
- `document decomposition`
- `add main entrypoint`

### Branch Strategy
- `module-1-thinking`
- `main`

### Pull Request Instructions
- Title: `Add task formatter and design notes`
- Description: `Introduces abstraction in a small Go utility.`

## Automated Tests
### Requirements
- Validate that `task_formatter.go` returns expected string slices.
- Confirm `main.go` outputs correctly.
- Check `design-notes.md` explains decomposition.

### Expected Results
- No runtime issues.
- Clean function separation.

## Lesson Summary
This lesson teaches the mindset behind engineering: breaking problems down, hiding complexity, and debugging systematically. It prepares students to build clean backend systems.

## Next Lesson Preview
Lesson 1.4 will cover binary and data representation, explaining exactly how computers store the values your code uses.

---

# Lesson 1.4: Binary and Data Representation

## Lesson Overview
Students learn how computers represent numbers, text, and structured data in binary. This lesson focuses on bit patterns, numeric systems, character encodings, and the foundations of data serialization.

## Learning Objectives
- Convert between decimal, binary, and hexadecimal.
- Explain how integers and floating-point numbers are stored.
- Describe ASCII and UTF-8 encodings.
- Understand why data representation matters for backend systems.

## Prerequisites
- Lessons 1.1 through 1.3 completed.
- Familiarity with basic arithmetic.

## Real-world Motivation
Backend engineers must make data storage and communication reliable. Knowing binary representation helps prevent bugs such as integer overflow, encoding errors, and corrupted API payloads.

## Student Notes
### Binary basics
Computers use bits: 0 or 1. Eight bits make a byte. Binary is the native language of hardware.

### Number systems
- Decimal uses base 10.
- Binary uses base 2.
- Hexadecimal uses base 16 and is convenient for representing bytes.

### Integer representation
- Unsigned integers represent only non-negative values.
- Signed integers use two's complement to represent negative numbers.
- Overflow happens when values exceed the representable range.

### Floating points
- Floating-point numbers use a sign bit, exponent, and mantissa.
- They are approximate, not exact.
- Backend engineers use floats carefully for money and precision-sensitive data.

### Text encodings
- ASCII encodes 128 characters.
- UTF-8 encodes the entire Unicode set and is the standard for APIs.
- A single character may take one or more bytes.

### Practical implications
- Use `int64` for large counters.
- Use UTF-8 for API text data.
- Avoid storing currency in floats.

## Instructor Video Outline
1. Explain bits, bytes, and why binary matters.
2. Convert between decimal and binary on screen.
3. Demonstrate UTF-8 encoding for text.
4. Show a bug caused by integer overflow.
5. Recap data representation rules.

## Live Coding Demonstration
```go
package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    n := 2026
    fmt.Printf("Decimal: %d\n", n)
    fmt.Printf("Binary: %b\n", n)
    fmt.Printf("Hex: %x\n", n)

    text := "Go"
    fmt.Printf("Text bytes: %v\n", []byte(text))
    fmt.Printf("Rune count: %d\n", utf8.RuneCountInString(text))
}
```
- Explain `%b` and `%x` formatting.
- Show byte values of the string.
- Discuss how `utf8.RuneCountInString` counts characters.

## Visual Learning Suggestions
- Table converting decimal, binary, and hex.
- Diagram of two's complement bits.
- Unicode codepoint chart.

## Practice Exercises
1. Convert `13` to binary and hex.
2. Write the binary for `255`.
3. Explain why `int8` can only hold values from -128 to 127.
4. List three differences between `ASCII` and `UTF-8`.
5. Describe why storing money in a float is risky.

## Coding Challenges
1. Write a Go function that prints decimal, binary, and hex for a number.
2. Create a program that counts bytes and runes in a string.
3. Implement a function that checks whether a number fits in `int16`.
4. Write a small utility that converts a string to a UTF-8 byte sequence.
5. Create a program that demonstrates two's complement for negative numbers.

## Quiz
1. Multiple Choice: How many bits are in a byte?
   - A) 4
   - B) 8 ✅
   - C) 16
   - D) 32
   - **Answer:** B.
2. True/False: Hexadecimal is base 16.
   - **Answer:** True.
3. Multiple Choice: What does `%b` print in Go?
   - A) Decimal
   - B) Binary ✅
   - C) Hex
   - D) Text
   - **Answer:** B.
4. Short Answer: What is two's complement used for?
   - **Answer:** representing signed integers.
5. Multiple Choice: Which encoding should APIs use for text?
   - A) ASCII
   - B) UTF-8 ✅
   - C) EBCDIC
   - D) Latin-1
   - **Answer:** B.
6. True/False: A UTF-8 character always occupies one byte.
   - **Answer:** False.
7. Short Answer: Why avoid floats for money?
   - **Answer:** they are imprecise and can round unexpectedly.
8. Multiple Choice: What is the highest value `uint8` can hold?
   - A) 255 ✅
   - B) 128
   - C) 512
   - D) 1024
   - **Answer:** A.
9. Debugging: If text appears garbled in an API response, what is a likely cause?
   - **Answer:** incorrect character encoding.
10. Short Answer: Convert `1010` from binary to decimal.
    - **Answer:** 10.

## Assignment
### Objectives
- Build a data representation reference.
- Practice converting values across number systems.
- Understand text encoding and memory representation.

### Requirements
- Add `binary-primer.md` with binary, hexadecimal, and ASCII examples.
- Add `data-representation.go` that prints conversions for at least three numbers and one string.
- Document why UTF-8 is important for APIs.

### Acceptance Criteria
- Conversions are correct.
- UTF-8 explanation is accurate.
- The Go program runs without errors.

### Marking Rubric
- Correctness: 50%
- Clarity: 30%
- Code execution: 20%

### Hints
- Use Go's `fmt` formatting verbs.
- Include a comment explaining each conversion.

### Common Mistakes
- Mixing up decimal and hexadecimal prefixes.
- Forgetting that `[]byte("Go")` returns byte values.
- Writing inaccurate UTF-8 descriptions.

### Submission Instructions
- Push `binary-primer.md` and `data-representation.go`.
- Include sample command output in the README.

## GitHub Project
### Repository Name
`on2code-foundations-journal`

### Folder Structure
```
module-1-binary/
  binary-primer.md
  data-representation.go
  README.md
```

### Expected Output
A note repository with number system conversions and a Go program demonstrating binary and UTF-8.

### Commit Milestones
- `add binary primer`
- `add data representation program`

### Branch Strategy
- `module-1-binary`

### Pull Request Instructions
- Title: `Add binary representation notes and example program`
- Description: `Document binary, hex, and UTF-8 with a Go sample.`

## Automated Tests
### Requirements
- Confirm the conversion program prints correct values.
- Validate `binary-primer.md` contains examples for decimal, binary, and hex.

### Expected Results
- No runtime errors.
- Accurate conversion output.

## Lesson Summary
Binary and data representation are the foundation of how computers understand and manipulate values. Backend engineers must master these concepts to avoid data corruption and design reliable systems.

## Next Lesson Preview
Lesson 1.5 will explore computer architecture fundamentals and show how memory, CPU, and input/output work together.

---

# Lesson 1.5: Computer Architecture Basics

## Lesson Overview
This lesson describes the main components of computer hardware and how they support software execution. Students will learn about CPU, memory, storage, buses, and how servers differ from personal devices.

## Learning Objectives
- Identify CPU, RAM, disk, and network subsystems.
- Explain the role of the operating system in coordinating hardware.
- Understand how backend servers differ from client machines.
- Describe the concept of a request cycle through hardware.

## Prerequisites
- Lessons 1.1 through 1.4 completed.
- Basic understanding of binary and execution flow.

## Real-world Motivation
Backend systems run on servers, virtual machines, and containers. Engineers who understand hardware are better equipped to optimize performance, choose the right instance types, and troubleshoot bottlenecks.

## Student Notes
### CPU
The CPU executes instructions and controls the system. It performs arithmetic, logic, and control flow.

### Memory
RAM stores data and code while programs run. It's fast but temporary.

### Storage
Disk and SSD provide long-term storage. They are slower than RAM but persist data.

### Buses and I/O
Buses carry data between CPU, memory, and peripherals. Network I/O connects a server to users.

### Server characteristics
- Designed for uptime.
- Often deployed in data centers.
- May use virtualization or containers.

### Why it matters
Backend engineers choose instance sizes, optimize memory usage, and diagnose slow requests by understanding hardware.

## Instructor Video Outline
1. Introduce CPU, memory, storage, and network.
2. Explain a server request cycle.
3. Compare a laptop and a cloud server.
4. Visualize how backend services use hardware.
5. Recap and preview operating systems.

## Live Coding Demonstration
- This lesson is primarily conceptual, but show how `runtime.NumCPU()` works in Go.

```go
package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Printf("CPUs: %d\n", runtime.NumCPU())
    fmt.Printf("Go routines available: %d\n", runtime.GOMAXPROCS(0))
}
```
- Explain why CPU count matters for concurrent backend services.
- Relate runtime information to server capacity.

## Visual Learning Suggestions
- Diagram of CPU, RAM, disk, and network.
- Server rack illustration.
- Request latency timeline through hardware.

## Practice Exercises
1. List the components inside a server.
2. Explain why RAM is faster than disk.
3. Describe one reason cloud servers are used for backend systems.
4. Identify what `runtime.NumCPU()` returns.
5. Explain why network bandwidth affects backend performance.

## Coding Challenges
1. Build a Go program that prints CPU and memory stats.
2. Create a simple script that compares available memory to a threshold.
3. Write a program that simulates request processing time based on CPU cores.
4. Implement a small benchmark that measures a loop speed.
5. Use Go to print environment variables related to deployments.

## Quiz
1. Multiple Choice: Which component executes instructions?
   - A) RAM
   - B) CPU ✅
   - C) Disk
   - D) Network
   - **Answer:** B.
2. True/False: Disk storage is faster than RAM.
   - **Answer:** False.
3. Multiple Choice: What does `runtime.NumCPU()` report?
   - A) Number of disks
   - B) Number of logical CPUs ✅
   - C) Amount of RAM
   - D) Network speed
   - **Answer:** B.
4. Short Answer: Why do backend servers use virtualization or containers?
   - **Answer:** for isolation, portability, and efficient resource use.
5. Multiple Choice: What is a key feature of server hardware?
   - A) Low uptime
   - B) High availability ✅
   - C) Small battery
   - D) Touchscreen
   - **Answer:** B.
6. True/False: The network is part of hardware influence on backend performance.
   - **Answer:** True.
7. Short Answer: Name one difference between RAM and disk.
   - **Answer:** RAM is volatile and fast; disk is persistent and slower.
8. Multiple Choice: Which bus carries data between CPU and RAM?
   - A) USB
   - B) Memory bus ✅
   - C) HDMI
   - D) Audio bus
   - **Answer:** B.
9. Debugging: A backend service is slow but CPU is idle. What hardware area should you inspect?
   - **Answer:** memory, disk I/O, or network.
10. Short Answer: Why does a backend engineer need to understand hardware?
    - **Answer:** to optimize performance and make informed infrastructure decisions.

## Assignment
### Objectives
- Document hardware concepts for backend systems.
- Correlate server components with software behavior.
- Build a small Go utility to inspect runtime environment.

### Requirements
- Add `architecture-notes.md` describing CPU, RAM, storage, and network.
- Create `runtime-inspector.go` that prints CPU and some environment variables.
- Include a paragraph explaining what the output means.

### Acceptance Criteria
- Notes contain accurate definitions.
- Go utility executes successfully.
- Explanation links runtime info to backend architecture.

### Marking Rubric
- Accuracy: 40%
- Relevance: 30%
- Execution: 20%
- Explanation: 10%

### Hints
- Use `runtime` and `os` packages.
- Keep notes structured by hardware component.

### Common Mistakes
- Confusing RAM with disk.
- Ignoring network impact.
- Providing vague runtime interpretations.

### Submission Instructions
- Push `architecture-notes.md` and `runtime-inspector.go`.
- Include sample command output in the README.

## GitHub Project
### Repository Name
`on2code-foundations-journal`

### Folder Structure
```
module-1-architecture/
  architecture-notes.md
  runtime-inspector.go
  README.md
```

### Expected Output
A notes repository explaining hardware components and runtime inspection.

### Commit Milestones
- `add architecture notes`
- `add runtime inspector`

### Branch Strategy
- `module-1-architecture`

### Pull Request Instructions
- Title: `Add hardware architecture notes and runtime inspector`
- Description: `Document server architecture and inspect runtime details.`

## Automated Tests
### Requirements
- Ensure the program prints CPU and relevant environment settings.
- Confirm `architecture-notes.md` contains definitions for CPU, RAM, disk, and network.

### Expected Results
- No execution errors.
- Clear architectural explanations.

## Lesson Summary
Understanding hardware components helps backend engineers build systems that align with the capabilities and limits of the servers they run on.

## Next Lesson Preview
Lesson 1.6 will focus on operating systems and command-line workflows, teaching students how to manage servers and developer environments.

---

# Lesson 1.6: Operating Systems and the Command Line

## Lesson Overview
This lesson introduces operating systems, shell commands, text files, and basic system administration tasks. Students learn practical terminal skills that backend engineers use daily.

## Learning Objectives
- Explain the role of an operating system.
- Use terminal commands to navigate files and directories.
- Read and edit text files from the command line.
- Understand process management basics.

## Prerequisites
- Lessons 1.1 through 1.5 completed.
- Access to a terminal on Windows, macOS, or Linux.

## Real-world Motivation
Backend engineers often work on remote servers, automate tasks, and deploy services through the terminal. Becoming comfortable with shell tools is essential for productivity and troubleshooting.

## Student Notes
### Operating system role
The OS manages hardware, runs applications, provides file systems, and isolates processes. It acts as the bridge between software and hardware.

### Shell commands
Common commands include `ls`, `cd`, `pwd`, `cat`, `mkdir`, `rm`, `touch`, and `echo`.

### Files and permissions
Files store data and programs. Permissions control who can read, write, or execute a file.

### Process management
Processes are running programs. Commands like `ps`, `top`, and `kill` help inspect and control them.

### Why it matters
Backend engineers use the command line to deploy apps, inspect logs, and manage services. Knowing these tools speeds up debugging and deployment.

## Instructor Video Outline
1. Define what an operating system does.
2. Demonstrate basic shell navigation.
3. Show how to open and inspect text files.
4. Illustrate process listing and simple process control.
5. Recap with key commands and safety tips.

## Live Coding Demonstration
- In the terminal, create a folder, write a file, and read it.
- Example commands:
  - `mkdir on2code-foundations`
  - `cd on2code-foundations`
  - `echo "Hello" > notes.txt`
  - `cat notes.txt`
- Explain how these commands map to file system operations.

## Visual Learning Suggestions
- Diagram of OS layers: kernel, shell, applications.
- File system tree example.
- Process lifecycle chart.

## Practice Exercises
1. Use the terminal to create a folder and a file.
2. Print the current directory using a command.
3. Display file contents without a GUI editor.
4. Rename or move a file with a terminal command.
5. Describe the difference between a process and a program.

## Coding Challenges
1. Write a shell script that creates a `module-1` folder and a `README.md` file.
2. Create a command alias for printing `go version`.
3. Build a command sequence that lists files and sorts them by modification time.
4. Use the terminal to append text to an existing file.
5. Write a one-line command that counts the number of Go source files in the current folder.

## Quiz
1. Multiple Choice: What does `pwd` display?
   - A) Process ID
   - B) Current working directory ✅
   - C) Project version
   - D) File permissions
   - **Answer:** B.
2. True/False: `mkdir` creates a new directory.
   - **Answer:** True.
3. Multiple Choice: Which command shows running processes?
   - A) `ls`
   - B) `ps` ✅
   - C) `cd`
   - D) `cat`
   - **Answer:** B.
4. Short Answer: How do you display a file's contents in the terminal?
   - **Answer:** use `cat` or `less`.
5. Multiple Choice: Which command removes a file?
   - A) `rm` ✅
   - B) `mkdir`
   - C) `cp`
   - D) `mv`
   - **Answer:** A.
6. True/False: File permissions are only important on Windows.
   - **Answer:** False.
7. Short Answer: What is a shell?
   - **Answer:** a program that interprets user commands and interacts with the OS.
8. Multiple Choice: Which command prints environment variables?
   - A) `env` ✅
   - B) `grep`
   - C) `git`
   - D) `ls`
   - **Answer:** A.
9. Debugging: Your command returns "Permission denied." What is one likely cause?
   - **Answer:** attempting to read or execute a file without permission.
10. Short Answer: Why do backend engineers use the command line?
    - **Answer:** for speed, remote work, automation, and direct system access.

## Assignment
### Objectives
- Practice terminal commands and OS concepts.
- Create a reproducible development folder structure.
- Document command-line workflows.

### Requirements
- Add `terminal-cheatsheet.md` with at least 10 commands.
- Create `setup.sh` or `setup.ps1` that initializes the module folder and sample files.
- Add a short explanation of the OS role.

### Acceptance Criteria
- Cheatsheet includes commands and descriptions.
- Setup script runs without errors.
- Notes explain why each command is useful.

### Marking Rubric
- Accuracy: 40%
- Utility: 30%
- Execution: 20%
- Readability: 10%

### Hints
- Include commands for directory navigation, file operations, and process inspection.
- Keep the setup script idempotent.

### Common Mistakes
- Writing commands only for one OS without noting alternatives.
- Forgetting to include command descriptions.
- Creating a setup script that fails on execution.

### Submission Instructions
- Push `terminal-cheatsheet.md` and the setup script.
- Include shell output or screenshots in the README.

## GitHub Project
### Repository Name
`on2code-foundations-journal`

### Folder Structure
```
module-1-shell/
  terminal-cheatsheet.md
  setup.sh
  README.md
```

### Expected Output
A notes repository with terminal commands and an initialization script.

### Commit Milestones
- `add terminal cheatsheet`
- `add setup script`

### Branch Strategy
- `module-1-shell`

### Pull Request Instructions
- Title: `Add OS command line notes and setup script`
- Description: `Document shell workflows and automate module setup.`

## Automated Tests
### Requirements
- Ensure the setup script runs successfully.
- Confirm the cheatsheet contains at least 10 commands.

### Expected Results
- Script executes without errors.
- Cheatsheet is complete and readable.

## Lesson Summary
This lesson builds essential command-line fluency and operating system awareness, skills backend engineers use daily for development and operations.

## Next Lesson Preview
Lesson 1.7 will teach Git and professional source control, including branching, commits, and collaboration workflows.

---

# Lesson 1.7: Git and Professional Source Control

## Lesson Overview
Students learn Git fundamentals and professional workflows for version control. This lesson covers repositories, commits, branches, merges, and collaboration best practices.

## Learning Objectives
- Initialize a Git repository and make commits.
- Use branches for feature development.
- Understand the role of remote repositories and pull requests.
- Follow clean commit message conventions.

## Prerequisites
- Lessons 1.1 through 1.6 completed.
- Access to Git installed locally.

## Real-world Motivation
Git is the standard tool for software collaboration. Backend engineers use Git every day to share code, track changes, and manage release branches.

## Student Notes
### What is Git?
Git is a distributed version control system that tracks changes to files and allows collaboration across teams.

### Key concepts
- Repository: the storage for your project.
- Commit: a snapshot of changes.
- Branch: an independent line of development.
- Merge: combining changes from one branch into another.

### Remote workflows
- `origin` is the default remote repository.
- `git push` uploads commits.
- `git pull` fetches and merges remote changes.
- Pull requests are reviewable changes before merging.

### Professional practices
- Keep commits small and focused.
- Write descriptive commit messages.
- Use branches for features, fixes, and experiments.

### Interview tip
Describe a workflow where you create a branch, make changes, run tests, then open a pull request for review.

## Instructor Video Outline
1. Introduce Git and why it matters.
2. Demonstrate `git init` and the first commit.
3. Show branching and merging.
4. Explain remote workflows and pull requests.
5. Recap best practices for commit messages.

## Live Coding Demonstration
- In terminal:
  - `git init`
  - `git add .`
  - `git commit -m "init module 1 foundation journal"`
  - `git checkout -b module-1-git`
  - Modify a file and commit again.
  - Show `git status`, `git log --oneline`.

## Visual Learning Suggestions
- Diagram of Git branches and merges.
- Timeline of commits in a repository.
- Remote vs local repo illustration.

## Practice Exercises
1. Initialize a Git repository and create three commits.
2. Create a branch and switch to it.
3. Merge a feature branch back into `main`.
4. Rewrite a bad commit message using `git commit --amend`.
5. Explain the difference between `git fetch` and `git pull`.

## Coding Challenges
1. Create a feature branch and add a new file.
2. Simulate a merge conflict and resolve it.
3. Use `git diff` to inspect changes before committing.
4. Create a `main` branch and a `dev` branch, then rebase `dev` onto `main`.
5. Set up a remote repository and push your branch.

## Quiz
1. Multiple Choice: What does `git status` show?
   - A) disk usage
   - B) current repository state ✅
   - C) environment variables
   - D) compiler errors
   - **Answer:** B.
2. True/False: `git commit` saves a snapshot of tracked files.
   - **Answer:** True.
3. Multiple Choice: What is a branch used for?
   - A) compiling code
   - B) isolating work ✅
   - C) deleting files
   - D) running tests
   - **Answer:** B.
4. Short Answer: What does `git push` do?
   - **Answer:** uploads commits to a remote repository.
5. Multiple Choice: Which command creates a new branch?
   - A) `git merge`
   - B) `git branch` ✅
   - C) `git init`
   - D) `git pull`
   - **Answer:** B.
6. True/False: Merge conflicts occur when two branches modify the same lines.
   - **Answer:** True.
7. Short Answer: Why are descriptive commit messages important?
   - **Answer:** They make history easier to understand and review.
8. Multiple Choice: Which command updates local repo from remote without merging?
   - A) `git pull`
   - B) `git fetch` ✅
   - C) `git commit`
   - D) `git init`
   - **Answer:** B.
9. Debugging: Your merge fails due to conflict. What is the first thing to do?
   - **Answer:** inspect conflicting files and resolve the changes manually.
10. Short Answer: What is a pull request?
    - **Answer:** a request to merge branch changes after review.

## Assignment
### Objectives
- Practice Git workflows and commit discipline.
- Use branches for module work.
- Document your development process.

### Requirements
- Create branch `module-1-git`.
- Add `git-workflow.md` describing your branch strategy.
- Make at least five commits with clear messages.
- Push branch to a remote repository.

### Acceptance Criteria
- Branch exists with at least five commits.
- Workflow document explains steps and naming conventions.
- Remote repository includes the branch.

### Marking Rubric
- Branching strategy: 40%
- Commit quality: 30%
- Documentation: 20%
- Remote setup: 10%

### Hints
- Use `git log --oneline` to review commit history.
- Keep each commit focused on a single change.

### Common Mistakes
- Making one giant commit for the entire lesson.
- Using vague messages like `update files`.
- Not creating a feature branch.

### Submission Instructions
- Push `module-1-git` to GitHub.
- Submit the repo link and branch name.

## GitHub Project
### Repository Name
`on2code-foundations-journal`

### Folder Structure
```
module-1-git/
  git-workflow.md
  README.md
```

### Expected Output
A repository branch with a clear commit history and documented workflow.

### Commit Milestones
- `add git workflow notes`
- `create module-1-git branch`
- `document branch practice`

### Branch Strategy
- `module-1-git`
- `main`

### Pull Request Instructions
- Title: `Add Git workflow documentation`
- Description: `Document branch and commit strategy.`

## Automated Tests
### Requirements
- Verify commit history has at least five commits.
- Confirm `git-workflow.md` contains branch strategy notes.

### Expected Results
- Clear commit history.
- Complete workflow documentation.

## Lesson Summary
Git is the foundation of professional collaboration. This lesson prepares students to work with branches, commits, and remote repositories like real engineering teams.

## Next Lesson Preview
Lesson 1.8 will install Go, configure tooling, and compile the first Go program from the terminal.

---

# Lesson 1.8: Installing Go and Your First Go Program

## Lesson Overview
This lesson walks students through installing Go, setting environment variables, and building the first Go program. It establishes a working Go development environment and verifies the toolchain.

## Learning Objectives
- Install the Go toolchain on Windows, macOS, or Linux.
- Verify installation with `go version`.
- Create and run a simple Go program.
- Understand `GOPATH`, modules, and basic project structure.

## Prerequisites
- Lessons 1.1 through 1.7 completed.
- Access to a computer with internet connection.

## Real-world Motivation
A reliable Go environment is essential for backend development. This lesson eliminates setup friction and helps students start coding quickly.

## Student Notes
### Installing Go
Download the installer from golang.org and follow platform-specific instructions.

### Toolchain basics
- `go version` verifies installation.
- `go env` shows environment variables.
- `go run` executes a Go program.
- `go build` compiles a binary.

### Go workspace
- Modern Go uses modules with `go.mod`.
- `GOPATH` is still useful for legacy projects, but modules are recommended.

### First program structure
- `package main` defines an executable program.
- `func main()` is the entry point.
- `fmt.Println()` prints output.

### Why it matters
A working environment is the first prerequisite for any learning experience. Backend engineers need reproducible setup instructions and stable tooling.

## Instructor Video Outline
1. Show the Go download page and installation steps.
2. Verify installation with `go version`.
3. Create `hello.go` and run it.
4. Explain `go.mod` and initialize a module.
5. Recap installation and troubleshooting tips.

## Live Coding Demonstration
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, On2Code Backend Engineer!")
}
```
- Save as `hello.go`.
- Run `go run hello.go`.
- Initialize a module with `go mod init on2code-foundations`.
- Build with `go build` and run the binary.

## Visual Learning Suggestions
- Diagram of Go toolchain: source → compile → binary.
- Flowchart of `go run` vs `go build`.

## Practice Exercises
1. Install Go and record the version output.
2. Create and run `hello.go`.
3. Initialize a Go module and inspect `go.mod`.
4. Build a binary and run it from the terminal.
5. List the commands required to compile a Go program.

## Coding Challenges
1. Create a `hello.go` program that prints your name.
2. Add a second file `utils.go` and call a helper function from `main.go`.
3. Use `go fmt` to format your code automatically.
4. Create a module named `on2code-foundations` and inspect dependency settings.
5. Build a binary for your platform and verify it executes.

## Quiz
1. Multiple Choice: What command shows the Go version?
   - A) `go run`
   - B) `go version` ✅
   - C) `go build`
   - D) `go fmt`
   - **Answer:** B.
2. True/False: `package main` is required for executable programs.
   - **Answer:** True.
3. Multiple Choice: Which file defines a Go module?
   - A) `main.go`
   - B) `go.mod` ✅
   - C) `README.md`
   - D) `package.json`
   - **Answer:** B.
4. Short Answer: What does `go run` do?
   - **Answer:** compiles and executes a Go program.
5. Multiple Choice: Which command formats Go code?
   - A) `go fmt` ✅
   - B) `go test`
   - C) `go clean`
   - D) `go get`
   - **Answer:** A.
6. True/False: `go build` creates an executable binary.
   - **Answer:** True.
7. Short Answer: Why is `go.mod` important?
   - **Answer:** it tracks module metadata and dependencies.
8. Multiple Choice: Which statement is the program entry point?
   - A) `func main()` ✅
   - B) `package main`
   - C) `import "fmt"`
   - D) `fmt.Println()`
   - **Answer:** A.
9. Debugging: Your `go run` fails due to `package not found`. What is one likely cause?
   - **Answer:** missing `go.mod` or wrong import path.
10. Short Answer: What is the difference between `go run` and `go build`?
    - **Answer:** `go run` runs immediately, `go build` produces a binary.

## Assignment
### Objectives
- Set up a Go development environment.
- Initialize a Go module.
- Build and run the first Go program.

### Requirements
- Add `hello.go` and `go.mod` to the repository.
- Include `install-go.md` with installation steps for your OS.
- Use `go fmt` and verify the program runs.

### Acceptance Criteria
- `hello.go` prints a greeting.
- `go.mod` is present and valid.
- Setup instructions are clear.

### Marking Rubric
- Functionality: 50%
- Documentation: 30%
- Tooling: 20%

### Hints
- Use the official Go installer.
- If `go` is missing, add Go to your PATH.
- Run `go env` to inspect settings.

### Common Mistakes
- Forgetting to run `go mod init`.
- Saving files in the wrong directory.
- Not using `go fmt`.

### Submission Instructions
- Push `hello.go`, `go.mod`, and `install-go.md`.
- Add a screenshot or terminal output example if possible.

## GitHub Project
### Repository Name
`on2code-foundations-journal`

### Folder Structure
```
module-1-go-setup/
  hello.go
  go.mod
  install-go.md
  README.md
```

### Expected Output
A working Go module with a simple executable program.

### Commit Milestones
- `add hello program`
- `initialize go module`
- `document Go installation`

### Branch Strategy
- `module-1-go-setup`

### Pull Request Instructions
- Title: `Add Go installation and first program`
- Description: `Setup Go toolchain and verify hello program.`

## Automated Tests
### Requirements
- Run `go run hello.go` successfully.
- Verify `go.mod` exists and module path is correct.
- Confirm code is formatted with `go fmt`.

### Expected Results
- Program prints the greeting.
- No syntax or runtime errors.

## Lesson Summary
This final lesson of Module 1 ensures the student has a working Go environment and understands the first steps in building Go backend software.

## Next Lesson Preview
Module 2 will begin Go programming fundamentals, starting with variables, types, control flow, and functions.
