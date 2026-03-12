import react from "react";
import "./resume.css";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="relative">{children}</div>;
}
