import React, { useContext } from "react";
import { DocumentService } from "./services/DocumentService";
import { CodeService } from "./services/CodeService";

const appContextValue = getDefaultContextData();

export const Context = React.createContext(appContextValue);

export function getDefaultContextData() {
  return {
    documentService: new DocumentService(),
    codeService: new CodeService(),
  };
}

export function createContext(context: typeof appContextValue) {
  return context;
}

export function overrideContext(context: Partial<typeof appContextValue>) {
  return { ...useContext(Context), ...context };
}
