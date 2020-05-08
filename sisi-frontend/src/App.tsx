import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "./App.css";
import Home from "./pages/Home";
import Charts from "./pages/Charts";
import Admin from "./pages/Admin";

import store from "./redux/store";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://sisi-api.azurewebsites.net",
  cache,
  resolvers: {},
  request: (operation) => {
    const token: any = store.getState().authSlice.token;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

const data = {};

cache.writeData({ data });

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/charts" component={Charts} />
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          {/* <Route component={Home} /> */}
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}
