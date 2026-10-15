import type { Metadata } from "next";
import { WorkPage } from "@/components/WorkPage";
import { workBySlug } from "@/lib/work";

const topic = workBySlug["workplace-flexibility"];

export const metadata: Metadata = {
  title: "Workplace Flexibility",
  description: topic.standfirst,
  alternates: { canonical: "/work/workplace-flexibility/" },
};

export default function Page() {
  return <WorkPage topic={topic} />;
}
