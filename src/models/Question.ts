export interface Question {
    id: number;
    userId: number;
    categoryId: number;
    title: string;
    description: string;
    time: Date;
}

export interface NewQuestion {
    id?: number;
    userId: number;
    categoryId: number;
    title: string;
    description: string;
}
