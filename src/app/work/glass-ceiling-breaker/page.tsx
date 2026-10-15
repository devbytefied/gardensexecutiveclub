import type { Metadata } from "next";
import { WorkPage } from "@/components/WorkPage";
import { workBySlug } from "@/lib/work";

const topic = workBySlug["glass-ceiling-breaker"];

export const metadata: Metadata = {
  title: "Glass Ceiling Breaker",
  description: topic.standfirst,
  alternates: { canonical: "/work/glass-ceiling-breaker/" },
};

export default function Page() {
  return <WorkPage topic={topic} />;
}
