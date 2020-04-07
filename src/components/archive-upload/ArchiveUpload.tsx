import React, { FunctionComponent } from 'react';

export interface ArchiveUploadProps {
    setLines: (lines: string[]) => void
}


/**
 * Read up to and including |maxlines| lines from |file|.
 *
 * @param {Blob} file - The file to be read.
 * @param {integer} maxLines - The maximum number of lines to read.
 * @param {function(string)} forEachLine - Called for each line.
 * @param {function(error)} onComplete - Called when the end of the file
 *     is reached or when |maxlines| lines have been read.
 */
function readLines(
    file: File, 
    maxLines: number, 
    forEachLine: (line: string) => void, 
    onComplete: (error?: DOMException | null) => void
) {
    const CHUNK_SIZE = 50000; // 50kb, arbitrarily chosen.
    const decoder = new TextDecoder();
    let offset = 0;
    let linecount = 0;
    let results = '';
    const fr = new FileReader();

    fr.onload = function() {
        // Use stream:true in case we cut the file
        // in the middle of a multi-byte character
        results += decoder.decode(fr.result as ArrayBuffer, {stream: true});
        var lines = results.split('\n');
        results = lines.pop() as string; // In case the line did not end yet.
        linecount += lines.length;
    
        if (linecount > maxLines) {
            // Read too many lines? Truncate the results.
            lines.length -= linecount - maxLines;
            linecount = maxLines;
        }
    
        for (var i = 0; i < lines.length; ++i) {
            forEachLine(lines[i] + '\n');
        }

        offset += CHUNK_SIZE;
        seek();
    };
    fr.onerror = function() {
        onComplete(fr.error);
    };
    seek();
    
    function seek() {
        if (linecount === maxLines) {
            // We found enough lines.
            onComplete(); // Done.
            return;
        }
        if (offset !== 0 && offset >= file.size) {
            // We did not find all lines, but there are no more lines.
            forEachLine(results); // This is from lines.pop(), before.
            onComplete(); // Done
            return;
        }
        var slice = file.slice(offset, offset + CHUNK_SIZE);
        fr.readAsArrayBuffer(slice);
    }
}

export const ArchiveUpload: FunctionComponent<ArchiveUploadProps>  = (props) => {

    let fileReader: FileReader;

    const handleFileChosen = (file: File) => {
        fileReader = new FileReader();
        const lines: string[] = [];

        readLines(
            file,
            1000000000,
            (line) => {
                // console.log(line);
                lines.push(line);
            },
            (error) => {
                if (error) {
                   throw error;
                } else {
                    console.log(`read ${lines.length} lines.`);
                    props.setLines([...lines]);
                }
            }
        );
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
