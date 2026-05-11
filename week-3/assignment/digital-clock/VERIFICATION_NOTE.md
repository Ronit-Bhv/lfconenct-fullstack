# LiveClock Verification Note

## Verification Steps

1. Started the development server with `npm run dev`.
2. Opened the application in a browser at `http://localhost:5173/`.
3. Observed the `LiveClock` component rendering the current time in `HH:MM:SS` format.
4. Watched the displayed time update automatically every second (e.g., 10:37:16 → 10:37:17 → 10:37:18).
5. Confirmed no errors in the browser console or terminal.

## Component Details

- **File:** `src/LiveClock.jsx`
- Uses `useState(new Date())` to store the current date/time.
- Uses `useEffect` with an empty dependency array `[]` to start a `setInterval` timer (1000 ms).
- Returns a cleanup function that calls `clearInterval` on unmount to prevent memory leaks.
- Formats and displays the time as `HH:MM:SS`.

## Result

The clock updates every second as expected. The cleanup function ensures the interval is cleared when the component unmounts.
