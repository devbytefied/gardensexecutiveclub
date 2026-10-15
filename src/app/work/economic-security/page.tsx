import type { Metadata } from "next";
import { WorkPage } from "@/components/WorkPage";
import { workBySlug } from "@/lib/work";

const topic = workBySlug["economic-security"];

export const metadata: Metadata = {
  title: "Economic Security",
  description: topic.standfirst,
  alternates: { canonical: "/work/economic-security/" },
};

export default function Page() {
  return <WorkPage topic={topic} />;
}
