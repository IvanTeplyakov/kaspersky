import React, { useState } from 'react';
import LoadCSV from './LoadCSV';
import TableData from './TableData';

const DisplayCSV: React.FC = () => {
    const [CSVData, setCSVData] = useState<string[]>([]);

    const handleCsvLoad = (content: string) => {
        const csvArray = content.split('\n');
        setCSVData(csvArray);
    };

    return (
        <div style={{
            display:"flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <LoadCSV onCsvLoad={handleCsvLoad}/>
            <TableData CSVData={CSVData} />
        </div>
    );
};

export default DisplayCSV;
