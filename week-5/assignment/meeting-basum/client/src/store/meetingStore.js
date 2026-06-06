import { useSyncExternalStore } from 'react';

// Module-level singleton — Zustand-style pattern without an external library.
// State lives outside React so any component can read or write without prop-drilling.

const INITIAL_MEETINGS = [
  {
    id: 1,
    title: 'Project Planning Meeting',
    host: 'Risar Basuki',
    time: 'Today, 10:00 AM – 11:00 AM',
    color: '#6366f1',
  },
  {
    id: 2,
    title: 'Marketing Strategy',
    host: 'Alice',
    time: 'Today, 02:00 PM – 03:00 PM',
    color: '#22c55e',
  },
  {
    id: 3,
    title: 'Team Sync Up',
    host: 'John Doe',
    time: 'Tomorrow, 11:00 AM – 12:00 PM',
    color: '#f97316',
  },
];

let state = { meetings: INITIAL_MEETINGS };
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => fn());
}

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

/** Primary hook — returns the full store state. */
export function useMeetingStore() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

/** Derived-state hook — re-renders only when the count changes. */
export function useUpcomingCount() {
  return useSyncExternalStore(subscribe, () => state.meetings.length);
}

/** Named actions that mutate state and notify all subscribers. */
export const meetingActions = {
  addMeeting(meeting) {
    state = {
      ...state,
      meetings: [...state.meetings, { ...meeting, id: Date.now() }],
    };
    notify();
  },

  removeMeeting(id) {
    state = { ...state, meetings: state.meetings.filter((m) => m.id !== id) };
    notify();
  },

  updateMeeting(id, updates) {
    state = {
      ...state,
      meetings: state.meetings.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    };
    notify();
  },
};
