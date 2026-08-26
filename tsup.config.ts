import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    /^@radix-ui\//,
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "lucide-react",
    "cmdk",
    "embla-carousel-react",
    "input-otp",
    "react-day-picker",
    "react-hook-form",
    "@hookform/resolvers",
    "react-resizable-panels",
    "recharts",
    "sonner",
    "vaul",
  ],
});
