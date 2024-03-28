'use client';

import { FlowSlot } from '@flowover/react';

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-4">
      <img src="React-icon.svg" alt="logo" className="max-w-[48px]" />

      <FlowSlot as="a" name="test" href></FlowSlot>
    </main>
  );
}
