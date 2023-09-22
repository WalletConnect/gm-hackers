import type { NextApiRequest, NextApiResponse } from "next";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const notifyApiSecret = process.env.NOTIFY_API_SECRET;
  if (!notifyApiSecret) {
    throw new Error("You need to provide NOTIFY_API_SECRET env variable");
  }

  if (req.method !== "GET") {
    throw new ReferenceError("Method not allowed");
  }

  try {
    const result = await fetch(
      `https://notify.walletconnect.com/${projectId}/subscribers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${notifyApiSecret}`,
        },
      }
    );

    const subscribers = await result.json(); // ["eip155:1:0xafeb...", "eip155:1:0xbcd..."]
    console.log("Notify Server response - get subscribers", subscribers);

    return res.status(result.status).json({ subscribers });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message ?? "Internal server error",
    });
  }
}
