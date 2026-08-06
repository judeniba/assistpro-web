import { providers } from "@/lib/store";
import { getCurrentSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ providerId: string }> }) {
  const { providerId } = await params;
  const p = providers.get(providerId);
  return { title: p ? `Book ${p.name} — AssistPro` : "Book — AssistPro" };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ providerId: string }>;
}) {
  const session = await getCurrentSession();
  if (!session) {
    const { providerId } = await params;
    redirect(`/auth/login?redirect=/book/${providerId}`);
  }
  if (session.role !== "client") redirect("/dashboard/provider");

  const { providerId } = await params;
  const provider = providers.get(providerId);
  if (!provider?.verified) notFound();

  return (
    <main style={{ paddingTop: 64 }}>
      <BookingForm provider={provider} />
    </main>
  );
}
