import { appendFileSync, mkdirSync } from "fs";
import path from "path";
import type { InvestorApplication, InvestorProfile, InvestorStatus } from "./types";
import { fetchStrapi, isStrapiEnabled } from "./strapi";

const NOTIFICATION_LOG = path.join(process.cwd(), "data", "notifications.log");

interface NotificationPayload {
  to: string;
  subject: string;
  text: string;
}

function getAdminNotificationEmail() {
  return process.env.NOTIFICATION_EMAIL_TO ?? process.env.STRAPI_NOTIFICATION_EMAIL_TO ?? "seaointeralia@gmail.com";
}

function writeNotificationFallback(payload: NotificationPayload) {
  mkdirSync(path.dirname(NOTIFICATION_LOG), { recursive: true });
  appendFileSync(NOTIFICATION_LOG, `[${new Date().toISOString()}] TO: ${payload.to}\nSUBJECT: ${payload.subject}\n${payload.text}\n---\n`);
}

async function sendNotification(payload: NotificationPayload) {
  if (process.env.NOTIFICATION_EMAIL_WEBHOOK_URL) {
    await fetch(process.env.NOTIFICATION_EMAIL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    return;
  }

  if (isStrapiEnabled() && process.env.STRAPI_NOTIFICATION_EMAIL_TO) {
    try {
      await fetchStrapi("/api/notification/send", {
        method: "POST",
        body: JSON.stringify({
          to: payload.to,
          subject: payload.subject,
          text: payload.text,
        }),
      });
      return;
    } catch {
      // Fall through to local logging when the Strapi email plugin is unavailable.
    }
  }

  writeNotificationFallback(payload);
}

function formatInvestorProfile(profile: InvestorProfile) {
  return [
    `Country: ${profile.country}`,
    `Budget: ${profile.budget}`,
    `Status: ${profile.status}`,
    `Operating experience: ${profile.operatingExperience}`,
    profile.notes ? `Notes: ${profile.notes}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function notifyInvestorSubmission(user: { name: string; email: string }, profile: InvestorProfile, event: "submitted" | "updated") {
  const subject = event === "submitted" ? `New investor application: ${user.name}` : `Investor profile updated: ${user.name}`;
  const text = [
    `${user.name} (${user.email}) ${event === "submitted" ? "submitted a new" : "updated an existing"} investor application.`,
    "",
    formatInvestorProfile(profile),
  ].join("\n");

  await sendNotification({
    to: getAdminNotificationEmail(),
    subject,
    text,
  });
}

export async function notifyInvestorStatusChange(application: InvestorApplication, previousStatus: InvestorStatus | null) {
  const subject = `AssistPro investor profile ${application.investorProfile.status}`;
  const text = [
    `Hello ${application.name},`,
    "",
    `Your investor profile for ${application.investorProfile.country} is now marked as ${application.investorProfile.status}.`,
    previousStatus ? `Previous status: ${previousStatus}` : undefined,
    "",
    formatInvestorProfile(application.investorProfile),
  ]
    .filter(Boolean)
    .join("\n");

  await sendNotification({
    to: application.email,
    subject,
    text,
  });
}