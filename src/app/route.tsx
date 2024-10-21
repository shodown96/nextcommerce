import { PATHS } from "@/lib/constants/paths";
import { redirect } from "next/navigation";


export default function Home() {
  return redirect(PATHS.EXPLORE)
}
