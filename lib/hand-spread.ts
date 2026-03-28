import { distance2d, normalizeDistance } from "@/lib/hand-distance";

/** MediaPipe landmark indices */
const WRIST = 0;
const THUMB_TIP = 4;
const INDEX_TIP = 8;
const MIDDLE_MCP = 9;
const MIDDLE_TIP = 12;
const PINKY_MCP = 17;

/** Two hands: distance between middle MCPs (image-normalized). */
const MIN_TWO_HAND_SPAN = 0.08;
const MAX_TWO_HAND_SPAN = 0.78;

/** One hand: pinch thumb–index + finger spread so abrir mano ≈ más grande. */
const MIN_PINCH = 0.02;
const MAX_PINCH = 0.32;
const MIN_SPREAD_ONE = 0.05;
const MAX_SPREAD_ONE = 0.42;

type Lm = { readonly x: number; readonly y: number; readonly z?: number };

function oneHandSpread(hand: readonly Lm[]): number {
  const pinch = distance2d(hand[THUMB_TIP], hand[INDEX_TIP]);
  const palm = distance2d(hand[WRIST], hand[MIDDLE_TIP]);
  const splay = distance2d(hand[INDEX_TIP], hand[PINKY_MCP]);
  const pinchN = normalizeDistance(pinch, MIN_PINCH, MAX_PINCH);
  const palmN = normalizeDistance(palm, MIN_SPREAD_ONE, MAX_SPREAD_ONE);
  const splayN = normalizeDistance(splay, MIN_SPREAD_ONE, MAX_SPREAD_ONE);
  return Math.max(pinchN, (palmN + splayN) / 2);
}

/**
 * Returns [0, 1] spread for sphere scale: two hands (separation), or one hand (pinch + apertura).
 */
export function computeSpreadFromLandmarks(
  landmarks: readonly (readonly Lm[])[],
): number | null {
  if (landmarks.length >= 2) {
    const a = landmarks[0][MIDDLE_MCP];
    const b = landmarks[1][MIDDLE_MCP];
    return normalizeDistance(
      distance2d(a, b),
      MIN_TWO_HAND_SPAN,
      MAX_TWO_HAND_SPAN,
    );
  }
  if (landmarks.length === 1) {
    return oneHandSpread(landmarks[0]);
  }
  return null;
}
