import readlineSync from 'readline-sync';

enum State { 'Black' = 0, 'White' = 1 };

// First we read input from stdin
const bitmaps: State[][][] = readInput();
// Process and then log output
const result: string = processInput(bitmaps)
console.log(result);

// Read input from stdin
function readInput(): State[][][] {
    const nrTestCases: number = +readlineSync.question('');
    let bitmaps: State[][][] = [];
    for (let j: number = 0; j < nrTestCases; j++) {
        // @ts-ignore this is unfortunately regarded as an error by TS despite being valid
        const [ nrRows = 0 ]: [ nrRows: number ] = readlineSync.question('')
                                .split(' ')
                                .map((a: string): number => +a);
        let bitmap: State[][] = [];
        for(let i: number = 0; i < nrRows; i++) {
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
function processInput(bitmaps: State[][][]): string {
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
    return result
        // Format output
        .map((bitmap: number[][]): string => 
            // Make each row a string of numbers separated by spaces
            bitmap.map((row: number[]): string => row.join(' '))
                // Then join each row as a grid
                .join('\n')
        )
        // Join each bitmap with a line between
        .join('\n\n');
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
