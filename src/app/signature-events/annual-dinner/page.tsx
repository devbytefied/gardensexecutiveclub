import { EventPage, eventMetadata } from "@/components/EventPage";
import { eventsBySlug } from "@/lib/events";

const event = eventsBySlug["annual-dinner"];

export const metadata = eventMetadata(event);

export default function Page() {
  return <EventPage event={event} />;
}
