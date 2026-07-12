# Module 4: Databases, HTTP APIs, and Real Backend Services

## Module Introduction
Module 4 teaches students how to build real backend services using HTTP APIs and persistent databases. It covers API design, request handling, database modeling, migrations, and service architecture for production-ready Go backends.

## Learning Outcomes
By the end of this module, students will be able to:
- Design RESTful HTTP APIs and choose correct request/response patterns.
- Build Go HTTP handlers using standard library and/or web frameworks.
- Model relational data and write database schema migrations.
- Use an ORM or query builder to interact with a database.
- Perform CRUD operations with persistent storage.
- Validate request payloads and handle API errors cleanly.
- Implement authentication and authorization basics.
- Use environment configuration for database and service settings.

## Lessons
1. HTTP API Fundamentals and REST Principles
2. Building HTTP Handlers and Routers in Go
3. Request Validation and Response Formatting
4. Database Fundamentals and Schema Design
5. Migrations, ORM Basics, and Querying Data
6. CRUD APIs with Relational Persistence
7. Authentication, Authorization, and Secure APIs
8. Deployment-ready Configuration and Environment Variables
9. Monitoring, Metrics, and Health Checks
10. API Versioning, Documentation, and Client Contracts

## Practice Labs
- Lab 1: Build a simple HTTP endpoint that returns JSON.
- Lab 2: Create a database schema and run migrations.
- Lab 3: Implement an API with create/read/update/delete operations.

## Module Quiz
A 20-question quiz covering HTTP semantics, database design, CRUD APIs, validation, and configuration.

## Module Assignment
Build a small service with a database-backed resource such as users, courses, or tasks, exposing a clean REST API and including tests.

## Mini Project
Create `go-backend-service` with:
- HTTP endpoints for resource management
- persistent PostgreSQL or SQLite storage
- migrations and schema definitions
- request validation and error responses
- basic auth or token protection
- health check and config management
- README documenting API routes and setup

## Module Review
This module cemented the ability to turn Go code into a service that stores, validates, and serves data across network boundaries.

## Resources
- Go `net/http` documentation
- Gin / Chi / standard middleware guides
- PostgreSQL / SQLite beginners guides
- SQL schema design and indexing best practices
- OpenAPI and API documentation tools

## Knowledge Check
Students should be able to:
- Explain how HTTP methods map to CRUD operations.
- Design a database schema for a simple resource.
- Write a Go API handler that returns JSON.
- Use environment variables for service configuration.

## Completion Criteria
- All lessons completed with exercises.
- Module quiz passed with at least 80%.
- Assignment includes persistent storage and tests.
- Service runs locally and accepts API requests.

---

# Lesson 4.1: HTTP API Fundamentals and REST Principles

## Lesson Overview
This lesson introduces HTTP APIs, REST principles, common methods, status codes, and how they form contracts between backend services and clients.

## Learning Objectives
- Understand HTTP verbs: GET, POST, PUT, PATCH, DELETE.
- Use standard status codes for success and failure.
- Structure API URLs for resources and collections.
- Explain idempotency and safe operations.

## Prerequisites
- Module 3 complete.
- Familiarity with JSON and Go basics.

## Real-world Motivation
Most backend services communicate over HTTP. Designing predictable APIs makes integrations easier for clients and teams.

## Student Notes
### REST basics
RESTful APIs use resources identified by URLs and HTTP methods to perform actions.

### HTTP verbs
- GET retrieves resources.
- POST creates new resources.
- PUT/PATCH updates resources.
- DELETE removes resources.

### Status codes
- `200 OK` for successful reads.
- `201 Created` for new resources.
- `400 Bad Request` for invalid input.
- `401 Unauthorized` for missing auth.
- `404 Not Found` for missing resources.
- `500 Internal Server Error` for unexpected failures.

### API design tips
- Keep URLs noun-based: `/users`, `/tasks/123`.
- Use query parameters for filtering and pagination.
- Return consistent JSON error objects.

## Instructor Video Outline
1. Explain HTTP request/response structure.
2. Walk through RESTful resource examples.
3. Demonstrate mapping verbs to CRUD operations.
4. Show how status codes communicate results.
5. Recap API best practices.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "net/http"
)

type ErrorResponse struct {
    Error string `json:"error"`
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"message": "Hello world"})
}

func main() {
    http.HandleFunc("/api/hello", helloHandler)
    http.ListenAndServe(":8080", nil)
}
```

## Visual Learning Suggestions
- Diagram of HTTP request/response fields.
- Table mapping verbs to CRUD actions.

## Practice Exercises
1. List five resources and their corresponding API URLs.
2. Explain the difference between `PUT` and `PATCH`.
3. Identify proper status codes for common API outcomes.
4. Write a JSON error response schema.
5. Describe idempotency in HTTP APIs.

## Coding Challenges
1. Create a `GET /health` endpoint that returns status JSON.
2. Implement a JSON `POST /api/messages` endpoint.
3. Add a `404` response for unmatched routes.
4. Use `http.StatusCreated` when creating resources.
5. Build a small router that dispatches endpoints.

## Quiz
1. Multiple Choice: Which method should create a new resource?
   - A) GET
   - B) POST ✅
   - C) DELETE
   - D) PUT
   - **Answer:** B.
2. True/False: GET requests should not change server state.
   - **Answer:** True.
3. Multiple Choice: Which status code means the request was bad?
   - A) 200
   - B) 201
   - C) 400 ✅
   - D) 500
   - **Answer:** C.
4. Short Answer: What URL pattern is best for fetching a specific user?
   - **Answer:** `/users/{id}`.
5. Debugging: An update endpoint returns `201 Created`. Why is that wrong?
   - **Answer:** updates should use `200 OK` or `204 No Content`.

## Assignment
### Objectives
- Design a resource API using REST principles.
- Implement at least one endpoint serving JSON.
- Use the correct HTTP status codes.

### Requirements
- Create `lesson-4-1/main.go` with at least one JSON API endpoint.
- Add `lesson-4-1/README.md` documenting the API route.
- Include examples of request and response.

### Acceptance Criteria
- Endpoint responds with `Content-Type: application/json`.
- Status code matches the action.
- README documents the route and sample payload.

### Marking Rubric
- API design: 50%
- Response correctness: 30%
- Documentation: 20%

### Submission Instructions
- Push `lesson-4-1` folder with code and README.

## GitHub Project
### Repository Name
`on2code-http-fundamentals`

### Folder Structure
```
lesson-4-1/
  main.go
  README.md
```

### Expected Output
A working HTTP endpoint returning JSON.

### Branch Strategy
- `lesson-4-1`

### Pull Request Instructions
- Title: `Add HTTP API fundamentals lesson`
- Description: `Implement a basic JSON endpoint in Go.`

## Automated Tests
### Requirements
- Run `go run main.go` and verify the endpoint.
- Confirm the response is valid JSON.
- Validate the status code.

### Expected Results
- Working API endpoint.
- Correct JSON response.

## Lesson Summary
HTTP APIs are the interface between backend services and clients, and status codes are the language they use.

## Next Lesson Preview
Lesson 4.2 covers building handlers and routers in Go.

---

# Lesson 4.2: Building HTTP Handlers and Routers in Go

## Lesson Overview
This lesson teaches how to build HTTP handlers, use routers or frameworks, and organize API code for maintainability.

## Learning Objectives
- Create handler functions and methods that satisfy `http.HandlerFunc`.
- Use router libraries or the standard library for request dispatch.
- Handle route parameters and query values.
- Separate concerns between routing, handlers, and services.

## Prerequisites
- Lesson 4.1 completed.
- Familiarity with Go functions and packages.

## Real-world Motivation
Well-structured routing and handlers keep APIs maintainable as services grow.

## Student Notes
### Handlers
Handlers accept `http.ResponseWriter` and `*http.Request` and write responses.

### Routers
Use a router to map URL patterns to handlers and extract path parameters.

### Query parameters
Use `r.URL.Query().Get("q")` for filtering and search parameters.

### Best practices
- Keep handler code short.
- Delegate business logic to services or controllers.
- Validate incoming requests early.

## Instructor Video Outline
1. Show a simple handler using `http.HandleFunc`.
2. Introduce route parameters with a router library.
3. Demonstrate reading query parameters.
4. Refactor handler logic into service functions.
5. Recap code organization.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "net/http"

    "github.com/go-chi/chi/v5"
)

type User struct {
    ID   string `json:"id"`
    Name string `json:"name"`
}

func getUser(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    user := User{ID: id, Name: "Demo"}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func main() {
    r := chi.NewRouter()
    r.Get("/api/users/{id}", getUser)
    http.ListenAndServe(":8080", r)
}
```

## Visual Learning Suggestions
- Diagram of router matching a request to a handler.
- Table showing path vs query parameter usage.

## Practice Exercises
1. Build a route for `/api/items/{id}`.
2. Read a query parameter and return it in JSON.
3. Add a separate function to format response data.
4. Keep handler logic thin and delegate work.
5. Compare `http.ServeMux` and router libraries.

## Coding Challenges
1. Implement a `GET /api/users/{id}` route.
2. Build a `POST /api/users` handler that reads JSON.
3. Add route-level middleware for logging.
4. Use a router to extract path parameters.
5. Return `404` when a path parameter resource is not found.

## Quiz
1. Multiple Choice: Which type implements an HTTP handler?
   - A) `func(w http.ResponseWriter, r *http.Request)` ✅
   - B) `func()`
   - C) `string`
   - D) `struct{}`
   - **Answer:** A.
2. True/False: Query parameters are part of the URL path.
   - **Answer:** False.
3. Multiple Choice: What does `chi.URLParam(r, "id")` do?
   - A) reads a query parameter
   - B) extracts a path parameter ✅
   - C) writes a response
   - D) parses JSON
   - **Answer:** B.
4. Short Answer: Why keep handler code small?
   - **Answer:** to improve readability and testability.
5. Debugging: Your route returns 404 even though the handler exists. What could be wrong?
   - **Answer:** path pattern or method mismatch.

## Assignment
### Objectives
- Build API handlers with path parameter support.
- Organize routing and handler logic.
- Use JSON responses consistently.

### Requirements
- Create `lesson-4-2/main.go` with handlers and router setup.
- Add `lesson-4-2/README.md` documenting routes.
- Include at least one path parameter route.

### Acceptance Criteria
- Router dispatches requests correctly.
- Path parameters are extracted and returned.
- README documents the API routes.

### Marking Rubric
- Routing correctness: 50%
- Handler structure: 30%
- Documentation: 20%

### Submission Instructions
- Push `lesson-4-2` folder with code and README.

## GitHub Project
### Repository Name
`on2code-go-routing`

### Folder Structure
```
lesson-4-2/
  main.go
  README.md
```

### Expected Output
A router-backed API with path parameter handling.

### Branch Strategy
- `lesson-4-2`

### Pull Request Instructions
- Title: `Add HTTP routing lesson`
- Description: `Build Go HTTP handlers and route path parameters.`

## Automated Tests
### Requirements
- Run the service and verify routes.
- Confirm path parameters are parsed.
- Validate JSON responses.

### Expected Results
- Working route handlers.
- Correct path parameter extraction.

## Lesson Summary
Routing and handler structure determine how maintainable an API is as it grows.

## Next Lesson Preview
Lesson 4.3 covers request validation and response formatting for clean APIs.

---

# Lesson 4.3: Request Validation and Response Formatting

## Lesson Overview
This lesson teaches how to validate inputs for HTTP requests and produce consistent response payloads.

## Learning Objectives
- Parse and validate JSON request bodies.
- Return structured success and error responses.
- Use helper types for API responses.
- Reject invalid requests with meaningful status codes.

## Prerequisites
- Lesson 4.2 completed.
- Familiarity with JSON and handlers.

## Real-world Motivation
Validated requests prevent bad data from entering services and improve API reliability.

## Student Notes
### Validation steps
- decode the request body
- validate required fields and types
- report validation errors with `400 Bad Request`

### Error responses
Use a consistent error schema such as `{ "error": "message" }`.

### Success responses
Return `201 Created` for creations and `200 OK` for reads/updates.

### Practical advice
- Keep validation rules in helper functions.
- Do not trust direct request values.
- Provide clear error messages.

## Instructor Video Outline
1. Parse JSON request bodies in a POST handler.
2. Validate required fields and return an error if missing.
3. Show consistent response formatting.
4. Refactor validation logic into helpers.
5. Recap the validation flow.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "net/http"
)

type CreateUserRequest struct {
    Name  string `json:"name"`
    Email string `json:"email"`
}

type ErrorResponse struct {
    Error string `json:"error"`
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(ErrorResponse{Error: "invalid JSON"})
        return
    }
    if req.Name == "" || req.Email == "" {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(ErrorResponse{Error: "name and email are required"})
        return
    }
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"status": "created"})
}
```

## Visual Learning Suggestions
- Flowchart showing request decode → validate → respond.
- Example of valid and invalid request payloads.

## Practice Exercises
1. Validate a required `name` field in a POST request.
2. Return structured error JSON for invalid input.
3. Use helper functions to check field presence.
4. Respond with `400` for malformed JSON.
5. Document expected request body in README.

## Coding Challenges
1. Implement a request validator for a `CreateTask` payload.
2. Return detailed error messages for each missing field.
3. Add a success response schema with created resource data.
4. Use a helper to encode API responses.
5. Write a request body validator that returns a typed error.

## Quiz
1. Multiple Choice: Which status code signals invalid request data?
   - A) 200
   - B) 201
   - C) 400 ✅
   - D) 404
   - **Answer:** C.
2. True/False: You should validate request input before processing it.
   - **Answer:** True.
3. Multiple Choice: What should a JSON error payload contain?
   - A) stack trace
   - B) field names and messages ✅
   - C) HTML
   - D) binary data
   - **Answer:** B.
4. Short Answer: Why use a helper to encode responses?
   - **Answer:** to keep handlers consistent and reduce duplicate code.
5. Debugging: Your handler returns `200 OK` for bad input. What is the issue?
   - **Answer:** validation is missing or not applied before responding.

## Assignment
### Objectives
- Validate API request payloads.
- Return consistent error responses.
- Keep response formatting reusable.

### Requirements
- Create `lesson-4-3/main.go` with validation logic for a POST request.
- Add `lesson-4-3/README.md` documenting request and response formats.
- Include a helper function for API responses.

### Acceptance Criteria
- Invalid requests return `400` with JSON errors.
- Valid requests return the correct success response.
- README documents the endpoint contract.

### Marking Rubric
- Validation coverage: 40%
- Response format: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-4-3` folder with code and README.

## GitHub Project
### Repository Name
`on2code-go-validation`

### Folder Structure
```
lesson-4-3/
  main.go
  README.md
```

### Expected Output
A validated API endpoint that responds consistently.

### Branch Strategy
- `lesson-4-3`

### Pull Request Instructions
- Title: `Add API validation lesson`
- Description: `Validate request payloads and format responses.`

## Automated Tests
### Requirements
- Run the service and verify invalid payloads return `400`.
- Confirm success responses are correct.
- Validate response JSON structure.

### Expected Results
- Correct validation behavior.
- Consistent error responses.

## Lesson Summary
Validation is the gatekeeper that keeps APIs robust and predictable.

## Next Lesson Preview
Lesson 4.4 covers database fundamentals and schema design.

---

# Lesson 4.4: Database Fundamentals and Schema Design

## Lesson Overview
This lesson teaches relational database concepts, schema design, and how to map Go models to persistent tables.

## Learning Objectives
- Understand database tables, rows, columns, and relationships.
- Model entities such as users, courses, and tasks.
- Use primary keys, foreign keys, and indexes.
- Write basic SQL schema definitions.

## Prerequisites
- Module 4.1 to 4.3 completed.
- Familiarity with persistent storage ideas.

## Real-world Motivation
Backend services store data in databases. Good schema design ensures performance, clarity, and maintainability.

## Student Notes
### Relational basics
Tables store rows of structured data. Columns define fields.

### Keys
- primary keys uniquely identify rows.
- foreign keys relate tables.

### Indexes
Use indexes for columns that are frequently queried.

### Normalization
Organize data to reduce duplication while keeping queries efficient.

### Practical advice
- Start with a clear domain model.
- Avoid storing repeated data unless necessary.
- Choose the right type for each column.

## Instructor Video Outline
1. Explain tables, rows, and columns.
2. Walk through a schema for users and tasks.
3. Discuss keys and relationships.
4. Introduce indexes and performance basics.
5. Recap how schema maps to Go structs.

## Live Coding Demonstration
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false,
    due_date TIMESTAMP WITH TIME ZONE
);
```

## Visual Learning Suggestions
- ER diagram for users and tasks.
- Table showing column types and constraints.

## Practice Exercises
1. Design a table for a `Course` entity.
2. Add a foreign key relationship between `Course` and `Instructor`.
3. Choose appropriate column types for dates and booleans.
4. Explain why `email` should be unique.
5. Draw a schema diagram for a simple backend.

## Coding Challenges
1. Create SQL for `users` and `tasks` tables.
2. Add an index for `email` or `user_id`.
3. Write a schema for `orders` with references to `users`.
4. Model a many-to-many relationship with a join table.
5. Map SQL columns to Go struct fields.

## Quiz
1. Multiple Choice: What does `PRIMARY KEY` do?
   - A) allows duplicates
   - B) uniquely identifies rows ✅
   - C) sets a default value
   - D) formats dates
   - **Answer:** B.
2. True/False: Foreign keys enforce relationships between tables.
   - **Answer:** True.
3. Multiple Choice: Which SQL type is good for timestamps?
   - A) `TEXT`
   - B) `TIMESTAMP WITH TIME ZONE` ✅
   - C) `INTEGER`
   - D) `BOOLEAN`
   - **Answer:** B.
4. Short Answer: Why use an index?
   - **Answer:** to speed up queries.
5. Debugging: Your `email` column allows duplicates. What is missing?
   - **Answer:** a unique constraint.

## Assignment
### Objectives
- Design a database schema for a resource.
- Create SQL definitions for tables.
- Map the schema to Go structs.

### Requirements
- Create `lesson-4-4/schema.sql` with tables and constraints.
- Add `lesson-4-4/models.go` with matching Go structs.
- Document schema decisions in `README.md`.

### Acceptance Criteria
- SQL schema includes primary keys and required fields.
- Go structs match the persisted fields.
- README explains relationships.

### Marking Rubric
- Schema correctness: 40%
- Model mapping: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-4-4` folder with schema, models, and README.

## GitHub Project
### Repository Name
`on2code-db-schema`

### Folder Structure
```
lesson-4-4/
  schema.sql
  models.go
  README.md
```

### Expected Output
A database schema and corresponding Go data models.

### Branch Strategy
- `lesson-4-4`

### Pull Request Instructions
- Title: `Add database schema lesson`
- Description: `Design tables and map them to Go structs.`

## Automated Tests
### Requirements
- Review schema definitions for correctness.
- Ensure Go structs align with SQL columns.
- Validate README explains key choices.

### Expected Results
- Clear schema with constraints.
- Matching data model definitions.

## Lesson Summary
Understanding relational schema design is critical before wiring a backend service to persistent storage.

## Next Lesson Preview
Lesson 4.5 covers migrations, ORM basics, and querying data in Go.

---

# Lesson 4.5: Migrations, ORM Basics, and Querying Data

## Lesson Overview
This lesson teaches how to evolve database schemas through migrations and how to query data from Go using an ORM or query builder.

## Learning Objectives
- Create and run database migrations.
- Use an ORM or database library to query data.
- Understand the difference between raw SQL and ORM abstractions.
- Read and write rows to the database from Go.

## Prerequisites
- Lesson 4.4 completed.
- Working database setup available.

## Real-world Motivation
Reliable migration processes and database access code are essential for maintaining deployments and avoiding data loss.

## Student Notes
### Migrations
Migrations are versioned scripts that change the schema over time.

### ORMs
ORMs map database tables to Go structs and simplify common queries.

### Querying
Use `SELECT`, `INSERT`, `UPDATE`, and `DELETE` to manage rows.

### Practical advice
- Keep migrations small and reversible when possible.
- Understand generated SQL from your ORM.
- Use parameterized queries to prevent SQL injection.

## Instructor Video Outline
1. Explain the purpose of migrations.
2. Create a migration file and apply it.
3. Use an ORM or query builder to load data.
4. Demonstrate inserting and updating rows.
5. Recap migration and query best practices.

## Live Coding Demonstration
```sql
-- migrations/001_create_users.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);
```

```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
)

func main() {
    db, err := sql.Open("postgres", "postgres://user:pass@localhost/dbname?sslmode=disable")
    if err != nil {
        panic(err)
    }
    defer db.Close()

    row := db.QueryRow("SELECT id, name, email FROM users WHERE id = $1", 1)
    var id int
    var name, email string
    if err := row.Scan(&id, &name, &email); err != nil {
        panic(err)
    }
    fmt.Println(id, name, email)
}
```

## Visual Learning Suggestions
- Diagram of migration version ordering.
- Table comparing raw SQL and ORM operations.

## Practice Exercises
1. Create a migration to add a `tasks` table.
2. Run a query to insert a row.
3. Fetch a row and scan results into variables.
4. Use parameter placeholders instead of string concatenation.
5. Explore ORM docs or query builder examples.

## Coding Challenges
1. Create a migration and apply it to a database.
2. Insert a record from Go and verify it exists.
3. Update a row and return the changed record.
4. Delete a row and confirm it is gone.
5. Compare a raw SQL query with ORM-generated SQL.

## Quiz
1. Multiple Choice: What is a migration?
   - A) a Go function
   - B) a schema change script ✅
   - C) a log file
   - D) a router
   - **Answer:** B.
2. True/False: ORMs always produce the same SQL as handwritten queries.
   - **Answer:** False.
3. Multiple Choice: What placeholder is used by PostgreSQL in `database/sql`?
   - A) `?`
   - B) `$1` ✅
   - C) `:1`
   - D) `#1`
   - **Answer:** B.
4. Short Answer: Why should you parameterize SQL queries?
   - **Answer:** to prevent SQL injection.
5. Debugging: Your query scan fails with `sql.ErrNoRows`. What does that mean?
   - **Answer:** no matching row was found.

## Assignment
### Objectives
- Implement schema migrations.
- Query data from Go using a database library.
- Understand ORM or raw query tradeoffs.

### Requirements
- Create `lesson-4-5/migrations/001_create_users.sql`.
- Add `lesson-4-5/main.go` that connects to the database and queries a row.
- Document the migration and query process in `README.md`.

### Acceptance Criteria
- Migration file exists and is valid SQL.
- Go code connects and retrieves data.
- README explains how to run migrations.

### Marking Rubric
- Migration correctness: 40%
- Query reliability: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-4-5` folder with migration, code, and README.

## GitHub Project
### Repository Name
`on2code-migrations`

### Folder Structure
```
lesson-4-5/
  migrations/
    001_create_users.sql
  main.go
  README.md
```

### Expected Output
A migration and database query example.

### Branch Strategy
- `lesson-4-5`

### Pull Request Instructions
- Title: `Add migrations lesson`
- Description: `Teach database migrations and querying in Go.`

## Automated Tests
### Requirements
- Validate migration SQL syntax.
- Confirm query code compiles.
- Ensure README documents setup.

### Expected Results
- Correct schema migration.
- Working data query example.

## Lesson Summary
Migrations and data querying turn schema design into working persistence.

## Next Lesson Preview
Lesson 4.6 covers building CRUD APIs backed by the database.

---

# Lesson 4.6: CRUD APIs with Relational Persistence

## Lesson Overview
This lesson teaches how to implement create, read, update, and delete API routes connected to a database-backed resource.

## Learning Objectives
- Build endpoints for CRUD operations.
- Persist changes to a database from API handlers.
- Return appropriate status codes and payloads.
- Test CRUD behavior with example requests.

## Prerequisites
- Lesson 4.5 completed.
- Database and migration setup available.

## Real-world Motivation
CRUD APIs are the foundation of most backend services, exposing persistent resource management to clients.

## Student Notes
### CRUD mapping
- POST → create
- GET → read
- PUT/PATCH → update
- DELETE → delete

### Persistence
Each handler must read or write from the database and handle errors.

### Response behavior
Return resource JSON on success and use `404` or `400` when needed.

### Practical advice
- Keep SQL or repository logic outside handlers.
- Use transactions for multi-step updates.
- Validate inputs before database operations.

## Instructor Video Outline
1. Build a POST handler that inserts a record.
2. Add a GET handler that fetches by ID.
3. Implement update and delete handlers.
4. Demonstrate API requests with a client or curl.
5. Recap persistence flow.

## Live Coding Demonstration
```go
package main

import (
    "database/sql"
    "encoding/json"
    "net/http"

    "github.com/go-chi/chi/v5"
    _ "github.com/lib/pq"
)

type Task struct {
    ID    int    `json:"id"`
    Title string `json:"title"`
    Done  bool   `json:"done"`
}

func main() {
    db, _ := sql.Open("postgres", "postgres://user:pass@localhost/db?sslmode=disable")
    defer db.Close()

    r := chi.NewRouter()
    r.Post("/api/tasks", func(w http.ResponseWriter, r *http.Request) {
        var task Task
        json.NewDecoder(r.Body).Decode(&task)
        row := db.QueryRow("INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING id", task.Title, task.Done)
        row.Scan(&task.ID)
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(task)
    })
    http.ListenAndServe(":8080", r)
}
```

## Visual Learning Suggestions
- Diagram showing request → handler → repo → database → response.
- CRUD mapping table.

## Practice Exercises
1. Implement `GET /api/tasks/{id}`.
2. Add `PUT /api/tasks/{id}` to update a task.
3. Implement `DELETE /api/tasks/{id}`.
4. Return `404` when an item is missing.
5. Use SQL parameter placeholders consistently.

## Coding Challenges
1. Build a complete CRUD API for a `tasks` resource.
2. Add pagination to a `GET /api/tasks` list route.
3. Write a repository layer for database operations.
4. Return created resource data on `POST`.
5. Log errors and return clean API responses.

## Quiz
1. Multiple Choice: Which method should delete a resource?
   - A) POST
   - B) DELETE ✅
   - C) GET
   - D) PATCH
   - **Answer:** B.
2. True/False: `PUT` is always idempotent.
   - **Answer:** True.
3. Multiple Choice: Which status code indicates successful creation?
   - A) 200
   - B) 201 ✅
   - C) 404
   - D) 500
   - **Answer:** B.
4. Short Answer: What should an update endpoint return on success?
   - **Answer:** the updated resource or `204 No Content`.
5. Debugging: Your `DELETE` endpoint still returns data after deletion. What might be wrong?
   - **Answer:** the delete operation did not actually run or the response uses stale data.

## Assignment
### Objectives
- Build a full CRUD API backed by a database.
- Use HTTP verbs and status codes correctly.
- Separate handler and persistence logic.

### Requirements
- Create `lesson-4-6/main.go` implementing CRUD routes.
- Add `lesson-4-6/README.md` documenting each route.
- Include SQL schema or migration references.

### Acceptance Criteria
- All four CRUD operations exist.
- Database persistence works for create/read/update/delete.
- README documents route behavior.

### Marking Rubric
- CRUD functionality: 50%
- API correctness: 30%
- Documentation: 20%

### Submission Instructions
- Push `lesson-4-6` folder with code and README.

## GitHub Project
### Repository Name
`on2code-crud-api`

### Folder Structure
```
lesson-4-6/
  main.go
  README.md
```

### Expected Output
A database-backed CRUD API with correct response semantics.

### Branch Strategy
- `lesson-4-6`

### Pull Request Instructions
- Title: `Add CRUD API lesson`
- Description: `Implement database-backed create/read/update/delete endpoints.`

## Automated Tests
### Requirements
- Run the service and confirm CRUD routes.
- Validate successful create and delete operations.
- Ensure `404` responses when resources are missing.

### Expected Results
- Working CRUD API.
- Proper status codes.

## Lesson Summary
CRUD APIs are the core of backend services, connecting clients to persistent resources.

## Next Lesson Preview
Lesson 4.7 covers authentication, authorization, and secure API access.

---

# Lesson 4.7: Authentication, Authorization, and Secure APIs

## Lesson Overview
This lesson teaches how to protect HTTP APIs with authentication and authorization patterns, including token-based access and role checks.

## Learning Objectives
- Understand the difference between authentication and authorization.
- Implement token-based authentication for API requests.
- Protect routes with middleware.
- Enforce resource-level permissions.

## Prerequisites
- Lesson 4.6 completed.
- Familiarity with API design and handlers.

## Real-world Motivation
Secure backend services prevent unauthorized access and protect user data.

## Student Notes
### Authentication
Authentication verifies the user or client identity.

### Authorization
Authorization decides what the authenticated user is allowed to do.

### Tokens
Use JWTs or session tokens for stateless API auth.

### Middleware
Middleware validates auth before handlers run.

### Practical advice
- Keep secrets out of source code.
- Return `401 Unauthorized` for missing auth and `403 Forbidden` for unauthorized access.
- Limit token lifetime and rotate keys when needed.

## Instructor Video Outline
1. Explain auth vs authz.
2. Show a route protected by token middleware.
3. Demonstrate a login endpoint issuing a token.
4. Protect resource endpoints with authorization checks.
5. Recap secure API flow.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "net/http"
)

type LoginRequest struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token != "Bearer secret-token" {
            w.WriteHeader(http.StatusUnauthorized)
            json.NewEncoder(w).Encode(map[string]string{"error": "unauthorized"})
            return
        }
        next.ServeHTTP(w, r)
    })
}

func protectedHandler(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(map[string]string{"message": "secret data"})
}
```

## Visual Learning Suggestions
- Diagram showing auth flow and protected route.
- Table of status codes for auth failures.

## Practice Exercises
1. Build a login endpoint that returns a static token.
2. Add middleware that checks the `Authorization` header.
3. Return `401` when the token is missing or invalid.
4. Protect one API route with the middleware.
5. Explain why `403` differs from `401`.

## Coding Challenges
1. Implement basic token auth middleware.
2. Add a `POST /login` endpoint that issues a token.
3. Protect a user-specific resource with authorization.
4. Return `403 Forbidden` when a user lacks permission.
5. Add role-based access control to a route.

## Quiz
1. Multiple Choice: What does `401` mean?
   - A) forbidden
   - B) unauthorized ✅
   - C) not found
   - D) created
   - **Answer:** B.
2. True/False: Authorization checks what the user can do.
   - **Answer:** True.
3. Multiple Choice: Which header often carries a bearer token?
   - A) `Accept`
   - B) `Authorization` ✅
   - C) `Content-Type`
   - D) `Cookie`
   - **Answer:** B.
4. Short Answer: What should protected routes do if auth fails?
   - **Answer:** return `401 Unauthorized` or `403 Forbidden`.
5. Debugging: A valid token still fails auth. What could be wrong?
   - **Answer:** token format or header parsing issue.

## Assignment
### Objectives
- Add authentication to an API.
- Protect endpoints with middleware.
- Enforce simple authorization rules.

### Requirements
- Create `lesson-4-7/main.go` with token middleware and one protected route.
- Add `lesson-4-7/README.md` documenting auth behavior.
- Include a login or token generation example.

### Acceptance Criteria
- Protected route rejects unauthorized requests.
- Auth middleware validates tokens.
- README explains required headers.

### Marking Rubric
- Auth correctness: 50%
- Security design: 30%
- Documentation: 20%

### Submission Instructions
- Push `lesson-4-7` folder with code and README.

## GitHub Project
### Repository Name
`on2code-secure-api`

### Folder Structure
```
lesson-4-7/
  main.go
  README.md
```

### Expected Output
A protected API route requiring token auth.

### Branch Strategy
- `lesson-4-7`

### Pull Request Instructions
- Title: `Add API auth lesson`
- Description: `Implement token auth and protected routes in Go.`

## Automated Tests
### Requirements
- Verify protected route rejects unauthorized requests.
- Confirm valid token requests succeed.
- Validate auth middleware behavior.

### Expected Results
- Secure route protection.
- Correct status codes.

## Lesson Summary
Authentication and authorization are essential to keeping APIs secure and controlling access.

## Next Lesson Preview
Lesson 4.8 covers configuration, environment variables, and deployment readiness.

---

# Lesson 4.8: Deployment-ready Configuration and Environment Variables

## Lesson Overview
This lesson teaches how to manage service configuration for different environments and deployment targets using files and environment variables.

## Learning Objectives
- Load configuration from environment variables.
- Fall back to defaults when variables are absent.
- Keep secret values out of source code.
- Use a config struct for application settings.

## Prerequisites
- Lesson 4.7 completed.
- Familiarity with environment and config concepts.

## Real-world Motivation
Services run in multiple environments. Configuration should be easy to change without modifying code.

## Student Notes
### Environment variables
Use `os.Getenv` for runtime settings and `os.LookupEnv` when defaults are needed.

### Config struct
Group application settings in a typed struct.

### Secret management
Store DB passwords, API keys, and secrets outside source control.

### Practical advice
- Document required environment variables.
- Use sensible defaults for local development.
- Fail fast when required settings are missing.

## Instructor Video Outline
1. Show loading config from environment variables.
2. Build a config struct with defaults.
3. Explain why secrets should not be hardcoded.
4. Demonstrate startup failure when required config is missing.
5. Recap config management.

## Live Coding Demonstration
```go
package main

import (
    "fmt"
    "os"
)

type Config struct {
    Port string
    DBUrl string
}

func loadConfig() Config {
    cfg := Config{
        Port: "8080",
        DBUrl: os.Getenv("DATABASE_URL"),
    }
    if cfg.DBUrl == "" {
        panic("DATABASE_URL is required")
    }
    if port := os.Getenv("PORT"); port != "" {
        cfg.Port = port
    }
    return cfg
}

func main() {
    cfg := loadConfig()
    fmt.Println(cfg)
}
```

## Visual Learning Suggestions
- Diagram of config precedence: env vars override defaults.
- Table of required and optional settings.

## Practice Exercises
1. Load `PORT` and `DATABASE_URL` from environment.
2. Provide a default port when unset.
3. Fail if a required secret is missing.
4. Document config variables in README.
5. Use a typed struct for config values.

## Coding Challenges
1. Add environment config to an API service.
2. Override defaults with environment variables.
3. Validate config at startup and fail fast if invalid.
4. Use config values in database and HTTP server setup.
5. Add a health check endpoint for readiness.

## Quiz
1. Multiple Choice: What should not be hardcoded in source code?
   - A) log messages
   - B) API keys ✅
   - C) status codes
   - D) route paths
   - **Answer:** B.
2. True/False: `os.Getenv` returns an empty string if unset.
   - **Answer:** True.
3. Multiple Choice: Which source should override defaults?
   - A) environment variables ✅
   - B) hardcoded values
   - C) comments
   - D) compiled binary
   - **Answer:** A.
4. Short Answer: What happens if required config is missing?
   - **Answer:** fail fast with an error.
5. Debugging: Your service uses the wrong DB URL. What might be wrong?
   - **Answer:** the environment variable is misnamed or not set.

## Assignment
### Objectives
- Add environment-based configuration to a Go service.
- Keep secrets out of source control.
- Document deployment settings.

### Requirements
- Create `lesson-4-8/main.go` with config loading.
- Add `lesson-4-8/README.md` documenting env vars.
- Use defaults for optional settings.

### Acceptance Criteria
- Required env vars are validated.
- Default values are used when appropriate.
- README documents config variables.

### Marking Rubric
- Config correctness: 50%
- Secret handling: 30%
- Documentation: 20%

### Submission Instructions
- Push `lesson-4-8` folder with code and README.

## GitHub Project
### Repository Name
`on2code-config-management`

### Folder Structure
```
lesson-4-8/
  main.go
  README.md
```

### Expected Output
A service startup that reads config from env vars.

### Branch Strategy
- `lesson-4-8`

### Pull Request Instructions
- Title: `Add config management lesson`
- Description: `Load environment-based config in Go.`

## Automated Tests
### Requirements
- Confirm config loads with default and env vars.
- Validate startup failure when required values are missing.
- Ensure README documents settings.

### Expected Results
- Correct config behavior.
- Clear variable documentation.

## Lesson Summary
Good configuration management is critical for deploying services across environments.

## Next Lesson Preview
Lesson 4.9 covers monitoring, metrics, and health checks.

---

# Lesson 4.9: Monitoring, Metrics, and Health Checks

## Lesson Overview
This lesson teaches how to add observability to backend services through health checks and basic metrics.

## Learning Objectives
- Build readiness and liveness endpoints.
- Expose simple metrics for request counts and errors.
- Log service startup and failures.
- Understand why observability matters in production.

## Prerequisites
- Lesson 4.8 completed.
- Familiarity with HTTP endpoints.

## Real-world Motivation
Monitoring helps teams detect problems early and maintain service reliability.

## Student Notes
### Health checks
- readiness checks if the service is ready to accept traffic.
- liveness checks if the service is alive.

### Metrics
Track counts, latencies, and error rates.

### Logging
Log startup events and critical failures clearly.

### Practical advice
- Keep health endpoints lightweight.
- Expose metrics in a machine-readable format when possible.
- Use consistent log formatting.

## Instructor Video Outline
1. Build `/healthz` and `/readyz` endpoints.
2. Add a counter for requests.
3. Log service startup and errors.
4. Explain how observability helps production operations.
5. Recap simple monitoring patterns.

## Live Coding Demonstration
```go
package main

import (
    "fmt"
    "net/http"
    "sync/atomic"
)

var requestCount int64

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "ok")
}

func metricsHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "requests_total %d\n", atomic.LoadInt64(&requestCount))
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
    atomic.AddInt64(&requestCount, 1)
    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "hello")
}

func main() {
    http.HandleFunc("/healthz", healthHandler)
    http.HandleFunc("/metrics", metricsHandler)
    http.HandleFunc("/", mainHandler)
    http.ListenAndServe(":8080", nil)
}
```

## Visual Learning Suggestions
- Diagram showing health checks and metrics endpoints.
- Table of observable signals.

## Practice Exercises
1. Add a `/readyz` endpoint returning `200 OK`.
2. Count incoming requests with a metric.
3. Log each request method and path.
4. Expose metrics in plain text.
5. Explain the difference between readiness and liveness.

## Coding Challenges
1. Build health and metrics endpoints for your API.
2. Track error responses separately from successful requests.
3. Add startup log messages for config values.
4. Use `atomic` counters for concurrency-safe metrics.
5. Document the monitoring endpoints in README.

## Quiz
1. Multiple Choice: What should `/healthz` return when alive?
   - A) 500
   - B) 200 ✅
   - C) 404
   - D) 301
   - **Answer:** B.
2. True/False: readiness and liveness checks are the same.
   - **Answer:** False.
3. Multiple Choice: Which metric is useful for traffic volume?
   - A) request count ✅
   - B) status code text
   - C) JSON length
   - D) variable name
   - **Answer:** A.
4. Short Answer: Why use atomic counters?
   - **Answer:** to safely update metrics in concurrent code.
5. Debugging: Your health endpoint returns `500` after a dependency fails. What should it indicate?
   - **Answer:** the service is not ready or unhealthy.

## Assignment
### Objectives
- Add simple observability to a Go service.
- Expose health and metrics endpoints.
- Log important service events.

### Requirements
- Create `lesson-4-9/main.go` with `/healthz`, `/readyz`, and `/metrics`.
- Add `lesson-4-9/README.md` documenting those endpoints.
- Track request counts and log startup.

### Acceptance Criteria
- Health endpoints return `200` when healthy.
- Metrics endpoint exposes at least one metric.
- Documentation explains observability routes.

### Marking Rubric
- Observability coverage: 50%
- Endpoint correctness: 30%
- Documentation: 20%

### Submission Instructions
- Push `lesson-4-9` folder with code and README.

## GitHub Project
### Repository Name
`on2code-service-observability`

### Folder Structure
```
lesson-4-9/
  main.go
  README.md
```

### Expected Output
A service with health and metrics endpoints.

### Branch Strategy
- `lesson-4-9`

### Pull Request Instructions
- Title: `Add monitoring lesson`
- Description: `Add health checks and metrics to a Go service.`

## Automated Tests
### Requirements
- Run the service and verify health endpoints.
- Confirm metrics output contains request count.
- Validate README documents endpoints.

### Expected Results
- Working observability endpoints.
- Clear metrics output.

## Lesson Summary
Monitoring and health checks are essential for operating backend services reliably.

## Next Lesson Preview
Lesson 4.10 covers API versioning, documentation, and client contracts.

---

# Lesson 4.10: API Versioning, Documentation, and Client Contracts

## Lesson Overview
This lesson teaches how to version APIs, document routes, and define reliable client contracts for backend services.

## Learning Objectives
- Version APIs using URL path or headers.
- Document API routes, request shapes, and responses.
- Use README or OpenAPI to describe the contract.
- Maintain backward compatibility when evolving APIs.

## Prerequisites
- Lesson 4.9 completed.
- Familiarity with API design and routes.

## Real-world Motivation
Versioning and documentation make APIs dependable for external clients and internal teams.

## Student Notes
### Versioning patterns
Use URL versioning like `/v1/users` or header-based versioning.

### Documentation
Document endpoints, methods, request bodies, and responses clearly.

### Compatibility
Avoid breaking changes by introducing new versions for evolving contracts.

### Practical advice
- Keep versioned routes explicit.
- Publish example requests and responses.
- Document auth requirements and error formats.

## Instructor Video Outline
1. Explain API versioning strategies.
2. Show versioned routes in a Go router.
3. Document endpoints using README or OpenAPI.
4. Discuss compatibility and version migration.
5. Recap contract-driven API design.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "net/http"

    "github.com/go-chi/chi/v5"
)

func main() {
    r := chi.NewRouter()
    r.Get("/api/v1/health", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })
    http.ListenAndServe(":8080", r)
}
```

## Visual Learning Suggestions
- Diagram showing v1 and v2 route namespaces.
- Example request/response documentation format.

## Practice Exercises
1. Add `/api/v1` to existing routes.
2. Document one endpoint in Markdown.
3. Describe how a breaking change should be released.
4. List the expected fields in a JSON response.
5. Explain when to create a new API version.

## Coding Challenges
1. Version an existing set of routes under `/api/v1`.
2. Add README examples for one endpoint.
3. Create a second version with a changed response shape.
4. Document auth and error behavior.
5. Write a short client contract for a resource endpoint.

## Quiz
1. Multiple Choice: What is a common API versioning strategy?
   - A) random URLs
   - B) `/api/v1/` path prefix ✅
   - C) code comments
   - D) database versions
   - **Answer:** B.
2. True/False: API documentation should include sample requests.
   - **Answer:** True.
3. Multiple Choice: Which route is versioned?
   - A) `/health`
   - B) `/api/v1/users` ✅
   - C) `/users/{id}`
   - D) `/static/css`
   - **Answer:** B.
4. Short Answer: Why version an API?
   - **Answer:** to support changes without breaking existing clients.
5. Debugging: Your client expects field `name` but v2 returns `fullName`. What is the issue?
   - **Answer:** contract mismatch or versioning issue.

## Assignment
### Objectives
- Version an API and document its contract.
- Communicate route behavior clearly.
- Prepare the service for future API evolution.

### Requirements
- Create `lesson-4-10/main.go` with versioned routes.
- Add `lesson-4-10/README.md` documenting the API contract.
- Include sample requests and responses.

### Acceptance Criteria
- Routes are versioned consistently.
- Documentation describes the contract.
- README includes at least two example endpoints.

### Marking Rubric
- Versioning correctness: 40%
- Documentation quality: 40%
- Contract clarity: 20%

### Submission Instructions
- Push `lesson-4-10` folder with code and README.

## GitHub Project
### Repository Name
`on2code-api-contracts`

### Folder Structure
```
lesson-4-10/
  main.go
  README.md
```

### Expected Output
A versioned API with documented routes.

### Branch Strategy
- `lesson-4-10`

### Pull Request Instructions
- Title: `Add API versioning lesson`
- Description: `Implement versioned routes and document API contracts.`

## Automated Tests
### Requirements
- Run the service and verify versioned routes.
- Confirm documentation examples match actual routes.
- Validate README explains API contract.

### Expected Results
- Versioned API works.
- Documentation is complete.

## Lesson Summary
API versioning and documentation keep services stable and understandable as they evolve.

## Next Module Preview
Module 5 will focus on advanced backend architecture, distributed systems, microservices, and deployment patterns.
