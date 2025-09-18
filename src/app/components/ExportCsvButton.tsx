'use client';

import React from 'react';

type EanArray = string[];
type ExportCSVFunction = (eanArray: EanArray) => Promise<void>;

interface ExportCsvButtonProps {
    eanArray: EanArray;
    exportCSV: ExportCSVFunction;
}

export default function ExportCsvButton({ eanArray, exportCSV }: ExportCsvButtonProps) {
    return (
        <button onClick={() => exportCSV(eanArray)}>
            Export CSV
        </button>
    );
}
