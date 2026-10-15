import { EventPage, eventMetadata } from "@/components/EventPage";
import { eventsBySlug } from "@/lib/events";

const event = eventsBySlug["gec-summit"];

export const metadata = eventMetadata(event);

export default function Page() {
  return <EventPage event={event} />;
}
