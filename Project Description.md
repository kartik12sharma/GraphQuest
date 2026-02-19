Project Description:
GraphQuest is a competitive, browser-based puzzle game where players solve graph algorithm challenges against the clock. Players construct paths, select edges, predict traversals, and plan tours on weighted graphs. The backend validates solutions and provides immediate scoring feedback, with performance statistics tracking success rates across algorithm types.

User Personas:

Alex (CS Student — Struggling with Graph Theory): Understands Dijkstra's steps from a textbook but freezes when applying it to a novel graph. Needs active, hands-on problem-solving practice with immediate feedback rather than passive animations.
Priya (Competitive Programmer — Interview Prep): Already knows graph algorithms theoretically and is preparing for technical interviews. Thrives on competition and leaderboards. Wants to sharpen her speed and accuracy on graph problems under timed, realistic pressure.

Jordan (Bootcamp Grad — Self-Teaching CS Fundamentals): Has strong JavaScript skills but no formal CS background. Finds traditional algorithm resources abstract and intimidating. Needs a visual, game-like entry point into graph theory that gives immediate feedback and a clear sense of progress.

User Stories:

Kartik Sharma - MST & TSP Modes:

As a player, I want to solve MST challenges by selecting edges to minimize total cost, so I can learn spanning tree optimization.
As a player, I want to solve TSP challenges by creating a tour visiting all nodes, so I can learn route optimization.
As a player, I want to see my submitted solution compared to the optimal solution with my score, time, and a running statistic of how many puzzles I got correct out of total attempts, so I can track my learning progress.

Hanish Mehla - Dijkstra & BFS/DFS Modes:

As a player, I want to solve shortest path challenges by selecting weighted paths, so I can learn Dijkstra's algorithm.
As a player, I want to solve graph traversal challenges by predicting visit order, so I can understand BFS/DFS.
As a player, I want to see my submitted solution compared to the optimal solution with my score, time, and a running statistic of how many puzzles I got correct out of total attempts, so I can track my learning progress.

Division of Work:

Kartik Sharma - Full Stack Implementation:
Frontend: Interactive graph canvas for MST edge selection and TSP tour building, timer UI, score display, statistics display showing correct/total attempts
Backend: MST (Kruskal's/Prim's) algorithm implementation, TSP (Nearest Neighbor) algorithm implementation, solution validation and scoring logic, API endpoints for challenges and scores
Database: MST/TSP challenge documents, user attempt records for MST/TSP, statistics aggregation for correct/total attempts

Hanish Mehla - Full Stack Implementation:
Frontend: Interactive graph canvas for shortest path selection and BFS/DFS prediction, timer UI, score display, statistics display showing correct/total attempts
Backend: Dijkstra's algorithm implementation, BFS/DFS algorithm implementation, solution validation and scoring logic, API endpoints for challenges and scores
Database: Dijkstra/BFS/DFS challenge documents, user attempt records for pathfinding/traversal, statistics aggregation for correct/total attempts