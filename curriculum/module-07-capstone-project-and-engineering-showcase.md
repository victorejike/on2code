# Module 7: Capstone Project and Engineering Showcase

## Module Introduction
Module 7 gives students a chance to integrate everything they have learned by designing, building, documenting, and presenting a real backend engineering project.

## Learning Outcomes
By the end of this module, students will be able to:
- Plan and execute a full backend project from requirements through launch.
- Apply architecture, testing, deployment, and production practices in a single project.
- Produce polished technical documentation, design artifacts, and project demos.
- Present backend engineering work clearly to stakeholders.
- Reflect on lessons learned and plan future improvements.

## Lessons
1. Capstone Planning and Requirements Definition
2. Architecture Design and System Decomposition
3. Implementation Strategy and Iterative Delivery
4. Testing, Validation, and Quality Gates
5. Deployment, Monitoring, and Production Readiness
6. Documentation, Demo, and Project Presentation
7. Project Retrospective and Continuous Improvement

## Practice Labs
- Lab 1: Define product requirements and acceptance criteria.
- Lab 2: Build a project architecture document with APIs, data, and operations.
- Lab 3: Prepare a demo and launch presentation.

## Module Quiz
A 20-question quiz covering project planning, architecture, testing, deployment, and post-launch review.

## Module Assignment
Complete a capstone backend project that demonstrates technical breadth, quality, production readiness, and clear communication.

## Mini Project
Build a `backend-capstone-showcase` package with:
- a project plan and requirements document
- architecture and data flow diagrams
- implementation milestones and testing strategy
- deployment and monitoring plan
- final project demo and retrospective write-up

## Module Review
This final module brings together all course concepts in a practical project, ensuring students can build, launch, and explain backend systems at a professional level.

## Resources
- project planning templates
- architecture and system design guides
- deployment and production readiness checklists
- demo and presentation tips
- retrospective and continuous improvement frameworks

## Knowledge Check
Students should be able to:
- explain their capstone system design and tradeoffs.
- demonstrate how tests protect the project.
- describe deployment readiness and monitoring.
- summarize lessons learned and next steps.

## Completion Criteria
- Capstone plan and implementation completed.
- Production readiness documentation submitted.
- Presentation/demo delivered.
- Retrospective written and reviewed.

---

# Lesson 7.1: Capstone Planning and Requirements Definition

## Lesson Overview
This lesson teaches how to gather and define requirements, scope work, and plan delivery for a backend capstone project.

## Learning Objectives
- Write clear product requirements and acceptance criteria.
- Break a project into milestones and tasks.
- Estimate work and manage scope.
- Align stakeholder goals with technical work.

## Prerequisites
- Modules 1 through 6 completed.
- Familiarity with backend concepts and project planning.

## Real-world Motivation
Successful backend projects begin with clear requirements and realistic, prioritized plans.

## Student Notes
### Requirements
Describe what the system must do, who it serves, and how success is measured.

### Scope definition
Choose a project scope that is ambitious but achievable.

### Milestones
Group work into manageable phases with delivery checkpoints.

### Practical advice
- keep goals concrete.
- define success metrics.
- avoid over-scoping the first iteration.

## Instructor Video Outline
1. Explain the importance of planning.
2. Show a sample requirements document.
3. Demonstrate how to prioritize features.
4. Talk through milestone planning.
5. Recap planning best practices.

## Live Coding Demonstration
This lesson is conceptual with a focus on writing planning artifacts.

## Practice Exercises
1. Draft a requirements document for a backend project.
2. Define acceptance criteria for two key features.
3. Break the project into three milestones.
4. Estimate time for each milestone.
5. Identify critical risks and mitigation plans.

## Coding Challenges
1. Create a project backlog with tasks and priorities.
2. Write acceptance criteria for the core API.
3. Create a timeline for the project.
4. Define a minimum viable product (MVP) scope.
5. Review the plan for technical dependencies.

## Quiz
1. Multiple Choice: What is the primary goal of requirements definition?
   - A) to write code faster
   - B) to set clear expectations ✅
   - C) to choose a tech stack
   - D) to create documentation only
   - **Answer:** B.
2. True/False: MVP scope should be as broad as possible.
   - **Answer:** False.
3. Multiple Choice: What should acceptance criteria describe?
   - A) design patterns
   - B) user-visible behavior ✅
   - C) code style
   - D) deployment steps
   - **Answer:** B.
4. Short Answer: Why define milestones?
   - **Answer:** to structure delivery and track progress.
5. Debugging: The project plan is too vague. What is the risk?
   - **Answer:** misaligned expectations and missed goals.

## Assignment
### Objectives
- Define a capstone project with clear requirements.
- Create a plan that is feasible and measurable.
- Identify key success criteria.

### Requirements
- Create `lesson-7-1/project-plan.md`.
- Add `lesson-7-1/requirements.md` with acceptance criteria.
- Include a milestone schedule.

### Acceptance Criteria
- Requirements are clear and actionable.
- Milestones are realistic.
- Success metrics are defined.

### Marking Rubric
- Planning clarity: 40%
- Feasibility: 30%
- Success criteria: 30%

### Submission Instructions
- Push `lesson-7-1` folder with docs.

## GitHub Project
### Repository Name
`on2code-capstone-planning`

### Folder Structure
```
lesson-7-1/
  project-plan.md
  requirements.md
```

### Expected Output
A complete capstone project plan.

### Branch Strategy
- `lesson-7-1`

### Pull Request Instructions
- Title: `Add capstone planning lesson`
- Description: `Document capstone requirements and milestones.`

## Automated Tests
### Requirements
- Validate plan completeness.
- Confirm milestone structure.
- Ensure acceptance criteria are present.

### Expected Results
- Clear project plan.
- Achievable scope.

## Lesson Summary
Planning is the first step to delivering a successful backend capstone.

## Next Lesson Preview
Lesson 7.2 covers architecture design and system decomposition.

---

# Lesson 7.2: Architecture Design and System Decomposition

## Lesson Overview
This lesson teaches how to design the backend system architecture, define APIs, and decompose the project into component services.

## Learning Objectives
- Model system components and data flow.
- Define service boundaries and integration points.
- Create API contracts and data schemas.
- Choose appropriate architecture patterns for the project.

## Prerequisites
- Lesson 7.1 completed.
- Familiarity with project requirements.

## Real-world Motivation
A strong architecture helps teams build maintainable, scalable backend systems.

## Student Notes
### System decomposition
Break the solution into clear modules and services.

### API design
Define endpoints, request/response shapes, and error behavior.

### Data flow
Document how data moves through the system.

### Practical advice
- favor simplicity.
- keep APIs consistent.
- align design with project goals.

## Instructor Video Outline
1. Explain system decomposition.
2. Show a sample architecture diagram.
3. Walk through API design tradeoffs.
4. Discuss component interactions.
5. Recap design guidance.

## Live Coding Demonstration
This lesson is conceptual; present architecture sketches and API examples.

## Practice Exercises
1. Draw the main components of the backend.
2. Define the core API endpoints.
3. Describe how data flows between components.
4. Choose a pattern for service responsibilities.
5. Identify where to place validation and business logic.

## Coding Challenges
1. Write an architecture summary for the capstone.
2. Create API contract documentation.
3. Define data schemas for the main entities.
4. Document service boundaries and responsibilities.
5. Evaluate alternatives for a key design decision.

## Quiz
1. Multiple Choice: What is the purpose of system decomposition?
   - A) to make code shorter
   - B) to separate responsibilities ✅
   - C) to reduce testing
   - D) to avoid planning
   - **Answer:** B.
2. True/False: APIs should have consistent request patterns.
   - **Answer:** True.
3. Multiple Choice: Which helps describe data flow?
   - A) code comments
   - B) sequence diagrams ✅
   - C) font choices
   - D) commit messages
   - **Answer:** B.
4. Short Answer: Why define service boundaries?
   - **Answer:** to reduce coupling and clarify responsibilities.
5. Debugging: The architecture is too complex. What should you do?
   - **Answer:** simplify and eliminate unnecessary components.

## Assignment
### Objectives
- Document the capstone architecture.
- Define APIs and component interactions.
- Create data flow diagrams or summaries.

### Requirements
- Create `lesson-7-2/architecture.md`.
- Add `lesson-7-2/api-contracts.md`.
- Include a service decomposition summary.

### Acceptance Criteria
- Architecture is clear and aligned with requirements.
- API contracts are defined.
- Component responsibilities are documented.

### Marking Rubric
- Design clarity: 40%
- API completeness: 30%
- Decomposition quality: 30%

### Submission Instructions
- Push `lesson-7-2` folder with docs.

## GitHub Project
### Repository Name
`on2code-capstone-design`

### Folder Structure
```
lesson-7-2/
  architecture.md
  api-contracts.md
```

### Expected Output
A documented capstone architecture and API plan.

### Branch Strategy
- `lesson-7-2`

### Pull Request Instructions
- Title: `Add capstone architecture lesson`
- Description: `Document capstone design and APIs.`

## Automated Tests
### Requirements
- Validate architecture and API documentation.
- Confirm component boundaries.
- Ensure design is aligned with requirements.

### Expected Results
- Strong project architecture.
- Clear API definitions.

## Lesson Summary
Good architecture sets the foundation for a successful backend capstone.

## Next Lesson Preview
Lesson 7.3 covers implementation strategy and iterative delivery.

---

# Lesson 7.3: Implementation Strategy and Iterative Delivery

## Lesson Overview
This lesson teaches how to execute the capstone through iterations, manage technical debt, and deliver working increments.

## Learning Objectives
- Break work into development iterations.
- Prioritize features for incremental delivery.
- Track progress and adapt plans.
- Balance speed, quality, and scope.

## Prerequisites
- Lesson 7.2 completed.
- Familiarity with the project architecture.

## Real-world Motivation
Iterative delivery helps teams build value quickly while keeping the project manageable.

## Student Notes
### Iteration planning
Choose the next smallest deliverable slice.

### Delivery
Build working increments that can be reviewed.

### Technical debt
Track and manage debt deliberately.

### Practical advice
- ship the simplest thing that works.
- get feedback early.
- refactor regularly.

## Instructor Video Outline
1. Explain iteration planning.
2. Show a sample implementation roadmap.
3. Discuss managing technical debt.
4. Demonstrate reporting progress.
5. Recap delivery best practices.

## Live Coding Demonstration
This lesson is conceptual; show a roadmap and iteration plan.

## Practice Exercises
1. Define the first three development iterations.
2. Prioritize features for the MVP.
3. Identify technical debt items and how to address them.
4. Describe how to collect feedback on each increment.
5. Track progress with simple metrics.

## Coding Challenges
1. Create an implementation roadmap.
2. Write a sprint plan for the first iteration.
3. Document tradeoffs between speed and quality.
4. Define a review checkpoint for each increment.
5. Describe a rollback or rollback trigger for the project.

## Quiz
1. Multiple Choice: What is a key benefit of iterative delivery?
   - A) final delivery only
   - B) early feedback ✅
   - C) no planning
   - D) unlimited scope
   - **Answer:** B.
2. True/False: Technical debt should be ignored until the end.
   - **Answer:** False.
3. Multiple Choice: What should each iteration deliver?
   - A) a working increment ✅
   - B) only documentation
   - C) only tests
   - D) only planning notes
   - **Answer:** A.
4. Short Answer: Why prioritize MVP features?
   - **Answer:** to ensure the first deliverable provides value.
5. Debugging: The roadmap is too rigid. What is the risk?
   - **Answer:** it won't adapt to feedback or problems.

## Assignment
### Objectives
- Define an implementation approach for the capstone.
- Plan iterations and progress tracking.
- Manage technical debt.

### Requirements
- Create `lesson-7-3/implementation-plan.md`.
- Add `lesson-7-3/iteration-roadmap.md`.
- Include a technical debt log.

### Acceptance Criteria
- Implementation strategy is clearly documented.
- Iterations are practical.
- Debt items are identified and tracked.

### Marking Rubric
- Strategy clarity: 40%
- Roadmap practicality: 30%
- Debt management: 30%

### Submission Instructions
- Push `lesson-7-3` folder with docs.

## GitHub Project
### Repository Name
`on2code-capstone-implementation`

### Folder Structure
```
lesson-7-3/
  implementation-plan.md
  iteration-roadmap.md
```

### Expected Output
A documented capstone implementation strategy.

### Branch Strategy
- `lesson-7-3`

### Pull Request Instructions
- Title: `Add implementation lesson`
- Description: `Document the capstone implementation roadmap.`

## Automated Tests
### Requirements
- Validate implementation planning.
- Confirm iteration delivery structure.
- Ensure debt is tracked.

### Expected Results
- Clear execution plan.
- Manageable project delivery.

## Lesson Summary
An implementation strategy helps the team deliver the capstone iteratively and reliably.

## Next Lesson Preview
Lesson 7.4 covers testing, validation, and quality gates.

---

# Lesson 7.4: Testing, Validation, and Quality Gates

## Lesson Overview
This lesson teaches how to apply tests, validation, and quality gates to the capstone project to ensure reliability and correctness.

## Learning Objectives
- Define test coverage for the capstone.
- Use unit, integration, and end-to-end tests.
- Set quality gates in the workflow.
- Validate the project against requirements.

## Prerequisites
- Lesson 7.3 completed.
- Familiarity with the project codebase.

## Real-world Motivation
Quality gates catch mistakes before code reaches production and increase confidence in the system.

## Student Notes
### Testing strategy
Plan tests for core behavior, edge cases, and integrations.

### Validation
Confirm the system meets requirements and acceptance criteria.

### Quality gates
Automate checks for code quality, tests, and security.

### Practical advice
- test the behavior, not implementation.
- keep tests fast and reliable.
- use quality gates as safety nets.

## Instructor Video Outline
1. Explain the role of testing in a project.
2. Show sample test categories.
3. Demonstrate quality gate examples.
4. Discuss validating requirements.
5. Recap testing best practices.

## Live Coding Demonstration
This lesson includes examples of test plans and CI quality checks.

## Practice Exercises
1. Create a test plan for the capstone.
2. List core integration tests to write.
3. Identify quality gates for CI/CD.
4. Describe acceptance criteria validation.
5. Explain how to handle flaky tests.

## Coding Challenges
1. Write a test plan document.
2. Define a test strategy for the main APIs.
3. Describe how to validate a deployed feature.
4. Create a quality gate checklist.
5. Explain how to keep tests maintainable.

## Quiz
1. Multiple Choice: What is a quality gate?
   - A) a production server
   - B) an automated check before merge ✅
   - C) a user interface
   - D) a database backup
   - **Answer:** B.
2. True/False: Integration tests only matter after deployment.
   - **Answer:** False.
3. Multiple Choice: Which test type checks multiple components together?
   - A) unit test
   - B) integration test ✅
   - C) formatting test
   - D) syntax check
   - **Answer:** B.
4. Short Answer: Why validate against acceptance criteria?
   - **Answer:** to ensure the project solves the intended problem.
5. Debugging: A test suite is too slow. What should you do?
   - **Answer:** optimize tests and split fast/slow suites.

## Assignment
### Objectives
- Define a robust testing and validation strategy.
- Build quality gates into the capstone workflow.
- Ensure requirements are satisfied.

### Requirements
- Create `lesson-7-4/test-plan.md`.
- Add `lesson-7-4/quality-gates.md`.
- Include acceptance validation steps.

### Acceptance Criteria
- Test plan is specific and actionable.
- Quality gates are defined.
- Validation is aligned with requirements.

### Marking Rubric
- Test planning: 40%
- Quality gate detail: 30%
- Requirement validation: 30%

### Submission Instructions
- Push `lesson-7-4` folder with docs.

## GitHub Project
### Repository Name
`on2code-capstone-testing`

### Folder Structure
```
lesson-7-4/
  test-plan.md
  quality-gates.md
```

### Expected Output
A documented testing strategy and quality gates.

### Branch Strategy
- `lesson-7-4`

### Pull Request Instructions
- Title: `Add capstone testing lesson`
- Description: `Document tests, validation, and quality gates.`

## Automated Tests
### Requirements
- Validate the test plan and quality gate docs.
- Confirm acceptance validation steps.
- Ensure tests are aligned with project goals.

### Expected Results
- Comprehensive quality strategy.
- Testable project requirements.

## Lesson Summary
Testing and validation ensure the capstone is reliable and meets expectations.

## Next Lesson Preview
Lesson 7.5 covers deployment, monitoring, and production readiness.

---

# Lesson 7.5: Deployment, Monitoring, and Production Readiness

## Lesson Overview
This lesson teaches how to deploy the capstone project, monitor it in production, and verify it is ready for release.

## Learning Objectives
- Deploy the project with repeatable processes.
- Monitor health, performance, and errors.
- Define production readiness criteria.
- Plan support and rollout.

## Prerequisites
- Lesson 7.4 completed.
- Familiarity with deployment and monitoring.

## Real-world Motivation
A production-ready backend is deployed safely, monitored continuously, and supported with clear operational signals.

## Student Notes
### Deployment
Use repeatable scripts or CI to deploy the system.

### Monitoring
Track uptime, errors, and performance metrics.

### Readiness
Confirm the project is stable, secure, and observable.

### Practical advice
- automate deployments.
- use health checks.
- define rollback criteria.

## Instructor Video Outline
1. Explain deployment automation.
2. Show a monitoring dashboard example.
3. Describe readiness checks.
4. Discuss rollout and support plans.
5. Recap production readiness practices.

## Live Coding Demonstration
This lesson is conceptual; present deployment and monitoring plans.

## Practice Exercises
1. Draft a deployment checklist.
2. Define key production metrics.
3. Create a readiness checklist.
4. Describe monitoring alerts and responses.
5. Explain how to validate deployment success.

## Coding Challenges
1. Create a deployment plan document.
2. Define monitoring and alerting requirements.
3. Write a production readiness checklist.
4. Plan a safe rollout strategy.
5. Describe how to use health checks in production.

## Quiz
1. Multiple Choice: What is production readiness?
   - A) having a working README
   - B) being safe and observable in production ✅
   - C) using only local tests
   - D) writing many features
   - **Answer:** B.
2. True/False: Monitoring should be in place before launch.
   - **Answer:** True.
3. Multiple Choice: Which is an important production metric?
   - A) code formatting
   - B) error rate ✅
   - C) branch names
   - D) font size
   - **Answer:** B.
4. Short Answer: Why define rollback criteria?
   - **Answer:** to safely recover from bad deployments.
5. Debugging: A deployment succeeded but users report issues. What should you do first?
   - **Answer:** check monitoring and logs for errors.

## Assignment
### Objectives
- Document deployment and monitoring for the capstone.
- Define production readiness and rollout criteria.
- Plan support and alerting.

### Requirements
- Create `lesson-7-5/deployment-plan.md`.
- Add `lesson-7-5/monitoring.md`.
- Include a production readiness checklist.

### Acceptance Criteria
- Deployment plan is repeatable.
- Monitoring is defined.
- Readiness criteria are explicit.

### Marking Rubric
- Deployment clarity: 40%
- Monitoring completeness: 30%
- Readiness detail: 30%

### Submission Instructions
- Push `lesson-7-5` folder with docs.

## GitHub Project
### Repository Name
`on2code-capstone-ops`

### Folder Structure
```
lesson-7-5/
  deployment-plan.md
  monitoring.md
```

## Lesson 7.6: Documentation, Demo, and Project Presentation

## Lesson Overview
This lesson teaches how to document the capstone, build a demo, and present the project effectively.

## Learning Objectives
- Prepare clear project documentation and runbooks.
- Build a demo that showcases the system's value.
- Present the backend architecture and implementation decisions.
- Communicate results to stakeholders.

## Prerequisites
- Lesson 7.5 completed.
- Familiarity with the completed capstone project.

## Real-world Motivation
A strong demo and documentation make the project's value clear to technical and non-technical audiences.

## Student Notes
### Documentation
Capture the project goals, architecture, APIs, and how to run the system.

### Demo
Show the core workflows and highlight the backend capabilities.

### Presentation
Explain design choices, tradeoffs, and lessons learned.

### Practical advice
- keep documentation simple.
- make the demo repeatable.
- focus on what the project solves.

## Instructor Video Outline
1. Explain the value of documentation and demos.
2. Show a demo script.
3. Discuss presentation structure.
4. Highlight key project decisions.
5. Recap communication best practices.

## Live Coding Demonstration
This lesson is conceptual; present a demo outline and sample documentation.

## Practice Exercises
1. Write the README for the capstone project.
2. Create a demo script for showing the system.
3. Prepare a short presentation summary.
4. Identify the project's value propositions.
5. Note areas for future improvement.

## Coding Challenges
1. Document the project's setup and usage.
2. Create a demo plan that covers key features.
3. Write a presentation outline for stakeholders.
4. Summarize the architecture and implementation tradeoffs.
5. Explain how to support the project after launch.

## Quiz
1. Multiple Choice: What is the purpose of a project demo?
   - A) to show code style
   - B) to highlight working functionality ✅
   - C) to test deployment only
   - D) to practice commits
   - **Answer:** B.
2. True/False: Documentation should be hard to follow.
   - **Answer:** False.
3. Multiple Choice: What should a presentation include?
   - A) feature list and impact ✅
   - B) only code snippets
   - C) unrelated ideas
   - D) internal notes
   - **Answer:** A.
4. Short Answer: Why make the demo repeatable?
   - **Answer:** so others can review and validate the system.
5. Debugging: Your documentation omits setup steps. What is the risk?
   - **Answer:** others cannot run the project.

## Assignment
### Objectives
- Create polished project documentation.
- Prepare a demo plan and presentation summary.
- Communicate project value clearly.

### Requirements
- Create `lesson-7-6/documentation.md`.
- Add `lesson-7-6/demo-plan.md`.
- Include a presentation summary.

### Acceptance Criteria
- Documentation is clear and complete.
- Demo plan covers core features.
- Presentation summary communicates value.

### Marking Rubric
- Documentation quality: 40%
- Demo clarity: 30%
- Presentation impact: 30%

### Submission Instructions
- Push `lesson-7-6` folder with docs.

## GitHub Project
### Repository Name
`on2code-capstone-demo`

### Folder Structure
```
lesson-7-6/
  documentation.md
  demo-plan.md
``` 

## Lesson 7.7: Project Retrospective and Continuous Improvement

## Lesson Overview
This lesson teaches how to reflect on the project with a retrospective and plan future improvements.

## Learning Objectives
- Conduct a retrospective on project work.
- Identify successes, challenges, and improvements.
- Create a plan for next steps and ongoing learning.
- Use feedback to improve future engineering work.

## Prerequisites
- Lesson 7.6 completed.
- Familiarity with the capstone delivery process.

## Real-world Motivation
Reflection and continuous improvement help engineers grow and deliver better work over time.

## Student Notes
### Retrospective
Review what went well, what did not, and what to change.

### Continuous improvement
Track actions that make future work smoother.

### Practical advice
- be honest and blameless.
- capture concrete changes.
- celebrate wins.

## Instructor Video Outline
1. Explain retrospective goals.
2. Show a retrospective template.
3. Discuss choosing improvement actions.
4. Highlight the importance of feedback.
5. Recap continuous improvement practices.

## Live Coding Demonstration
This lesson is conceptual; present a retrospective example.

## Practice Exercises
1. List project successes and challenges.
2. Identify three improvement actions.
3. Write a lesson learned summary.
4. Describe how to apply feedback next time.
5. Define follow-up goals for the next project.

## Coding Challenges
1. Create a retrospective document.
2. Write improvement actions with owners and timelines.
3. Describe how the team can work better next time.
4. Capture what caused delays or quality issues.
5. Summarize the project in a short lessons-learned report.

## Quiz
1. Multiple Choice: What is the main goal of a retrospective?
   - A) assign blame
   - B) improve future work ✅
   - C) document code
   - D) add more features
   - **Answer:** B.
2. True/False: Retrospectives should focus on learning.
   - **Answer:** True.
3. Multiple Choice: What should improvement actions be?
   - A) vague
   - B) concrete and actionable ✅
   - C) impossible
   - D) unrelated
   - **Answer:** B.
4. Short Answer: Why celebrate wins in a retrospective?
   - **Answer:** to reinforce good practices and team morale.
5. Debugging: Your retrospective has no follow-up actions. What is missing?
   - **Answer:** a plan to improve next time.

## Assignment
### Objectives
- Conduct a capstone retrospective.
- Identify concrete improvement actions.
- Plan next steps for continuous growth.

### Requirements
- Create `lesson-7-7/retrospective.md`.
- Add `lesson-7-7/next-steps.md`.
- Include lessons learned and improvement actions.

### Acceptance Criteria
- Retrospective is honest and actionable.
- Improvement actions are specific.
- Next steps are clear.

### Marking Rubric
- Reflection quality: 40%
- Actionability: 30%
- Growth planning: 30%

### Submission Instructions
- Push `lesson-7-7` folder with docs.

## GitHub Project
### Repository Name
`on2code-capstone-retrospective`

### Folder Structure
```
lesson-7-7/
  retrospective.md
  next-steps.md
```

## Module Conclusion
This module closes the course with a capstone project that demonstrates backend engineering skills, production readiness, and professional communication.

## Final Review
Students should be able to deliver a complete backend project, explain their design, and learn from their experience.

## Next Course Steps
Encourage students to continue building backend systems, contribute to open source, and prepare for backend engineering roles.