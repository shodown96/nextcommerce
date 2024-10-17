// write a webhook handler for the Clerk Webhook
// eslint-disable-next-line import/named
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { createUser } from "@/actions/user/create-user";
import { updateMetadata } from "@/actions/user/update-metadata";

const secret = process.env.CLERK_WEBHOOK_SECRET as string;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") || "",
    "svix-signature": headerPayload.get("svix-signature") || "",
    "svix-timestamp": headerPayload.get("svix-timestamp") || "",
  };
  const wh = new Webhook(secret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(req: NextRequest) {
  const { data, type } = await validateRequest(req);

  if (type === "user.created") {
    const { email_addresses, id, primary_email_address_id } = data;
    const email =
      data.email_addresses?.find((e) => e.id === primary_email_address_id) ??
      email_addresses[0];

    const response = await createUser({
      clerkUserId: id,
      email: email.email_address,
      name: data.first_name + " " + data.last_name,
    });

    if (!response) {
      return new NextResponse(
        JSON.stringify({ error: "Could not create the user" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    await updateMetadata({
      onboardingComplete: false,
      userId: id,
    });

    return new NextResponse(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }

  return new NextResponse(JSON.stringify({ error: "Invalid event type" }), {
    headers: { "Content-Type": "application/json" },
    status: 400,
  });
}
