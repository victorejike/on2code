# Module 2: Go Fundamentals and Core Programming Concepts

## Module Introduction
Module 2 teaches the fundamental building blocks of Go programming and backend logic. Students transition from setup and theory into writing real Go code, learning how to express logic, manipulate data, and structure programs using variables, types, control flow, and functions.

## Learning Outcomes
By the end of this module, students will be able to:
- Write idiomatic Go code using variables, constants, and basic types.
- Use control flow structures such as `if`, `switch`, and loops.
- Create and call functions with parameters and return values.
- Work with arrays, slices, maps, and structs.
- Understand pointers, memory references, and value vs. reference semantics.
- Implement simple algorithms and small utilities.
- Document code and use Go formatting tools.

## Lessons
1. Go Syntax and Program Structure
2. Variables, Constants, and Basic Types
3. Control Flow: Branching and Conditions
4. Loops and Iteration
5. Arrays and Slices
6. Maps and Lookup Data
7. Structs, Methods, and Data Modeling
8. Pointers and Memory References
9. Functions, Return Values, and Error Handling
10. Building Small Utilities in Go

## Practice Labs
- Lab 1: Build a calculator utility that uses variables and control flow.
- Lab 2: Create a contact list using structs and maps.
- Lab 3: Implement a small text-processing command-line tool.

## Module Quiz
A 20-question quiz covering Go syntax, types, control flow, collections, structs, and pointers.

## Module Assignment
Build a mini backend tool that models users, sessions, and simple request validation using Go structs, maps, functions, and error handling.

## Mini Project
Create `go-fundamentals-api` with:
- a command-line entrypoint
- user data modeled as structs
- an in-memory store using maps and slices
- functions for creating, retrieving, and validating users
- clear documentation and tests

## Module Review
This module teaches the essential Go skills needed for backend logic and prepares students to move into real API design and data management.

## Resources
- Go language specification: basic syntax sections
- Effective Go guide
- Go by Example tutorials
- Go documentation for slices, maps, and structs

## Knowledge Check
Students should be able to:
- Explain the difference between an array and a slice.
- Use Go functions with multiple return values.
- Design a simple struct for a backend entity.
- Understand how a pointer differs from a value.

## Completion Criteria
- All lessons completed with exercises.
- Module quiz passed with 80% or higher.
- Assignment and mini project submitted.
- Tests added for core functions.

---

# Lesson 2.1: Go Syntax and Program Structure

## Lesson Overview
This lesson introduces the basic structure of a Go program, including packages, imports, `main`, and the `go` command workflow. Students learn the essential file layout of a Go project and how to read and run code.

## Learning Objectives
- Understand the roles of `package`, `import`, and `func main()`.
- Explain where Go code lives and how packages are organized.
- Run a Go program using `go run` and `go build`.
- Use `go fmt` to format code.

## Prerequisites
- Module 1 complete.
- Go installed and functioning.

## Real-world Motivation
Every Go service begins with the correct project structure. Understanding syntax and structure prevents common setup mistakes and enables confident coding.

## Student Notes
### Package declarations
Every Go file begins with `package <name>`. For an executable, use `package main`.

### Imports
Import statements bring packages into scope. Standard library packages like `fmt` provide basic I/O.

### Entry point
`func main()` is where execution starts in an executable Go program.

### Formatting
`go fmt` enforces consistency and readability. It should be run before every commit.

### Project layout
- `go.mod` defines the module.
- `main.go` typically contains the entry point.
- Additional files provide helpers and package-level organization.

### Practical advice
- Start small and keep functions short.
- Name packages and files clearly.
- Use comments to document exported behavior.

## Instructor Video Outline
1. Introduce Go file structure and `package main`.
2. Explain imports and the standard library.
3. Live code a minimal Hello World program.
4. Demonstrate `go run`, `go build`, and `go fmt`.
5. Recap the program structure.

## Live Coding Demonstration
```go
package main

import "fmt"

func main() {
    fmt.Println("Welcome to Go fundamentals")
}
```
- Show package declaration.
- Explain import syntax.
- Run `go run main.go`.
- Save, format, and rebuild.

## Visual Learning Suggestions
- Diagram showing package, file, import, and function relationships.
- Sample folder structure for a simple Go program.

## Practice Exercises
1. Create `main.go` with a welcome message.
2. Add a second file and call a helper function from `main`.
3. Run `go fmt` on your files.
4. Inspect `go.mod` after initialization.
5. Explain why `package main` is required for executables.

## Coding Challenges
1. Create a simple Hello World program.
2. Add a `utils.go` helper function and call it.
3. Use `fmt.Printf` to print formatted text.
4. Create a module and inspect `go.mod`.
5. Build a binary and verify its output.

## Quiz
1. Multiple Choice: What is the required package name for Go executables?
   - A) `pkg`
   - B) `main` ✅
   - C) `app`
   - D) `go`
   - **Answer:** B.
2. True/False: `func main()` is optional in Go programs.
   - **Answer:** False.
3. Multiple Choice: Which command formats Go source files?
   - A) `go test`
   - B) `go fmt` ✅
   - C) `go run`
   - D) `go build`
   - **Answer:** B.
4. Short Answer: What does `import "fmt"` do?
   - **Answer:** makes the formatting package available to the code.
5. Debugging: Your program fails because `fmt` is unused. What should you do?
   - **Answer:** remove the import or use it in the code.
6. Multiple Choice: What file defines a Go module?
   - A) `main.go`
   - B) `go.mod` ✅
   - C) `README.md`
   - D) `package.json`
   - **Answer:** B.
7. True/False: `go build` both formats and compiles code.
   - **Answer:** False.
8. Short Answer: Why run `go run` during development?
   - **Answer:** to quickly compile and execute code without creating a binary.
9. Multiple Choice: Which statement is the entry point for a Go program?
   - A) `package main`
   - B) `import`
   - C) `func main()` ✅
   - D) `fmt.Println`
   - **Answer:** C.
10. Short Answer: What file should you commit to source control for a Go module?
    - **Answer:** `go.mod` and `main.go`.

## Assignment
### Objectives
- Build the first Go program from scratch.
- Learn project layout and formatting.
- Document the program structure.

### Requirements
- Create `lesson-2-1/main.go` with a greeting.
- Add `lesson-2-1/README.md` explaining the program structure.
- Use `go mod init` and include `go.mod`.

### Acceptance Criteria
- Code runs with `go run main.go`.
- Module file exists and is correct.
- README describes package, imports, and `main`.

### Marking Rubric
- Correctness: 50%
- Documentation: 30%
- Formatting: 20%

### Hints
- Use `go fmt`.
- Keep the README short and direct.

### Common Mistakes
- Missing `package main`.
- Not running `go mod init`.
- Leaving the program unformatted.

### Submission Instructions
- Push `lesson-2-1` folder to the repository.
- Include `go.mod` and README.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-1/
  main.go
  go.mod
  README.md
```

### Expected Output
A minimal Go executable and module.

### Commit Milestones
- `add hello program`
- `document program structure`

### Branch Strategy
- `lesson-2-1`

### Pull Request Instructions
- Title: `Add Go syntax lesson and program`
- Description: `Create a basic Go program and explain its structure.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Verify `go.mod` contents.
- Confirm `go fmt` formatting.

### Expected Results
- Output is correct.
- No compile errors.

## Lesson Summary
This lesson establishes the baseline Go syntax and file structure students need before writing backend logic.

## Next Lesson Preview
Lesson 2.2 covers Go variables, constants, and core types.

---

# Lesson 2.2: Variables, Constants, and Basic Types

## Lesson Overview
This lesson teaches Go variables, constants, and the core primitive types used in backend programming. Students learn how to store and manipulate numbers, text, booleans, and formatted output.

## Learning Objectives
- Declare variables and constants in Go.
- Use basic types such as `int`, `float64`, `string`, and `bool`.
- Understand type inference and explicit typing.
- Format values for output using `fmt`.

## Prerequisites
- Lesson 2.1 completed.
- Working Go environment.

## Real-world Motivation
Backend systems process numbers, text, flags, and configuration values. Correctly using types prevents bugs, improves clarity, and avoids runtime errors.

## Student Notes
### Variables
Use `var name type = value` or shorthand `name := value`.

### Constants
Use `const` for values that never change, such as configuration keys or status codes.

### Basic types
- `int` and `int64` for integers.
- `float64` for decimals.
- `string` for text.
- `bool` for true/false values.

### Type inference
Go can infer types from literals, but explicit typing is often clearer in backend code.

### Formatting output
- `fmt.Println` prints values with spaces.
- `fmt.Printf` prints formatted strings with verbs like `%d`, `%s`, `%t`, `%f`.

### Practical advice
- Prefer `int` unless a specific size is required.
- Use constants for repeated literal values.
- Keep variable names descriptive.

## Instructor Video Outline
1. Introduce variables and constants.
2. Show examples with numbers, strings, and booleans.
3. Explain type inference.
4. Demonstrate `fmt.Printf` formatting.
5. Recap best practices.

## Live Coding Demonstration
```go
package main

import "fmt"

const MaxUsers = 100

func main() {
    users := 42
    name := "On2Code Backend"
    active := true
    score := 95.7

    fmt.Printf("%s has %d users active: %t score: %.1f\n", name, users, active, score)
    fmt.Println("Max users allowed:", MaxUsers)
}
```
- Explain `const` and `:=` shorthand.
- Describe formatting verbs.
- Show the difference between `int` and `float64`.

## Visual Learning Suggestions
- Table of variable declarations and types.
- Flow diagram showing values stored in memory.

## Practice Exercises
1. Declare an `int` variable and print it.
2. Create a `string` variable for a username.
3. Define a boolean constant.
4. Use `fmt.Printf` with `%s`, `%d`, and `%t`.
5. Explain the difference between `var` and `:=`.

## Coding Challenges
1. Build a small program with user name, age, and isAdmin values.
2. Create constants for `MinPasswordLength` and `MaxPasswordLength`.
3. Format a message that includes a float with two decimal places.
4. Write a function that returns a typed error message.
5. Create a small user badge string using variables.

## Quiz
1. Multiple Choice: Which keyword declares a constant?
   - A) `var`
   - B) `let`
   - C) `const` ✅
   - D) `define`
   - **Answer:** C.
2. True/False: `name := "Go"` uses type inference.
   - **Answer:** True.
3. Multiple Choice: Which format verb prints an integer?
   - A) `%s`
   - B) `%t`
   - C) `%d` ✅
   - D) `%f`
   - **Answer:** C.
4. Short Answer: What type does `"hello"` have?
   - **Answer:** `string`.
5. Debugging: `fmt.Printf("%d", name)` fails. Why?
   - **Answer:** `name` is a string, not an integer.
6. Multiple Choice: Which type stores true/false?
   - A) `string`
   - B) `int`
   - C) `bool` ✅
   - D) `float64`
   - **Answer:** C.
7. True/False: Constants can be reassigned.
   - **Answer:** False.
8. Short Answer: Why use constants for configuration values?
   - **Answer:** to avoid magic numbers and improve maintainability.
9. Multiple Choice: Which statement is valid?
   - A) `const x = 10`
   - B) `var message string = "hi"` ✅
   - C) `name = "Go"`
   - D) `int x := 5`
   - **Answer:** B.
10. Short Answer: What is the shorthand syntax for declaring a variable?
    - **Answer:** `name := value`.

## Assignment
### Objectives
- Use variables, constants, and basic types.
- Build a small configuration loader.
- Format output clearly.

### Requirements
- Create `lesson-2-2/config.go` with typed variables and constants.
- Add `lesson-2-2/main.go` that prints configuration state.
- Include `lesson-2-2/README.md` explaining the types used.

### Acceptance Criteria
- Code compiles and runs.
- Constants are used for fixed values.
- README explains why each type was chosen.

### Marking Rubric
- Type usage: 40%
- Code quality: 30%
- Documentation: 20%
- Functionality: 10%

### Hints
- Use `const` for fixed thresholds.
- Keep variable names meaningful.
- Use `fmt.Printf` for output.

### Common Mistakes
- Using strings for numeric values.
- Reassigning constants.
- Not printing the results clearly.

### Submission Instructions
- Push `lesson-2-2` folder.
- Include examples in README.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-2/
  main.go
  config.go
  README.md
```

### Expected Output
A small program that prints configuration settings using typed variables.

### Commit Milestones
- `add config types`
- `document type choices`

### Branch Strategy
- `lesson-2-2`

### Pull Request Instructions
- Title: `Add Go type lesson and config example`
- Description: `Demonstrate variables, constants, and type usage.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Verify constants are defined and used.
- Confirm output is formatted.

### Expected Results
- No runtime errors.
- Clear type-driven output.

## Lesson Summary
This lesson teaches the foundational Go types and how to use variables and constants properly in backend programs.

## Next Lesson Preview
Lesson 2.3 covers control flow using branching and conditionals.

---

# Lesson 2.3: Control Flow: Branching and Conditions

## Lesson Overview
This lesson introduces decision-making in Go programs using `if`, `else if`, `else`, and `switch`. Students learn how to control logic flow based on conditions.

## Learning Objectives
- Use `if`, `else if`, and `else` statements.
- Apply logical operators and comparisons.
- Use `switch` for multi-way branching.
- Write guard clauses for clearer backend code.

## Prerequisites
- Lesson 2.2 completed.
- Familiarity with basic variables and types.

## Real-world Motivation
Backend services make decisions constantly: validating input, routing requests, and enforcing business rules. Branching logic is the foundation of that decision-making.

## Student Notes
### `if` statements
Use `if` for conditional execution. Conditions must evaluate to `bool`.

### `else if` and `else`
Use `else if` to chain conditions, and `else` for fallback behavior.

### Logical operators
- `&&` means and.
- `||` means or.
- `!` negates a condition.

### `switch`
`switch` simplifies multiple branches. It is especially useful for request routing, status handling, and command parsing.

### Best practices
- Favor guard clauses to reduce nesting.
- Keep conditions simple and readable.
- Use `switch` when there are many discrete cases.

## Instructor Video Outline
1. Introduce conditional logic and why it matters.
2. Show `if`, `else if`, and `else` with examples.
3. Demonstrate logical operators.
4. Show a `switch` statement for status handling.
5. Recap guidelines for clean branching.

## Live Coding Demonstration
```go
package main

import "fmt"

func main() {
    score := 85

    if score >= 90 {
        fmt.Println("Excellent")
    } else if score >= 75 {
        fmt.Println("Good")
    } else {
        fmt.Println("Needs improvement")
    }

    status := "active"
    switch status {
    case "active":
        fmt.Println("User is active")
    case "suspended":
        fmt.Println("User is suspended")
    default:
        fmt.Println("Unknown status")
    }
}
```
- Explain the flow of each branch.
- Show a `switch` statement with multiple cases.
- Introduce a default case.

## Visual Learning Suggestions
- Flowchart for `if` / `else if` / `else`.
- Table of logical operators.
- Diagram comparing nested `if` vs guard clauses.

## Practice Exercises
1. Write an `if` statement that checks if a user is logged in.
2. Build a condition that checks if a score is passing.
3. Use `||` to allow multiple valid values.
4. Create a `switch` for HTTP status codes.
5. Rewrite nested conditions using guard clauses.

## Coding Challenges
1. Implement a function that returns user role based on a string.
2. Build logic that categorizes request latency.
3. Write a `switch` for access levels: admin, user, guest.
4. Create a function that validates password strength.
5. Implement a status message generator for order states.

## Quiz
1. Multiple Choice: What does `&&` mean in Go?
   - A) or
   - B) and ✅
   - C) not
   - D) equals
   - **Answer:** B.
2. True/False: `switch` can replace multiple `else if` statements.
   - **Answer:** True.
3. Multiple Choice: Which branch runs if no conditions match?
   - A) `case`
   - B) `else` ✅
   - C) `switch`
   - D) `default`
   - **Answer:** B or D depending on structure; both are acceptable if using `else` or `default`.
4. Short Answer: What type must a condition evaluate to?
   - **Answer:** `bool`.
5. Debugging: Why does `if x = 5 {}` fail?
   - **Answer:** assignment is not a boolean expression.
6. Multiple Choice: Which symbol negates a boolean?
   - A) `&&`
   - B) `||`
   - C) `!` ✅
   - D) `==`
   - **Answer:** C.
7. True/False: `switch` statements always need a `default` case.
   - **Answer:** False.
8. Short Answer: Why use guard clauses?
   - **Answer:** to reduce nesting and improve readability.
9. Multiple Choice: `else if` is used when:
   - A) one condition is enough
   - B) multiple conditions are evaluated sequentially ✅
   - C) nothing should happen
   - D) only `switch` is allowed
   - **Answer:** B.
10. Short Answer: What does `default` do in a `switch`?
    - **Answer:** it handles any unmatched cases.

## Assignment
### Objectives
- Use branching and conditions to validate input.
- Build a simple decision engine.
- Document branch logic clearly.

### Requirements
- Create `lesson-2-3/main.go` with condition logic for user status and scores.
- Add `lesson-2-3/README.md` describing the branches.
- Implement `switch` for at least three discrete values.

### Acceptance Criteria
- Program compiles and runs.
- Branch logic is correct and documented.
- README explains decision flow.

### Marking Rubric
- Logic correctness: 40%
- Documentation: 30%
- Code readability: 20%
- Branch coverage: 10%

### Hints
- Use `switch` for status values.
- Keep conditions simple and readable.
- Add comments for each branch.

### Common Mistakes
- Using complex nested conditions.
- Forgetting the `default` branch.
- Writing unclear branch descriptions.

### Submission Instructions
- Push `lesson-2-3` folder.
- Include README and code examples.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-3/
  main.go
  README.md
```

### Expected Output
A small program demonstrating conditional logic for backend decisions.

### Commit Milestones
- `add branch logic lesson`
- `document conditional flow`

### Branch Strategy
- `lesson-2-3`

### Pull Request Instructions
- Title: `Add conditional logic lesson and status switch`
- Description: `Implement branching logic for user status.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Validate the program handles multiple status values.
- Confirm branch flow matches README.

### Expected Results
- No runtime errors.
- Correct conditional outputs.

## Lesson Summary
Decision-making logic is essential for backend workflows. This lesson teaches how to express business rules clearly and handle multiple cases in Go.

## Next Lesson Preview
Lesson 2.4 covers loops and iteration, which are critical for processing collections and repeated operations.

---

# Lesson 2.4: Loops and Iteration

## Lesson Overview
This lesson teaches how to repeat actions in Go using `for` loops, including index-based, range-based, and loop-control mechanisms.

## Learning Objectives
- Write basic `for` loops in Go.
- Use `range` to iterate over slices, arrays, and maps.
- Control loops with `break` and `continue`.
- Apply loops to common backend tasks.

## Prerequisites
- Lesson 2.3 completed.
- Comfortable with variables and conditions.

## Real-world Motivation
Backend engineers process collections frequently: iterating over user records, validating inputs, and aggregating metrics. Loops make these tasks efficient.

## Student Notes
### `for` loops
Go uses a single loop keyword: `for`. It can function as a traditional C-style loop or as a range-based iterator.

### `range`
Range provides a clean way to access keys and values in arrays, slices, and maps.

### `break` and `continue`
Use `break` to exit a loop early and `continue` to skip the current iteration.

### Performance notes
- Avoid unnecessary work inside loops.
- Use indices or pointers only when necessary.

### Practical advice
- Use `range` for readability when possible.
- Avoid modifying a slice while iterating unless you know the behavior.

## Instructor Video Outline
1. Introduce `for` as the only loop construct in Go.
2. Demo index-based iteration.
3. Demo `range` with slices and maps.
4. Explain `break` and `continue`.
5. Recap when to use each looping style.

## Live Coding Demonstration
```go
package main

import "fmt"

func main() {
    tasks := []string{"build API", "write tests", "deploy"}

    for i := 0; i < len(tasks); i++ {
        fmt.Println(i+1, tasks[i])
    }

    for index, task := range tasks {
        fmt.Printf("%d: %s\n", index+1, task)
    }

    for _, task := range tasks {
        if task == "write tests" {
            fmt.Println("Skipping this task")
            continue
        }
        fmt.Println("Processing", task)
    }
}
```
- Explain each loop form.
- Show how `range` simplifies iteration.
- Introduce `continue`.

## Visual Learning Suggestions
- Diagram of loop iteration over a slice.
- Table comparing loop forms.

## Practice Exercises
1. Iterate over a slice of integers and print each value.
2. Use `range` to iterate over a map.
3. Write a loop that stops after finding a target value.
4. Use `continue` to skip certain elements.
5. Explain why Go has only one loop keyword.

## Coding Challenges
1. Build a function that sums a slice of numbers.
2. Iterate over a map of user roles and print each role.
3. Create a loop that filters even numbers from a slice.
4. Write a loop that searches for a specific string.
5. Implement a small task processor using `range` and `continue`.

## Quiz
1. Multiple Choice: What keyword begins all loops in Go?
   - A) `while`
   - B) `for` ✅
   - C) `loop`
   - D) `repeat`
   - **Answer:** B.
2. True/False: Go uses different keywords for `while` and `for` loops.
   - **Answer:** False.
3. Multiple Choice: What does `continue` do?
   - A) exits the loop
   - B) skips to the next iteration ✅
   - C) repeats the current iteration
   - D) stops the program
   - **Answer:** B.
4. Short Answer: How do you iterate over a slice and ignore its indices?
   - **Answer:** `for _, value := range slice {}`.
5. Debugging: Why might `for i := 0; i < len(slice); i++ {}` panic?
   - **Answer:** if `i` exceeds the slice bounds due to incorrect condition.
6. Multiple Choice: What does `range` return for maps?
   - A) index and value
   - B) key and value ✅
   - C) only values
   - D) only keys
   - **Answer:** B.
7. True/False: `break` exits the nearest loop.
   - **Answer:** True.
8. Short Answer: Why use `range` instead of index loops?
   - **Answer:** it's more concise and safer.
9. Multiple Choice: Which loop form is not valid in Go?
   - A) `for i := 0; i < 10; i++ {}`
   - B) `for range slice {}`
   - C) `for {}` ✅
   - D) `while i < 10 {}`
   - **Answer:** D.
10. Short Answer: What happens when you omit the loop condition in `for`?
    - **Answer:** it becomes an infinite loop until broken.

## Assignment
### Objectives
- Practice loops with backend-style data.
- Process collections using Go.
- Apply loop control in small utilities.

### Requirements
- Create `lesson-2-4/main.go` that processes user tasks.
- Use at least two loop forms and `continue` or `break`.
- Add `lesson-2-4/README.md` explaining the loop choices.

### Acceptance Criteria
- Program compiles and runs.
- At least two loop styles are used.
- README explains the logic.

### Marking Rubric
- Loop usage: 40%
- Code quality: 30%
- Documentation: 20%
- Behavior: 10%

### Hints
- Use `range` for slices and maps.
- Keep loop bodies simple.
- Add comments to explain decisions.

### Common Mistakes
- Using only one loop style.
- Forgetting `break` or `continue` examples.
- Writing unclear README explanations.

### Submission Instructions
- Push `lesson-2-4` folder.
- Include code and README.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-4/
  main.go
  README.md
```

### Expected Output
A small program using multiple loop forms to process a list.

### Commit Milestones
- `add loop practice lesson`
- `document looping choices`

### Branch Strategy
- `lesson-2-4`

### Pull Request Instructions
- Title: `Add loops and iteration lesson`
- Description: `Implement Go loop patterns for backend processing.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm multiple loop forms are used.
- Validate behavior against README.

### Expected Results
- Program works.
- Loop logic is clear.

## Lesson Summary
Loops are essential for handling repeated tasks in backend systems. This lesson gives students the tools to iterate over data reliably and efficiently.

## Next Lesson Preview
Lesson 2.5 covers arrays and slices, the Go data structures most commonly used for collections.

---

# Lesson 2.5: Arrays and Slices

## Lesson Overview
This lesson explains Go arrays and slices, their differences, memory behavior, and how they are used to store ordered data.

## Learning Objectives
- Declare and initialize arrays and slices.
- Append to slices and slice arrays.
- Understand slice capacity and length.
- Use arrays and slices for ordered backend data.

## Prerequisites
- Lesson 2.4 completed.
- Comfortable using loops.

## Real-world Motivation
Backend services often manipulate lists of users, records, or events. Arrays and slices are the standard tools for ordered collections in Go.

## Student Notes
### Arrays
Arrays have fixed length and allocate space for all elements.

### Slices
Slices are views into arrays with flexible length and capacity.

### Length vs capacity
- `len(slice)` returns the number of elements.
- `cap(slice)` returns the accessible capacity.

### Append
`append` creates a new slice backed by an array, growing capacity when needed.

### Practical advice
- Use slices for most collection work.
- Avoid large arrays unless the size is fixed and known.
- Be careful when passing slices to functions: they share underlying arrays.

## Instructor Video Outline
1. Introduce arrays and slices.
2. Show declarations and initializations.
3. Demonstrate `append` and slice expressions.
4. Explain length and capacity.
5. Recap common usage patterns.

## Live Coding Demonstration
```go
package main

import "fmt"

func main() {
    var fixed [3]string
    fixed[0] = "alpha"
    fixed[1] = "beta"
    fixed[2] = "gamma"

    dynamic := []string{"alpha", "beta"}
    dynamic = append(dynamic, "gamma")

    fmt.Println(fixed)
    fmt.Println(dynamic)
    fmt.Println(len(dynamic), cap(dynamic))
}
```
- Explain fixed-size arrays.
- Show slice creation and append.
- Print length and capacity.

## Visual Learning Suggestions
- Diagram of slice header pointing to an underlying array.
- Table comparing arrays and slices.

## Practice Exercises
1. Declare an array of 5 integers.
2. Create a slice from an array.
3. Use `append` to add elements to a slice.
4. Print `len` and `cap` for a slice.
5. Explain why slices are preferred over arrays for backend data.

## Coding Challenges
1. Build a slice of user names and append a new name.
2. Create a function that returns a subslice.
3. Write a function that removes an element from a slice.
4. Implement a slice-based queue using `append` and slicing.
5. Measure slice capacity growth by appending repeatedly.

## Quiz
1. Multiple Choice: What does `cap(slice)` return?
   - A) number of elements ✅
   - B) available backing array capacity ✅
   - C) total memory size
   - D) index of last element
   - **Answer:** B.
2. True/False: Arrays can be resized with `append`.
   - **Answer:** False.
3. Multiple Choice: What type is `[]int`?
   - A) array
   - B) slice ✅
   - C) map
   - D) struct
   - **Answer:** B.
4. Short Answer: How do you create a slice with `make`?
   - **Answer:** `make([]T, length, capacity)`.
5. Debugging: Why does `slice[5]` panic when `len(slice) == 4`?
   - **Answer:** index is out of range.
6. Multiple Choice: Which is a valid slice expression?
   - A) `arr[:2]` ✅
   - B) `arr[2:]` ✅
   - C) `arr[2:5]` ✅
   - D) `arr[5:2]`
   - **Answer:** A, B, C are valid if within range.
7. True/False: Appending to a slice may allocate a new array.
   - **Answer:** True.
8. Short Answer: What happens when you pass a slice to a function?
   - **Answer:** the slice header is copied, but it refers to the same underlying array.
9. Multiple Choice: Which is true about arrays?
   - A) fixed size ✅
   - B) dynamic size
   - C) no underlying data
   - D) always pointers
   - **Answer:** A.
10. Short Answer: Why are slices more common than arrays in Go?
    - **Answer:** because they are flexible and convenient.

## Assignment
### Objectives
- Model ordered data with arrays and slices.
- Practice slice operations and growth.
- Document the behavior of slice capacity.

### Requirements
- Add `lesson-2-5/main.go` demonstrating arrays and slices.
- Create `lesson-2-5/README.md` showing length and capacity.
- Show a slice `append` example and explain the output.

### Acceptance Criteria
- Program compiles and runs.
- README explains slice backing arrays.
- Examples display `len` and `cap` values.

### Marking Rubric
- Code correctness: 40%
- Slice explanation: 30%
- Output clarity: 20%
- Formatting: 10%

### Hints
- Print the values after appending.
- Use `make` for a slice with capacity.
- Explain when capacity grows.

### Common Mistakes
- Confusing `len` with `cap`.
- Attempting to append to an array.
- Not explaining backing array behavior.

### Submission Instructions
- Push `lesson-2-5` folder.
- Include code and README.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-5/
  main.go
  README.md
```

### Expected Output
A program illustrating arrays, slices, and capacity behavior.

### Commit Milestones
- `add slice lesson`
- `document slice capacity`

### Branch Strategy
- `lesson-2-5`

### Pull Request Instructions
- Title: `Add arrays and slices lesson`
- Description: `Demonstrate collections with Go arrays and slices.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm `len` and `cap` values in output.
- Validate README explanation.

### Expected Results
- Correct program execution.
- Clear slice behavior documentation.

## Lesson Summary
Arrays and slices are the foundation of ordered data handling in Go. This lesson prepares students to store and process collections in backend code.

## Next Lesson Preview
Lesson 2.6 covers maps, the Go structure for key-based lookup.

---

# Lesson 2.6: Maps and Lookup Data

## Lesson Overview
This lesson introduces Go maps for key-value storage. Students learn how to create, access, iterate, and update maps in Go.

## Learning Objectives
- Declare and initialize maps.
- Add, retrieve, and delete entries.
- Iterate over maps using `range`.
- Use maps in backend-style lookups.

## Prerequisites
- Lesson 2.5 completed.
- Comfortable using slices and loops.

## Real-world Motivation
Maps are used to store configuration, user profiles, caches, and lookup tables in backend services. They make key-based access fast and intuitive.

## Student Notes
### Map basics
A map associates keys with values, like `map[string]int`.

### Initialization
Use `make(map[Key]Value)` or map literals.

### Access and absence
Accessing a missing key returns the zero value. Use the comma-ok pattern to detect existence.

### Deletion
Use `delete(map, key)` to remove entries.

### Map iteration
Use `range` to iterate over keys and values.

### Practical advice
- Choose key types carefully; they must be comparable.
- Avoid maps with complex key types unless necessary.
- Use maps for fast lookup, not ordered data.

## Instructor Video Outline
1. Introduce maps and key-value storage.
2. Demonstrate map creation and access.
3. Show the comma-ok pattern.
4. Iterate over a map with `range`.
5. Recap when to use maps.

## Live Coding Demonstration
```go
package main

import "fmt"

func main() {
    userRoles := map[string]string{
        "alice": "admin",
        "bob": "editor",
    }

    userRoles["carol"] = "viewer"

    role, ok := userRoles["dave"]
    if !ok {
        fmt.Println("dave not found")
    } else {
        fmt.Println("dave is", role)
    }

    for user, role := range userRoles {
        fmt.Println(user, "=>", role)
    }
}
```
- Explain map literals.
- Show adding and reading values.
- Demonstrate the comma-ok idiom.

## Visual Learning Suggestions
- Diagram of map bucket and key-value pairs.
- Table of map operations.

## Practice Exercises
1. Create a map of usernames to email addresses.
2. Check for a missing key using comma-ok.
3. Delete a map entry.
4. Iterate over a map and print values.
5. Explain why maps are unordered.

## Coding Challenges
1. Build a map representing user permissions.
2. Create a function that looks up prices by product name.
3. Implement a map-based counter for word frequency.
4. Write a function that merges two maps.
5. Create a map from strings to structs and iterate over it.

## Quiz
1. Multiple Choice: How do you declare a map from strings to ints?
   - A) `map[string]string`
   - B) `map[string]int` ✅
   - C) `[]int`
   - D) `struct{}`
   - **Answer:** B.
2. True/False: Map iteration order is guaranteed.
   - **Answer:** False.
3. Multiple Choice: What is the comma-ok idiom used for?
   - A) checking a slice length
   - B) confirming a map key exists ✅
   - C) formatting output
   - D) importing packages
   - **Answer:** B.
4. Short Answer: How do you delete a key from a map?
   - **Answer:** `delete(m, key)`.
5. Debugging: What does `userRoles["eve"]` return if `eve` is missing?
   - **Answer:** the zero value for the map value type.
6. Multiple Choice: Which key type is allowed in a map?
   - A) `[]int`
   - B) `map[string]string`
   - C) `int` ✅
   - D) `func`
   - **Answer:** C.
7. True/False: A map literal uses `{}` with colon-separated pairs.
   - **Answer:** True.
8. Short Answer: Why are maps useful in backend code?
   - **Answer:** for fast key-based lookup.
9. Multiple Choice: What can be used as a map key?
   - A) slice
   - B) string ✅
   - C) map
   - D) function
   - **Answer:** B.
10. Short Answer: What happens if you assign a value to an existing map key?
    - **Answer:** it overwrites the previous value.

## Assignment
### Objectives
- Use maps for backend-style lookup.
- Handle missing keys safely.
- Document map usage.

### Requirements
- Add `lesson-2-6/main.go` using a map for user roles.
- Include `lesson-2-6/README.md` explaining the comma-ok pattern.
- Demonstrate adding, retrieving, and deleting entries.

### Acceptance Criteria
- Program compiles and runs.
- Map operations are correct.
- README explains missing-key behavior.

### Marking Rubric
- Map usage: 40%
- Documentation: 30%
- Correctness: 20%
- Readability: 10%

### Hints
- Use `make(map[string]string)` or map literals.
- Show a missing-key lookup.

### Common Mistakes
- Forgetting to initialize the map.
- Not using the comma-ok idiom.
- Assuming map order is stable.

### Submission Instructions
- Push `lesson-2-6` folder.
- Include code and README.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-6/
  main.go
  README.md
```

### Expected Output
A Go program demonstrating map operations and lookup safety.

### Commit Milestones
- `add map lesson`
- `document comma-ok usage`

### Branch Strategy
- `lesson-2-6`

### Pull Request Instructions
- Title: `Add maps lesson and user role lookup`
- Description: `Implement key-value storage with map safety.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Validate map lookup and deletion behavior.
- Confirm README explains comma-ok.

### Expected Results
- Correct output.
- No runtime errors.

## Lesson Summary
Maps provide efficient key-value access, a critical tool for backend engineers who build caches, lookup tables, and request routing logic.

## Next Lesson Preview
Lesson 2.7 covers structs and methods for modeling backend entities.

---

# Lesson 2.7: Structs, Methods, and Data Modeling

## Lesson Overview
This lesson introduces structs for modeling complex data, and methods for attaching behavior to types. Students learn to design backend entities with data and behavior.

## Learning Objectives
- Define structs to model entities.
- Use struct fields and composite literals.
- Attach methods to struct types.
- Understand value vs pointer receivers.

## Prerequisites
- Lesson 2.6 completed.
- Familiarity with maps and functions.

## Real-world Motivation
Backend systems model users, products, orders, and sessions using structs. Methods let these models encapsulate behavior like validation and formatting.

## Student Notes
### Struct basics
A struct groups fields into a single type, like a user record.

### Composite literals
Use `{}` to initialize structs with field names or positional values.

### Methods
Attach behavior to a type with methods. This keeps related logic bundled with data.

### Receivers
- Value receivers operate on a copy.
- Pointer receivers operate on the original value.

### Practical advice
- Use pointer receivers for large structs or when modifying data.
- Keep methods focused and simple.

## Instructor Video Outline
1. Introduce structs with a user example.
2. Show initialization with field names.
3. Add methods for validation and display.
4. Explain receivers and when to use pointers.
5. Recap modeling best practices.

## Live Coding Demonstration
```go
package main

import "fmt"

type User struct {
    ID    int
    Name  string
    Email string
}

func (u User) DisplayName() string {
    return fmt.Sprintf("%s <%s>", u.Name, u.Email)
}

func (u *User) UpdateEmail(email string) {
    u.Email = email
}

func main() {
    user := User{ID: 1, Name: "Alice", Email: "alice@example.com"}
    fmt.Println(user.DisplayName())
    user.UpdateEmail("alice@on2code.com")
    fmt.Println(user.DisplayName())
}
```
- Explain struct field definitions.
- Describe the `DisplayName` method.
- Show pointer receiver mutation.

## Visual Learning Suggestions
- Diagram of a struct instance with fields.
- Illustration of pointer receiver vs value receiver.

## Practice Exercises
1. Create a `Product` struct with fields.
2. Add a method to format product details.
3. Explain when a method should use a pointer receiver.
4. Initialize a struct using field names.
5. Modify a struct field after creation.

## Coding Challenges
1. Build a `Lesson` struct with a `Duration` field.
2. Add a `Summary()` method to return a short description.
3. Create a pointer receiver method that marks a lesson completed.
4. Use a slice of structs and iterate over it.
5. Implement a `Validate()` method that checks required fields.

## Quiz
1. Multiple Choice: What is a struct?
   - A) a function
   - B) a type with fields ✅
   - C) a loop
   - D) an interface
   - **Answer:** B.
2. True/False: Methods can be attached to structs.
   - **Answer:** True.
3. Multiple Choice: What does a pointer receiver allow?
   - A) string output
   - B) modifying the original value ✅
   - C) compile-time errors
   - D) faster loops
   - **Answer:** B.
4. Short Answer: How do you initialize a struct with field names?
   - **Answer:** `User{Name: "Alice", Email: "..."}`.
5. Debugging: Why does calling a value receiver method not persist changes?
   - **Answer:** because the method operates on a copied value.
6. Multiple Choice: Which field type can a struct contain?
   - A) another struct ✅
   - B) function name only
   - C) no fields
   - D) only ints
   - **Answer:** A.
7. True/False: A method receiver must always be a pointer.
   - **Answer:** False.
8. Short Answer: Why use structs in backend code?
   - **Answer:** to model complex entities with multiple fields.
9. Multiple Choice: Which syntax defines a method on `User`?
   - A) `func User() {}`
   - B) `func (u User) Name() {}` ✅
   - C) `func User.Name() {}`
   - D) `func Name(u User) {}`
   - **Answer:** B.
10. Short Answer: What is the difference between `user := User{}` and `user := &User{}`?
    - **Answer:** the first creates a value, the second creates a pointer to a value.

## Assignment
### Objectives
- Model backend entities using structs.
- Encapsulate behavior with methods.
- Use pointer receivers for data mutation.

### Requirements
- Add `lesson-2-7/user.go` defining a `User` struct and methods.
- Add `lesson-2-7/main.go` demonstrating creation and update.
- Include `lesson-2-7/README.md` describing value vs pointer receivers.

### Acceptance Criteria
- Code compiles and runs.
- User methods function correctly.
- README explains receivers.

### Marking Rubric
- Struct design: 40%
- Method correctness: 30%
- Documentation: 20%
- Code readability: 10%

### Hints
- Use a pointer receiver for methods that modify the struct.
- Keep struct fields clear and typed.
- Document each method.

### Common Mistakes
- Using a value receiver when mutation is needed.
- Forgetting to initialize struct values.
- Writing unclear method names.

### Submission Instructions
- Push `lesson-2-7` folder.
- Include code and README.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-7/
  user.go
  main.go
  README.md
```

### Expected Output
A struct-based user model with methods for updating and formatting.

### Commit Milestones
- `add user model lesson`
- `document receiver choices`

### Branch Strategy
- `lesson-2-7`

### Pull Request Instructions
- Title: `Add structs and methods lesson`
- Description: `Model backend entities with Go structs.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm methods produce expected results.
- Validate README explanation.

### Expected Results
- Correct struct behavior.
- Clear receiver documentation.

## Lesson Summary
Structs and methods let backend engineers model domain entities and attach behavior, creating more maintainable and expressive code.

## Next Lesson Preview
Lesson 2.8 covers pointers and memory references in more depth.

---

# Lesson 2.8: Pointers and Memory References

## Lesson Overview
This lesson teaches pointers, references, and how Go manages memory. Students learn when to use pointers, how to avoid common mistakes, and how pointers relate to structs and functions.

## Learning Objectives
- Understand what a pointer is in Go.
- Use `&` to take an address and `*` to dereference.
- Pass pointers to functions and methods.
- Recognize when pointers are needed for performance or mutation.

## Prerequisites
- Lesson 2.7 completed.
- Comfortable with structs and functions.

## Real-world Motivation
Backend services often use pointers to avoid copying large structures, mutate data in place, and share state safely. Pointers are a core part of efficient Go code.

## Student Notes
### What is a pointer?
A pointer stores the memory address of a value. It points to the location where the value is stored.

### Address and dereference
- `&x` gives the address of `x`.
- `*p` gives the value stored at pointer `p`.

### Pointers in functions
Passing a pointer lets a function modify the original value.

### When to use pointers
- large structs or slices
- methods that change the receiver
- sharing data without copying

### Common mistakes
- dereferencing a nil pointer causes a runtime panic.
- using pointers unnecessarily adds complexity.
- confusing `*` with multiplication in expressions.

## Instructor Video Outline
1. Introduce pointers with a simple analogy.
2. Demonstrate address-of and dereference operators.
3. Show pointers with structs and functions.
4. Explain common pointer mistakes.
5. Recap safe pointer usage.

## Live Coding Demonstration
```go
package main

import "fmt"

type Counter struct {
    Value int
}

func increment(c *Counter) {
    c.Value++
}

func main() {
    count := Counter{Value: 1}
    fmt.Println("before", count.Value)
    increment(&count)
    fmt.Println("after", count.Value)

    ptr := &count
    fmt.Println("pointer value", (*ptr).Value)
    ptr.Value = 10
    fmt.Println("updated", count.Value)
}
```
- Explain `&count` and `*ptr`.
- Show that pointer mutation affects the original.
- Illustrate shorthand `ptr.Value`.

## Visual Learning Suggestions
- Diagram of pointer referencing memory.
- Table of address vs value.

## Practice Exercises
1. Create a pointer to an `int` and print its address.
2. Write a function that increments a value through a pointer.
3. Explain what `nil` means for a pointer.
4. Use a pointer receiver on a struct method.
5. Describe one case where pointers improve performance.

## Coding Challenges
1. Implement a function that swaps two integers using pointers.
2. Create a pointer to a struct and modify a field.
3. Write a function that updates a user email via pointer.
4. Build a pointer-based linked list node type.
5. Demonstrate a nil pointer check before dereferencing.

## Quiz
1. Multiple Choice: What does `&x` produce?
   - A) value
   - B) address ✅
   - C) zero value
   - D) copy
   - **Answer:** B.
2. True/False: `*p` dereferences a pointer.
   - **Answer:** True.
3. Multiple Choice: What happens if you dereference `nil`?
   - A) compile error
   - B) runtime panic ✅
   - C) returns zero
   - D) no effect
   - **Answer:** B.
4. Short Answer: Why use a pointer receiver?
   - **Answer:** to modify the original value or avoid copying.
5. Debugging: `ptr := &count` followed by `count = nil` fails. Why?`
   - **Answer:** `count` is not a pointer type.
6. Multiple Choice: Which of these is a pointer type?
   - A) `int`
   - B) `*int` ✅
   - C) `[]int`
   - D) `map[string]int`
   - **Answer:** B.
7. True/False: `ptr.Value` is valid if `ptr` is `*Counter`.
   - **Answer:** True.
8. Short Answer: What does `nil` represent for a pointer?
   - **Answer:** no address assigned.
9. Multiple Choice: `func update(u User) {}` vs `func update(u *User) {}`. The latter:
   - A) copies the user
   - B) modifies the original ✅
   - C) returns a value
   - D) is invalid
   - **Answer:** B.
10. Short Answer: What should you check before dereferencing a pointer?
    - **Answer:** that it is not nil.

## Assignment
### Objectives
- Practice using pointers safely.
- Understand address and dereference semantics.
- Apply pointers to struct mutation.

### Requirements
- Add `lesson-2-8/main.go` with pointer-based struct updates.
- Create `lesson-2-8/README.md` explaining pointer usage.
- Demonstrate a nil pointer check.

### Acceptance Criteria
- Program runs and mutates values through pointers.
- README correctly explains pointers.
- Nil pointer checks are present.

### Marking Rubric
- Pointer usage: 40%
- Safety checks: 30%
- Explanation: 20%
- Correctness: 10%

### Hints
- Use `&` and `*` clearly.
- Add comments to explain each pointer step.

### Common Mistakes
- Dereferencing nil pointers.
- Confusing pointers with values.
- Omitting safety checks.

### Submission Instructions
- Push `lesson-2-8` folder.
- Include code and README.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-8/
  main.go
  README.md
```

### Expected Output
A pointer-based code example with clear explanations.

### Commit Milestones
- `add pointers lesson`
- `document pointer safety`

### Branch Strategy
- `lesson-2-8`

### Pull Request Instructions
- Title: `Add pointers lesson and example`
- Description: `Demonstrate Go pointers and safe usage.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Confirm pointer updates mutate original values.
- Validate nil pointer checks.

### Expected Results
- Correct pointer behavior.
- No runtime panics.

## Lesson Summary
Pointers provide direct access to memory locations and let Go programs mutate data efficiently. This lesson teaches the balance between power and safety.

## Next Lesson Preview
Lesson 2.9 covers functions, return values, and basic error handling.

---

# Lesson 2.9: Functions, Return Values, and Error Handling

## Lesson Overview
This lesson teaches Go functions, multiple return values, and the foundation of Go-style error handling. Students learn to build reusable logic and handle failure explicitly.

## Learning Objectives
- Define functions with parameters and return values.
- Return multiple values from a function.
- Use Go's `error` type for function failure.
- Write simple validation functions.

## Prerequisites
- Lesson 2.8 completed.
- Comfortable with functions and structs.

## Real-world Motivation
Backend code must validate input, process requests, and report errors clearly. Go's function and error patterns are fundamental to robust service behavior.

## Student Notes
### Functions
Functions are named blocks of reusable code. They accept parameters and return values.

### Multiple return values
Go supports returning several values from a function, commonly used for results and errors.

### Error handling
Use `error` as a return type and check it explicitly. This makes backend code predictable.

### Best practices
- Keep functions small and focused.
- Return `error` as the last value.
- Use descriptive error messages.

### Practical advice
- Avoid panics in normal control flow.
- Use `fmt.Errorf` to create context-rich errors.
- Handle errors immediately.

## Instructor Video Outline
1. Introduce function syntax.
2. Demonstrate multiple return values.
3. Show error handling with `if err != nil`.
4. Build a validation function.
5. Recap function best practices.

## Live Coding Demonstration
```go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result)
}
```
- Explain parameters and return values.
- Demonstrate error creation and handling.
- Show why `nil` is used for no error.

## Visual Learning Suggestions
- Diagram of function inputs and outputs.
- Flowchart of error handling path.

## Practice Exercises
1. Write a function that adds two numbers.
2. Create a function that returns a value and an error.
3. Explain why `error` is the last return value.
4. Use `errors.New` to generate an error.
5. Handle an error with `if err != nil`.

## Coding Challenges
1. Implement a function that validates email format and returns `bool, error`.
2. Write a function that parses an integer from a string.
3. Create a function that checks password length and returns an error if too short.
4. Build a function that returns both a slice and error.
5. Implement a small input validation utility.

## Quiz
1. Multiple Choice: What is the conventional last return value for errors?
   - A) `int`
   - B) `error` ✅
   - C) `bool`
   - D) `string`
   - **Answer:** B.
2. True/False: Go functions can return multiple values.
   - **Answer:** True.
3. Multiple Choice: What does `if err != nil` do?
   - A) checks for success
   - B) checks for failure ✅
   - C) formats output
   - D) declares a variable
   - **Answer:** B.
4. Short Answer: What should a function do if it cannot complete its work?
   - **Answer:** return an error.
5. Debugging: Why does `return nil, err` fail in a function returning `float64, error`?
   - **Answer:** the first return value must be a `float64`, not `nil`.
6. Multiple Choice: Which package provides `New` for errors?
   - A) `fmt`
   - B) `errors` ✅
   - C) `io`
   - D) `strings`
   - **Answer:** B.
7. True/False: Errors in Go should be used for normal validation failures.
   - **Answer:** True.
8. Short Answer: What is `nil` used for with errors?
   - **Answer:** to indicate no error.
9. Multiple Choice: What does `fmt.Errorf` return?
   - A) an int
   - B) an error ✅
   - C) a bool
   - D) a string
   - **Answer:** B.
10. Short Answer: Why is explicit error checking valuable in backend code?
    - **Answer:** it makes failures visible and prevents silent bugs.

## Assignment
### Objectives
- Build functions with multiple return values.
- Handle errors explicitly.
- Document validation logic.

### Requirements
- Add `lesson-2-9/main.go` with a validation function returning `bool, error`.
- Include `lesson-2-9/README.md` explaining error handling.
- Use error checks in `main`.

### Acceptance Criteria
- Program compiles and runs.
- Errors are handled correctly.
- README explains the error path.

### Marking Rubric
- Error handling: 40%
- Function design: 30%
- Documentation: 20%
- Correctness: 10%

### Hints
- Use `errors.New` for simple errors.
- Return a meaningful error message.
- Check errors immediately.

### Common Mistakes
- Ignoring errors.
- Returning `nil` incorrectly.
- Using panics for normal failures.

### Submission Instructions
- Push `lesson-2-9` folder.
- Include code and README.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-9/
  main.go
  README.md
```

### Expected Output
A validation program with Go-style error handling.

### Commit Milestones
- `add functions and errors lesson`
- `document error handling`

### Branch Strategy
- `lesson-2-9`

### Pull Request Instructions
- Title: `Add functions and error handling lesson`
- Description: `Implement Go functions with explicit errors.`

## Automated Tests
### Requirements
- Run `go run main.go` successfully.
- Validate error handling behavior.
- Confirm README explains the error check.

### Expected Results
- Correct function output.
- No unhandled errors.

## Lesson Summary
Functions and explicit error handling are the building blocks of backend logic. This lesson taught students how to write reusable logic and manage failure in Go.

## Next Lesson Preview
Lesson 2.10 completes the module with a small utility building exercise.

---

# Lesson 2.10: Building Small Utilities in Go

## Lesson Overview
This lesson consolidates the module by building small utilities using the Go fundamentals learned so far. Students combine variables, control flow, collections, structs, pointers, and functions.

## Learning Objectives
- Design and implement a small Go utility.
- Combine core Go concepts into a single program.
- Use clear structure, documentation, and tests.

## Prerequisites
- Lessons 2.1 through 2.9 completed.
- Comfortable writing Go code.

## Real-world Motivation
Backend engineers build small utilities to automate tasks, process data, and support service workflows. This lesson simulates that process.

## Student Notes
### Planning first
Before coding, identify inputs, outputs, and behavior.

### Combining concepts
Use structs for data, functions for logic, slices/maps for collections, and errors for validation.

### Documentation
Document the utility purpose, commands, and examples.

### Testing
Even small utilities benefit from basic tests.

## Instructor Video Outline
1. Describe the utility project requirements.
2. Sketch the design and data model.
3. Implement the utility live.
4. Add basic tests.
5. Recap the full module.

## Live Coding Demonstration
- Example utility: a simple user registry command-line tool.
- Build `main.go`, `user.go`, and validation functions.
- Show usage and output.

## Visual Learning Suggestions
- Diagram of utility components and data flow.
- Folder structure illustration.

## Practice Exercises
1. Plan a small utility and sketch its data model.
2. Define the main functions needed.
3. Choose suitable data structures.
4. Write a README describing the utility.
5. Add a simple test case.

## Coding Challenges
1. Build a user registry utility that adds and lists users.
2. Create a task tracker utility with priorities.
3. Build a text parser that counts words and characters.
4. Implement a mini config parser using structs.
5. Build a command-line status report generator.

## Quiz
1. Multiple Choice: Which concept is not needed for a small Go utility?
   - A) structs
   - B) functions
   - C) maps
   - D) GPU programming ✅
   - **Answer:** D.
2. True/False: Clear documentation is optional for utilities.
   - **Answer:** False.
3. Multiple Choice: What should you do before coding a utility?
   - A) write tests
   - B) plan data and behavior ✅
   - C) install Docker
   - D) run `go build`
   - **Answer:** B.
4. Short Answer: Why are tests valuable for small utilities?
   - **Answer:** they verify behavior and prevent regressions.
5. Debugging: Your utility output is wrong. What is a good first step?
   - **Answer:** inspect input data and function logic.
6. Multiple Choice: What is the best way to organize utility code?
   - A) one giant file
   - B) separate files for models and logic ✅
   - C) no structure
   - D) random order
   - **Answer:** B.
7. True/False: Pointers are never useful in small utilities.
   - **Answer:** False.
8. Short Answer: What is a README used for?
   - **Answer:** to explain usage, purpose, and structure.
9. Multiple Choice: Which should a utility include?
   - A) comments ✅
   - B) hidden dependencies
   - C) unformatted code
   - D) no tests
   - **Answer:** A.
10. Short Answer: What does `go test` do?
    - **Answer:** runs unit tests.

## Assignment
### Objectives
- Build a small Go utility using module concepts.
- Add documentation and tests.
- Demonstrate clean code structure.

### Requirements
- Add `lesson-2-10/` with `main.go`, `model.go`, `service.go`, `README.md`, and `main_test.go`.
- Utility should manage a small in-memory dataset, such as users or tasks.
- Include at least one test.

### Acceptance Criteria
- Utility runs and performs the expected task.
- README explains usage.
- Test passes with `go test ./...`.

### Marking Rubric
- Functionality: 40%
- Structure: 30%
- Documentation: 20%
- Tests: 10%

### Hints
- Keep the utility simple and focused.
- Use structs and maps to model data.
- Add one meaningful test.

### Common Mistakes
- Overbuilding the utility.
- Leaving tests out.
- Poor README instructions.

### Submission Instructions
- Push the `lesson-2-10` folder.
- Include code, README, and tests.

## GitHub Project
### Repository Name
`on2code-go-fundamentals`

### Folder Structure
```
lesson-2-10/
  main.go
  model.go
  service.go
  main_test.go
  README.md
```

### Expected Output
A small command-line utility with clean structure and one test.

### Commit Milestones
- `add utility scaffold`
- `add tests and docs`

### Branch Strategy
- `lesson-2-10`

### Pull Request Instructions
- Title: `Add small utility capstone lesson`
- Description: `Combine core Go concepts into a mini project.`

## Automated Tests
### Requirements
- Run `go test ./...` successfully.
- Ensure the utility behaves as documented.
- Confirm README explains how to run it.

### Expected Results
- All tests pass.
- Utility executes correctly.

## Lesson Summary
This capstone lesson consolidates all module 2 concepts into a practical utility, preparing students for API and backend design.

## Next Lesson Preview
Module 3 will dive into Go data handling, JSON, file I/O, testing, benchmarking, and error design.
