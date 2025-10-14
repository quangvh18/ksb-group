'use client';

import { Suspense } from 'react';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

function AnalyticsWrapper() {
  useGoogleAnalytics();
  return null;
}

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsWrapper />
      </Suspense>
      {children}
    </>
  );
}

