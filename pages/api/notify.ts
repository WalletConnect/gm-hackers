import type { NextApiRequest, NextApiResponse } from "next";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

const notifyServerUrl = process.env.NOTIFY_SERVER_URL;
if (!notifyServerUrl) {
  throw new Error("You need to provide NOTIFY_SERVER_URL env variable");
}
const projectSecret = process.env.NOTIFY_PROJECT_SECRET;
if (!projectSecret) {
  throw new Error("You need to provide NOTIFY_PROJECT_SECRET env variable");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    throw new ReferenceError("Method not allowed");
  }

  const notificationPayload = req.body;
  if (!notificationPayload) {
    return res.status(400).json({ success: false });
  }

  try {
    const result = await fetch(`${notifyServerUrl}/${projectId}/notify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${projectSecret}`,
      },
      body: JSON.stringify(notificationPayload),
    });

    const gmRes = await result.json(); // { "sent": ["eip155:1:0xafeb..."], "failed": [], "not_found": [] }
    console.log("Notify Server response", gmRes);
    const isSuccessfulGm = gmRes.sent?.includes(
      notificationPayload.accounts[0]
    );
    return res
      .status(result.status)
      .json({ success: isSuccessfulGm, message: gmRes?.reason });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message ?? "Internal server error",
    });
  }
}
