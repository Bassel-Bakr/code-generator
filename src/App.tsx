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
      <header className="flex items-center h-28 bg-blue-50 border border-b-slate-300">
        <h1 className="text-4xl font-bold">Code Generator</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 mx-auto">
        <form
          className="box-border p-2 grid grid-cols-2 grid-rows-[min-content] gap-6"
          onSubmit={handle}
        >
          <FormControl className="col-span-full">
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

          <Button
            variant="contained"
            type="submit"
            className="col-span-full self-end"
          >
            Generate
          </Button>
        </form>

        <section className="box-border p-2 grid h-[500px]">
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

          <Button
            variant="contained"
            className="self-end"
            onClick={() => exportCodes(codes)}
          >
            Export
          </Button>
        </section>
      </main>

      <footer></footer>
    </section>
  );
}

export default App;
