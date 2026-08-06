module.exports = {
  routes: [
    {
      method: "POST",
      path: "/notification/send",
      handler: "notification.send",
      config: {
        auth: false,
      },
    },
  ],
};