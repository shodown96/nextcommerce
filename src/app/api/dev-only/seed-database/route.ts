// import { redirect } from "next/navigation";
// import { NextRequest, NextResponse } from "next/server";
// import { seedDatabase } from "@/actions/dev-only/seed-database";

import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   if (process.env.NODE_ENV !== "development") {
//     // dev-only route
//     redirect("/");
//   }

//   const searchParams = request.nextUrl.searchParams;

//   const numberOfProjectsParam = searchParams.get("numberOfProjects");
//   const formattedNumber = Number(numberOfProjectsParam ?? NaN);
//   const numberOfProjects = isNaN(formattedNumber) ? 20 : formattedNumber;

//   const shouldResetDatabaseParam = searchParams.get("shouldResetDatabase");
//   const shouldResetDatabase = shouldResetDatabaseParam === "true";

//   const seedDatabaseResponse = await seedDatabase({
//     numberOfProjects,
//     shouldResetDatabase,
//   });

//   if (seedDatabaseResponse === null) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json(seedDatabaseResponse, { status: 200 });
// }

export async function GET(request: NextRequest) {
    return NextResponse.json({}, { status: 200 });
}