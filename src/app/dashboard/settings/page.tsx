import SettingsClient from "./settings-client";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsClient />
    </Suspense>
  );
}
