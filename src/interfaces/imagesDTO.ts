interface Backdrop {
    aspect_ratio: number;
    file_path: string;
    height: number;
    width: number
}

interface Poster {
    aspect_ratio: number;
    file_path: string;
    height: number;
    width: number
}

export interface ImagesDTO {
    id: number;
    backdrops: Backdrop [];
    posters: Poster [];
}