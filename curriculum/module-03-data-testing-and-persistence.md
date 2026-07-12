# Module 3: Data Handling, Testing, and Persistence in Go

## Module Introduction
Module 3 teaches how Go backend services manage data, interact with external sources, and stay reliable through testing. Students learn to read and write structured data, handle JSON and files, design testable code, and apply defensive error handling.

## Learning Outcomes
By the end of this module, students will be able to:
- Parse JSON input and produce JSON output using the standard library.
- Read from and write to files safely using Go I/O primitives.
- Use struct tags to control marshaling and data validation.
- Create command-line tools and small services that persist state.
- Write unit tests, table-driven tests, and use test helpers.
- Design error handling and logging for maintainable backend code.
- Understand the difference between transient in-memory data and persistent storage.
- Integrate a simple external API or configuration source.

## Lessons
1. JSON and `encoding/json` Basics
2. Struct Tags, Marshaling, and Unmarshaling
3. File I/O and Configuration Files
4. Working with Time, Dates, and Formats
5. Building a File-backed CLI Utility
6. Unit Testing Fundamentals in Go
7. Table-driven Tests and Test Helpers
8. Error Design, Logging, and Debugging
9. In-memory Stores vs File Persistence
10. External API Integration and Config Management

## Practice Labs
- Lab 1: Read JSON from disk and print structured data.
- Lab 2: Write a configuration file and load it at runtime.
- Lab 3: Add tests for a data validation function.

## Module Quiz
A 20-question quiz covering JSON, file I/O, testing, error handling, and persistence concepts.

## Module Assignment
Build a `go-data-service` CLI program that manages contacts or tasks using file-backed persistence and comprehensive tests.

## Mini Project
Create `go-data-backend` with:
- JSON input/output functions
- config file loading
- file-based persistence for records
- unit tests for core logic
- error handling and logs
- a README documenting execution and tests

## Module Review
This module gives students the tools to handle real backend data flows, work safely with external formats and files, and verify code quality with tests.

## Resources
- Go `encoding/json` documentation
- Go `io` / `os` package docs
- Go `testing` package guide
- Effective Go: testing and error handling sections
- JSON schema and API contract references

## Knowledge Check
Students should be able to:
- Explain how JSON maps to Go structs.
- Write tests that verify function behavior.
- Persist data to disk and reload it later.
- Choose between in-memory caching and file storage.

## Completion Criteria
- All lessons completed with exercises.
- Module quiz passed with at least 80%.
- Assignment code is tested and documented.
- Persistence example demonstrates state across runs.

---

# Lesson 3.1: JSON and `encoding/json` Basics

## Lesson Overview
This lesson introduces JSON as the lingua franca of web services and teaches Go's `encoding/json` package for encoding and decoding JSON data.

## Learning Objectives
- Understand JSON syntax and common data shapes.
- Convert Go structs to JSON using `json.Marshal`.
- Parse JSON into Go types with `json.Unmarshal`.
- Handle JSON errors gracefully.

## Prerequisites
- Module 2 complete.
- Familiarity with Go types and structs.

## Real-world Motivation
APIs exchange data in JSON format. Backend engineers must serialize data to JSON for clients and parse incoming requests safely.

## Student Notes
### JSON basics
JSON uses objects, arrays, strings, numbers, booleans, and null. It is text-based and language-agnostic.

### Marshaling
`json.Marshal(v)` converts a Go value to JSON bytes.

### Unmarshaling
`json.Unmarshal(data, &v)` parses JSON into a Go value.

### Common errors
- invalid JSON syntax
- incompatible types
- missing required fields

### Practical advice
- Validate JSON input before trusting it.
- Use structs for expected JSON shapes.
- Keep raw JSON parsing separate from business logic.

## Instructor Video Outline
1. Explain JSON and its typical use in APIs.
2. Demonstrate marshaling a Go struct.
3. Demonstrate unmarshaling JSON into a struct.
4. Show error handling for invalid JSON.
5. Recap best practices.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name  string `json:"name"`
    Email string `json:"email"`
}

func main() {
    user := User{Name: "Carol", Email: "carol@example.com"}
    bytes, err := json.Marshal(user)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(bytes))

    var decoded User
    err = json.Unmarshal(bytes, &decoded)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Decoded: %+v\n", decoded)
}
```

## Visual Learning Suggestions
- Sample JSON object with corresponding Go struct.
- Diagram of marshaling and unmarshaling data flow.

## Practice Exercises
1. Write a Go struct for a book and serialize it to JSON.
2. Parse JSON that contains an array of objects.
3. Experiment with invalid JSON and inspect the error.
4. Convert JSON with nested objects into nested structs.
5. Print formatted JSON using `json.MarshalIndent`.

## Coding Challenges
1. Create a `Product` struct and marshal it to JSON.
2. Unmarshal JSON into a struct that includes a slice field.
3. Write a function that validates JSON input before unmarshaling.
4. Compare the output of `Marshal` and `MarshalIndent`.
5. Parse JSON with boolean and numeric fields into Go types.

## Quiz
1. Multiple Choice: Which package handles JSON in Go?
   - A) `fmt`
   - B) `encoding/json` ✅
   - C) `io`
   - D) `strconv`
   - **Answer:** B.
2. True/False: `json.Unmarshal` can fill a struct from JSON.
   - **Answer:** True.
3. Multiple Choice: What does `json.Marshal` return?
   - A) `[]byte, error` ✅
   - B) `string`
   - C) `interface{}`
   - D) `map[string]interface{}`
   - **Answer:** A.
4. Short Answer: Why use JSON in backend services?
   - **Answer:** it is interoperable and easy to transmit over HTTP.
5. Debugging: Why would `Unmarshal` fail on a struct field?
   - **Answer:** type mismatch or invalid JSON.
6. Multiple Choice: How do you get pretty-printed JSON?
   - A) `json.MarshalIndent` ✅
   - B) `fmt.Println` only
   - C) `json.NewEncoder` only
   - D) `json.Decode`
   - **Answer:** A.
7. True/False: JSON keys are case-sensitive.
   - **Answer:** True.
8. Short Answer: What should you do if JSON input is missing a key?
   - **Answer:** rely on zero values or validate required fields.
9. Multiple Choice: Which Go type can directly decode JSON objects?
   - A) `map[string]string`
   - B) `struct` ✅
   - C) `int`
   - D) `chan int`
   - **Answer:** B.
10. Short Answer: What are the two main operations in `encoding/json`?
    - **Answer:** marshal and unmarshal.

## Assignment
### Objectives
- Practice parsing and serializing JSON.
- Use Go structs to shape JSON data.
- Handle JSON errors.

### Requirements
- Create `lesson-3-1/main.go` that reads a JSON payload and prints a Go struct.
- Add `lesson-3-1/README.md` explaining JSON marshaling and unmarshaling.
- Include a sample JSON file as input.

### Acceptance Criteria
- The program prints correct struct values.
- JSON input is parsed successfully.
- Errors are handled gracefully.

### Marking Rubric
- Correctness: 50%
- Error handling: 25%
- Documentation: 25%

### Hints
- Use `json.Unmarshal` with a pointer to a struct.
- Keep the sample JSON file simple.
- Print debug output only when needed.

### Common Mistakes
- Not using a pointer in `Unmarshal`.
- Forgetting to handle `error`.
- Using invalid JSON in the sample file.

### Submission Instructions
- Push `lesson-3-1` folder with code, sample JSON, and README.

## GitHub Project
### Repository Name
`on2code-json-basics`

### Folder Structure
```
lesson-3-1/
  main.go
  sample.json
  README.md
```

### Expected Output
A printed Go struct loaded from JSON.

### Commit Milestones
- `add json parsing lesson`
- `document json examples`

### Branch Strategy
- `lesson-3-1`

### Pull Request Instructions
- Title: `Add JSON encoding lesson`
- Description: `Build a Go program that reads and prints JSON data.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm the JSON sample parses.
- Validate error handling for invalid JSON.

### Expected Results
- Correct program output.
- No panics.

## Lesson Summary
Students learn how to move data between JSON and Go, a critical skill for backend services.

## Next Lesson Preview
Lesson 3.2 covers struct tags, marshaling control, and field-level JSON customization.

---

# Lesson 3.2: Struct Tags, Marshaling, and Unmarshaling

## Lesson Overview
This lesson teaches how struct tags control JSON encoding and decoding behavior, enabling backend engineers to manage field names, omission rules, and type conversions.

## Learning Objectives
- Use `json:"<name>"` tags to map struct fields to JSON keys.
- Omit empty fields with `omitempty`.
- Parse fields with alternative names using `json:"field,omitempty"`.
- Use custom types and implement marshaler/unmarshaler interfaces.

## Prerequisites
- Lesson 3.1 completed.
- Comfortable with structs and JSON basics.

## Real-world Motivation
APIs often need to present data differently than it is stored in code. Struct tags let engineers shape JSON contracts without changing internal models.

## Student Notes
### Struct tags
Tags appear after field declarations and tell Go how to marshal/unmarshal values.

### `omitempty`
The `omitempty` option excludes zero values from JSON output.

### `-` tag
Use `json:"-"` to ignore a field entirely.

### Custom marshaling
Types can implement `MarshalJSON()` and `UnmarshalJSON()` for advanced behavior.

### Practical advice
- Keep tags consistent with API contracts.
- Avoid overly complex custom marshaling unless necessary.

## Instructor Video Outline
1. Show a struct with JSON tags.
2. Explain the purpose of `omitempty` and ignored fields.
3. Demonstrate how tags change output keys.
4. Introduce custom marshaler examples.
5. Recap the JSON contract concept.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "fmt"
)

type Account struct {
    ID       int    `json:"id"`
    Username string `json:"username"`
    Password string `json:"-"`
    Bio      string `json:"bio,omitempty"`
}

func main() {
    acc := Account{ID: 1, Username: "alice", Password: "secret"}
    bytes, _ := json.MarshalIndent(acc, "", "  ")
    fmt.Println(string(bytes))
}
```

## Visual Learning Suggestions
- Table showing struct field, JSON key, and tag effect.
- Example before and after JSON output.

## Practice Exercises
1. Add JSON tags to a struct and inspect the output.
2. Use `omitempty` on optional fields.
3. Exclude a sensitive field from JSON.
4. Parse JSON into a struct with a mismatched field name.
5. Build a struct with a nested object and tag each field.

## Coding Challenges
1. Create a `Profile` struct that hides the password field in JSON.
2. Add `omitempty` to optional contact details.
3. Parse JSON where one field is named differently from the Go field.
4. Implement a custom `Marshaler` for a timestamp type.
5. Build a struct with embedded fields and JSON tags.

## Quiz
1. Multiple Choice: What does `json:"-"` do?
   - A) renames a field
   - B) omits a field from JSON ✅
   - C) makes a field required
   - D) formats a number
   - **Answer:** B.
2. True/False: `omitempty` removes zero values from JSON output.
   - **Answer:** True.
3. Multiple Choice: Which field tag maps `Email` to `email_address`?
   - A) `json:"Email"`
   - B) `json:"email_address"` ✅
   - C) `json:"emailAddress"`
   - D) `json:"email_address,omitempty"`
   - **Answer:** B.
4. Short Answer: Why would you hide a struct field from JSON?
   - **Answer:** to keep sensitive data private or reduce output size.
5. Debugging: Your JSON output still shows a field after using `omitempty`. Why?
   - **Answer:** the field value is not zero.
6. Multiple Choice: What can custom `MarshalJSON` do?
   - A) change field names dynamically ✅
   - B) alter package imports
   - C) compile time errors
   - D) ignore the struct
   - **Answer:** A.
7. True/False: `json:"id,string"` can parse numbers encoded as strings.
   - **Answer:** True.
8. Short Answer: What happens when a struct field has no JSON tag?
   - **Answer:** it uses the field name starting with a lowercase key.
9. Multiple Choice: Which option makes a field omitted when empty?
   - A) `json:"field,required"`
   - B) `json:"field,omitempty"` ✅
   - C) `json:"field,-"`
   - D) `json:"omitempty"`
   - **Answer:** B.
10. Short Answer: What is the effect of using embedded structs in JSON?
    - **Answer:** embedded fields are flattened into the parent object unless tagged.

## Assignment
### Objectives
- Control JSON output with struct tags.
- Protect sensitive fields from serialization.
- Understand how JSON contracts map to Go models.

### Requirements
- Create `lesson-3-2/main.go` with a data model and JSON tags.
- Add `lesson-3-2/README.md` explaining tag behavior.
- Include sample JSON output and input.

### Acceptance Criteria
- Output uses expected JSON keys.
- Optional fields are omitted when empty.
- Sensitive fields are excluded.

### Marking Rubric
- Tag usage: 40%
- Correct output: 30%
- Documentation: 30%

### Hints
- Use `json:"-"` for private values.
- Test the output with `json.MarshalIndent`.
- Keep field names consistent.

### Common Mistakes
- Forgetting tags on nested fields.
- Using `omitempty` when the value is not zero.
- Exposing secret fields.

### Submission Instructions
- Push `lesson-3-2` folder with code and README.

## GitHub Project
### Repository Name
`on2code-json-contracts`

### Folder Structure
```
lesson-3-2/
  main.go
  README.md
```

### Expected Output
JSON that hides sensitive fields and uses tagged keys.

### Commit Milestones
- `add json tags lesson`
- `document contract mapping`

### Branch Strategy
- `lesson-3-2`

### Pull Request Instructions
- Title: `Add JSON struct tags lesson`
- Description: `Control JSON encoding with Go struct tags.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm JSON keys match tags.
- Validate sensitive fields are omitted.

### Expected Results
- Proper JSON output.
- No runtime errors.

## Lesson Summary
Struct tags make Go models compatible with the JSON expected by clients and external systems.

## Next Lesson Preview
Lesson 3.3 covers file I/O and configuration persistence.

---

# Lesson 3.3: File I/O and Configuration Files

## Lesson Overview
This lesson teaches how Go programs read from and write to files, and how to use files for configuration and persistent state.

## Learning Objectives
- Open, read, and write files using `os` and `io`.
- Use `ioutil` / `os.ReadFile` and `os.WriteFile`.
- Parse configuration data from files.
- Handle file-related errors and permissions.

## Prerequisites
- Lesson 3.2 completed.
- Familiarity with structs and JSON.

## Real-world Motivation
Backend services need configuration files, log files, and data persistence. Safe file I/O is essential for deployable services.

## Student Notes
### Reading files
Use `os.ReadFile` for simple reads, or open files with `os.Open` for more control.

### Writing files
Use `os.WriteFile` for entire file writes, or `os.Create` and `io.Writer` for streamed output.

### Configuration files
Common formats include JSON, YAML, and TOML. JSON is a natural fit for Go because of built-in support.

### Practical advice
- Validate file contents before using them.
- Avoid writing to paths where the process has no permission.
- Use `defer file.Close()` after opening files.

## Instructor Video Outline
1. Explain why files matter in backend systems.
2. Demonstrate reading JSON config from disk.
3. Demonstrate writing a file and reading it back.
4. Show how to handle a missing file.
5. Recap file safety principles.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Config struct {
    Port int    `json:"port"`
    Host string `json:"host"`
}

func main() {
    data, err := os.ReadFile("config.json")
    if err != nil {
        panic(err)
    }

    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        panic(err)
    }

    fmt.Printf("Loaded config: %+v\n", cfg)

    cfg.Host = "127.0.0.1"
    out, _ := json.MarshalIndent(cfg, "", "  ")
    if err := os.WriteFile("config-out.json", out, 0644); err != nil {
        panic(err)
    }
}
```

## Visual Learning Suggestions
- Diagram of read/parse/use/write flow.
- Table of file functions and their use cases.

## Practice Exercises
1. Read a text file and print its contents.
2. Write structured JSON to a file.
3. Use `defer` to close an opened file.
4. Handle a missing configuration file gracefully.
5. Inspect file permissions and explain `0644`.

## Coding Challenges
1. Build a config loader that reads `settings.json`.
2. Write a function that saves user preferences to disk.
3. Implement a command that writes logs to a file.
4. Create a file-based counter that increments and persists across runs.
5. Read a JSON file and convert it into Go structs.

## Quiz
1. Multiple Choice: Which function reads all bytes from a file?
   - A) `os.ReadFile` ✅
   - B) `json.Unmarshal`
   - C) `fmt.Println`
   - D) `os.Create`
   - **Answer:** A.
2. True/False: `os.WriteFile` can create a file if it does not exist.
   - **Answer:** True.
3. Multiple Choice: What does `defer file.Close()` do?
   - A) keeps the file open forever
   - B) closes the file when the function ends ✅
   - C) immediately closes the file
   - D) deletes the file
   - **Answer:** B.
4. Short Answer: What is a common use for config files in backend apps?
   - **Answer:** storing environment-specific settings such as ports, DB URLs, and feature flags.
5. Debugging: Why would `ReadFile` fail with permission denied?
   - **Answer:** the process lacks read permission for the file or directory.
6. Multiple Choice: Which package contains `WriteFile`?
   - A) `fmt`
   - B) `os` ✅
   - C) `encoding/json`
   - D) `io`
   - **Answer:** B.
7. True/False: `os.WriteFile` overwrites the file by default.
   - **Answer:** True.
8. Short Answer: What should you do before writing to disk?
   - **Answer:** ensure the path exists and permissions are correct.
9. Multiple Choice: Which mode is read-only?
   - A) `os.O_RDONLY` ✅
   - B) `os.O_WRONLY`
   - C) `os.O_CREATE`
   - D) `os.O_RDWR`
   - **Answer:** A.
10. Short Answer: Why use files instead of in-memory storage?
    - **Answer:** files preserve state between program runs and can be shared across processes.

## Assignment
### Objectives
- Practice reading and writing files.
- Load configuration from disk.
- Persist data across program runs.

### Requirements
- Create `lesson-3-3/main.go` that loads a JSON config file.
- Add `lesson-3-3/config.json` as a sample.
- Write output to a second file after modifying config values.

### Acceptance Criteria
- Config loads successfully.
- Output file is created.
- Error handling is present.

### Marking Rubric
- File I/O correctness: 40%
- Error handling: 30%
- Documentation: 30%

### Hints
- Use `os.ReadFile` and `os.WriteFile`.
- Marshal with indentation for readability.
- Check the file path from the working directory.

### Common Mistakes
- Forgetting to close an opened file.
- Writing to a path that does not exist.
- Not checking `error` from read or write operations.

### Submission Instructions
- Push `lesson-3-3` folder with config and code.

## GitHub Project
### Repository Name
`on2code-file-io`

### Folder Structure
```
lesson-3-3/
  main.go
  config.json
  README.md
```

### Expected Output
A file `config-out.json` with modified content.

### Commit Milestones
- `add file io lesson`
- `document config persistence`

### Branch Strategy
- `lesson-3-3`

### Pull Request Instructions
- Title: `Add file I/O and config lesson`
- Description: `Read and write JSON config files in Go.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm `config-out.json` is created.
- Validate config file contents.

### Expected Results
- Correct file output.
- No runtime errors.

## Lesson Summary
File I/O knowledge enables backend programs to persist state and manage configuration.

## Next Lesson Preview
Lesson 3.4 covers working with time, dates, and formatting.

---

# Lesson 3.4: Working with Time, Dates, and Formats

## Lesson Overview
This lesson teaches time handling in Go with the `time` package, including parsing, formatting, duration arithmetic, and timezone awareness.

## Learning Objectives
- Use `time.Now()` to get the current time.
- Format dates and times with `Format` and layout strings.
- Parse time values from strings.
- Work with durations and timers.
- Use time values in logging and persistence.

## Prerequisites
- Lesson 3.3 completed.
- Familiarity with basic Go packages.

## Real-world Motivation
Backend services need reliable timestamps for logs, events, caches, and persistence. Time handling is essential for deadlines, expiration, and audit trails.

## Student Notes
### Time values
Go stores time as a struct that includes location and monotonic clock data.

### Formatting
Use layout strings based on `Mon Jan 2 15:04:05 MST 2006`.

### Parsing
Use `time.Parse(layout, value)` to convert strings into time values.

### Durations
Use `time.Duration` with units like `time.Second`, `time.Minute`, `time.Hour`.

### Best practices
- Store timestamps in UTC for consistency.
- Use ISO 8601 when sharing time across systems.
- Avoid custom ad-hoc date formats when possible.

## Instructor Video Outline
1. Show `time.Now()` and print the current time.
2. Demonstrate formatting a timestamp.
3. Parse a timestamp string.
4. Use durations to measure code execution and add intervals.
5. Recap timezone handling and UTC usage.

## Live Coding Demonstration
```go
package main

import (
    "fmt"
    "time"
)

func main() {
    now := time.Now().UTC()
    fmt.Println("UTC now:", now)

    formatted := now.Format(time.RFC3339)
    fmt.Println("RFC3339:", formatted)

    parsed, err := time.Parse(time.RFC3339, formatted)
    if err != nil {
        panic(err)
    }
    fmt.Println("Parsed:", parsed)

    later := now.Add(24 * time.Hour)
    fmt.Println("Tomorrow:", later.Format("2006-01-02 15:04:05"))
}
```

## Visual Learning Suggestions
- Timeline diagram showing now, future, and durations.
- Table of common time layouts.

## Practice Exercises
1. Print the current time in UTC and local time.
2. Format time as RFC3339 and a custom layout.
3. Parse a time string and calculate the difference from now.
4. Create a duration of 30 minutes and add it to a timestamp.
5. Explain why UTC is preferred for persisted timestamps.

## Coding Challenges
1. Build a function that returns a formatted timestamp.
2. Parse ISO 8601 timestamps from a JSON field.
3. Use `time.Since` to measure a code block.
4. Create a deadline that expires in 48 hours.
5. Add timestamp fields to a struct and serialize them to JSON.

## Quiz
1. Multiple Choice: Which value is used for `time.Format` layouts?
   - A) `YYYY-MM-DD`
   - B) `time.RFC3339` ✅
   - C) `layout` string with `2006-01-02` ✅
   - D) `time.Local`
   - **Answer:** B and C.
2. True/False: `time.Parse` can parse RFC3339 timestamps.
   - **Answer:** True.
3. Multiple Choice: What does `time.Now().UTC()` return?
   - A) local time
   - B) UTC time ✅
   - C) duration
   - D) timestamp string
   - **Answer:** B.
4. Short Answer: Why use UTC for stored timestamps?
   - **Answer:** to avoid timezone ambiguity.
5. Debugging: Your parsed time is one hour off. What could be wrong?
   - **Answer:** timezone mismatch or wrong layout.
6. Multiple Choice: Which type represents a time interval?
   - A) `time.Time`
   - B) `time.Duration` ✅
   - C) `int`
   - D) `string`
   - **Answer:** B.
7. True/False: `time.Add(1)` adds one second.
   - **Answer:** False. It adds one nanosecond.
8. Short Answer: How do you create a duration of one day?
   - **Answer:** `24 * time.Hour`.
9. Multiple Choice: Which constant is a standard layout?
   - A) `time.MONDAY`
   - B) `time.RFC3339` ✅
   - C) `time.JSON`
   - D) `time.DEFAULT`
   - **Answer:** B.
10. Short Answer: What function returns how long since a timestamp?
    - **Answer:** `time.Since`.

## Assignment
### Objectives
- Use the Go `time` package for timestamps.
- Format and parse dates correctly.
- Persist time values in JSON.

### Requirements
- Create `lesson-3-4/main.go` that prints current UTC time.
- Parse a timestamp string and compute a future deadline.
- Add `lesson-3-4/README.md` explaining layout strings.

### Acceptance Criteria
- Time values are formatted correctly.
- Parsing works with the chosen layout.
- README explains the chosen format.

### Marking Rubric
- Accuracy: 40%
- Code clarity: 30%
- Documentation: 30%

### Hints
- Use `time.RFC3339` for interoperability.
- Convert times to UTC when storing.
- Use `time.Parse` to validate strings.

### Common Mistakes
- Using wrong layout values.
- Forgetting to convert to UTC.
- Assuming `time.Now()` returns UTC.

### Submission Instructions
- Push `lesson-3-4` folder with code and README.

## GitHub Project
### Repository Name
`on2code-time-handling`

### Folder Structure
```
lesson-3-4/
  main.go
  README.md
```

### Expected Output
Formatted timestamps and a parsed deadline.

### Commit Milestones
- `add time lesson`
- `document formatter usage`

### Branch Strategy
- `lesson-3-4`

### Pull Request Instructions
- Title: `Add time handling lesson`
- Description: `Teach Go date/time parsing and formatting.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm parsed time values are valid.
- Validate output formatting.

### Expected Results
- Correct timestamp output.
- No parsing errors.

## Lesson Summary
Time handling is critical for backend services that log, schedule, and persist event data.

## Next Lesson Preview
Lesson 3.5 builds a file-backed utility using the data skills learned so far.

---

# Lesson 3.5: Building a File-backed CLI Utility

## Lesson Overview
This lesson combines JSON, file I/O, and CLI interaction to build a small persistence-backed tool.

## Learning Objectives
- Design a command-line utility for backend workflows.
- Persist state to a JSON file.
- Load and save data across runs.
- Keep CLI logic separate from persistence code.

## Prerequisites
- Lessons 3.1 through 3.4 completed.
- Comfortable with Go functions and packages.

## Real-world Motivation
Many backend utilities read and write state from local files, especially during early development or for simple configuration stores.

## Student Notes
### CLI design
Keep the program interface simple and predictable.

### Persistence
Save state to a file and reload it when the utility starts.

### Separation of concerns
Keep file access and business logic in separate functions.

### Practical advice
- Validate loaded state before using it.
- Always write files atomically if possible.
- Provide clear user feedback.

## Instructor Video Outline
1. Sketch the utility design and persistence file.
2. Implement load and save functions.
3. Show CLI entrypoint and command parsing.
4. Demonstrate state persistence across runs.
5. Recap the architecture.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Task struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
    Done bool   `json:"done"`
}

type Store struct {
    Tasks []Task `json:"tasks"`
}

func loadStore(path string) (Store, error) {
    var store Store
    data, err := os.ReadFile(path)
    if err != nil {
        if os.IsNotExist(err) {
            return Store{}, nil
        }
        return store, err
    }
    err = json.Unmarshal(data, &store)
    return store, err
}

func saveStore(path string, store Store) error {
    data, err := json.MarshalIndent(store, "", "  ")
    if err != nil {
        return err
    }
    return os.WriteFile(path, data, 0644)
}

func main() {
    path := "tasks.json"
    store, err := loadStore(path)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Loaded %d tasks\n", len(store.Tasks))
    store.Tasks = append(store.Tasks, Task{ID: len(store.Tasks) + 1, Name: "Finish lesson", Done: false})
    if err := saveStore(path, store); err != nil {
        panic(err)
    }
    fmt.Println("Saved tasks")
}
```

## Visual Learning Suggestions
- Diagram of utility startup, state load, modify, and save.
- CLI command flow chart.

## Practice Exercises
1. Create a small task list persisted to a JSON file.
2. Add commands for `list`, `add`, and `complete`.
3. Keep loading and saving logic in a helper package.
4. Print helpful error messages when persistence fails.
5. Add a timestamp to each saved item.

## Coding Challenges
1. Build a contacts CLI that saves contacts to `contacts.json`.
2. Add a `remove` command to delete persisted items.
3. Keep command parsing minimal and explicit.
4. Store created/updated timestamps on each record.
5. Load default data when the persistence file does not exist.

## Quiz
1. Multiple Choice: What should a CLI utility do when state file is missing?
   - A) crash
   - B) initialize empty state ✅
   - C) ignore user input
   - D) delete the file
   - **Answer:** B.
2. True/False: CLI and persistence logic should be tightly coupled.
   - **Answer:** False.
3. Multiple Choice: Which function writes JSON to disk?
   - A) `os.WriteFile` ✅
   - B) `json.Unmarshal`
   - C) `io.ReadAll`
   - D) `fmt.Fprintf`
   - **Answer:** A.
4. Short Answer: Why use a separate save function?
   - **Answer:** to isolate persistence logic and make it reusable.
5. Debugging: Your file contents are corrupted after save. What could be wrong?
   - **Answer:** partial write or invalid JSON marshaling.
6. Multiple Choice: What is an atomic write strategy?
   - A) writing to a temp file then renaming ✅
   - B) appending every time
   - C) using `fmt.Println`
   - D) writing zeros
   - **Answer:** A.
7. True/False: A CLI utility should always save state even if no changes were made.
   - **Answer:** False.
8. Short Answer: How can you represent a command in Go?
   - **Answer:** using `os.Args` or a command switch.
9. Multiple Choice: Which package helps with command arguments?
   - A) `os` ✅
   - B) `net/http`
   - C) `encoding/json`
   - D) `bufio`
   - **Answer:** A.
10. Short Answer: What is the first step when a CLI program starts?
    - **Answer:** load configuration or persisted state.

## Assignment
### Objectives
- Build a file-backed utility with a simple CLI.
- Persist state across runs.
- Keep code separated into reusable functions.

### Requirements
- Create `lesson-3-5/main.go` implementing a task or contact manager.
- Save state in `data.json` or a similar file.
- Add `lesson-3-5/README.md` with usage examples.

### Acceptance Criteria
- State persists across program runs.
- The utility handles missing state files.
- The README explains available commands.

### Marking Rubric
- Persistence: 40%
- CLI behavior: 30%
- Code quality: 20%
- Documentation: 10%

### Hints
- Use `os.Args` for simple command parsing.
- Keep state in a small struct.
- Save only when changes occur.

### Common Mistakes
- Not saving after updates.
- Crashing when file does not exist.
- Mixing CLI parsing and persistence code.

### Submission Instructions
- Push `lesson-3-5` folder with code, sample file, and README.

## GitHub Project
### Repository Name
`on2code-persistent-cli`

### Folder Structure
```
lesson-3-5/
  main.go
  README.md
```

### Expected Output
A CLI utility that loads, updates, and saves JSON state.

### Commit Milestones
- `add file-backed cli lesson`
- `document command usage`

### Branch Strategy
- `lesson-3-5`

### Pull Request Instructions
- Title: `Add persistent CLI lesson`
- Description: `Build a file-backed Go utility with JSON persistence.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm state persists in the JSON file.
- Validate missing file initialization.

### Expected Results
- Working CLI behavior.
- State persistence across runs.

## Lesson Summary
This lesson shows how backend tools can retain data between runs using files and JSON.

## Next Lesson Preview
Lesson 3.6 introduces unit testing and test-driven development in Go.

---

# Lesson 3.6: Unit Testing Fundamentals in Go

## Lesson Overview
This lesson teaches Go's built-in testing tools and how to write reliable unit tests for backend code.

## Learning Objectives
- Create a test file using `_test.go` suffix.
- Write test functions using `func TestXxx(t *testing.T)`.
- Use assertions and error reporting with `t.Fatal`, `t.Errorf`, and `t.Helper()`.
- Run tests with `go test`.

## Prerequisites
- Module 2 complete.
- Familiarity with functions and packages.

## Real-world Motivation
Tests catch regressions, clarify expectations, and make refactoring safe. Backend services benefit from automated test suites.

## Student Notes
### Test files
Place tests in files named `something_test.go`.

### Test functions
Each test function must start with `Test`.

### Assertions
Use `t.Fatal` or `t.Errorf` to mark failures.

### Running tests
Use `go test ./...` to run all package tests.

### Practical advice
- Test small units of behavior.
- Keep tests deterministic.
- Name tests clearly.

## Instructor Video Outline
1. Explain the purpose of tests.
2. Create a simple test for a helper function.
3. Run `go test` and inspect output.
4. Introduce failure messages and debugging.
5. Recap test structure.

## Live Coding Demonstration
```go
package main

import "testing"

func add(a, b int) int {
    return a + b
}

func TestAdd(t *testing.T) {
    got := add(2, 3)
    want := 5
    if got != want {
        t.Fatalf("expected %d, got %d", want, got)
    }
}
```

## Visual Learning Suggestions
- Flowchart of code, test input, and expected output.
- Example of passing vs failing test output.

## Practice Exercises
1. Write a test for a simple math function.
2. Run `go test` and read the report.
3. Add a failing assertion on purpose and fix it.
4. Use `t.Helper()` in a helper assertion.
5. Keep test names descriptive.

## Coding Challenges
1. Add tests for a validation function.
2. Test a function that marshals JSON output.
3. Write a failure case for invalid input.
4. Use helper functions to reduce duplicated assertions.
5. Create a package-level helper for common test values.

## Quiz
1. Multiple Choice: What suffix identifies test files?
   - A) `_test.go` ✅
   - B) `_spec.go`
   - C) `_unit.go`
   - D) `_example.go`
   - **Answer:** A.
2. True/False: `go test` discovers functions starting with `Test`.
   - **Answer:** True.
3. Multiple Choice: Which method fails a test immediately?
   - A) `t.Log`
   - B) `t.Fatal` ✅
   - C) `t.Helper`
   - D) `t.Run`
   - **Answer:** B.
4. Short Answer: What package is required for tests?
   - **Answer:** `testing`.
5. Debugging: Why does `go test` report no tests?
   - **Answer:** there are no exported functions starting with `Test`.
6. Multiple Choice: Which statement is true?
   - A) tests can be in the same package as code ✅
   - B) tests must be in a separate package
   - C) tests must use `main`
   - D) tests cannot call other packages
   - **Answer:** A.
7. True/False: Test helper functions should call `t.Helper()`.
   - **Answer:** True.
8. Short Answer: What command runs tests in all packages?
   - **Answer:** `go test ./...`.
9. Multiple Choice: Which method continues a test after reporting failure?
   - A) `t.Fatal`
   - B) `t.FailNow`
   - C) `t.Errorf` ✅
   - D) `t.Logf`
   - **Answer:** C.
10. Short Answer: Why is automated testing valuable?
    - **Answer:** it prevents regressions and documents expected behavior.

## Assignment
### Objectives
- Write unit tests for core functions.
- Use Go's testing package properly.
- Run and interpret test results.

### Requirements
- Create `lesson-3-6/main.go` with a function and `lesson-3-6/main_test.go`.
- Add tests for valid and invalid behavior.
- Document how to run tests in README.

### Acceptance Criteria
- Tests pass with `go test`.
- Failure messages are meaningful.
- README explains test commands.

### Marking Rubric
- Test coverage: 40%
- Correct assertions: 30%
- Documentation: 30%

### Hints
- Write one test per behavior.
- Use helper functions for repeated assertions.
- Keep tests independent.

### Common Mistakes
- Not using `t.Fatal` or `t.Errorf` correctly.
- Writing tests dependent on environment state.
 - Forgetting to import `testing`.

### Submission Instructions
- Push `lesson-3-6` folder with tests and README.

## GitHub Project
### Repository Name
`on2code-go-testing`

### Folder Structure
```
lesson-3-6/
  main.go
  main_test.go
  README.md
```

### Expected Output
A test suite that passes and documents how to run it.

### Commit Milestones
- `add testing lesson`
- `document test commands`

### Branch Strategy
- `lesson-3-6`

### Pull Request Instructions
- Title: `Add unit testing lesson`
- Description: `Teach Go unit testing with sample assertions.`

## Automated Tests
### Requirements
- Run `go test ./...` successfully.
- Confirm tests exercise the function logic.
- Ensure all assertions are meaningful.

### Expected Results
- Test suite passes.
- No skipped tests.

## Lesson Summary
Testing is an essential discipline for backend engineers and improves confidence when changing code.

## Next Lesson Preview
Lesson 3.7 focuses on table-driven tests and test helpers to make suites scalable.

---

# Lesson 3.7: Table-driven Tests and Test Helpers

## Lesson Overview
This lesson teaches table-driven testing, a Go pattern that keeps tests readable and easy to extend, along with helper functions for shared assertions.

## Learning Objectives
- Write table-driven tests using test cases.
- Use `t.Run` for subtests.
- Create helper functions that call `t.Helper()`.
- Keep test code clean and maintainable.

## Prerequisites
- Lesson 3.6 completed.
- Familiarity with Go unit tests.

## Real-world Motivation
As backend code grows, tests must cover many variations. Table-driven tests allow engineers to add cases without duplicating logic.

## Student Notes
### Test cases
Define a slice of structs representing inputs and expected outputs.

### `t.Run`
Use subtests to name each case and run them individually.

### Helpers
Helper functions simplify assertions and improve failure diagnostics.

### Practical advice
- Keep case names descriptive.
- Avoid overly large tables.
- Use helper functions to reduce duplication.

## Instructor Video Outline
1. Introduce a failing test and refactor to table-driven style.
2. Show `t.Run` with named cases.
3. Add a helper function for assertions.
4. Run tests and review output.
5. Recap the pattern.

## Live Coding Demonstration
```go
package main

import "testing"

func isValidEmail(email string) bool {
    return len(email) > 5 && email != ""
}

func assertEqualString(t *testing.T, got, want string) {
    t.Helper()
    if got != want {
        t.Fatalf("got %q, want %q", got, want)
    }
}

func TestIsValidEmail(t *testing.T) {
    cases := []struct {
        name  string
        email string
        want  bool
    }{
        {name: "valid", email: "user@example.com", want: true},
        {name: "empty", email: "", want: false},
    }

    for _, tc := range cases {
        t.Run(tc.name, func(t *testing.T) {
            got := isValidEmail(tc.email)
            if got != tc.want {
                t.Fatalf("got %v, want %v", got, tc.want)
            }
        })
    }
}
```

## Visual Learning Suggestions
- Table format showing test case names and expectations.
- Example test output with subtest names.

## Practice Exercises
1. Convert a set of repeated tests into a table-driven style.
2. Add case names for easier failure reporting.
3. Write a helper assertion for error messages.
4. Use `t.Run` to isolate test cases.
5. Keep tests clear and avoid complex loops.

## Coding Challenges
1. Write table-driven tests for input validation functions.
2. Add subtests for boundary and invalid cases.
3. Use a helper to compare structures.
4. Create a table-driven test for JSON marshaling behavior.
5. Refactor an existing test suite into table-driven form.

## Quiz
1. Multiple Choice: What does a table-driven test use?
   - A) loops and case structs ✅
   - B) reflection only
   - C) global variables
   - D) no assertions
   - **Answer:** A.
2. True/False: `t.Run` can run subtests.
   - **Answer:** True.
3. Multiple Choice: What does `t.Helper()` do?
   - A) marks a helper function so failures report the caller ✅
   - B) skips the test
   - C) runs the helper asynchronously
   - D) logs help text
   - **Answer:** A.
4. Short Answer: Why are test case names useful?
   - **Answer:** they make failures easier to identify.
5. Debugging: Your subtests all show the same name. What should you fix?
   - **Answer:** give each case a unique `name` field.
6. Multiple Choice: Which is a good table-driven test pattern?
   - A) one case only
   - B) slice of structs and loop ✅
   - C) nested if statements
   - D) switch statements only
   - **Answer:** B.
7. True/False: Helpers should call `t.Helper()` when they assert.
   - **Answer:** True.
8. Short Answer: What is the benefit of table-driven tests?
   - **Answer:** easier expansion and less duplication.
9. Multiple Choice: Which package provides `t.Run`?
   - A) `fmt`
   - B) `testing` ✅
   - C) `os`
   - D) `io`
   - **Answer:** B.
10. Short Answer: How do you name a subtest?
    - **Answer:** by passing a string to `t.Run(name, func(t *testing.T) {...})`.

## Assignment
### Objectives
- Use table-driven tests for multiple cases.
- Create helper functions to simplify assertions.
- Write maintainable test suites.

### Requirements
- Create `lesson-3-7/main.go` and `lesson-3-7/main_test.go`.
- Use a table-driven test for at least one function.
- Document the test pattern in README.

### Acceptance Criteria
- Tests use `t.Run` and descriptive names.
- Helper functions are used appropriately.
- The suite passes.

### Marking Rubric
- Table design: 40%
- Helper usage: 30%
- Test clarity: 20%
- Documentation: 10%

### Hints
- Keep the test case slice easy to read.
- Use helper functions for repeated comparisons.
- Name each case clearly.

### Common Mistakes
- Not using case names.
- Repeating assertions in each case.
- Forgetting `t.Helper()` in helpers.

### Submission Instructions
- Push `lesson-3-7` folder with code, tests, and README.

## GitHub Project
### Repository Name
`on2code-table-driven-tests`

### Folder Structure
```
lesson-3-7/
  main.go
  main_test.go
  README.md
```

### Expected Output
A test suite using table-driven style and helpers.

### Commit Milestones
- `add table-driven tests lesson`
- `document test helpers`

### Branch Strategy
- `lesson-3-7`

### Pull Request Instructions
- Title: `Add table-driven testing lesson`
- Description: `Use Go subtests and helper functions for maintainable tests.`

## Automated Tests
### Requirements
- Run `go test ./...` successfully.
- Confirm subtests appear with names.
- Validate helper-assisted assertions.

### Expected Results
- Passing tests.
- Clear subtest output.

## Lesson Summary
Table-driven testing makes Go test suites scalable, readable, and easier to maintain.

## Next Lesson Preview
Lesson 3.8 covers structured error design, logging, and debugging for backend code.

---

# Lesson 3.8: Error Design, Logging, and Debugging

## Lesson Overview
This lesson teaches how to design errors and logs that make backend systems easier to debug and operate.

## Learning Objectives
- Use the Go `error` type for domain errors.
- Create and wrap errors with `fmt.Errorf`.
- Log meaningful messages using `log` or structured output.
- Debug code with print statements and test failures.

## Prerequisites
- Lesson 3.6 and 3.7 completed.
- Familiarity with error handling.

## Real-world Motivation
Clear errors and logs help teams understand failures in production and reduce mean time to recovery.

## Student Notes
### Error design
Return errors from functions instead of panicking for expected failures.

### Wrapping errors
Use `fmt.Errorf("%w", err)` to preserve context.

### Logging
Use `log.Printf` for simple logs or structured logs in production.

### Debugging
Reproduce issues locally, inspect values, and use tests to catch problems.

### Practical advice
- Log errors with context, not just raw values.
- Avoid logging secrets.
- Use `defer` and `recover` only for truly unexpected panics.

## Instructor Video Outline
1. Explain why errors should be explicit.
2. Demonstrate returning an error from a function.
3. Show wrapping an error with context.
4. Log events with `log.Printf`.
5. Recap debugging workflow.

## Live Coding Demonstration
```go
package main

import (
    "fmt"
    "log"
    "os"
)

func loadFile(path string) (string, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return "", fmt.Errorf("loadFile %s: %w", path, err)
    }
    return string(data), nil
}

func main() {
    content, err := loadFile("missing.txt")
    if err != nil {
        log.Printf("failed to load file: %v", err)
        return
    }
    fmt.Println(content)
}
```

## Visual Learning Suggestions
- Diagram of error propagation and wrapping.
- Examples of clean vs noisy logs.

## Practice Exercises
1. Return errors instead of panicking for expected failures.
2. Wrap an underlying error with context.
3. Log a startup message with file path information.
4. Use a test to assert an error is returned.
5. Avoid logging sensitive configuration values.

## Coding Challenges
1. Build a helper that loads a file and wraps errors.
2. Log a data load failure with the filename.
3. Create a custom error type for validation failures.
4. Add debug logging for command execution.
5. Write a test that inspects wrapped error messages.

## Quiz
1. Multiple Choice: What package provides basic logging?
   - A) `fmt`
   - B) `log` ✅
   - C) `errors`
   - D) `io`
   - **Answer:** B.
2. True/False: `fmt.Errorf("%w", err)` wraps an error.
   - **Answer:** True.
3. Multiple Choice: Which method is used to present error details?
   - A) `errors.Is(err, target)` ✅
   - B) `log.Fatal` only
   - C) `fmt.Println`
   - D) `json.Marshal`
   - **Answer:** A.
4. Short Answer: Why avoid panics for normal failures?
   - **Answer:** panics crash the program and are not recoverable in normal flow.
5. Debugging: What does `log.Printf("failed: %v", err)` provide?
   - **Answer:** a formatted error message with context.
6. Multiple Choice: Which function returns true if an error matches a target?
   - A) `errors.Unwrap`
   - B) `errors.Is` ✅
   - C) `errors.New`
   - D) `fmt.Errorf`
   - **Answer:** B.
7. True/False: Logging secrets is a good practice.
   - **Answer:** False.
8. Short Answer: What does `defer` help with during debugging?
   - **Answer:** ensures cleanup actions like closing files.
9. Multiple Choice: Which is a good log message?
   - A) `error occurred`
   - B) `failed to open config file /etc/app/config.json: %v` ✅
   - C) `oops`
   - D) `unknown`
   - **Answer:** B.
10. Short Answer: What is one benefit of error wrapping?
    - **Answer:** it preserves the original error while adding context.

## Assignment
### Objectives
- Design explicit error propagation.
- Log meaningful context for failures.
- Test error conditions.

### Requirements
- Create `lesson-3-8/main.go` with a loader function that wraps errors.
- Add `lesson-3-8/main_test.go` checking wrapped errors.
- Include `lesson-3-8/README.md` describing error handling.

### Acceptance Criteria
- Errors are wrapped with context.
- Logs include useful details without leaking secrets.
- Tests validate error behavior.

### Marking Rubric
- Error design: 40%
- Logging quality: 30%
- Tests: 20%
- Documentation: 10%

### Hints
- Use `fmt.Errorf("...: %w", err)`.
- Log at the call site, not inside low-level helpers.
- Check `errors.Is` in tests.

### Common Mistakes
- Using `panic` for expected failures.
- Logging raw error objects without context.
- Forgetting to check `error` values.

### Submission Instructions
- Push `lesson-3-8` folder with code, tests, and README.

## GitHub Project
### Repository Name
`on2code-error-handling`

### Folder Structure
```
lesson-3-8/
  main.go
  main_test.go
  README.md
```

### Expected Output
A robust error-handling example with tests.

### Commit Milestones
- `add error handling lesson`
- `document logging strategy`

### Branch Strategy
- `lesson-3-8`

### Pull Request Instructions
- Title: `Add error handling lesson`
- Description: `Demonstrate Go error wrapping and logging.`

## Automated Tests
### Requirements
- Run `go test ./...` successfully.
- Confirm wrapped errors can be matched.
- Validate log output contains context.

### Expected Results
- Passing tests.
- Clear error diagnostics.

## Lesson Summary
Good error design and logging make backend services easier to operate and maintain.

## Next Lesson Preview
Lesson 3.9 explores persistence patterns and the difference between memory-based and file-based storage.

---

# Lesson 3.9: In-memory Stores vs File Persistence

## Lesson Overview
This lesson compares transient in-memory state to file persistence and helps students decide when each approach is appropriate.

## Learning Objectives
- Explain the difference between in-memory and persistent storage.
- Design an in-memory repository for quick data access.
- Add file persistence to save state across restarts.
- Understand failure modes for each storage type.

## Prerequisites
- Lessons 3.3 and 3.5 completed.
- Familiarity with persistence and state management.

## Real-world Motivation
Backend systems usually combine in-memory caches with persistent storage to balance speed and durability.

## Student Notes
### In-memory stores
Fast and simple, but lost when the process exits.

### File persistence
Keeps state across restarts but is slower than memory.

### Hybrid patterns
Load data from disk into memory at startup, then flush changes back to disk.

### Practical advice
- Use in-memory state for caches and transient computations.
- Use files or databases for durable data.
- Handle persistence failures gracefully.

## Instructor Video Outline
1. Compare in-memory vs file-backed storage.
2. Build an in-memory repository for tasks.
3. Add file persistence on save.
4. Show what happens when the app restarts.
5. Recap tradeoffs.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Item struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

type Repository struct {
    Items []Item
    path  string
}

func NewRepository(path string) *Repository {
    return &Repository{path: path}
}

func (r *Repository) Load() error {
    data, err := os.ReadFile(r.path)
    if err != nil {
        if os.IsNotExist(err) {
            return nil
        }
        return err
    }
    return json.Unmarshal(data, &r.Items)
}

func (r *Repository) Save() error {
    data, err := json.MarshalIndent(r.Items, "", "  ")
    if err != nil {
        return err
    }
    return os.WriteFile(r.path, data, 0644)
}

func (r *Repository) Add(name string) {
    item := Item{ID: len(r.Items) + 1, Name: name}
    r.Items = append(r.Items, item)
}

func main() {
    repo := NewRepository("items.json")
    if err := repo.Load(); err != nil {
        panic(err)
    }
    repo.Add("example item")
    if err := repo.Save(); err != nil {
        panic(err)
    }
    fmt.Println("saved", len(repo.Items), "items")
}
```

## Visual Learning Suggestions
- Diagram of memory state loaded from disk and written back.
- Table of tradeoffs for speed vs durability.

## Practice Exercises
1. Build an in-memory cache for a list of items.
2. Save the cache to disk after modifications.
3. Restart the program and verify the persisted state loads.
4. Explain why file persistence is slower than memory.
5. Add an `isDirty` flag to avoid unnecessary saves.

## Coding Challenges
1. Implement an in-memory store with a `FindByID` method.
2. Persist the store to disk only when changes occur.
3. Compare two runs: one with persistence and one without.
4. Add a `Clear` command that resets in-memory state.
5. Write a test for the repository load/save cycle.

## Quiz
1. Multiple Choice: What happens to in-memory data when the process exits?
   - A) it is saved automatically
   - B) it is lost ✅
   - C) it remains in RAM
   - D) it writes to disk by default
   - **Answer:** B.
2. True/False: File persistence makes state durable across restarts.
   - **Answer:** True.
3. Multiple Choice: Which is faster?
   - A) disk writes
   - B) in-memory access ✅
   - C) network calls
   - D) database migrations
   - **Answer:** B.
4. Short Answer: Why might you load data into memory at startup?
   - **Answer:** for faster access and fewer disk reads.
5. Debugging: Your data file becomes stale after updates. What could be wrong?
   - **Answer:** changes were not saved or the wrong file path was used.
6. Multiple Choice: What is a hybrid storage pattern?
   - A) keeping data only in memory
   - B) loading from disk into memory and saving later ✅
   - C) using two databases
   - D) writing every field individually
   - **Answer:** B.
7. True/False: File persistence is always preferable to in-memory storage.
   - **Answer:** False.
8. Short Answer: What should you do before saving a file?
   - **Answer:** validate data and ensure correct path.
9. Multiple Choice: Which state is lost when an app crashes?
   - A) persisted files
   - B) in-memory state ✅
   - C) static config
   - D) executable code
   - **Answer:** B.
10. Short Answer: Name one benefit of keeping data in memory.
    - **Answer:** faster access.

## Assignment
### Objectives
- Compare memory-only and file persistence approaches.
- Build a repository that saves state to disk.
- Document the tradeoffs.

### Requirements
- Create `lesson-3-9/main.go` with an in-memory repository and file save/load.
- Add `lesson-3-9/README.md` explaining the behavior.
- Include a simple persistence demonstration.

### Acceptance Criteria
- Repository loads persisted data.
- The program saves changes to disk.
- Behavior is documented.

### Marking Rubric
- Persistence correctness: 40%
- Design clarity: 30%
- Documentation: 30%

### Hints
- Keep repository methods small.
- Use `os.IsNotExist` to initialize empty state.
- Save only when there are changes.

### Common Mistakes
- Not handling missing persistence files.
- Saving invalid JSON.
 - Storing index values incorrectly.

### Submission Instructions
- Push `lesson-3-9` folder with code and README.

## GitHub Project
### Repository Name
`on2code-memory-vs-persistence`

### Folder Structure
```
lesson-3-9/
  main.go
  README.md
```

### Expected Output
A load/save repository that persists items between runs.

### Commit Milestones
- `add persistence lesson`
- `document tradeoffs`

### Branch Strategy
- `lesson-3-9`

### Pull Request Instructions
- Title: `Add persistence comparison lesson`
- Description: `Compare in-memory and file-backed data stores.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm persisted data loads after restart.
- Validate the repository save/load methods.

### Expected Results
- Working persistence.
- Correct state reload.

## Lesson Summary
Understanding persistence tradeoffs prepares backend engineers to choose appropriate storage for each use case.

## Next Lesson Preview
Lesson 3.10 completes the module by integrating external APIs and configuration management.

---

# Lesson 3.10: External API Integration and Config Management

## Lesson Overview
This lesson teaches how backend services consume external APIs and manage configuration using files and environment variables.

## Learning Objectives
- Call an external HTTP API using `net/http`.
- Parse JSON responses from external services.
- Load configuration from files and environment variables.
- Keep configuration and API clients decoupled.

## Prerequisites
- Lessons 3.1 through 3.9 completed.
- Familiarity with JSON and file I/O.

## Real-world Motivation
Backend services often integrate with other APIs for data, authentication, payment, or notifications. Configuration management ensures those integrations are safe and flexible.

## Student Notes
### HTTP clients
Use `http.Get` or `http.Client` to call external APIs.

### Response parsing
Read the response body and unmarshal JSON.

### Configuration sources
Use files for default settings and environment variables for secrets or deployment-specific values.

### Practical advice
- Do not hardcode API keys.
- Validate environment variables at startup.
- Keep API request and response handling in dedicated functions.

## Instructor Video Outline
1. Demonstrate calling a public JSON API.
2. Parse response data into Go structs.
3. Load config from a file and override with environment variables.
4. Show error handling for failed API calls.
5. Recap separation of config and client code.

## Live Coding Demonstration
```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

type Config struct {
    APIUrl string `json:"api_url"`
}

type Joke struct {
    ID   string `json:"id"`
    Joke string `json:"joke"`
}

func loadConfig() Config {
    cfg := Config{APIUrl: "https://icanhazdadjoke.com/"}
    if env := os.Getenv("JOKE_API_URL"); env != "" {
        cfg.APIUrl = env
    }
    return cfg
}

func fetchJoke(url string) (Joke, error) {
    req, err := http.NewRequest(http.MethodGet, url, nil)
    if err != nil {
        return Joke{}, err
    }
    req.Header.Set("Accept", "application/json")

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return Joke{}, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return Joke{}, fmt.Errorf("unexpected status: %d", resp.StatusCode)
    }

    var joke Joke
    if err := json.NewDecoder(resp.Body).Decode(&joke); err != nil {
        return Joke{}, err
    }
    return joke, nil
}

func main() {
    cfg := loadConfig()
    joke, err := fetchJoke(cfg.APIUrl)
    if err != nil {
        fmt.Println("error:", err)
        return
    }
    fmt.Println(joke.Joke)
}
```

## Visual Learning Suggestions
- Diagram of config file env override flow.
- Example HTTP request/response flow chart.

## Practice Exercises
1. Call a public JSON API and print data.
2. Load a default config and override it with an environment variable.
3. Handle HTTP errors with status checks.
4. Use `json.NewDecoder` to stream response parsing.
5. Keep API URL and secrets separate from code.

## Coding Challenges
1. Build a small API client that fetches data from a public endpoint.
2. Use config values loaded from a JSON file.
3. Override the API endpoint with an environment variable.
4. Add request headers and error handling.
5. Write a test for the config loader.

## Quiz
1. Multiple Choice: Which package makes HTTP requests?
   - A) `net/http` ✅
   - B) `encoding/json`
   - C) `os`
   - D) `log`
   - **Answer:** A.
2. True/False: Environment variables are a good place for secrets.
   - **Answer:** True, when used correctly.
3. Multiple Choice: What does `http.NewRequest` return?
   - A) a response
   - B) a request ✅
   - C) an error only
   - D) a reader
   - **Answer:** B.
4. Short Answer: Why should config be decoupled from code?
   - **Answer:** to make deployments flexible and avoid hardcoded values.
5. Debugging: Your API call returns a 401. What is a likely cause?
   - **Answer:** missing or invalid credentials.
6. Multiple Choice: Which header signals JSON responses?
   - A) `Accept: application/json` ✅
   - B) `Content-Type: text/plain`
   - C) `Authorization`
   - D) `User-Agent`
   - **Answer:** A.
7. True/False: `os.Getenv` returns an empty string if the variable is unset.
   - **Answer:** True.
8. Short Answer: How do you parse a JSON HTTP response body?
   - **Answer:** use `json.NewDecoder(resp.Body).Decode(&target)`.
9. Multiple Choice: Which source should override the other?
   - A) file config overrides env vars
   - B) env vars override file config ✅
   - C) code overrides env vars
   - D) defaults override env vars
   - **Answer:** B.
10. Short Answer: What should you do if an HTTP response status is not 200?
    - **Answer:** treat it as an error and handle it accordingly.

## Assignment
### Objectives
- Consume an external API.
- Manage configuration with env vars and defaults.
- Keep API calls and config loading separate.

### Requirements
- Create `lesson-3-10/main.go` that loads config and calls a JSON API.
- Document config options in `lesson-3-10/README.md`.
- Add a sample config or environment variable instructions.

### Acceptance Criteria
- API call works and prints parsed data.
- Config values can be overridden by env vars.
- Errors are handled.

### Marking Rubric
- Integration: 40%
- Configuration: 30%
- Documentation: 30%

### Hints
- Use `http.NewRequest` and set `Accept: application/json`.
- Use environment variables for endpoints or tokens.
- Keep config loading deterministic.

### Common Mistakes
- Hardcoding API URLs.
- Ignoring environment variables.
- Parsing JSON incorrectly.

### Submission Instructions
- Push `lesson-3-10` folder with code, README, and config guidance.

## GitHub Project
### Repository Name
`on2code-api-integration`

### Folder Structure
```
lesson-3-10/
  main.go
  README.md
```

### Expected Output
A small program that fetches and prints JSON from an external API.

### Commit Milestones
- `add api integration lesson`
- `document config overrides`

### Branch Strategy
- `lesson-3-10`

### Pull Request Instructions
- Title: `Add API integration lesson`
- Description: `Consume a JSON API and manage configuration in Go.`

## Automated Tests
### Requirements
- Run `go test ./...` successfully.
- Add a test for config loading.
- Validate error handling for missing env vars.

### Expected Results
- Passing tests.
- Working API client.

## Lesson Summary
External API calls and configuration management are core backend competencies needed for real-world service integration.

## Next Module Preview
Module 4 will move into databases, HTTP services, and persistent backend APIs.
