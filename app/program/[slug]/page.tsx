import { redirect } from "next/navigation";

export default async function LegacyProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mapped = slug === "crane" ? "operator-crane" : slug;
  redirect(`/pelatihan/${mapped}`);
}
