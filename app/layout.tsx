import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./tokens.css"; // generado desde tokens/ (npm run tokens)
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Contracts · Xavier Pascual",
  description: "Del prompt a la especificación: un sistema de diseño gobernado por contratos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
