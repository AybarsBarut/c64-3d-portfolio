import { useState, useEffect, useCallback, useRef } from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export interface Piece {
  type: TetrominoType;
  shape: number[][];
  color: string;
  x: number;
  y: number;
}

export const TETROMINOES: Record<TetrominoType, { shape: number[][]; color: string }> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#00e5ff', // Cyan
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#3877ff', // Blue
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#ff9900', // Orange
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#ffeb3b', // Yellow
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '#4caf50', // Green
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#a855f7', // Purple
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '#f43f5e', // Red
  },
};

export const COLS = 10;
export const ROWS = 20;

function createEmptyGrid(): (string | null)[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function getRandomPieceType(): TetrominoType {
  const types: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  return types[Math.floor(Math.random() * types.length)];
}

function createPiece(type: TetrominoType): Piece {
  const t = TETROMINOES[type];
  return {
    type,
    shape: t.shape.map((row) => [...row]),
    color: t.color,
    x: Math.floor((COLS - t.shape[0].length) / 2),
    y: 0,
  };
}

function rotateMatrix(matrix: number[][]): number[][] {
  const N = matrix.length;
  const result: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      result[c][N - 1 - r] = matrix[r][c];
    }
  }
  return result;
}

function checkCollision(
  piece: Piece,
  grid: (string | null)[][],
  offsetX = 0,
  offsetY = 0,
  newShape?: number[][]
): boolean {
  const shape = newShape || piece.shape;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const newX = piece.x + c + offsetX;
        const newY = piece.y + r + offsetY;
        if (newX < 0 || newX >= COLS || newY >= ROWS) {
          return true;
        }
        if (newY >= 0 && grid[newY][newX] !== null) {
          return true;
        }
      }
    }
  }
  return false;
}

export function useTetris() {
  const { activeSection, joystickAngle } = useSceneStore();
  const [grid, setGrid] = useState<(string | null)[][]>(createEmptyGrid);
  const [nextPieceType, setNextPieceType] = useState<TetrominoType>(getRandomPieceType);
  const [activePiece, setActivePiece] = useState<Piece>(() => createPiece(getRandomPieceType()));
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const isGameActive = activeSection === 'game';
  const lastJoystickTimeRef = useRef(0);

  const restartGame = useCallback(() => {
    const firstType = getRandomPieceType();
    const secondType = getRandomPieceType();
    setGrid(createEmptyGrid());
    setActivePiece(createPiece(firstType));
    setNextPieceType(secondType);
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    sounds.playC64Beep();
  }, []);

  const placePiece = useCallback(
    (pieceToPlace: Piece, currentGrid: (string | null)[][]) => {
      const newGrid = currentGrid.map((row) => [...row]);
      const { shape, color, x, y } = pieceToPlace;

      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c]) {
            const gy = y + r;
            const gx = x + c;
            if (gy >= 0 && gy < ROWS && gx >= 0 && gx < COLS) {
              newGrid[gy][gx] = color;
            }
          }
        }
      }

      // Check line clears
      let cleared = 0;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (newGrid[r].every((cell) => cell !== null)) {
          newGrid.splice(r, 1);
          newGrid.unshift(Array(COLS).fill(null));
          cleared++;
          r++; // check same row index again after splice
        }
      }

      if (cleared > 0) {
        sounds.playC64Beep();
        const scoreAdd = [0, 100, 300, 500, 800][cleared] * level;
        setScore((prev) => prev + scoreAdd);
        setLines((prevLines) => {
          const nextLines = prevLines + cleared;
          const nextLevel = Math.floor(nextLines / 10) + 1;
          if (nextLevel > level) {
            setLevel(nextLevel);
          }
          return nextLines;
        });
      } else {
        sounds.playKeyPress();
      }

      // Spawn next piece
      const newPiece = createPiece(nextPieceType);
      const nextNext = getRandomPieceType();

      if (checkCollision(newPiece, newGrid)) {
        setGameOver(true);
        sounds.playPowerOff();
      } else {
        setActivePiece(newPiece);
        setNextPieceType(nextNext);
      }

      setGrid(newGrid);
    },
    [nextPieceType, level]
  );

  const moveLeft = useCallback(() => {
    if (gameOver || !isGameActive) return;
    setActivePiece((prev) => {
      if (!checkCollision(prev, grid, -1, 0)) {
        sounds.playKeyPress();
        return { ...prev, x: prev.x - 1 };
      }
      return prev;
    });
  }, [grid, gameOver, isGameActive]);

  const moveRight = useCallback(() => {
    if (gameOver || !isGameActive) return;
    setActivePiece((prev) => {
      if (!checkCollision(prev, grid, 1, 0)) {
        sounds.playKeyPress();
        return { ...prev, x: prev.x + 1 };
      }
      return prev;
    });
  }, [grid, gameOver, isGameActive]);

  const rotate = useCallback(() => {
    if (gameOver || !isGameActive) return;
    setActivePiece((prev) => {
      const rotated = rotateMatrix(prev.shape);
      if (!checkCollision(prev, grid, 0, 0, rotated)) {
        sounds.playJoystickClick();
        return { ...prev, shape: rotated };
      }
      if (!checkCollision(prev, grid, -1, 0, rotated)) {
        sounds.playJoystickClick();
        return { ...prev, x: prev.x - 1, shape: rotated };
      }
      if (!checkCollision(prev, grid, 1, 0, rotated)) {
        sounds.playJoystickClick();
        return { ...prev, x: prev.x + 1, shape: rotated };
      }
      return prev;
    });
  }, [grid, gameOver, isGameActive]);

  const moveDown = useCallback(() => {
    if (gameOver || !isGameActive) return;
    setActivePiece((prev) => {
      if (!checkCollision(prev, grid, 0, 1)) {
        return { ...prev, y: prev.y + 1 };
      } else {
        placePiece(prev, grid);
        return prev;
      }
    });
  }, [grid, gameOver, isGameActive, placePiece]);

  const hardDrop = useCallback(() => {
    if (gameOver || !isGameActive) return;
    setActivePiece((prev) => {
      let currentY = prev.y;
      while (!checkCollision(prev, grid, 0, currentY - prev.y + 1)) {
        currentY++;
      }
      const droppedPiece = { ...prev, y: currentY };
      placePiece(droppedPiece, grid);
      return droppedPiece;
    });
  }, [grid, gameOver, isGameActive, placePiece]);

  // Main Gravity Tick Loop
  useEffect(() => {
    if (!isGameActive || gameOver) return;

    const speed = Math.max(90, 600 - (level - 1) * 50);
    const interval = setInterval(() => {
      moveDown();
    }, speed);

    return () => clearInterval(interval);
  }, [isGameActive, gameOver, level, moveDown]);

  // Joystick Input Polling Loop
  useEffect(() => {
    if (!isGameActive || gameOver) return;

    const now = Date.now();
    if (now - lastJoystickTimeRef.current < 130) return;

    const { x, z } = joystickAngle;

    if (z < -0.22) {
      moveLeft();
      lastJoystickTimeRef.current = now;
    } else if (z > 0.22) {
      moveRight();
      lastJoystickTimeRef.current = now;
    } else if (x > 0.22) {
      moveDown();
      lastJoystickTimeRef.current = now;
    } else if (x < -0.22) {
      rotate();
      lastJoystickTimeRef.current = now;
    }
  }, [joystickAngle, isGameActive, gameOver, moveLeft, moveRight, moveDown, rotate]);

  // Keyboard Event Listener when Game active
  useEffect(() => {
    if (!isGameActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;

      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'KeyA', 'KeyD', 'KeyW', 'KeyS', 'Enter'].includes(code)) {
        e.preventDefault();
      }

      if (gameOver) {
        if (code === 'Enter' || code === 'Space') {
          restartGame();
        }
        return;
      }

      if (code === 'ArrowLeft' || code === 'KeyA') {
        moveLeft();
      } else if (code === 'ArrowRight' || code === 'KeyD') {
        moveRight();
      } else if (code === 'ArrowDown' || code === 'KeyS') {
        moveDown();
      } else if (code === 'ArrowUp' || code === 'KeyW') {
        rotate();
      } else if (code === 'Space') {
        hardDrop();
      } else if (code === 'Enter') {
        restartGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameActive, gameOver, moveLeft, moveRight, moveDown, rotate, hardDrop, restartGame]);

  return {
    grid,
    activePiece,
    nextPieceType,
    score,
    lines,
    level,
    gameOver,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    restartGame,
  };
}
