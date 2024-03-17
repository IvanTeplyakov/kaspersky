import React from 'react';
import { Table } from 'antd';
import CustomButton from './Button';
import UseSelectedWords from '../hooks/UseSelectedWords';
import './TableData.css'

interface TableDataProps {
    CSVData: string[];
}

const TableData: React.FC<TableDataProps> = ({ CSVData }) => {
    const { selectedWords, handleWordClick, handleSave } = UseSelectedWords(CSVData);
    const filteredData = CSVData.filter(item => item.trim() !== '');

    const dataSource = filteredData.map((item, index) => ({
        key: index.toString(),
        text: item,
        id: index + 1,
    }));

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Text",
            dataIndex: "text",
            key: "text",
            render: (text: string, record: any) => (
                <span>
                    {text.split(' ').map((word: string, index: number) => (
                        <span
                            key={index}
                            className={`text ${selectedWords[record.key]?.includes(word) ? 'active' : undefined}`}
                            onClick={() => handleWordClick(record.key, word)}
                        >
                            {word}{' '}
                        </span>
                    ))}
                </span>
            )
        }
    ];
    // textDecoration: selectedWords[record.key]?.includes(word) ? 'underline' : 'none'

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{
                marginBottom: "20px"
            }}>
                {CSVData.length > 0 && (
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                )}
            </div>
            {Object.keys(selectedWords).some(key => selectedWords[key].length > 0) && ( // Проверяем, есть ли хотя бы одно выделенное слово
                <div>
                    <CustomButton text={'Save'} onClick={handleSave} />
                </div>
            )}
        </div>
    );
};

export default TableData;
