# Module 6: Production Backend Engineering and Professional Practices

## Module Introduction
Module 6 prepares students for real-world backend engineering work by teaching production practices, teamwork, CI/CD, operational reliability, and career-ready skills.

## Learning Outcomes
By the end of this module, students will be able to:
- Apply CI/CD pipelines and automated deployments.
- Use source control workflows, code reviews, and branch strategies.
- Write production-quality documentation and runbooks.
- Practice security reviews, dependency management, and release planning.
- Participate in incident response and postmortem processes.
- Optimize backend services for maintainability and team collaboration.
- Understand career-ready backend engineering skills and professional communication.

## Lessons
1. CI/CD and Automated Deployment Pipelines
2. Source Control Workflows and Code Review Culture
3. Release Management, Rollbacks, and Feature Flags
4. Dependency Management and Secure Upgrades
5. Production Documentation, Runbooks, and On-call Practices
6. Incident Response and Postmortem Workflow
7. Backend Performance Tuning and Capacity Planning
8. Team Communication, Design Docs, and Collaboration
9. Backend Security Reviews and Dependency Audits
10. Career Readiness for Backend Engineers

## Practice Labs
- Lab 1: Define a CI/CD pipeline and deployment strategy.
- Lab 2: Create a code review checklist and apply it to a sample PR.
- Lab 3: Build a runbook for a service outage scenario.

## Module Quiz
A 20-question quiz covering CI/CD, source control, security, incident response, and professional practices.

## Module Assignment
Create a production readiness package for a backend service, including CI/CD flow, release guidance, runbooks, security audit notes, and a deployment checklist.

## Mini Project
Build a `backend-production-readiness` artifact with:
- a sample CI/CD pipeline description
- branch strategy and code review process
- a security/dependency audit plan
- incident response runbook
- release and rollback checklist
- career readiness notes for backend engineers

## Module Review
This module teaches how backend engineering works in production teams: from automation and reviews to documentation, incidents, and professional behavior.

## Resources
- CI/CD best practices and pipeline examples
- Git branching and review workflow guides
- Security audit and dependency scanning tools
- Incident response and postmortem templates
- Backend engineering career resources

## Knowledge Check
Students should be able to:
- Describe a CI/CD pipeline for a backend service.
- Explain how code review improves quality.
- Write a runbook for a common production incident.
- Discuss security and dependency upgrade practices.

## Completion Criteria
- All lessons completed with exercises.
- Module quiz passed with at least 80%.
- Production readiness package submitted.
- Documentation and runbooks reviewed for clarity.

---

# Lesson 6.1: CI/CD and Automated Deployment Pipelines

## Lesson Overview
This lesson teaches continuous integration and delivery practices for backend services, including automated builds, tests, and deployments.

## Learning Objectives
- Explain the purpose of CI/CD.
- Define pipeline stages for build, test, and deploy.
- Use automation to catch regressions before deployment.
- Roll back safely when a deployment fails.

## Prerequisites
- Modules 1 through 5 completed.
- Familiarity with version control and deployment concepts.

## Real-world Motivation
Modern backend teams deploy frequently and rely on automation to keep releases reliable and repeatable.

## Student Notes
### CI/CD basics
CI runs tests and validations on every change. CD deploys approved changes to staging and production.

### Pipeline stages
- build: compile and verify code
- test: run unit/integration tests
- lint: enforce style and security checks
- deploy: release the service

### Feedback loops
Fast, automated feedback speeds up development and reduces risk.

### Practical advice
- run tests in CI, not only locally.
- keep deployment scripts under version control.
- use feature flags for safer rollouts.

## Instructor Video Outline
1. Explain CI/CD and why it matters.
2. Walk through a sample pipeline.
3. Show how automated tests fit into CI.
4. Explain rollout and rollback mechanics.
5. Recap pipeline best practices.

## Live Coding Demonstration
This lesson is conceptual, but show a sample pipeline YAML or workflow description.

## Practice Exercises
1. Sketch a CI/CD pipeline for a Go backend.
2. Identify tests and checks that should run before deploy.
3. Describe how a rollback would work.
4. Explain the role of staging environments.
5. List the benefits of automated deployment.

## Coding Challenges
1. Write a sample CI workflow for building and testing a Go service.
2. Add a lint and formatting stage to the pipeline.
3. Describe how a deployment could be gated by manual approval.
4. Show how to run integration tests against a database in CI.
5. Add a step to publish a Docker image.

## Quiz
1. Multiple Choice: What does CI stand for?
   - A) Continuous Integration ✅
   - B) Code Inspection
   - C) Container Infrastructure
   - D) Cloud Instance
   - **Answer:** A.
2. True/False: CI/CD pipelines should only run on production branches.
   - **Answer:** False.
3. Multiple Choice: Which stage should run unit tests?
   - A) deploy
   - B) build
   - C) test ✅
   - D) release
   - **Answer:** C.
4. Short Answer: Why use automated deploys?
   - **Answer:** to reduce human error and speed up releases.
5. Debugging: A pipeline fails after code formatting. What is likely wrong?
   - **Answer:** code style or formatting rules are not satisfied.

## Assignment
### Objectives
- Define a CI/CD process for a backend service.
- Document pipeline stages and deployment steps.
- Include rollback safety measures.

### Requirements
- Create `lesson-6-1/ci-cd.md` describing the pipeline.
- Add `lesson-6-1/README.md` with sample workflow stages.
- Include a rollback scenario and approvals.

### Acceptance Criteria
- Pipeline stages are clearly defined.
- Rollback strategy is included.
- Documentation is easy to follow.

### Marking Rubric
- Pipeline clarity: 40%
- Deployment safety: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-6-1` folder with docs.

## GitHub Project
### Repository Name
`on2code-ci-cd`

### Folder Structure
```
lesson-6-1/
  ci-cd.md
  README.md
```

### Expected Output
A documented CI/CD process and deployment plan.

### Branch Strategy
- `lesson-6-1`

### Pull Request Instructions
- Title: `Add CI/CD lesson`
- Description: `Document CI/CD pipeline and deployment stages.`

## Automated Tests
### Requirements
- Validate the pipeline documentation.
- Confirm stage names and order are correct.
- Ensure rollback guidance is present.

### Expected Results
- Complete CI/CD plan.
- Practical launch guidance.

## Lesson Summary
CI/CD is the automation backbone of reliable backend delivery.

## Next Lesson Preview
Lesson 6.2 covers source control workflows and code review culture.

---

# Lesson 6.2: Source Control Workflows and Code Review Culture

## Lesson Overview
This lesson teaches effective Git workflows, branching strategies, and how code review culture improves backend code quality.

## Learning Objectives
- Use feature branches, pull requests, and merge strategies.
- Give and receive constructive code reviews.
- Automate checks on pull requests.
- Keep history clean and meaningful.

## Prerequisites
- Lesson 6.1 completed.
- Familiarity with Git basics.

## Real-world Motivation
Backend teams work collaboratively and rely on source control workflows to keep changes safe and reviewable.

## Student Notes
### Branch strategies
- feature branching
- GitHub Flow
- trunk-based development

### Pull requests
PRs are the primary mechanism for review and quality control.

### Code review best practices
- ask questions, not commands
- review behavior and design, not only formatting
- keep reviews timely and focused

### Practical advice
- write descriptive commit messages.
- squash or rebase when appropriate.
- use automation to enforce tests and linting.

## Instructor Video Outline
1. Explain branch workflows and PR basics.
2. Demonstrate a good pull request process.
3. Discuss review etiquette and constructive feedback.
4. Show how automation supports code reviews.
5. Recap collaboration best practices.

## Live Coding Demonstration
This lesson is conceptual, but show a sample PR checklist and commit message conventions.

## Practice Exercises
1. Define a branch strategy for a small team.
2. Write a sample pull request description.
3. Identify three review checklist items for backend changes.
4. Explain how to handle review feedback respectfully.
5. List the benefits of automated PR checks.

## Coding Challenges
1. Draft a code review checklist for backend PRs.
2. Create a sample merge strategy for feature branches.
3. Describe how to keep a PR small and reviewable.
4. Explain when to use `rebase` versus `merge`.
5. Create a commit message template.

## Quiz
1. Multiple Choice: What is a pull request used for?
   - A) merging code without review
   - B) requesting feedback and merging changes ✅
   - C) deleting branches
   - D) running tests only
   - **Answer:** B.
2. True/False: Reviews should focus only on style.
   - **Answer:** False.
3. Multiple Choice: Which workflow uses short-lived branches and frequent merges?
   - A) GitHub Flow ✅
   - B) GitFlow
   - C) release branching
   - D) trunkless development
   - **Answer:** A.
4. Short Answer: Why keep pull requests small?
   - **Answer:** to make them faster and easier to review.
5. Debugging: A PR has too many unrelated changes. What should be done?
   - **Answer:** split it into smaller focused branches.

## Assignment
### Objectives
- Document a source control workflow for backend development.
- Create a code review checklist.
- Demonstrate best practices for PRs.

### Requirements
- Create `lesson-6-2/git-workflow.md` describing the process.
- Add `lesson-6-2/review-checklist.md` with review guidance.
- Include a sample PR template or commit convention.

### Acceptance Criteria
- Workflow is clearly documented.
- Review checklist is practical.
- PR guidance is actionable.

### Marking Rubric
- Process clarity: 40%
- Review guidance: 30%
- Practical examples: 30%

### Submission Instructions
- Push `lesson-6-2` folder with docs.

## GitHub Project
### Repository Name
`on2code-git-workflow`

### Folder Structure
```
lesson-6-2/
  git-workflow.md
  review-checklist.md
```

### Expected Output
A documented Git workflow and code review checklist.

### Branch Strategy
- `lesson-6-2`

### Pull Request Instructions
- Title: `Add source control workflow lesson`
- Description: `Document Git branching and code review culture.`

## Automated Tests
### Requirements
- Validate the workflow documentation.
- Confirm the review checklist is complete.
- Ensure examples are coherent.

### Expected Results
- Clear collaboration guidance.
- Practical review checklist.

## Lesson Summary
Strong source control and review culture are foundational to backend team success.

## Next Lesson Preview
Lesson 6.3 covers release management, rollbacks, and feature flags.

---

# Lesson 6.3: Release Management, Rollbacks, and Feature Flags

## Lesson Overview
This lesson teaches how to manage releases safely, handle rollbacks, and use feature flags to control rollout.

## Learning Objectives
- Plan releases with clear criteria.
- Use feature flags to decouple deployment from release.
- Roll back safely when production issues occur.
- Track release readiness and communication.

## Prerequisites
- Lesson 6.2 completed.
- Familiarity with deployment and CI/CD.

## Real-world Motivation
Production releases are easier to manage when the team can rollback quickly and control features safely.

## Student Notes
### Release planning
Define release scope, testing, and deployment timing.

### Rollbacks
Have a tested rollback plan ready before releasing.

### Feature flags
Enable or disable features at runtime without redeploying.

### Practical advice
- keep release notes concise.
- use gradual rollouts for risky changes.
- monitor metrics during release.

## Instructor Video Outline
1. Explain release planning and criteria.
2. Demonstrate a feature flag workflow.
3. Describe how to perform a rollback.
4. Discuss release communication and monitoring.
5. Recap release safety practices.

## Live Coding Demonstration
This lesson is conceptual, but show a feature flag example and rollback checklist.

## Practice Exercises
1. Define a release checklist for a backend service.
2. Describe a feature flag use case.
3. Explain when to rollback versus fix forward.
4. Outline a communication plan for releases.
5. Identify metrics to watch during a rollout.

## Coding Challenges
1. Draft a release checklist including testing and rollback.
2. Describe a feature flag gating strategy.
3. Create a rollback plan for a database migration.
4. Explain how to use canary releases.
5. Document when a feature flag should be removed.

## Quiz
1. Multiple Choice: What is a feature flag used for?
   - A) database schema
   - B) runtime feature control ✅
   - C) load balancing
   - D) environment variables
   - **Answer:** B.
2. True/False: Rollbacks should be unplanned and ad hoc.
   - **Answer:** False.
3. Multiple Choice: Which is a safe release pattern?
   - A) deploying without monitoring
   - B) gradual rollout ✅
   - C) skipping tests
   - D) committing directly to main
   - **Answer:** B.
4. Short Answer: What should you do before enabling a feature flag in production?
   - **Answer:** verify it is tested and monitor metrics.
5. Debugging: A feature is enabled and causing errors. What is the safest immediate action?
   - **Answer:** disable the feature flag or rollback.

## Assignment
### Objectives
- Document a release and rollback process.
- Explain feature flag usage.
- Prepare release communication guidance.

### Requirements
- Create `lesson-6-3/release-plan.md` and `lesson-6-3/feature-flags.md`.
- Add `lesson-6-3/README.md` with release checklist.
- Include a rollback scenario.

### Acceptance Criteria
- Release plan is clear.
- Feature flag usage is explained.
- Rollback guidance is included.

### Marking Rubric
- Release clarity: 40%
- Safety planning: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-6-3` folder with docs.

## GitHub Project
### Repository Name
`on2code-release-management`

### Folder Structure
```
lesson-6-3/
  release-plan.md
  feature-flags.md
  README.md
```

### Expected Output
A documented release management and feature flag plan.

### Branch Strategy
- `lesson-6-3`

### Pull Request Instructions
- Title: `Add release management lesson`
- Description: `Document release planning, feature flags, and rollback safety.`

## Automated Tests
### Requirements
- Validate release documentation.
- Confirm feature flag guidance exists.
- Ensure the rollback plan is present.

### Expected Results
- Complete release readiness docs.
- Practical feature flag plan.

## Lesson Summary
Release management and feature flags make production changes safer and more predictable.

## Next Lesson Preview
Lesson 6.4 covers dependency management and secure upgrades.

---

# Lesson 6.4: Dependency Management and Secure Upgrades

## Lesson Overview
This lesson teaches how to manage dependencies securely and upgrade them safely in backend projects.

## Learning Objectives
- Track dependencies using module files.
- Audit dependencies for vulnerabilities.
- Upgrade libraries safely and test changes.
- Avoid dependency bloat and outdated packages.

## Prerequisites
- Lesson 6.3 completed.
- Familiarity with Go modules and package management.

## Real-world Motivation
Dependencies power backend systems, but unmanaged upgrades can introduce vulnerabilities and instability.

## Student Notes
### Dependency tracking
Use `go.mod` and `go.sum` to fix dependency versions.

### Audits
Use vulnerability scanners and dependency reports.

### Upgrades
Upgrade one dependency at a time and run tests.

### Practical advice
- avoid transitive dependency surprises.
- pin versions when stability matters.
- review changelogs before upgrading.

## Instructor Video Outline
1. Explain Go module dependency management.
2. Demonstrate upgrading a dependency safely.
3. Show a vulnerability audit workflow.
4. Discuss version pinning and compatibility.
5. Recap secure dependency practices.

## Live Coding Demonstration
This lesson is conceptual, but show `go list -m all` and an upgrade example.

## Practice Exercises
1. Inspect `go.mod` and explain each dependency.
2. Run a dependency audit tool or explain how one works.
3. Upgrade a dependency and run tests.
4. Document how to handle a breaking dependency change.
5. Explain why transitive dependencies matter.

## Coding Challenges
1. Write a dependency upgrade checklist.
2. Audit a sample dependency tree for security issues.
3. Describe how to roll back a bad dependency upgrade.
4. Explain why `go.sum` should be checked into source control.
5. Create a plan for periodic dependency maintenance.

## Quiz
1. Multiple Choice: What file pins Go dependencies?
   - A) `go.mod` ✅
   - B) `main.go`
   - C) `README.md`
   - D) `Dockerfile`
   - **Answer:** A.
2. True/False: `go.sum` records expected cryptographic hashes for modules.
   - **Answer:** True.
3. Multiple Choice: What should you do before upgrading a dependency?
   - A) ignore tests
   - B) read the changelog ✅
   - C) remove the module
   - D) deploy immediately
   - **Answer:** B.
4. Short Answer: Why audit dependencies?
   - **Answer:** to find security vulnerabilities and risky packages.
5. Debugging: A dependency upgrade breaks the build. What is a good response?
   - **Answer:** revert the upgrade and investigate compatibility changes.

## Assignment
### Objectives
- Document a secure dependency management workflow.
- Demonstrate safe upgrade practices.
- Include an audit or review process.

### Requirements
- Create `lesson-6-4/dependency-management.md`.
- Add `lesson-6-4/README.md` with upgrade and audit guidance.
- Include an example audit or upgrade checklist.

### Acceptance Criteria
- Dependency practices are clearly documented.
- Upgrade safety steps are included.
- Audit considerations are explained.

### Marking Rubric
- Security guidance: 40%
- Upgrade process: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-6-4` folder with docs.

## GitHub Project
### Repository Name
`on2code-dependency-management`

### Folder Structure
```
lesson-6-4/
  dependency-management.md
  README.md
```

### Expected Output
A documented dependency management and upgrade strategy.

### Branch Strategy
- `lesson-6-4`

### Pull Request Instructions
- Title: `Add dependency management lesson`
- Description: `Document secure dependency upgrades and audits.`

## Automated Tests
### Requirements
- Validate dependency management documentation.
- Confirm upgrade guidance exists.
- Ensure audit process is described.

### Expected Results
- Complete dependency workflow docs.
- Practical upgrade guidance.

## Lesson Summary
Secure dependency management prevents vulnerabilities and ensures backend stability.

## Next Lesson Preview
Lesson 6.5 covers production documentation, runbooks, and on-call practices.

---

# Lesson 6.5: Production Documentation, Runbooks, and On-call Practices

## Lesson Overview
This lesson teaches how to write documentation, runbooks, and on-call guidance for backend services.

## Learning Objectives
- Create runbooks for common production incidents.
- Document service topology, dependencies, and debugging steps.
- Prepare on-call handoff notes and escalation paths.
- Keep documentation accessible and up to date.

## Prerequisites
- Lesson 6.4 completed.
- Familiarity with service operations.

## Real-world Motivation
Production documentation helps teams respond quickly when issues occur and reduces knowledge gaps.

## Student Notes
### Runbooks
Runbooks are step-by-step guides for handling incidents.

### Service docs
Document what the service does, how it is deployed, and how to troubleshoot it.

### On-call practices
Define who is responsible, how to alert them, and how to escalate.

### Practical advice
- keep runbooks concise.
- include recovery steps and fallback options.
- link to monitoring dashboards and logs.

## Instructor Video Outline
1. Explain the role of runbooks in incident response.
2. Show a sample production documentation structure.
3. Discuss on-call handoff and escalation.
4. Emphasize maintaining documentation over time.
5. Recap documentation best practices.

## Live Coding Demonstration
This lesson is conceptual, but show a sample runbook outline and service docs.

## Practice Exercises
1. Write a runbook for a service outage.
2. Document the service dependencies and endpoints.
3. Create an escalation path for critical alerts.
4. Explain how to update docs after an incident.
5. Describe what information belongs in a service readme.

## Coding Challenges
1. Draft a runbook for a failing database connection.
2. Create a service doc describing deployment and monitoring.
3. Write an on-call checklist for a backend service.
4. Include links to health checks and dashboard URLs.
5. Explain how to keep documentation current.

## Quiz
1. Multiple Choice: What is a runbook?
   - A) a test suite
   - B) an incident response guide ✅
   - C) a deployment log
   - D) a database schema
   - **Answer:** B.
2. True/False: Runbooks should be long and verbose.
   - **Answer:** False.
3. Multiple Choice: What should a service doc include?
   - A) endpoints and deployment steps ✅
   - B) personal opinions
   - C) unrelated tasks
   - D) only code snippets
   - **Answer:** A.
4. Short Answer: Why is on-call documentation important?
   - **Answer:** so responders can act quickly and consistently.
5. Debugging: A runbook is outdated. What is the risk?
   - **Answer:** responders may follow incorrect steps and worsen the incident.

## Assignment
### Objectives
- Create production runbooks and operations documentation.
- Define on-call responsibilities.
- Keep documentation actionable.

### Requirements
- Create `lesson-6-5/runbook.md` and `lesson-6-5/README.md`.
- Add `lesson-6-5/on-call.md` with escalation and contact guidance.
- Include troubleshooting steps for common failures.

### Acceptance Criteria
- Runbook is practical and concise.
- On-call guidance is clear.
- Service documentation covers key operational details.

### Marking Rubric
- Documentation quality: 40%
- Operational usefulness: 40%
- Clarity: 20%

### Submission Instructions
- Push `lesson-6-5` folder with docs.

## GitHub Project
### Repository Name
`on2code-runbooks`

### Folder Structure
```
lesson-6-5/
  runbook.md
  on-call.md
  README.md
```

### Expected Output
Actionable production runbooks and on-call guidance.

### Branch Strategy
- `lesson-6-5`

### Pull Request Instructions
- Title: `Add runbook lesson`
- Description: `Document production runbooks and on-call practices.`

## Automated Tests
### Requirements
- Validate runbook completeness.
- Confirm on-call guidance exists.
- Ensure documentation is actionable.

### Expected Results
- Complete operational docs.
- Clear incident guidance.

## Lesson Summary
Good production documentation and on-call practices reduce recovery time and improve team confidence.

## Next Lesson Preview
Lesson 6.6 covers incident response and postmortem workflow.

---

# Lesson 6.6: Incident Response and Postmortem Workflow

## Lesson Overview
This lesson teaches how to respond to production incidents and conduct blameless postmortems to improve the system.

## Learning Objectives
- Respond quickly to alerts with a structured workflow.
- Document incident timelines and root cause.
- Conduct blameless postmortems with actionable follow-up.
- Use incident reviews to improve reliability.

## Prerequisites
- Lesson 6.5 completed.
- Familiarity with monitoring and runbooks.

## Real-world Motivation
Incident response and postmortems turn outages into learning opportunities and help prevent repeat failures.

## Student Notes
### Incident response
Detect, respond, mitigate, and recover.

### Postmortem
Document what happened, why, and what actions will prevent recurrence.

### Blameless culture
Focus on systems and process, not individuals.

### Practical advice
- include timelines, impact, and root cause.
- assign clear action items.
- share findings with the team.

## Instructor Video Outline
1. Explain the incident response lifecycle.
2. Show a postmortem template.
3. Discuss blameless culture and follow-up.
4. Describe how to prioritize action items.
5. Recap incident improvement practices.

## Live Coding Demonstration
This lesson is conceptual, but present a postmortem document structure.

## Practice Exercises
1. Write a mock incident timeline.
2. Identify root causes and detection methods.
3. Draft a blameless postmortem summary.
4. Create action items for reliability improvements.
5. Explain how to communicate incident status.

## Coding Challenges
1. Draft a postmortem for a sample outage.
2. Include impact, timeline, root cause, and follow-up.
3. Describe what could be changed to avoid the issue.
4. Explain how to measure the success of postmortem actions.
5. Create a checklist for incident responders.

## Quiz
1. Multiple Choice: What is the goal of a postmortem?
   - A) assign blame
   - B) learn and improve ✅
   - C) hide the issue
   - D) repeat the outage
   - **Answer:** B.
2. True/False: Postmortems should be blameless.
   - **Answer:** True.
3. Multiple Choice: Which is part of an incident timeline?
   - A) detection time ✅
   - B) the developer's favorite tool
   - C) unrelated meetings
   - D) code style
   - **Answer:** A.
4. Short Answer: Why document action items after an incident?
   - **Answer:** to prevent recurrence and improve the system.
5. Debugging: A postmortem lacks a root cause. What is missing?
   - **Answer:** deep analysis of why the failure happened.

## Assignment
### Objectives
- Create an incident response and postmortem document.
- Practice a blameless review workflow.
- Turn incidents into improvement actions.

### Requirements
- Create `lesson-6-6/incident-response.md` and `lesson-6-6/postmortem.md`.
- Add `lesson-6-6/README.md` describing the workflow.
- Include a sample timeline and action items.

### Acceptance Criteria
- Response workflow is defined.
- Postmortem includes root cause and follow-up.
- Documents are clear and practical.

### Marking Rubric
- Process clarity: 40%
- Postmortem quality: 30%
- Improvement focus: 30%

### Submission Instructions
- Push `lesson-6-6` folder with docs.

## GitHub Project
### Repository Name
`on2code-incident-response`

### Folder Structure
```
lesson-6-6/
  incident-response.md
  postmortem.md
  README.md
```

### Expected Output
A documented incident response and postmortem workflow.

### Branch Strategy
- `lesson-6-6`

### Pull Request Instructions
- Title: `Add incident response lesson`
- Description: `Document incident response and blameless postmortems.`

## Automated Tests
### Requirements
- Validate the response workflow documentation.
- Confirm the postmortem includes follow-up actions.
- Ensure the workflow is practical.

### Expected Results
- Complete incident response docs.
- Clear postmortem guidance.

## Lesson Summary
Effective incident response and postmortems help backend teams recover faster and improve continuously.

## Next Lesson Preview
Lesson 6.7 covers backend performance tuning and capacity planning.

---

# Lesson 6.7: Backend Performance Tuning and Capacity Planning

## Lesson Overview
This lesson teaches how to tune backend performance and plan capacity for production workloads.

## Learning Objectives
- Measure service performance and identify bottlenecks.
- Use load testing and profiling tools.
- Estimate capacity needs and plan for growth.
- Optimize backend code and infrastructure for throughput.

## Prerequisites
- Lesson 6.6 completed.
- Familiarity with monitoring and deployment.

## Real-world Motivation
Production services need both performance tuning and capacity planning to keep latency low and availability high.

## Student Notes
### Performance measurement
Use metrics, tracing, and profiling to identify slow components.

### Load testing
Simulate traffic to validate service capacity.

### Capacity planning
Estimate resource needs based on traffic patterns and growth.

### Practical advice
- measure before optimizing.
- profile real workloads when possible.
- keep safety margins in capacity plans.

## Instructor Video Outline
1. Explain performance measurement and profiling.
2. Demonstrate load testing a backend endpoint.
3. Discuss capacity planning and scaling thresholds.
4. Show how to identify and fix bottlenecks.
5. Recap performance tuning process.

## Live Coding Demonstration
This lesson is conceptual, but show sample profiling output and load test scenarios.

## Practice Exercises
1. List metrics useful for backend performance.
2. Describe when to run load tests.
3. Explain how to identify a CPU versus I/O bottleneck.
4. Create a simple capacity plan for a service.
5. Define a performance goal for API latency.

## Coding Challenges
1. Draft a load test plan for an endpoint.
2. Describe how to use a profiler to find hot paths.
3. Explain how to set resource limits based on capacity estimates.
4. Identify a caching opportunity from a performance report.
5. Create a performance improvement action list.

## Quiz
1. Multiple Choice: What does load testing measure?
   - A) source code quality
   - B) service behavior under traffic ✅
   - C) unit test coverage
   - D) UI responsiveness
   - **Answer:** B.
2. True/False: Capacity planning should include headroom for spikes.
   - **Answer:** True.
3. Multiple Choice: Which tool helps find CPU hotspots?
   - A) profiler ✅
   - B) formatter
   - C) linter
   - D) debugger
   - **Answer:** A.
4. Short Answer: Why measure before optimizing?
   - **Answer:** to avoid wasting effort on non-critical issues.
5. Debugging: A service is slow only during peak traffic. What is likely needed?
   - **Answer:** capacity planning or scaling improvements.

## Assignment
### Objectives
- Document performance tuning and capacity planning.
- Create a simple load test and profiling plan.
- Define performance goals.

### Requirements
- Create `lesson-6-7/performance.md` and `lesson-6-7/README.md`.
- Add a load test plan and tuning checklist.
- Include capacity planning assumptions.

### Acceptance Criteria
- Performance goals are defined.
- Load testing and profiling guidance are documented.
- Capacity plans are realistic.

### Marking Rubric
- Performance clarity: 40%
- Planning quality: 30%
- Documentation: 30%

### Submission Instructions
- Push `lesson-6-7` folder with docs.

## GitHub Project
### Repository Name
`on2code-performance`

### Folder Structure
```
lesson-6-7/
  performance.md
  README.md
```

### Expected Output
A documented performance and capacity planning guide.

### Branch Strategy
- `lesson-6-7`

### Pull Request Instructions
- Title: `Add performance tuning lesson`
- Description: `Document backend performance and capacity planning.`

## Automated Tests
### Requirements
- Validate performance documentation.
- Confirm capacity planning assumptions are present.
- Ensure the load test plan is actionable.

### Expected Results
- Complete performance docs.
- Clear capacity guidance.

## Lesson Summary
Performance tuning and capacity planning keep backend systems fast and reliable under load.

## Next Lesson Preview
Lesson 6.8 covers team communication, design docs, and collaboration.

---

# Lesson 6.8: Team Communication, Design Docs, and Collaboration

## Lesson Overview
This lesson teaches how backend engineers communicate effectively, write design documents, and collaborate with teammates.

## Learning Objectives
- Write technical design docs for backend features.
- Share architecture and design decisions clearly.
- Collaborate effectively with reviewers, product, and operations.
- Use structured communication for technical work.

## Prerequisites
- Lesson 6.7 completed.
- Familiarity with documentation and team workflows.

## Real-world Motivation
Backend engineering is a team sport. Clear communication and design documentation reduce misunderstandings and improve delivery.

## Student Notes
### Design docs
Capture problem context, proposed design, alternatives, and tradeoffs.

### Collaboration
Use shared documents, meetings, and asynchronous reviews.

### Practical advice
- write concise summaries.
- include diagrams and examples.
- ask for feedback early.

## Instructor Video Outline
1. Explain the purpose of design docs.
2. Show a template for backend design proposals.
3. Discuss collaboration with product and ops.
4. Emphasize clear communication in reviews.
5. Recap effective teamwork practices.

## Live Coding Demonstration
This lesson is conceptual, but provide a sample design doc structure and collaboration checklist.

## Practice Exercises
1. Draft a design doc outline for a new API feature.
2. Explain how to gather feedback from stakeholders.
3. Describe how to document tradeoffs.
4. Create a communication checklist for a feature launch.
5. Identify when to escalate design questions.

## Coding Challenges
1. Write a short design doc for a backend endpoint.
2. Include a problem statement, proposed solution, and alternatives.
3. Add a diagram or sequence flow.
4. Describe the review process for the design.
5. Explain how to incorporate feedback into the design.

## Quiz
1. Multiple Choice: What should a design doc include?
   - A) only code
   - B) problem, solution, and tradeoffs ✅
   - C) personal opinions only
   - D) unrelated requirements
   - **Answer:** B.
2. True/False: Diagrams are useful in design docs.
   - **Answer:** True.
3. Multiple Choice: What is a key benefit of early feedback?
   - A) slower delivery
   - B) catching issues before implementation ✅
   - C) more meetings
   - D) less documentation
   - **Answer:** B.
4. Short Answer: Why write a concise summary in a design doc?
   - **Answer:** so reviewers understand the proposal quickly.
5. Debugging: Your design doc lacks alternatives. What is missing?
   - **Answer:** evaluation of tradeoffs and different approaches.

## Assignment
### Objectives
- Create a backend design document.
- Practice communicating technical decisions.
- Prepare collaboration notes for reviewers.

### Requirements
- Create `lesson-6-8/design-doc.md` and `lesson-6-8/README.md`.
- Add a feature proposal with alternatives and tradeoffs.
- Include a diagram or flow.

### Acceptance Criteria
- Design doc is structured and clear.
- Alternatives and tradeoffs are documented.
- Collaboration guidance is included.

### Marking Rubric
- Design quality: 40%
- Communication clarity: 30%
- Collaboration planning: 30%

### Submission Instructions
- Push `lesson-6-8` folder with docs.

## GitHub Project
### Repository Name
`on2code-design-docs`

### Folder Structure
```
lesson-6-8/
  design-doc.md
  README.md
```

### Expected Output
A polished backend design proposal and collaboration notes.

### Branch Strategy
- `lesson-6-8`

### Pull Request Instructions
- Title: `Add design doc lesson`
- Description: `Document backend feature design and collaboration practices.`

## Automated Tests
### Requirements
- Validate the design doc structure.
- Confirm tradeoffs are explained.
- Ensure collaboration guidance is present.

### Expected Results
- Complete design documentation.
- Clear communication guidance.

## Lesson Summary
Effective backend teams communicate clearly, document design decisions, and collaborate intentionally.

## Next Lesson Preview
Lesson 6.9 covers backend security reviews and dependency audits.

---

# Lesson 6.9: Backend Security Reviews and Dependency Audits

## Lesson Overview
This lesson teaches how to perform security reviews of backend code and audit dependencies for production readiness.

## Learning Objectives
- Review backend security risks in code and configuration.
- Audit dependencies for vulnerabilities and license issues.
- Use security tools and checklists.
- Incorporate security findings into the development workflow.

## Prerequisites
- Lesson 6.8 completed.
- Familiarity with backend architecture and dependencies.

## Real-world Motivation
Security reviews catch issues before they reach production and help maintain trust.

## Student Notes
### Security reviews
Examine code paths for auth, validation, and data exposure.

### Dependency audits
Scan libraries for known vulnerabilities and update them safely.

### Practical advice
- use automated tools and manual review.
- validate third-party libraries before adoption.
- keep a list of approved dependencies.

## Instructor Video Outline
1. Explain the purpose of security reviews.
2. Show a sample code review checklist with security items.
3. Demonstrate a dependency audit workflow.
4. Discuss how to handle discovered vulnerabilities.
5. Recap security review best practices.

## Live Coding Demonstration
This lesson is conceptual, but show sample security checklist items and audit tool commands.

## Practice Exercises
1. Create a code review checklist for security.
2. Identify high-risk areas in backend code.
3. Run a dependency audit tool described in documentation.
4. Document how to respond to a reported vulnerability.
5. List common secure coding practices for APIs.

## Coding Challenges
1. Draft a security review checklist for backend PRs.
2. Create a dependency audit plan and toolchain.
3. Describe how to approve a new third-party library.
4. Explain how to respond to a CVE in production dependencies.
5. Add security review steps to the CI/CD process.

## Quiz
1. Multiple Choice: What should a security review include?
   - A) only syntax checks
   - B) auth, validation, and data exposure ✅
   - C) only UI design
   - D) only commit messages
   - **Answer:** B.
2. True/False: Dependencies should be audited regularly.
   - **Answer:** True.
3. Multiple Choice: Which is a common security risk in APIs?
   - A) rate limiting
   - B) input validation bypass ✅
   - C) caching headers
   - D) logging format
   - **Answer:** B.
4. Short Answer: What is a CVE?
   - **Answer:** a publicly disclosed vulnerability identifier.
5. Debugging: A vulnerability is found in a dependency. What should you do first?
   - **Answer:** assess impact and plan a fix or upgrade.

## Assignment
### Objectives
- Document security review and dependency audit processes.
- Prepare a checklist for backend security.
- Incorporate security into development workflows.

### Requirements
- Create `lesson-6-9/security-review.md` and `lesson-6-9/dependency-audit.md`.
- Add `lesson-6-9/README.md` summarizing the workflow.
- Include sample tools and checklist items.

### Acceptance Criteria
- Security review process is documented.
- Dependency audit guidance is clear.
- Practical checklists are included.

### Marking Rubric
- Security clarity: 40%
- Audit guidance: 30%
- Practicality: 30%

### Submission Instructions
- Push `lesson-6-9` folder with docs.

## GitHub Project
### Repository Name
`on2code-security-audit`

### Folder Structure
```
lesson-6-9/
  security-review.md
  dependency-audit.md
  README.md
```

### Expected Output
A documented security review and audit process.

### Branch Strategy
- `lesson-6-9`

### Pull Request Instructions
- Title: `Add backend security review lesson`
- Description: `Document security checklist and dependency audits.`

## Automated Tests
### Requirements
- Validate security documentation.
- Confirm audit workflow is present.
- Ensure checklist items are actionable.

### Expected Results
- Complete security review docs.
- Practical audit guidance.

## Lesson Summary
Backend security reviews and dependency audits help prevent vulnerabilities and maintain trust.

## Next Lesson Preview
Lesson 6.10 covers career readiness for backend engineers.

---

# Lesson 6.10: Career Readiness for Backend Engineers

## Lesson Overview
This lesson prepares students for backend engineering roles by teaching professional skills, interviewing readiness, and long-term career growth.

## Learning Objectives
- Describe the skills needed for backend engineering roles.
- Prepare engineering work samples and portfolios.
- Practice technical communication and interviews.
- Understand continuous learning and growth in backend careers.

## Prerequisites
- Lesson 6.9 completed.
- Familiarity with backend engineering discipline.

## Real-world Motivation
Career readiness helps students transition from learning to professional backend roles and continue growing sustainably.

## Student Notes
### Skills
Backend engineers need coding, design, testing, debugging, and communication skills.

### Work samples
Build a portfolio of projects, docs, and code reviews.

### Interview readiness
Practice system design, coding problems, and behavior questions.

### Growth
Stay current with new tools, cloud patterns, and backend practices.

### Practical advice
- keep your portfolio focused on backend systems.
- document your contributions clearly.
- learn from feedback and iterate.

## Instructor Video Outline
1. Describe backend engineering career paths.
2. Show examples of strong work samples.
3. Discuss interview preparation strategies.
4. Emphasize continuous learning and mentorship.
5. Recap career readiness tips.

## Practice Exercises
1. List five backend engineering skills employers look for.
2. Create a portfolio summary for a backend project.
3. Practice explaining a system design decision.
4. Write answers to common backend interview questions.
5. Identify one technical area to improve next.

## Coding Challenges
1. Build a polished README for a backend project.
2. Document a project architecture and your role.
3. Prepare a sample answer for a backend design interview.
4. List relevant tools and frameworks in your skill set.
5. Create a learning plan for the next 6 months.

## Quiz
1. Multiple Choice: Which is an important backend interview topic?
   - A) CSS styling
   - B) API design ✅
   - C) color theory
   - D) video editing
   - **Answer:** B.
2. True/False: A backend portfolio should include production-ready docs.
   - **Answer:** True.
3. Multiple Choice: What is a good interview preparation activity?
   - A) reading commit messages
   - B) practicing system design ✅
   - C) reviewing unrelated languages
   - D) ignoring feedback
   - **Answer:** B.
4. Short Answer: Why document your backend projects clearly?
   - **Answer:** so others can understand your work and impact.
5. Debugging: You cannot explain a project decision. What is the problem?
   - **Answer:** you need better reflection and documentation on your work.

## Assignment
### Objectives
- Prepare a backend engineering portfolio asset.
- Practice professional communication and interview readiness.
- Plan continuous growth.

### Requirements
- Create `lesson-6-10/career-readiness.md` and `lesson-6-10/README.md`.
- Add a project summary and skills inventory.
- Include interview preparation notes.

### Acceptance Criteria
- Career readiness guidance is clear.
- Portfolio and interview notes are practical.
- Growth plan is included.

### Marking Rubric
- Professional clarity: 40%
- Practical guidance: 30%
- Growth planning: 30%

### Submission Instructions
- Push `lesson-6-10` folder with docs.

## GitHub Project
### Repository Name
`on2code-career-readiness`

### Folder Structure
```
lesson-6-10/
  career-readiness.md
  README.md
```

### Expected Output
A backend career readiness package.

### Branch Strategy
- `lesson-6-10`

### Pull Request Instructions
- Title: `Add career readiness lesson`
- Description: `Prepare backend engineers for professional roles.`

## Automated Tests
### Requirements
- Validate career readiness documentation.
- Confirm portfolio guidance exists.
- Ensure growth plan is present.

### Expected Results
- Complete career guidance.
- Practical readiness advice.

## Lesson Summary
Backend engineering success requires not only technical skills but also professional communication, documentation, and continuous learning.

## Module Conclusion
Module 6 prepares students to operate as production-ready backend engineers and to advance their careers with confidence.
