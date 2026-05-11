# Meeting Basum — Route Reference

| Route | Renders | Router Hook(s) Used |
|-------|---------|---------------------|
| `/` (index) | `Dashboard` — greeting, 3 quick-action cards, upcoming meetings list | `useNavigate` (to navigate to `/meetings/:meetingId`) |
| `/dashboard` | Redirects to `/` | `Navigate` component |
| `/new-meeting` | `NewMeeting` — page heading and description | None |
| `/join-meeting` | `JoinMeeting` — page heading and description | None |
| `/calendar` | `Calendar` — view switcher (Month / Week) | `useSearchParams` (to read and set `?view=month\|week`) |
| `/schedule-meeting` | `ScheduleMeeting` — page heading and description | None |
| `/profile-settings` | `ProfileSettings` — page heading and description | None |
| `/meetings/:meetingId` | `MeetingDetail` — meeting header + nested tab navigation | `useParams` (to read `:meetingId`) |
| `/meetings/:meetingId/details` | `MeetingDetailsTab` — meeting info | `useParams` (to read `:meetingId`) |
| `/meetings/:meetingId/participants` | `MeetingParticipantsTab` — participant list | `useParams` (to read `:meetingId`) |
| `*` (catch-all) | `NotFound` — friendly 404 page with link back home | `Link` (to go back home) |

## Layout

- `Layout` wraps every route via the parent route `/`. It contains the persistent sidebar (with `NavLink` items), top header, footer, and an `<Outlet />` for nested routes.
