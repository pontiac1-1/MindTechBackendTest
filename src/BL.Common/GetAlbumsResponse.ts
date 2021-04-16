import { Album } from "../DAL/album.entity";
import { IAlbum } from "./IAlbum";
import { IGetAlbumResponse } from "./IGetAlbumResponse";

export class GetAlbumsResponse implements IGetAlbumResponse
{
    album: IAlbum;
    numberOfTracks: number;
    durationInSec?: number;

    constructor(album: Album) 
    {
        this.album = {
            title: album.title,
            releaseDate: album.releaseDate,
            artist: album.artist,
            description: album.description,
            coverImageUrl: album.coverImageUrl
        };

        this.numberOfTracks = album.tracks.length;

        if(album.tracks.length > 0)
        {
            let duration = 0;
            album.tracks.forEach(track => {
                duration = duration + track.durationInSec;
            });
            this.durationInSec = duration;
        }
    }
}