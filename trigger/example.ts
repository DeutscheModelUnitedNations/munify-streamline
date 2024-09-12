import { logger, task, wait, schedules } from "@trigger.dev/sdk/v3";

export const helloWorldTask = schedules.task({
  id: "hello-world",
  cron: "*/5 * * * *", // Every 5 minutes

  run: async (payload: any, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    await wait.for({ seconds: 5 });

    if (Math.random() > 0.6) {
      throw new Error("Random error");
    }

    return {
      message: "Hello, world!",
    };
  },
});