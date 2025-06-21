"use server";

import { getRequestHeaders } from "vinxi/http";
import { blogClient } from "~/axios/blog-client";

export const injectIsAdmin = async () => {
  const headers = getRequestHeaders();

  try {
    const { data } = await blogClient.get<{ isAdmin: boolean }>(
      "/auth/is-admin",
      {
        headers: {
          cookie: headers.cookie ?? "",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);

    return {
      isAdmin: false,
    };
  }
};
