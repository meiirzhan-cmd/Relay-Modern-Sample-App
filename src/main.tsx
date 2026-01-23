import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  type FetchFunction,
} from "relay-runtime";
import { RelayEnvironmentProvider } from "react-relay";
import { LoadingSpinner } from "./components/Loading.tsx";

const HTTP_ENDPOINT = "/graphql";

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request.text, variables }),
  });

  if (!resp.ok) {
    throw new Error("Response failed.");
  }
  return await resp.json();
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  </StrictMode>,
);
