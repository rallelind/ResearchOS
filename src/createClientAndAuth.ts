import "./index.css";
import type { Client } from "@osdk/client";
import { createClient } from "@osdk/client";
import { $ontologyRid } from "@researchos/sdk";
import { createPublicOauthClient } from "@osdk/oauth";

function checkEnv(
  value: string | undefined,
  name: string,
): asserts value is string {
  if (value == null) {
    throw new Error(`Missing environment variable: ${name}`);
  }
}

export default function createClientAndAuth() {
  const url = import.meta.env.VITE_FOUNDRY_API_URL;
  const clientId = import.meta.env.VITE_FOUNDRY_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_FOUNDRY_REDIRECT_URL;

  checkEnv(url, "VITE_FOUNDRY_API_URL");
  checkEnv(clientId, "VITE_FOUNDRY_CLIENT_ID");
  checkEnv(redirectUrl, "VITE_FOUNDRY_REDIRECT_URL");

  const auth = createPublicOauthClient(
    clientId,
    url,
    redirectUrl,
  );

  /**
  * Initialize the client to interact with the Ontology SDK
  */
  const client: Client = createClient(
    url,
    $ontologyRid,
    auth,
  );

  return { client, auth }
}
