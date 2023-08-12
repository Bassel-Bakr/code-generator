import {
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  OutlinedInput,
  FormControl,
  useFormControl,
} from "@mui/material";
import { FormEventHandler, useState } from "react";
import { customAlphabet, nanoid } from "nanoid";

function App() {
  const [formState, setFormState] = useState({
    charSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    codeLength: 14,
    codeCount: 10,
  });

  const handle: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as typeof formState;

    data.codeLength = Number(data.codeLength);
    data.codeCount = Number(data.codeCount);

    console.log(data);

    // return;
    const generator = customAlphabet(data.charSet, data.codeLength);

    const codes = Array.from({ length: data.codeCount }).map(() => generator());

    console.log(codes);
  };

  return (
    <section className="w-screen">
      <header>
        <h1>Code Generator</h1>
      </header>

      <main className="mx-auto">
        <form className="flex flex-col gap-3" onSubmit={handle}>
          <FormControl>
            <InputLabel>Character Set</InputLabel>
            <OutlinedInput
              type="text"
              label="Character Set"
              name="charSet"
              required
              defaultValue={formState.charSet}
            />
          </FormControl>

          <FormControl>
            <InputLabel>Code Length</InputLabel>
            <OutlinedInput
              type="number"
              label="Code Length"
              name="codeLength"
              required
              defaultValue={formState.codeLength}
            />
          </FormControl>

          <FormControl>
            <InputLabel>Number Of Codes</InputLabel>
            <OutlinedInput
              type="number"
              label="Number Of Codes"
              name="codeCount"
              required
              defaultValue={formState.codeCount}
            />
          </FormControl>

          <Button variant="contained" type="submit">
            Generate
          </Button>
        </form>
      </main>

      <footer></footer>
    </section>
  );
}

export default App;
