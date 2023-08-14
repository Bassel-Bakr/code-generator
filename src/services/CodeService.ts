import { customAlphabet } from "nanoid";

export class CodeService {
  createGenerator(charSet: string, codeLength: number) {
    return customAlphabet(charSet, codeLength);
  }
}
