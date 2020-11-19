export interface IPublication {
    id: string;
    date: Date;
    title: string;
    titlePhoto?:string;
    slidePhotos?:string[];
    tempLogo?: string;
    tempPhotos?: string[];
}