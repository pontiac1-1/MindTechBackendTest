import { Album } from "src/DAL/album.entity";
import { IAlbum } from "./IAlbum";
import { IGetAlbumResponse } from "./IGetAlbumResponse";

export class GetAlbumResponse implements IGetAlbumResponse
{
    album: IAlbum;
    tracks: TarckData[];

    constructor(album: Album)
    {
        this.album = {
            title: album.title,
            releaseDate: album.releaseDate,
            artist: album.artist,
            description: album.description,
            coverImageUrl: album.coverImageUrl
        }
        
        if(album.tracks.length > 0)
        {
            this.tracks = [];
            album.tracks.forEach(track => {
                this.tracks.push(
                    {
                        title: track.title,
                        duration: track.durationInSec,
                        genre: track.genre
                    }
                )
            });
        }
    }
}

class TarckData
{
    title: string;
    duration: number;
    genre: string;
}