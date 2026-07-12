# Module 5: Advanced Backend Architecture, Scaling, and Deployment

## Module Introduction
Module 5 teaches advanced backend engineering patterns for scalable, resilient services. Students learn how to design systems for production, use distributed architecture patterns, manage state, and deploy services reliably.

## Learning Outcomes
By the end of this module, students will be able to:
- Describe modern backend architecture patterns like monoliths, microservices, and serverless.
- Design services for scalability, availability, and fault tolerance.
- Use caching, queuing, and asynchronous processing effectively.
- Understand service discovery, API gateways, and load balancing.
- Apply containerization and deployment best practices.
- Monitor and troubleshoot distributed systems.
- Implement security controls appropriate for production systems.
- Make architectural tradeoffs based on requirements.

## Lessons
1. Backend Architecture Patterns and Tradeoffs
2. Scaling and High Availability
3. Caching, CDN, and Performance Optimization
4. Message Queues and Asynchronous Processing
5. Distributed Systems and Consistency Models
6. Containerization, Docker, and Local Deployment
7. Infrastructure as Code and Service Provisioning
8. Observability, Tracing, and Incident Response
9. Security, Secrets, and Production Hardening
10. Capstone: Building a Resilient Backend Service

## Practice Labs
- Lab 1: Create a Docker container for a Go service.
- Lab 2: Add caching to a read-heavy endpoint.
- Lab 3: Implement a producer/consumer using a message queue.

## Module Quiz
A 20-question quiz covering architecture patterns, caching, deployment, observability, and security.

## Module Assignment
Design and build a resilient backend service with containerized deployment, a caching layer, and a simple asynchronous workflow.

## Mini Project
Create `go-resilient-service` with:
- a containerized Go API service
- a database-backed persistence layer
- a cache or CDN integration for reads
- a queue-based background processing task
- health checks, logging, and metrics
- secure configuration and deployment guidance

## Module Review
This module prepares students for production-grade backend engineering, teaching the operational and architectural concerns required to build systems that scale and stay available.

## Resources
- Twelve-Factor App principles
- Cloud native architecture patterns
- Docker and container orchestration guides
- Distributed systems design literature
- Application observability and incident response practices

## Knowledge Check
Students should be able to:
- Explain the difference between scaling vertically and horizontally.
- Identify when to use a message queue versus direct synchronous processing.
- Describe how caching reduces load and improves latency.
- Use Docker to package a backend service.

## Completion Criteria
- All lessons completed with exercises.
- Module quiz passed with at least 80%.
- Assignment includes a deployable service and architecture documentation.
- Observability and security practices are documented.

---

# Lesson 5.1: Backend Architecture Patterns and Tradeoffs

## Lesson Overview
This lesson introduces architecture patterns such as monoliths, microservices, and serverless, and teaches how to choose the right approach for a backend system.

## Learning Objectives
- Compare monolithic and microservice architectures.
- Understand serverless and service-oriented design.
- Evaluate tradeoffs in complexity, deployment, and team productivity.
- Choose architecture based on ownership, scaling, and release cadence.

## Prerequisites
- Module 4 complete.
- Familiarity with backend APIs and persistence.

## Real-world Motivation
Architecture choices affect maintainability, deployment, and operating costs. Good engineers choose patterns that fit the product and team.

## Student Notes
### Monoliths
A single deployable application that contains all service code. Simple to develop and deploy, but harder to scale and maintain as it grows.

### Microservices
Small, independently deployable services that communicate over the network. Better for large teams and scaling, but more complex operationally.

### Serverless
Run code in response to events without managing servers. Good for lightweight workloads and bursty traffic, but has cold-start and vendor lock-in considerations.

### Service boundaries
Define service boundaries around business capabilities, not technical layers.

### Tradeoffs
- Monoliths: lower operational overhead, easier debugging.
- Microservices: independent deployments, better isolation.
- Serverless: no infrastructure management, pay-per-use.

## Instructor Video Outline
1. Introduce architecture patterns with examples.
2. Compare monolith vs microservice with diagrams.
3. Explain where serverless is a good fit.
4. Discuss the operational tradeoffs.
5. Recap decision factors.

## Live Coding Demonstration
This lesson is conceptual, but use examples of service boundaries and API contracts to illustrate.

## Practice Exercises
1. Write pros and cons for monolith and microservice architectures.
2. Identify a backend feature that could be its own service.
3. Explain how team size influences architecture.
4. Describe a scenario where serverless would be ideal.
5. Create a diagram of a service boundary for a course management API.

## Coding Challenges
1. Outline a service split for `users`, `courses`, and `payments`.
2. Define API boundaries for a microservice-based backend.
3. Create a simple monolithic service architecture diagram.
4. Propose a serverless workflow for sending email notifications.
5. Compare deployment complexity for each pattern.

## Quiz
1. Multiple Choice: Which architecture is easiest to deploy first?
   - A) microservices
   - B) monolith ✅
   - C) serverless
   - D) event-driven
   - **Answer:** B.
2. True/False: Microservices always reduce overall complexity.
   - **Answer:** False.
3. Multiple Choice: What is a common downside of serverless?
   - A) cold starts ✅
   - B) single binary size
   - C) no scaling
   - D) lacks API support
   - **Answer:** A.
4. Short Answer: Why should service boundaries align with business capabilities?
   - **Answer:** to minimize coupling and improve team ownership.
5. Debugging: Your distributed system is slow. What architecture-related cause might it have?
   - **Answer:** too many network hops or poorly defined service boundaries.

## Assignment
### Objectives
- Evaluate architecture patterns for a backend service.
- Choose an architecture and justify it.
- Document tradeoffs and decision-making.

### Requirements
- Create `lesson-5-1/architecture.md` comparing monolith, microservice, and serverless patterns.
- Add `lesson-5-1/README.md` explaining the chosen pattern for a sample app.
- Include a diagram or ASCII architecture sketch.

### Acceptance Criteria
- Documented tradeoffs and rationale.
- Clear architecture recommendation.
- Diagram illustrating the chosen service layout.

### Marking Rubric
- Clarity: 40%
- Tradeoff analysis: 40%
- Presentation: 20%

### Submission Instructions
- Push `lesson-5-1` folder with docs.

## GitHub Project
### Repository Name
`on2code-architecture-patterns`

### Folder Structure
```
lesson-5-1/
  architecture.md
  README.md
```

### Expected Output
A documented architecture decision.

### Branch Strategy
- `lesson-5-1`

### Pull Request Instructions
- Title: `Add backend architecture lesson`
- Description: `Compare monoliths, microservices, and serverless patterns.`

## Automated Tests
### Requirements
- Validate the architecture document is complete.
- Confirm pros and cons are clearly stated.
- Ensure the chosen pattern is justified.

### Expected Results
- Clear architecture analysis.
- No missing sections.

## Lesson Summary
Choosing the right backend architecture is a strategic decision that impacts delivery, reliability, and scale.

## Next Lesson Preview
Lesson 5.2 covers scaling and high availability.

---

# Lesson 5.2: Scaling and High Availability

## Lesson Overview
This lesson teaches how to scale backend services and maintain availability through redundancy, load balancing, and fault tolerance.

## Learning Objectives
- Explain vertical vs horizontal scaling.
- Use load balancers to distribute traffic.
- Design services for fault tolerance and redundancy.
- Understand availability zones and failover strategies.

## Prerequisites
- Lesson 5.1 completed.
- Familiarity with service deployment concepts.

## Real-world Motivation
Scaling and availability are essential for backend systems that must serve growing traffic and avoid outages.

## Student Notes
### Vertical scaling
Adding more resources to a single instance. Easy but limited by hardware.

### Horizontal scaling
Adding more instances. Better for resilience and large scale.

### Load balancing
Distributes requests across instances to improve throughput and availability.

### Fault tolerance
Design systems so failure of one component does not bring the whole service down.

### Redundancy
Run duplicate services, databases, or caches to remove single points of failure.

## Instructor Video Outline
1. Define vertical vs horizontal scaling.
2. Explain load balancers and health checks.
3. Show redundancy with multiple instances.
4. Discuss failure isolation and graceful degradation.
5. Recap high availability goals.

## Live Coding Demonstration
This lesson is conceptual, but demonstrate scaling diagrams and how an API gateway routes to multiple instances.

## Practice Exercises
1. Describe why horizontal scaling is preferred for web services.
2. Identify a single point of failure in a sample architecture.
3. Explain how a load balancer handles unhealthy instances.
4. Describe a simple failover strategy for a database.
5. Create a diagram showing redundant API instances behind a load balancer.

## Coding Challenges
1. Simulate multiple service instances with container ports and a proxy.
2. Add a health check endpoint and explain how it improves availability.
3. Compare scalability for a monolith and microservices.
4. Design a redundant cache layer with fallback to database.
5. Explain how stateful services complicate scaling.

## Quiz
1. Multiple Choice: What is horizontal scaling?
   - A) adding CPU to one server
   - B) adding more server instances ✅
   - C) increasing database size
   - D) optimizing code
   - **Answer:** B.
2. True/False: A load balancer can improve availability.
   - **Answer:** True.
3. Multiple Choice: What is a single point of failure?
   - A) redundant server
   - B) non-redundant database ✅
   - C) load-balanced service
   - D) distributed cache
   - **Answer:** B.
4. Short Answer: Why are health checks important?
   - **Answer:** to remove unhealthy instances from rotation.
5. Debugging: Your service scales out but still responds slowly. What could be wrong?
   - **Answer:** a bottleneck in shared state, database, or network latency.

## Assignment
### Objectives
- Explain scaling patterns and availability strategies.
- Identify and remove single points of failure.
- Document a scalable architecture.

### Requirements
- Create `lesson-5-2/scale.md` describing vertical and horizontal scaling.
- Add `lesson-5-2/README.md` with high availability strategies.
- Include a diagram of a load-balanced deployment.

### Acceptance Criteria
- Both scaling strategies are described.
- High availability measures are documented.
- A deployment diagram is provided.

### Marking Rubric
- Concept clarity: 40%
- Availability design: 40%
- Documentation: 20%

### Submission Instructions
- Push `lesson-5-2` folder with documents.

## GitHub Project
### Repository Name
`on2code-scaling`

### Folder Structure
```
lesson-5-2/
  scale.md
  README.md
```

### Expected Output
A documented scaling and availability plan.

### Branch Strategy
- `lesson-5-2`

### Pull Request Instructions
- Title: `Add scaling lesson`
- Description: `Describe horizontal scaling and high availability.`

## Automated Tests
### Requirements
- Validate the documentation covers both scaling approaches.
- Confirm high availability strategies are present.
- Ensure the diagram is included.

### Expected Results
- Complete scaling analysis.
- Clear availability recommendations.

## Lesson Summary
Scaling and redundancy are the foundation of reliable backend operations.

## Next Lesson Preview
Lesson 5.3 covers caching, CDN, and performance optimization.

---

# Lesson 5.3: Caching, CDN, and Performance Optimization

## Lesson Overview
This lesson teaches caching patterns, CDN usage, and performance improvements for backend services.

## Learning Objectives
- Understand cache layers and cache invalidation.
- Use HTTP caching headers and CDN concepts.
- Optimize backend endpoints for latency.
- Choose appropriate caching strategies for different workloads.

## Prerequisites
- Lesson 5.2 completed.
- Familiarity with HTTP and API design.

## Real-world Motivation
Caching reduces load, lowers latency, and improves user experience when applied correctly.

## Student Notes
### Cache layers
- browser cache
- CDN edge cache
- application cache
- database cache

### Cache invalidation
Cache invalidation is one of the hardest problems; use TTLs and explicit purge when needed.

### CDN benefits
CDNs serve static and cacheable content closer to users, reducing latency.

### Performance tips
- avoid N+1 queries
- use pagination for large result sets
- cache expensive reads

### Practical advice
- measure before optimizing.
- prefer simple caches with clear expiration rules.
- cache responses only when safe.

## Instructor Video Outline
1. Explain caching levels with a diagram.
2. Demonstrate HTTP cache headers and CDN usage.
3. Show a backend cache for repeated reads.
4. Discuss invalidation strategies.
5. Recap performance best practices.

## Live Coding Demonstration
This lesson is conceptual, but use examples such as response caching and TTL values.

## Practice Exercises
1. Explain the difference between a local cache and CDN cache.
2. Describe when to use `Cache-Control: max-age`.
3. List the benefits of caching API responses.
4. Explain why cache invalidation is hard.
5. Create a caching strategy for a product catalog endpoint.

## Coding Challenges
1. Add an in-memory cache for a `GET` endpoint.
2. Use TTL-based invalidation for cached items.
3. Return cached results for repeated requests.
4. Add pagination to a large list endpoint.
5. Measure endpoint latency before and after caching.

## Quiz
1. Multiple Choice: Which is not a valid cache layer?
   - A) browser ✅
   - B) CDN ✅
   - C) application ✅
   - D) compiler cache
   - **Answer:** D.
2. True/False: Cache invalidation can be the hardest part of caching.
   - **Answer:** True.
3. Multiple Choice: What header controls cache max age?
   - A) `Content-Type`
   - B) `Cache-Control` ✅
   - C) `Accept`
   - D) `Authorization`
   - **Answer:** B.
4. Short Answer: Why use a CDN for static content?
   - **Answer:** to serve content closer to users and reduce latency.
5. Debugging: Your cached API response shows stale data. What might be wrong?
   - **Answer:** TTL too long or invalidation not triggered.

## Assignment
### Objectives
- Apply a cache layer to a backend endpoint.
- Document performance improvements.
- Understand caching tradeoffs.

### Requirements
- Create `lesson-5-3/main.go` with a cache for a read-heavy API.
- Add `lesson-5-3/README.md` describing the cache strategy.
- Include TTL and invalidation logic.

### Acceptance Criteria
- Cached results are returned for repeated requests.
- Cache entries expire after a TTL.
- README documents the behavior.

### Marking Rubric
- Cache implementation: 40%
- Strategy explanation: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-5-3` folder with code and README.

## GitHub Project
### Repository Name
`on2code-caching`

### Folder Structure
```
lesson-5-3/
  main.go
  README.md
```

### Expected Output
A backend endpoint that serves cached responses.

### Branch Strategy
- `lesson-5-3`

### Pull Request Instructions
- Title: `Add caching lesson`
- Description: `Implement backend caching and performance optimization.`

## Automated Tests
### Requirements
- Run the service and verify cached responses.
- Confirm TTL expiration behavior.
- Ensure README explains strategy.

### Expected Results
- Working cache.
- Clear documentation.

## Lesson Summary
Caching is a powerful way to improve backend performance when used with attention to correctness.

## Next Lesson Preview
Lesson 5.4 covers message queues and asynchronous processing.

---

# Lesson 5.4: Message Queues and Asynchronous Processing

## Lesson Overview
This lesson teaches asynchronous workflows using message queues and background processing.

## Learning Objectives
- Understand why asynchronous processing is useful.
- Use queues to decouple producers and consumers.
- Implement background workers for non-blocking tasks.
- Handle retries and failure patterns.

## Prerequisites
- Lesson 5.3 completed.
- Familiarity with service architecture.

## Real-world Motivation
Asynchronous processing enables efficient handling of long-running or unreliable tasks without blocking user-facing requests.

## Student Notes
### Queue basics
A queue stores messages until consumers process them.

### Producer/consumer
Producers enqueue tasks; consumers read from the queue and process jobs.

### Use cases
- email sending
- image resizing
- report generation

### Failure handling
Retry failed jobs with backoff and move permanently failed messages to a dead-letter queue.

### Practical advice
- keep tasks idempotent when possible.
- monitor queue depth and consumer lag.

## Instructor Video Outline
1. Explain producer/consumer architecture.
2. Show a queue-based background worker example.
3. Discuss retry and dead-letter handling.
4. Explain how asynchronous tasks free up synchronous requests.
5. Recap when to use queues.

## Live Coding Demonstration
This lesson is conceptual, but illustrate a simple queue processing flow with diagrams.

## Practice Exercises
1. List use cases for asynchronous processing.
2. Explain why background workers improve responsiveness.
3. Describe a dead-letter queue.
4. Identify which tasks should be queued vs processed synchronously.
5. Draw a producer/consumer flow diagram.

## Coding Challenges
1. Simulate a queue with an in-memory channel and worker goroutine.
2. Enqueue tasks from an HTTP request and process them asynchronously.
3. Add retry logic for failed job processing.
4. Use a persistence-backed queue for durability.
5. Measure the time difference between synchronous and async processing.

## Quiz
1. Multiple Choice: What is a producer in queue architecture?
   - A) a worker that consumes jobs
   - B) a component that enqueues tasks ✅
   - C) a database
   - D) a cache
   - **Answer:** B.
2. True/False: Queues make systems more responsive by moving work out of request handling.
   - **Answer:** True.
3. Multiple Choice: What is a dead-letter queue?
   - A) a queue for successfully processed jobs
   - B) a queue for permanently failed jobs ✅
   - C) a queue with low priority
   - D) a queue for log messages
   - **Answer:** B.
4. Short Answer: Why should queue tasks be idempotent?
   - **Answer:** because they may be retried and should not cause duplicate side effects.
5. Debugging: Your worker crashes and messages are lost. What is a likely cause?
   - **Answer:** queue messages were not persisted or acknowledged properly.

## Assignment
### Objectives
- Implement an asynchronous queue workflow.
- Keep request handling non-blocking.
- Handle retries or failures gracefully.

### Requirements
- Create `lesson-5-4/main.go` with a producer endpoint and worker.
- Add `lesson-5-4/README.md` documenting the async flow.
- Simulate retries or dead-letter handling.

### Acceptance Criteria
- Requests enqueue tasks instead of waiting for work completion.
- Worker processes queued tasks.
- README explains the producer/consumer relationship.

### Marking Rubric
- Asynchronous workflow: 40%
- Retry/failure handling: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-5-4` folder with code and README.

## GitHub Project
### Repository Name
`on2code-async-processing`

### Folder Structure
```
lesson-5-4/
  main.go
  README.md
```

### Expected Output
A service that enqueues and processes background tasks.

### Branch Strategy
- `lesson-5-4`

### Pull Request Instructions
- Title: `Add async queue lesson`
- Description: `Implement a producer/consumer background processing workflow.`

## Automated Tests
### Requirements
- Verify task enqueuing does not block requests.
- Confirm worker processes queued tasks.
- Validate documentation of the async flow.

### Expected Results
- Working async processing.
- Clear documentation.

## Lesson Summary
Asynchronous processing decouples work and improves service responsiveness while enabling durable background workflows.

## Next Lesson Preview
Lesson 5.5 covers distributed systems and consistency models.

---

# Lesson 5.5: Distributed Systems and Consistency Models

## Lesson Overview
This lesson teaches distributed system principles and consistency models that affect backend system behavior in multi-node environments.

## Learning Objectives
- Understand distributed system challenges like partitioning and partial failure.
- Compare consistency models: strong, eventual, and causal.
- Learn CAP theorem and its tradeoffs.
- Design systems that handle unreliable networks.

## Prerequisites
- Lesson 5.4 completed.
- Familiarity with backend service design.

## Real-world Motivation
Distributed systems power modern backend infrastructure. Engineers must understand consistency and failure modes to build reliable services.

## Student Notes
### CAP theorem
A distributed system can provide only two of Consistency, Availability, and Partition tolerance simultaneously.

### Strong consistency
All nodes see the same data immediately. Simpler but often slower.

### Eventual consistency
Updates propagate over time. Faster and more available but clients may see stale data.

### Partition tolerance
The system continues operating despite network failures.

### Practical advice
- Choose the consistency model that fits the use case.
- Use retries and backoff for network failures.
- Keep read/write paths explicit about consistency.

## Instructor Video Outline
1. Explain the CAP theorem with examples.
2. Compare strong and eventual consistency.
3. Describe real-world services that use eventual consistency.
4. Discuss partition-tolerant design.
5. Recap distributed system tradeoffs.

## Live Coding Demonstration
This lesson is conceptual, but use examples such as caching and replicated storage to illustrate consistency.

## Practice Exercises
1. Define the CAP theorem in your own words.
2. Identify a system that requires strong consistency.
3. Explain eventual consistency with a user profile update example.
4. Describe a network partition scenario.
5. List tradeoffs between availability and consistency.

## Coding Challenges
1. Write a short summary comparing strong and eventual consistency.
2. Design a service that can tolerate a network partition.
3. Explain why caches may be eventually consistent.
4. Simulate stale reads in a replicated system example.
5. Create a diagram showing data replication and latency.

## Quiz
1. Multiple Choice: What does CAP stand for?
   - A) Cache, API, Performance
   - B) Consistency, Availability, Partition tolerance ✅
   - C) Code, Architecture, Production
   - D) Cache, Availability, Persistence
   - **Answer:** B.
2. True/False: Eventual consistency means all writes are immediately visible.
   - **Answer:** False.
3. Multiple Choice: Which model is faster but may return stale data?
   - A) strong consistency
   - B) eventual consistency ✅
   - C) transactional consistency
   - D) atomic consistency
   - **Answer:** B.
4. Short Answer: What is a network partition?
   - **Answer:** a failure that isolates nodes from each other.
5. Debugging: A service returns different values from two nodes. What consistency issue is likely?
   - **Answer:** eventual consistency or replication lag.

## Assignment
### Objectives
- Analyze consistency tradeoffs in distributed systems.
- Document how a backend service should behave under partition.
- Choose a consistency model for a sample feature.

### Requirements
- Create `lesson-5-5/consistency.md` comparing strong and eventual consistency.
- Add `lesson-5-5/README.md` describing CAP tradeoffs.
- Include an example use case for each model.

### Acceptance Criteria
- Consistency models are clearly explained.
- CAP tradeoffs are documented.
- Example use cases are provided.

### Marking Rubric
- Concept clarity: 40%
- Tradeoff explanation: 40%
- Example relevance: 20%

### Submission Instructions
- Push `lesson-5-5` folder with docs.

## GitHub Project
### Repository Name
`on2code-distributed-systems`

### Folder Structure
```
lesson-5-5/
  consistency.md
  README.md
```

### Expected Output
A documented distributed systems analysis.

### Branch Strategy
- `lesson-5-5`

### Pull Request Instructions
- Title: `Add distributed systems lesson`
- Description: `Explain consistency models in backend architectures.`

## Automated Tests
### Requirements
- Validate the distributed systems documentation.
- Confirm examples are relevant.
- Ensure CAP theorem is explained correctly.

### Expected Results
- Complete concept coverage.
- Clear examples.

## Lesson Summary
Distributed system awareness is vital for architects building services across multiple nodes and regions.

## Next Lesson Preview
Lesson 5.6 covers containerization and Docker deployment.

---

# Lesson 5.6: Containerization, Docker, and Local Deployment

## Lesson Overview
This lesson teaches how to package backend services with Docker and deploy them locally in containers.

## Learning Objectives
- Write a Dockerfile for a Go backend.
- Build and run Docker containers locally.
- Understand image layers and best practices.
- Use Docker Compose for multi-service setups.

## Prerequisites
- Lesson 5.5 completed.
- Familiarity with service deployment concepts.

## Real-world Motivation
Containers enable consistent deployment environments and make services easier to ship and scale.

## Student Notes
### Dockerfile basics
A Dockerfile describes how to build a container image.

### Multi-stage builds
Use multi-stage builds to keep Go binaries small and production-ready.

### Docker Compose
Compose orchestrates multiple containers for local development.

### Practical advice
- keep images minimal
- avoid storing secrets in images
- use volumes carefully for local data

## Instructor Video Outline
1. Create a Dockerfile for a Go service.
2. Build and run the container locally.
3. Show a Docker Compose file for service + db.
4. Explain image size and multi-stage build benefits.
5. Recap container workflow.

## Live Coding Demonstration
```dockerfile
FROM golang:1.22-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server ./cmd/server

FROM alpine:3.18
WORKDIR /app
COPY --from=build /app/server ./server
EXPOSE 8080
CMD ["./server"]
```

## Visual Learning Suggestions
- Diagram showing build and runtime stages.
- Table of Docker commands.

## Practice Exercises
1. Write a Dockerfile for a simple Go app.
2. Build the image and run it with `docker run`.
3. Add a `docker-compose.yml` for a service and database.
4. Inspect image layers with `docker history`.
5. Explain why multi-stage builds are useful.

## Coding Challenges
1. Containerize a Go API service.
2. Add a database service to Docker Compose.
3. Use environment variables in a Docker Compose file.
4. Build a small image and verify it runs.
5. Add a health check command in the Dockerfile or Compose.

## Quiz
1. Multiple Choice: What does `docker build` create?
   - A) a container ✅
   - B) an image
   - C) a volume
   - D) a service
   - **Answer:** B.
2. True/False: Multi-stage builds can reduce image size.
   - **Answer:** True.
3. Multiple Choice: Which command starts containers from Compose?
   - A) `docker-compose up` ✅
   - B) `docker run`
   - C) `docker build`
   - D) `docker images`
   - **Answer:** A.
4. Short Answer: Why avoid secrets in Docker images?
   - **Answer:** because images can be shared and stored in registries.
5. Debugging: Your container exits immediately. What might be wrong?
   - **Answer:** the CMD is incorrect or the process terminates.

## Assignment
### Objectives
- Containerize a backend service.
- Deploy it locally with Docker Compose.
- Document the setup and run commands.

### Requirements
- Create `lesson-5-6/Dockerfile` and `docker-compose.yml`.
- Add `lesson-5-6/README.md` with build and run instructions.
- Include a service container and optional database container.

### Acceptance Criteria
- Image builds successfully.
- Containers run locally.
- README documents commands.

### Marking Rubric
- Containerization: 50%
- Local deployment: 30%
- Documentation: 20%

### Submission Instructions
- Push `lesson-5-6` folder with Docker assets and README.

## GitHub Project
### Repository Name
`on2code-containers`

### Folder Structure
```
lesson-5-6/
  Dockerfile
  docker-compose.yml
  README.md
```

### Expected Output
A containerized backend service and compose setup.

### Branch Strategy
- `lesson-5-6`

### Pull Request Instructions
- Title: `Add Docker lesson`
- Description: `Containerize a Go backend and deploy locally.`

## Automated Tests
### Requirements
- Build the Docker image successfully.
- Run the compose setup and verify the service.
- Validate README commands.

### Expected Results
- Working container deployment.
- Clear documentation.

## Lesson Summary
Containerization makes backend deployment consistent and portable.

## Next Lesson Preview
Lesson 5.7 covers infrastructure as code and service provisioning.

---

# Lesson 5.7: Infrastructure as Code and Service Provisioning

## Lesson Overview
This lesson teaches infrastructure as code (IaC) concepts and how to provision backend services declaratively.

## Learning Objectives
- Understand IaC benefits and common tools.
- Define infrastructure with code instead of manual steps.
- Provision services such as containers, databases, and networking.
- Keep infrastructure configuration version controlled.

## Prerequisites
- Lesson 5.6 completed.
- Familiarity with containers and deployment.

## Real-world Motivation
IaC makes environments reproducible and reduces manual setup errors in backend deployments.

## Student Notes
### IaC principles
Use code to describe infrastructure and automate provisioning.

### Common tools
Terraform, CloudFormation, Pulumi, and Docker Compose.

### Best practices
- store infrastructure code in version control
- document required variables and providers
- test infrastructure changes safely

### Practical advice
- start with simple resources.
- avoid manual cloud console changes.
- use reusable modules for common patterns.

## Instructor Video Outline
1. Introduce IaC and its importance.
2. Show a simple Terraform or Docker Compose example.
3. Explain how infrastructure is versioned.
4. Demonstrate provisioning a database and service.
5. Recap IaC benefits.

## Live Coding Demonstration
This lesson is conceptual, but show a sample IaC file to illustrate.

## Practice Exercises
1. Identify infrastructure resources needed for a backend service.
2. Write a sample provisioning file for a container and database.
3. Explain how IaC reduces drift.
4. Describe the difference between imperative and declarative provisioning.
5. List the benefits of version-controlled infrastructure.

## Coding Challenges
1. Create a simple IaC config for a service and database.
2. Document the required variables and provider.
3. Explain how to change infrastructure safely.
4. Describe the lifecycle of a provisioned resource.
5. Compare Docker Compose with a cloud provisioning tool.

## Quiz
1. Multiple Choice: What does IaC stand for?
   - A) Infrastructure as Code ✅
   - B) Instance as Container
   - C) Integration and Cache
   - D) Internal API Controller
   - **Answer:** A.
2. True/False: IaC should be stored in version control.
   - **Answer:** True.
3. Multiple Choice: Which tool is commonly used for IaC?
   - A) `go test`
   - B) Terraform ✅
   - C) Postman
   - D) Vim
   - **Answer:** B.
4. Short Answer: What is infrastructure drift?
   - **Answer:** when actual resources diverge from code-defined infrastructure.
5. Debugging: Your provisioning code fails because a variable is missing. What do you do?
   - **Answer:** add the missing variable or document it in the config.

## Assignment
### Objectives
- Describe infrastructure as code practices.
- Define infrastructure resources for a backend service.
- Document provisioning configuration.

### Requirements
- Create `lesson-5-7/iac.md` describing IaC and provisioning steps.
- Add `lesson-5-7/README.md` with sample resource definitions.
- Include an example IaC snippet or pseudo-configuration.

### Acceptance Criteria
- IaC concepts are explained.
- Infrastructure resources are clearly defined.
- Example code or config is included.

### Marking Rubric
- IaC clarity: 40%
- Provisioning design: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-5-7` folder with documents.

## GitHub Project
### Repository Name
`on2code-iac`

### Folder Structure
```
lesson-5-7/
  iac.md
  README.md
```

### Expected Output
A documented infrastructure as code plan.

### Branch Strategy
- `lesson-5-7`

### Pull Request Instructions
- Title: `Add IaC lesson`
- Description: `Explain infrastructure as code and service provisioning.`

## Automated Tests
### Requirements
- Validate IaC concepts are documented.
- Confirm example config is present.
- Ensure README explains resource provisioning.

### Expected Results
- Clear IaC documentation.
- Example provisioning content.

## Lesson Summary
Infrastructure as code brings discipline and reproducibility to backend deployments.

## Next Lesson Preview
Lesson 5.8 covers observability, tracing, and incident response.

---

# Lesson 5.8: Observability, Tracing, and Incident Response

## Lesson Overview
This lesson teaches how to observe backend services, use tracing to follow requests, and respond to incidents effectively.

## Learning Objectives
- Understand logs, metrics, and traces.
- Instrument code for observability.
- Use trace context to diagnose distributed requests.
- Prepare incident response and postmortem practices.

## Prerequisites
- Lesson 5.7 completed.
- Familiarity with backend deployment and monitoring concepts.

## Real-world Motivation
Observability helps teams find and fix issues quickly in production systems.

## Student Notes
### Observability pillars
- logs: event records
- metrics: numeric measurements
- traces: request execution paths

### Tracing
Use distributed tracing to visualize request flows across services.

### Incident response
Have a plan for alerts, escalation, and postmortems.

### Practical advice
- instrument code early.
- correlate logs with trace IDs.
- keep incident reviews blameless and factual.

## Instructor Video Outline
1. Define the three pillars of observability.
2. Show an example of tracing a request across services.
3. Explain how logs and metrics support troubleshooting.
4. Describe a simple incident response workflow.
5. Recap best practices.

## Live Coding Demonstration
This lesson is conceptual, but show how trace IDs can be passed through logs and headers.

## Practice Exercises
1. Describe the difference between logs and metrics.
2. Explain why traces are useful in distributed systems.
3. Write a simple incident response checklist.
4. Identify what information should be included in logs.
5. Describe how trace IDs help correlate events.

## Coding Challenges
1. Add structured logging to a service example.
2. Include a request ID in logs and responses.
3. Sketch a trace across a multi-service call.
4. Document an incident response plan for a service outage.
5. Explain how alerts should be tuned to avoid noise.

## Quiz
1. Multiple Choice: Which is not one of the observability pillars?
   - A) logs
   - B) metrics
   - C) traces
   - D) tests ✅
   - **Answer:** D.
2. True/False: Tracing helps debug distributed requests.
   - **Answer:** True.
3. Multiple Choice: What helps correlate logs across services?
   - A) random numbers
   - B) trace IDs ✅
   - C) function names
   - D) comments
   - **Answer:** B.
4. Short Answer: What should an incident postmortem avoid?
   - **Answer:** blaming individuals.
5. Debugging: Your logs show request ID but no service context. What should you add?
   - **Answer:** service name, endpoint, or host metadata.

## Assignment
### Objectives
- Document observability approach for a backend service.
- Create a simple incident response plan.
- Explain tracing and logging strategy.

### Requirements
- Create `lesson-5-8/observability.md` describing logs, metrics, traces.
- Add `lesson-5-8/README.md` with incident response steps.
- Include a sample request ID logging format.

### Acceptance Criteria
- Observability pillars are explained.
- Incident response workflow is documented.
- Request ID correlation is shown.

### Marking Rubric
- Observability clarity: 40%
- Incident plan: 40%
- Documentation: 20%

### Submission Instructions
- Push `lesson-5-8` folder with docs.

## GitHub Project
### Repository Name
`on2code-observability`

### Folder Structure
```
lesson-5-8/
  observability.md
  README.md
```

### Expected Output
A documented observability and incident response plan.

### Branch Strategy
- `lesson-5-8`

### Pull Request Instructions
- Title: `Add observability lesson`
- Description: `Explain logs, metrics, traces, and incident response.`

## Automated Tests
### Requirements
- Validate the observability documentation.
- Confirm incident response steps exist.
- Ensure request ID logging example is included.

### Expected Results
- Complete observability plan.
- Practical incident response documentation.

## Lesson Summary
Observability and incident response are essential for operating resilient backend systems.

## Next Lesson Preview
Lesson 5.9 covers security, secrets, and production hardening.

---

# Lesson 5.9: Security, Secrets, and Production Hardening

## Lesson Overview
This lesson teaches security practices for backend systems, including secrets management, hardened deployments, and secure defaults.

## Learning Objectives
- Protect secrets and sensitive configuration.
- Harden service deployment and runtime security.
- Apply network and API security controls.
- Audit dependencies and minimize attack surface.

## Prerequisites
- Lesson 5.8 completed.
- Familiarity with deployment and operations.

## Real-world Motivation
Security is required in production systems to protect user data and maintain trust.

## Student Notes
### Secrets management
Store secrets in environment variables, vaults, or secrets managers.

### Hardening
Use least privilege, secure network policies, and up-to-date dependencies.

### API security
Validate inputs, use TLS, and authenticate all requests.

### Practical advice
- never commit secrets to git
- use HTTPS in production
- log security events carefully but avoid leaking secrets

## Instructor Video Outline
1. Explain common backend security risks.
2. Demonstrate secrets management best practices.
3. Show how to harden a container or service.
4. Discuss secure API defaults.
5. Recap production security practices.

## Live Coding Demonstration
This lesson is conceptual, but show examples of environment-based secrets and secure configuration checks.

## Practice Exercises
1. List where secrets should not be stored.
2. Describe how to store database credentials securely.
3. Explain why TLS is essential for API traffic.
4. Identify a dependency update practice to reduce risk.
5. Document a secure default configuration for a service.

## Coding Challenges
1. Add secret loading from environment variables only.
2. Describe how to rotate a secret safely.
3. Identify insecure defaults in a sample config.
4. Illustrate network segmentation for a backend service.
5. Write a checklist for production hardening.

## Quiz
1. Multiple Choice: Where should API keys be stored in production?
   - A) source code
   - B) environment variables or vault ✅
   - C) public repo
   - D) log files
   - **Answer:** B.
2. True/False: Secrets should be committed to git.
   - **Answer:** False.
3. Multiple Choice: What protocol should protect backend API traffic?
   - A) HTTP
   - B) HTTPS ✅
   - C) FTP
   - D) SMTP
   - **Answer:** B.
4. Short Answer: What is the principle of least privilege?
   - **Answer:** give services and users only the permissions they need.
5. Debugging: Your service logs database credentials. What is the security issue?
   - **Answer:** leaking secrets in logs.

## Assignment
### Objectives
- Document security best practices for a backend service.
- Manage secrets securely.
- Harden deployment and runtime settings.

### Requirements
- Create `lesson-5-9/security.md` with secrets and hardening guidance.
- Add `lesson-5-9/README.md` documenting safe deployment practices.
- Include a sample secret management strategy.

### Acceptance Criteria
- Secrets handling is clearly explained.
- Production hardening steps are documented.
- README includes secure deployment guidance.

### Marking Rubric
- Security clarity: 40%
- Secret management: 30%
- Practical guidance: 30%

### Submission Instructions
- Push `lesson-5-9` folder with docs.

## GitHub Project
### Repository Name
`on2code-security`

### Folder Structure
```
lesson-5-9/
  security.md
  README.md
```

### Expected Output
A documented security and hardening plan.

### Branch Strategy
- `lesson-5-9`

### Pull Request Instructions
- Title: `Add security lesson`
- Description: `Document secrets management and production hardening.`

## Automated Tests
### Requirements
- Validate the security documentation.
- Confirm secrets guidance is present.
- Ensure hardening practices are described.

### Expected Results
- Complete security plan.
- Practical hardening guidance.

## Lesson Summary
Security and secrets management are critical for production backend services and must be built in from the start.

## Next Lesson Preview
Lesson 5.10 is a capstone that combines resilience, deployment, monitoring, and security into a working service.

---

# Lesson 5.10: Capstone: Building a Resilient Backend Service

## Lesson Overview
This capstone lesson brings together all Module 5 skills to design and document a resilient backend service.

## Learning Objectives
- Apply architecture, scaling, caching, async, and security patterns together.
- Package a service for containerized deployment.
- Document observability, incident response, and security.
- Evaluate the service design using tradeoffs and production readiness.

## Prerequisites
- Lessons 5.1 through 5.9 completed.
- Experience with backend service design and deployment.

## Real-world Motivation
Building a trustworthy backend service requires combining architecture, operations, and reliability practices.

## Student Notes
### Integration
A resilient service includes redundancy, caching, queued processing, observability, and secure deployment.

### Documentation
A service is only manageable when its architecture, config, and operational behavior are documented.

### Evaluation
Assess the service for scalability, security, and fault tolerance.

### Practical advice
- keep the design realistic and incremental.
- use diagrams and clear descriptions.
- prioritize operational reliability.

## Instructor Video Outline
1. Review the key Module 5 concepts.
2. Outline the capstone service requirements.
3. Show a sample resilient architecture.
4. Describe how to document the service.
5. Recap the value of combining patterns.

## Live Coding Demonstration
This lesson is conceptual, but use a sample architecture and Docker/Compose deployment to illustrate.

## Practice Exercises
1. List the components of a resilient backend service.
2. Explain how caching and queueing improve reliability.
3. Describe a secure deployment checklist.
4. Document health and observability endpoints for a service.
5. Review the tradeoffs in your own capstone design.

## Coding Challenges
1. Build a containerized backend service with persistence.
2. Add a cache or async worker to improve performance.
3. Instrument the service with health checks and metrics.
4. Document deployment, config, and security requirements.
5. Evaluate the service for a production launch.

## Quiz
1. Multiple Choice: Which component is not essential for a resilient service?
   - A) monitoring ✅
   - B) scaling ✅
   - C) documentation ✅
   - D) single-threaded runtime
   - **Answer:** D.
2. True/False: A capstone should include deployment instructions.
   - **Answer:** True.
3. Multiple Choice: Which reduces response latency for repeated data?
   - A) a queue
   - B) a cache ✅
   - C) a database schema
   - D) a health check
   - **Answer:** B.
4. Short Answer: What is the purpose of a readiness endpoint?
   - **Answer:** to indicate the service is ready to receive traffic.
5. Debugging: Your capstone service is resilient but hard to maintain. What may be missing?
   - **Answer:** documentation, clear architecture, or observability.

## Assignment
### Objectives
- Build and document a resilient backend service.
- Apply Module 5 concepts to a real deployment-ready design.
- Evaluate the design with production readiness criteria.

### Requirements
- Create `lesson-5-10/` with service code, Docker setup, and documentation.
- Add `lesson-5-10/README.md` describing architecture, deployment, and observability.
- Include health checks, config, security, and a sample async workflow.

### Acceptance Criteria
- Service is containerized and can run locally.
- Documentation covers architecture, config, observability, and security.
- The design demonstrates resilience patterns.

### Marking Rubric
- Service completeness: 40%
- Operational readiness: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-5-10` folder with code, Docker assets, and README.

## GitHub Project
### Repository Name
`on2code-resilient-service`

### Folder Structure
```
lesson-5-10/
  Dockerfile
  docker-compose.yml
  README.md
  main.go
```

### Expected Output
A resilient, documented service ready for local deployment.

### Branch Strategy
- `lesson-5-10`

### Pull Request Instructions
- Title: `Add Module 5 capstone lesson`
- Description: `Build a resilient backend service with deployment and operations documentation.`

## Automated Tests
### Requirements
- Verify the service builds and runs in Docker.
- Confirm health checks and metrics endpoints work.
- Validate README covers deployment and observability.

### Expected Results
- Working resilient service.
- Clear operational documentation.

## Lesson Summary
This capstone proves students can apply advanced backend architecture principles to a deployable service.

## Module Conclusion
Module 5 prepares students to build production-grade backend systems with the architecture, scaling, deployment, and security practices needed for real-world engineering.
