import {
  Button,
  InputLabel,
  OutlinedInput,
  FormControl,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { customAlphabet } from "nanoid";
import { FormEventHandler, useState } from "react";

import * as xlsx from "xlsx";

function App() {
  const [formState, setFormState] = useState({
    charSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    codeLength: 14,
    codeCount: 10,
  });

  const [codes, setCodes] = useState([] as { code: string }[]);

  const gridColumns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      sortable: true,
      colSpan: 2,
      filterable: true,
    },
  ];

  const handle: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as typeof formState;

    data.codeLength = Number(data.codeLength);
    data.codeCount = Number(data.codeCount);

    // return;
    const generator = customAlphabet(data.charSet, data.codeLength);

    const codes = Array.from({ length: data.codeCount }).map(() => ({
      code: generator(),
    }));

    setCodes(codes);
  };

  const exportCodes = (codes: { code: string }[]) => {
    const sheet = xlsx.utils.json_to_sheet(codes);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, sheet);
    xlsx.writeFile(workbook, `Codes ${new Date().toLocaleString()}.xlsx`);
  };

  return (
    <section className="w-screen h-screen">
      <header className="min-h-[20%]">
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

        <section className="grid h-[500px]">
          <DataGrid
            columns={gridColumns}
            rows={codes}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            getRowId={(row) => row.code}
            pageSizeOptions={[5, 10, 25, 50, 100, 250, 500, 1000]}
            filterMode="client"
          />
        </section>
        <Button variant="contained" onClick={() => exportCodes(codes)}>
          Export
        </Button>
      </main>

      <footer></footer>
    </section>
  );
}

export default App;
