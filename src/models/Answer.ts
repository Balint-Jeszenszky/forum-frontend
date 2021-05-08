export interface Answer {
    id: number;
    userId: number;
    questionId: number;
    time: Date;
    text: string;
}

export interface NewAnswer {
    userId: number;
    questionId: number;
    text: string;
}
