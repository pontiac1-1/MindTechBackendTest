export class GetArtistsRequest
{
    limit: number;
    page: number;
    orderBy: ArtistOrderTypes;
    orderDirection: OrderDirections;
    filterForName: string;
    filterForGenre: string;
}

export enum ArtistOrderTypes
{
    ALPHABETIC = 'name',
    FORMED_YEAR = 'formedYear',
}

export enum OrderDirections
{
    DESC = 'DESC',
    ASC = 'ASC',
}