import { Button, InputLabel, OutlinedInput, FormControl } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "./Context";

type FormData = {
  charSet: string;
  codeLength: number;
  codeCount: number;
};

type Code = {
  code: string;
};

function App() {
  const { documentService, codeService, storageService } = useContext(Context);

  const [codes, setCodes] = useState<Code[]>([]);

  const defaultState: FormData = {
    charSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    codeLength: 14,
    codeCount: 100,
  };

  const defaultValues: FormData = {
    ...defaultState,
    ...storageService.readObject<FormData>("form"),
  };

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues,
  });

  const gridColumns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      sortable: true,
      colSpan: 2,
      filterable: true,
      cellClassName: "cell",
    },
  ];

  const handleForm = (data: FormData) => {
    storageService.write("form", data);

    const generateCode = codeService.createGenerator(
      data.charSet,
      data.codeLength
    );

    const codes: Code[] = Array.from({ length: data.codeCount }, () => ({
      code: generateCode(),
    }));

    setCodes(codes);
  };

  const resetForm = () => {
    reset(defaultState);
    storageService.clear();
  };

  const exportCodes = (codes: Code[]) => {
    documentService.exportData(codes, `Codes ${new Date().toLocaleString()}`);
  };

  return (
    <section className="w-screen">
      <header className="flex items-center h-28 bg-blue-50 border border-b-slate-300">
        <h1 className="text-4xl font-bold">Code Generator</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
        <form
          className="box-border p-2 grid grid-cols-2 grid-rows-[min-content] gap-6"
          onSubmit={handleSubmit((data) => handleForm(data))}
        >
          <FormControl className="col-span-full">
            <InputLabel>Character Set</InputLabel>
            <OutlinedInput
              type="text"
              label="Character Set"
              {...register("charSet")}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>Code Length</InputLabel>
            <OutlinedInput
              type="number"
              label="Code Length"
              {...register("codeLength", { valueAsNumber: true, min: 1 })}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>Number Of Codes</InputLabel>
            <OutlinedInput
              type="number"
              label="Number Of Codes"
              {...register("codeCount", { valueAsNumber: true, min: 1 })}
              required
            />
          </FormControl>

          <div className="col-span-full grid grid-cols-2 gap-6 self-end">
            <Button
              variant="contained"
              color="warning"
              type="button"
              onClick={() => resetForm()}
            >
              Reset
            </Button>

            <Button variant="contained" type="submit">
              Generate
            </Button>
          </div>
        </form>

        <section className="box-border p-2 grid h-[760px]">
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
