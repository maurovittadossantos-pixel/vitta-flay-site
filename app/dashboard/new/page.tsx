import DashboardHeader from '@/components/DashboardHeader';
import BuilderWizard from '@/components/BuilderWizard';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function NewSitePage() {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-ink-900/[0.02]">
      <DashboardHeader name={user.name} email={user.email} />
      <main className="mx-auto max-w-4xl px-5 py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-ink-950">Generate a website</h1>
        <p className="mt-1.5 text-sm text-ink-700/70">
          Three short steps. The engine writes the copy and lays out every section.
        </p>
        <div className="mt-8">
          <BuilderWizard company={user.company ?? ''} />
        </div>
      </main>
    </div>
  );
}
