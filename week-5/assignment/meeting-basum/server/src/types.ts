// ─── Domain types ─────────────────────────────────────────────────────────────

/**
 * Allowed avatar colours for a meeting card.
 * `type` is used here because this is a *union* of literal strings —
 * an interface cannot express that.
 */
export type MeetingColor =
  | '#6366f1'
  | '#22c55e'
  | '#f97316'
  | '#ec4899'
  | '#0ea5e9';

/**
 * A meeting record stored in the in-memory data store.
 * `interface` is used here because this is a named object shape that
 * other interfaces (e.g. request bodies) can extend.
 */
export interface Meeting {
  id: number;
  title: string;
  host: string;
  time: string;
  color: MeetingColor;
  createdAt: string; // ISO-8601 timestamp
}

/**
 * Shape of the JSON body expected for POST /meetings.
 * Extends Meeting but omits server-generated fields.
 */
export interface CreateMeetingBody {
  title: string;
  host: string;
  time: string;
  color?: MeetingColor;
}

// ─── API envelope ─────────────────────────────────────────────────────────────

/**
 * Generic success-response wrapper.
 * `type` fits here — it's a mapped/generic shape, not an extensible class.
 */
export type ApiResponse<T> = {
  data: T;
  message: string;
  timestamp: string;
};

/**
 * Generic error-response shape.
 */
export type ApiError = {
  error: string;
  details?: string;
  timestamp: string;
};
