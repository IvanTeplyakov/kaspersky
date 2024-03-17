import React from 'react';
import { Upload } from 'antd';
import CustomButton from './Button';

interface LoadCsvProps {
    onCsvLoad: (content: string) => void;
}

const LoadCsv: React.FC<LoadCsvProps> = ({ onCsvLoad }) => {
    const handleCSVFile = (info: any) => {
        const file = info.file.originFileObj;
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = function (event) {
                const content = event.target?.result as string;
                onCsvLoad(content);
            };
            fileReader.readAsText(file);
        }
    };

    return (
        <div style={{
            marginBottom: "20px"
        }}>
            <Upload onChange={handleCSVFile} showUploadList={false}>
                <CustomButton text="Load"/>
            </Upload>
        </div>

    );
};

export default LoadCsv;
