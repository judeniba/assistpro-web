module.exports = {
  async send(ctx) {
    const configuredToken = process.env.STRAPI_NOTIFICATION_TOKEN || process.env.STRAPI_API_TOKEN;
    const authHeader = ctx.request.header.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!configuredToken || bearerToken !== configuredToken) {
      return ctx.unauthorized("Invalid notification token");
    }

    const { to, subject, text, html } = ctx.request.body || {};

    if (!to || !subject || (!text && !html)) {
      return ctx.badRequest("to, subject, and text or html are required");
    }

    await strapi.plugin("email").service("email").send({
      to,
      subject,
      text,
      html,
    });

    ctx.body = { ok: true };
  },
};