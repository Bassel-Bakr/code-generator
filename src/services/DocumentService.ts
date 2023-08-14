import * as xlsx from "xlsx";

export class DocumentService {
  exportData(data: unknown[], fileName: string): void {
    const sheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, sheet);
    xlsx.writeFile(workbook, `${fileName}.xlsx`);
  }
}
