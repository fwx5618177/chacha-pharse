type Url = `${string}://${string}`;
type Network = "testnet" | "mainnet";

export interface Config {
  ENDPOINT: string;
  APP_URL: Url;
  APP_MANIFEST_URL: string;
  NETWORK: Network | string;
  TOKEN_MASTER: string;
  TOKEN_RECIPIENT: string;
}

export async function loadConfig(): Promise<Config> {
  // if (process.env.API_URL == null) {
  //   throw new Error("API_URL is not set.");
  // }
  // if (process.env.MINI_APP_URL == null) {
  //   throw new Error("MINI_APP_URL is not set.");
  // }

  const apiUrl = process.env.API_URL;
  const miniAppUrl = process.env.MINI_APP_URL;

  return {
    ENDPOINT: apiUrl,
    APP_URL: miniAppUrl as Url,
    APP_MANIFEST_URL:
      "https://raw.githubusercontent.com/ton-defi-org/tonconnect-manifest-temp/main/tonconnect-manifest.json",
    NETWORK: process.env.network,
    TOKEN_MASTER: process.env.tokenMinter,
    TOKEN_RECIPIENT: process.env.tokenRecipient,
  };
}
