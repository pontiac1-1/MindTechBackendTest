import { Artist } from "src/DAL/artist.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Genres } from "./enums/genres";

export class UpdateArtistRequest implements QueryDeepPartialEntity<Artist>
{
    name: string;
    genre: Genres;
    formedYear: number;
    biography: string;
}