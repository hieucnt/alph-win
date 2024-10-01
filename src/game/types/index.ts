export enum STATUS {
    EMPTY = "empty",
    OCCUPIED = "occupied",
    MY_SEAT = "my_seat",
}

export interface SEAT {
    id: number;
    status: STATUS;
    amount: number;
}

export enum RESULT {
    WIN = "win",
    LOSE = "lose",
}
