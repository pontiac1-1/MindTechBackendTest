export class GetAlbumsRequest
{
    limit: number;
    page: number;
    orderBy: AlbumOrderTypes;
    orderDirection: OrderDirections;
    filterForTitle: string;
    filterForArtist: string;
}

export enum AlbumOrderTypes
{
    ALPHABETIC = 'title',
    FORMED_YEAR = 'formedYear',
}

export enum OrderDirections
{
    DESC = 'DESC',
    ASC = 'ASC',
}