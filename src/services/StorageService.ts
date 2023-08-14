export interface StorageService {
  readString(key: string): string | undefined;
  readNumber(key: string): number | undefined;
  readDate(key: string): Date | undefined;
  readBoolean(key: string): boolean | undefined;
  readObject<T>(key: string): T | undefined;
  remove(key: string): void;
  clear(): void;
}

export class LocalStorageService implements StorageService {
  readString(key: string): string | undefined {
    const value = this.read(key);
    return value ?? undefined;
  }

  readNumber(key: string): number | undefined {
    const value = this.read(key);
    return value ? Number(value) : undefined;
  }

  readDate(key: string): Date | undefined {
    const value = this.read(key);
    return value ? new Date(value) : undefined;
  }

  readBoolean(key: string): boolean | undefined {
    const value = this.read(key);
    return value ? Boolean(value) : undefined;
  }

  readObject<T>(key: string): T | undefined {
    const value = this.read(key);
    return value ? JSON.parse(value) : undefined;
  }

  write<T>(key: string, value: T): void {
    let stringValue: string;
    if (typeof value === "string") {
      stringValue = value;
    } else if (typeof value === "number") {
      stringValue = String(value);
    } else if (typeof value === "boolean") {
      stringValue = String(value);
    } else if (value instanceof Date) {
      stringValue = value.toJSON();
    } else {
      stringValue = JSON.stringify(value);
    }

    localStorage.setItem(key, stringValue);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  private read(key: string): string | undefined {
    return localStorage.getItem(key) ?? undefined;
  }
}
