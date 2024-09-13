import { logger, task, wait, schedules } from "@trigger.dev/sdk/v3";
import createClient from "openapi-fetch";
import type { paths } from "../types/listmonk";

export const helloWorldTask = schedules.task({
  id: "hello-world",
  cron: "*/5 * * * *", // Every 5 minutes
  retry: {
    maxAttempts: 1,
  },

  run: async (payload: any, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    const URL = process.env.LISTMONK_API_URL;
    const USERNAME = process.env.LISTMONK_API_USERNAME;
    const PASSWORD = process.env.LISTMONK_API_KEY;

    const client = createClient<paths>({
      baseUrl: URL,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${USERNAME}:${PASSWORD}`,
          "utf-8"
        ).toString("base64")}`,
      },
    });

    let page = 1;
    let per_page = 100;

    const subscribers = [];

    while (true) {
      const { data, error } = await client.GET("/subscribers", {
        params: {
          query: {
            per_page,
            page,
          },
        },
      });

      if (error || !data?.data?.total) {
        logger.error("Error fetching subscribers", error);
        throw new Error("Error fetching subscribers");
      }

      if (data?.data?.results) {
        console.info(
          `Retrieved page ${page} of ${Math.ceil(data.data.total / per_page)}`
        );
        subscribers.push(...data.data.results.map((r) => r.email));
      }

      if (page * per_page >= data?.data?.total) break;

      page++;
    }

    return subscribers;
  },
});
