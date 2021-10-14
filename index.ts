var readlineSync = require('readline-sync');

enum State { 'Black' = 0, 'White' = 1 };

// Read input from stdin
function readInput(): State[][][] {
    const nrTestCases: number = +readlineSync.question('');
    let bitmaps: State[][][] = [];
    for (const j: number = 0; j < nrTestCases; j++) {
        const [ nrRows ]: [ nrRows: number ] = readlineSync.question('')
                                .split(' ')
                                .map((a: string): number => +a);
        let bitmap: State[][] = [];
        for(const i: number = 0; i < nrRows; i++) {
            const newLine: State[] = readlineSync.question('')
                            .split('')
                            .map((a: string): State => +a);
            bitmap.push(newLine);
        }
        bitmaps.push(bitmap);
        readlineSync.question('');
    }
    return bitmaps;
}

// Given an array of bitmaps, process each and return array of processed bitmaps
function processInput(bitmaps: State[][][]): number[][][] {
    // Create 2D array initialized to Infinity for each bitmap
    let result: number[][][] = bitmaps.map((bitmap: State[][]): number[][] => {
        return bitmap.map((row: State[]): number[] => {
            return row.map((state: State): number => Infinity);
        })
    });

    // For each white pixel run our update function
    bitmaps.forEach((bitmap: State[][], testCase: number) => {
        bitmap.forEach((row: State[], y: number) => {
            row.forEach((state: State, x: number) => {
                if(state == State['White']) {
                    result[testCase] = mutateNeighbors(result[testCase], x, y);
                }
            })
        });
    });
    return result;
}

// Given a white pixel, iterate over entire bitmap and update distance for each
//  pixel (if new distance is shorter than previous)
function mutateNeighbors(bitmap: number[][], x: number, y: number): number[][] {
    bitmap[y][x] = 0;
    return bitmap.map((row: number[], j: number): number[] => {
        return row.map((current: number, i: number): number => {
            return Math.min(current, distance(x,y,i,j));
        })
    });
}

// Calculate distance between two pixels
function distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}

const bitmaps: State[][][] = readInput();
const result: string = processInput(bitmaps)
                        .map((bitmap: number[][]): string => 
                            // Make each row a string of numbers separated by spaces
                            bitmap.map((row: number[]): string => row.join(' '))
                                // Then join each row as a grid
                                .join('\n')
                        )
                        // Join each bitmap with a line between
                        .join('\n\n');

console.log(result);