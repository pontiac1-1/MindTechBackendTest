import { identity } from "rxjs";
import { Artist } from "../DAL/artist.entity";
import { IArtist } from "./IArtist";
import { IGetArtistResponse } from "./IGetArtistResponse";

export class GetArtistResponse implements IGetArtistResponse
{
    artist: IArtist;
    numberOfAlbums?: number;

    constructor(artist: Artist) {
        this.artist = {
            name: artist.name,
            genre: artist.genre,
            formedYear: artist.formedYear,
            biography: artist.biography
        }
        if(artist.albums.length > 0) {
            this.numberOfAlbums = artist.albums.length;
        }
    }
}