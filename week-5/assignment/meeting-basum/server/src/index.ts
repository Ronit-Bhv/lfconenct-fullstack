import express, { Request, Response, ErrorRequestHandler } from 'express';
import { requestLogger } from './logger.js';
import type {
  Meeting,
  CreateMeetingBody,
  MeetingColor,
  ApiResponse,
  ApiError,
} from './types.js';

// ─── App setup ────────────────────────────────────────────────────────────────

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
const BOOT_TIME = new Date().toISOString();

app.use(express.json());     // parse JSON request bodies
app.use(requestLogger);      // log every request after it completes

// ─── In-memory data store ─────────────────────────────────────────────────────

const VALID_COLORS: MeetingColor[] = [
  '#6366f1',
  '#22c55e',
  '#f97316',
  '#ec4899',
  '#0ea5e9',
];

let meetings: Meeting[] = [
  {
    id: 1,
    title: 'Project Planning Meeting',
    host: 'Risar Basuki',
    time: 'Today, 10:00 AM – 11:00 AM',
    color: '#6366f1',
    createdAt: BOOT_TIME,
  },
  {
    id: 2,
    title: 'Marketing Strategy',
    host: 'Alice',
    time: 'Today, 02:00 PM – 03:00 PM',
    color: '#22c55e',
    createdAt: BOOT_TIME,
  },
  {
    id: 3,
    title: 'Team Sync Up',
    host: 'John Doe',
    time: 'Tomorrow, 11:00 AM – 12:00 PM',
    color: '#f97316',
    createdAt: BOOT_TIME,
  },
];

let nextId = 4;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ok<T>(data: T, message = 'OK'): ApiResponse<T> {
  return { data, message, timestamp: new Date().toISOString() };
}

function err(error: string, details?: string): ApiError {
  return { error, details, timestamp: new Date().toISOString() };
}

function isValidColor(value: unknown): value is MeetingColor {
  return typeof value === 'string' && (VALID_COLORS as string[]).includes(value);
}

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * GET /health
 * Health-check — always returns 200.
 */
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json(
    ok({ status: 'ok', uptime: process.uptime(), bootTime: BOOT_TIME }, 'Server is healthy')
  );
});

/**
 * GET /meetings
 * Returns the full list of meetings. Always 200.
 */
app.get('/meetings', (_req: Request, res: Response) => {
  res.status(200).json(ok(meetings, `${meetings.length} meeting(s) found`));
});

/**
 * POST /meetings
 * Creates a new meeting.
 * - 201 on success
 * - 400 if required fields are missing or color is invalid
 */
app.post('/meetings', (req: Request<object, object, CreateMeetingBody>, res: Response) => {
  const { title, host, time, color } = req.body;

  // Validate required fields
  const missing: string[] = [];
  if (!title?.trim())  missing.push('title');
  if (!host?.trim())   missing.push('host');
  if (!time?.trim())   missing.push('time');

  if (missing.length > 0) {
    res.status(400).json(
      err('Validation failed', `Missing required field(s): ${missing.join(', ')}`)
    );
    return;
  }

  // Validate optional color
  const resolvedColor: MeetingColor =
    color !== undefined
      ? isValidColor(color)
        ? color
        : (() => {
            res.status(400).json(
              err('Validation failed', `Invalid color "${color}". Allowed: ${VALID_COLORS.join(', ')}`)
            );
            return null as unknown as MeetingColor;
          })()
      : '#6366f1';

  if (res.headersSent) return; // color was invalid, already responded

  const newMeeting: Meeting = {
    id: nextId++,
    title: title.trim(),
    host: host.trim(),
    time: time.trim(),
    color: resolvedColor,
    createdAt: new Date().toISOString(),
  };

  meetings.push(newMeeting);
  res.status(201).json(ok(newMeeting, 'Meeting created'));
});

// ─── Error handlers ───────────────────────────────────────────────────────────

// Malformed JSON body → clean 400 instead of Express HTML error page
const jsonErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    res.status(400).json(err('Invalid JSON', 'Request body could not be parsed as JSON'));
    return;
  }
  next(error);
};
app.use(jsonErrorHandler);

// 404 catch-all
app.use((_req: Request, res: Response) => {
  res.status(404).json(err('Route not found'));
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 Meeting Basum API`);
  console.log(`   Port : http://localhost:${PORT}`);
  console.log(`   Env  : ${process.env.NODE_ENV ?? 'development'}`);
  console.log(`   Boot : ${BOOT_TIME}\n`);
});
