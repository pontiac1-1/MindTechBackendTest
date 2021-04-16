import { Genres } from "./enums/genres";
import { IAlbum } from "./IAlbum";
import { IArtist } from "./IArtist";

export interface ITrack
{
    title: string;
    album: IAlbum;
    artist: IArtist;
    durationInSec: number;
    genre: Genres;
}