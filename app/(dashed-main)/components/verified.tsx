import { cn } from "@/lib/utils";
import { MdVerified } from "react-icons/md";

function Verified({ className }: { className: string }) {
  return <MdVerified className={cn("ml-1 mt-1", className)} size={20} />;
}

export default Verified;
