export type Holiday = {
    name: string;
    description: string;
};

export type HolidaysData = {
    [key: string]: Holiday[];
};
