import { useState } from 'react';

const UseSelectedWords = (CSVData: string[]) => {
    const [selectedWords, setSelectedWords] = useState<{ [key: string]: string[] }>({});

    const handleWordClick = (key: string, word: string) => {
        const recordSelectedWords = selectedWords[key] || [];
        const index = recordSelectedWords.indexOf(word);
        let newSelectedWords: string[] = [];

        if (index === -1) {
            newSelectedWords = [...recordSelectedWords, word];
        } else {
            recordSelectedWords.splice(index, 1);
            newSelectedWords = [...recordSelectedWords];
        }

        setSelectedWords({
            ...selectedWords,
            [key]: newSelectedWords
        });
    };

    const handleSave = () => {
        const lines = CSVData.map((item, index) => {
            const selectedWordsStr = selectedWords[index.toString()];
            if (selectedWordsStr && selectedWordsStr.length > 0) {
                return selectedWordsStr.join('|');
            }
            return null;
        }).filter(Boolean);

        const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'selected_words.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return { selectedWords, handleWordClick, handleSave };
};

export default UseSelectedWords;
