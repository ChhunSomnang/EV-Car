"use client"; // ប្រើ 'use client' ដើម្បីបង្កើត client component
import { Provider } from "react-redux";
import store from "../lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
