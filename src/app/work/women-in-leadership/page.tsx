import type { Metadata } from "next";
import { WorkPage } from "@/components/WorkPage";
import { workBySlug } from "@/lib/work";

const topic = workBySlug["women-in-leadership"];

export const metadata: Metadata = {
  title: "Women In Leadership",
  description: topic.standfirst,
  alternates: { canonical: "/work/women-in-leadership/" },
};

export default function Page() {
  return <WorkPage topic={topic} />;
}
