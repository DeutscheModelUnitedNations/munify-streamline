import { logger, task, wait, schedules } from "@trigger.dev/sdk/v3";
import createClient from "openapi-fetch";
import type { paths } from "../types/listmonk";

export const helloWorldTask = schedules.task({
  id: "hello-world",
  cron: "*/5 * * * *", // Every 5 minutes

  run: async (payload: any, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    const URL = process.env.LISTMONK_API_URL;
    const USERNAME = process.env.LISTMONK_API_USERNAME;
    const PASSWORD = process.env.LISTMONK_API_KEY;

    const client = createClient<paths>({
      baseUrl: URL,
      headers: {
        Authorization: `Basic ${USERNAME}:${PASSWORD}`,
      },
    });

    const { data, error } = await client.GET("/subscribers", {
      query: {
        limit: 10,
      },
    });

    if (error) {
      throw new Error(error);
    } else {
      return data;
    }
  },
});
