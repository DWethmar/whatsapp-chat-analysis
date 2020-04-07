import React, { FunctionComponent } from 'react';

export interface ArchiveUploadProps {
    setFile: (file: File) => void
}

export const ArchiveUpload: FunctionComponent<ArchiveUploadProps>  = (props) => {

    const handleFileChosen = (file: File) => {
        props.setFile(file);
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
