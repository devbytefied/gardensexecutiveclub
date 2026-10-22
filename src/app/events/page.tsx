import type { Metadata } from "next";
import { EventsIndex } from "@/components/EventsIndex";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "The Garden's Executive Club calendar — confirmed upcoming dates led by The Magnolia Luxury Tea Society Brunch on Sunday 15 November 2026, plus the annual dinner, the GEC Summit, facilitated luncheons and candidacy dinners.",
  alternates: { canonical: "/events/" },
};

export default function Page() {
  return <EventsIndex />;
}