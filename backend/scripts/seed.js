import dotenv from 'dotenv';
import { connectDB, getDB } from '../db/connection.js';
import { isConnected, generateCompleteEdges } from '../algorithms/tsp.js';

dotenv.config();

const DIFFICULTY_CONFIG = {
  easy: { minNodes: 5, maxNodes: 5, minWeight: 1, maxWeight: 10 },
  medium: { minNodes: 7, maxNodes: 7, minWeight: 1, maxWeight: 15 },
  hard: { minNodes: 9, maxNodes: 9, minWeight: 1, maxWeight: 15 },
};

const BATCH_CONFIG = [
  { algorithmType: 'mst', difficulty: 'easy', count: 200 },
  { algorithmType: 'mst', difficulty: 'medium', count: 200 },
  { algorithmType: 'mst', difficulty: 'hard', count: 100 },
  { algorithmType: 'tsp', difficulty: 'easy', count: 200 },
  { algorithmType: 'tsp', difficulty: 'medium', count: 200 },
  { algorithmType: 'tsp', difficulty: 'hard', count: 100 },
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNodes(count) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: count }, (_, i) => letters[i]);
}

function generateEdges(nodes, minWeight, maxWeight) {
  const edges = [];

  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      from: nodes[i],
      to: nodes[i + 1],
      weight: randomInt(minWeight, maxWeight),
    });
  }

  const extraEdges = randomInt(nodes.length - 1, nodes.length * 2);
  let attempts = 0;
  while (edges.length < extraEdges + nodes.length - 1 && attempts < 100) {
    attempts++;
    const from = nodes[randomInt(0, nodes.length - 1)];
    const to = nodes[randomInt(0, nodes.length - 1)];
    if (from === to) continue;

    const exists = edges.some(
      (e) =>
        (e.from === from && e.to === to) ||
        (e.from === to && e.to === from)
    );
    if (!exists) {
      edges.push({ from, to, weight: randomInt(minWeight, maxWeight) });
    }
  }

  return edges;
}

function generatePuzzle(algorithmType, difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty];
  let puzzle = null;
  let attempts = 0;

  while (!puzzle && attempts < 50) {
    attempts++;
    const nodeCount = randomInt(config.minNodes, config.maxNodes);
    const nodes = generateNodes(nodeCount);

    const edges =
      algorithmType === 'tsp'
        ? generateCompleteEdges(nodes, config.minWeight, config.maxWeight)
        : generateEdges(nodes, config.minWeight, config.maxWeight);

    if (!isConnected(nodes, edges)) continue;

    puzzle = {
      algorithmType,
      difficulty,
      directed: false,
      nodes,
      edges,
      startNode: nodes[0],
      endNode: null,
      attemptCount: 0,
      correctCount: 0,
    };
  }

  if (!puzzle)
    throw new Error(
      `Failed to generate valid ${algorithmType} ${difficulty} puzzle after 50 attempts`
    );
  return puzzle;
}

function generateBatch(algorithmType, difficulty, count) {
  const puzzles = [];
  for (let i = 0; i < count; i++) {
    puzzles.push(generatePuzzle(algorithmType, difficulty));
  }
  console.log(`Generated ${count} ${algorithmType} ${difficulty} puzzles`);
  return puzzles;
}

async function seedDatabase() {
  try {
    await connectDB();
    const db = getDB();
    const collection = db.collection('puzzles');

    await collection.deleteMany({});

    const allPuzzles = [];
    for (const batch of BATCH_CONFIG) {
      const puzzles = generateBatch(batch.algorithmType, batch.difficulty, batch.count);
      allPuzzles.push(...puzzles);
    }

    await collection.insertMany(allPuzzles);
    console.log(`Successfully seeded ${allPuzzles.length} puzzles`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();