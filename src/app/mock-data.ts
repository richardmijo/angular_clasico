export interface Song {
    id: number;
    title: string;
    artist: string;
    cover: string;
}

export const MOCK_SONGS: Song[] = Array.from({ length: 3000 }, (_, i) => ({
    id: i + 1,
    title: `Song Title ${i + 1} - ${Math.random().toString(36).substring(7)}`,
    artist: `Artist ${Math.floor(Math.random() * 500)}`,
    cover: `https://placehold.co/50x50?text=${i + 1}`
}));
