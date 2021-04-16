import { IArtist } from "./IArtist";

export interface IAlbum
{
    title: string;
    releaseDate: Date;
    artist: IArtist;
    description: string;
    coverImageUrl: string;
}