const parseBool = (value, fallback = false) => {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return fallback;
};

const parseIntOr = (value, fallback) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("STRAPI_SMTP_HOST", "127.0.0.1"),
        port: parseIntOr(env("STRAPI_SMTP_PORT"), 587),
        secure: parseBool(env("STRAPI_SMTP_SECURE"), false),
        requireTLS: parseBool(env("STRAPI_SMTP_REQUIRE_TLS"), false),
        ignoreTLS: parseBool(env("STRAPI_SMTP_IGNORE_TLS"), false),
        auth:
          env("STRAPI_SMTP_USER") && env("STRAPI_SMTP_PASS")
            ? {
                user: env("STRAPI_SMTP_USER"),
                pass: env("STRAPI_SMTP_PASS"),
              }
            : undefined,
        streamTransport: parseBool(env("STRAPI_SMTP_STREAM_TRANSPORT"), false),
        newline: "unix",
      },
      settings: {
        defaultFrom: env("STRAPI_EMAIL_FROM", "noreply@assistpro.local"),
        defaultReplyTo: env("STRAPI_EMAIL_REPLY_TO", env("STRAPI_EMAIL_FROM", "noreply@assistpro.local")),
      },
    },
  },
});