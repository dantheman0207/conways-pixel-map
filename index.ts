var readlineSync = require('readline-sync');

enum State { 'Black' = 0, 'White' = 1 };

function readInput(): State[][][] {
    const nrTestCases: number = +readlineSync.question('');
    let bitMaps: State[][][] = [];
    for (let j: number = 0; j < nrTestCases; j++) {
        const [ nrRows ]: [ nrRows: number ] = readlineSync.question('')
                                .split(' ')
                                .map((a: string): number => +a);
        let bitMap: State[][] = [];
        for(let i: number = 0; i < nrRows; i++) {
            let newLine: State[] = readlineSync.question('')
                            .split('')
                            .map((a: string): State => +a);
            bitMap.push(newLine);
        }
        bitMaps.push(bitMap);
        readlineSync.question('');
    }
    return bitMaps;
}

function processInput(bitMaps: State[][][]): number[][][] {
    // Create 2D array initialized to Infinity for each test case
    let result: number[][][] = bitMaps.map((bitMap: State[][]): number[][] => {
        return bitMap.map((row: State[]): number[] => {
            return row.map((state: State): number => Infinity);
        })
    });

    // For each white pixel run our update function
    bitMaps.forEach((bitMap: State[][], testCase: number) => {
        bitMap.forEach((row: State[], y: number) => {
            row.forEach((state: State, x: number) => {
                if(state == State['White']) {
                    result[testCase] = mutateNeighbors(result[testCase], x, y);
                }
            })
        });
    });
    return result;
}

function mutateNeighbors(bitMap: number[][], x: number, y: number): number[][] {
    bitMap[y][x] = 0;
    return bitMap.map((row: number[], j: number): number[] => {
        return row.map((_, i: number): number => {
            return Math.min(bitMap[j][i], distance(x,y,i,j));
        })
    });
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}

const bitMaps: State[][][] = readInput();
const result: string = processInput(bitMaps)
                        .map((bitMap: number[][]): string => 
                            // Make each row a string of numbers separated by spaces
                            bitMap.map((row: number[]): string => row.join(' '))
                                // Then join each row as a grid
                                .join('\n')
                        )
                        // Join each bitmap with a line between
                        .join('\n\n');

console.log(result);