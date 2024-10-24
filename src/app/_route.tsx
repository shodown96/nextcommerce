import { PATHS } from "@/lib/constants/paths";
import { redirect } from "next/navigation";


export async function GET() {
  return redirect(PATHS.EXPLORE)
}
