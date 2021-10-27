import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"

import Home from "./components/Home";
import MyTokens from "./components/MyTokens";

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/my-tokens" exact component={MyTokens} />
      </BrowserRouter>
    </ChakraProvider>
  );
}