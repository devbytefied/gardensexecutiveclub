import type { Metadata } from "next";
import { WorkPage } from "@/components/WorkPage";
import { workBySlug } from "@/lib/work";

const topic = workBySlug["workplace-participation"];

export const metadata: Metadata = {
  title: "Workplace Participation",
  description: topic.standfirst,
  alternates: { canonical: "/work/workplace-participation/" },
};

export default function Page() {
  return <WorkPage topic={topic} />;
}
