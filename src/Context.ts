import React, { useContext } from "react";
import { DocumentService } from "./services/DocumentService";
import { CodeService } from "./services/CodeService";
import { LocalStorageService } from "./services/StorageService";

const appContextValue = getDefaultContextData();

export const Context = React.createContext(appContextValue);

export function getDefaultContextData() {
  return {
    documentService: new DocumentService(),
    codeService: new CodeService(),
    storageService: new LocalStorageService(),
  };
}

export function createContext(context: typeof appContextValue) {
  return context;
}

export function overrideContext(context: Partial<typeof appContextValue>) {
  return { ...useContext(Context), ...context };
}
