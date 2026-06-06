import { Request, Response, NextFunction } from 'express';

/**
 * Request-logger middleware.
 *
 * Lifecycle position: runs BEFORE route handlers.
 * Attaches a 'finish' listener to the response so it can log AFTER the
 * handler has set the status code and sent the body.
 *
 * Output format:
 *   [2026-06-07T01:40:00.000Z] GET /meetings → 200 (4ms)
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startMs = Date.now();
  const { method, path } = req;

  // 'finish' fires once the response has been fully flushed to the client.
  res.on('finish', () => {
    const duration = Date.now() - startMs;
    const { statusCode } = res;

    // Colour-code by status range for readability in the terminal
    const statusLabel = colourStatus(statusCode);

    console.log(
      `[${new Date().toISOString()}] ${method.padEnd(6)} ${path.padEnd(20)} ${statusLabel}  (${duration}ms)`
    );
  });

  next();
}

function colourStatus(code: number): string {
  if (code >= 500) return `\x1b[31m${code}\x1b[0m`; // red
  if (code >= 400) return `\x1b[33m${code}\x1b[0m`; // yellow
  if (code >= 200) return `\x1b[32m${code}\x1b[0m`; // green
  return String(code);
}
