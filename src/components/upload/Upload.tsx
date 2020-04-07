import React from 'react';

export const Upload = () => {

    let fileReader: FileReader;

    const handleFileRead = () => {
        const content = fileReader.result;
        console.log(content);
    }

    const handleFileChosen = (file: File) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }

    return (
        <div>
            <input type="file"
            id="file"
            className="input-file"
            accept=".txt"
            onChange={
                e => !!e.target && !!e.target.files && handleFileChosen(
                    e.target.files[0]
                )
            }
        />
        </div>
    );
}
