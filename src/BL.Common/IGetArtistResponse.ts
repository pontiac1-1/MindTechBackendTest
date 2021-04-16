import { IArtist } from "./IArtist";

export interface IGetArtistResponse
{
    artist: IArtist;
    numberOfAlbums?: number;
}