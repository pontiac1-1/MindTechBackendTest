import { Body, Controller, Delete, Get, Header, Post, Put, Query } from "@nestjs/common";
import { GetArtistsRequest, OrderDirections, ArtistOrderTypes } from "../WEB.Common/GetArtistsRequest";
import { Between, FindManyOptions, Like } from "typeorm";
import { AlbumService } from "../BL/album.service";
import { ArtistService } from "../BL/artist.service";
import { GetArtistResponse } from "../BL.Common/GetArtistResponse";
import { UpdateArtistRequest } from "../BL.Common/UpdateArtistRequest";
import { GetAlbumsResponse } from "../BL.Common/GetAlbumsResponse";
import { GetAlbumsRequest, AlbumOrderTypes } from "../WEB.Common/GetAlbumsRequest";
import { GetAlbumResponse } from "../BL.Common/GetAlbumResponse";

@Controller()
export class ApiController {
    constructor(
        private readonly artistService: ArtistService,
        private readonly albumService: AlbumService
    ) {}

    /**
     * Gets artist by id
     * @param id 
     */
    @Get('/artist')
    async getArtist(@Query('id') id: number): Promise<GetArtistResponse>
    {
        return this.artistService.getArtistById(id);
    }

    /**
     * Gets, orders and filters artists by query
     * @param request 
     */
    @Post('/artists')
    @Header('Content-Type', 'application/json')
    async getArtists(@Body() request: GetArtistsRequest): Promise<GetArtistResponse[]>
    {
        const limit = request.limit || 10;
        const page = request.page || 1;
        const nameFilter = request.filterForName || '';
        const genreFilter = request.filterForGenre || '';
        const orderDirection = request.orderDirection || OrderDirections.DESC;
        let orderQuery = null;

        if(request.orderBy != null && request.orderBy == ArtistOrderTypes.ALPHABETIC)
        {
            orderQuery = { name: orderDirection }
        } else if(request.orderBy != null)
        {
            orderQuery = { formedYear: orderDirection }
        }

        let queryOptions: FindManyOptions = {
            where: { name: Like('%' + nameFilter + '%'), genre: Like('%' + genreFilter + '%')},
            order: orderQuery,
            take: limit,
            skip: (page - 1) * limit,
            relations: ['albums']
        }

        return this.artistService.getArtists(queryOptions);
    }

    /**
     * Updates an artist
     * @param id 
     * @param request 
     */
    @Put('/artist')
    @Header('Content-Type', 'application/json')
    async updateArtist(@Query('id') id: number, @Body() request: UpdateArtistRequest)
    {
        return this.artistService.updateArtist(id, request);
    }

    /**
     * Delete artist and deletes albums and tracks associated with it
     */
    @Delete('/artist')
    async deleteArtist(@Query('id') id): Promise<any>
    {
        return this.artistService.deleteArtist(id);
    }


    /**
     * Gets album by id
     * @param id 
     */
    @Get('/album')
    async getAlbum(@Query('id') id: number): Promise<GetAlbumResponse>
    {
        return this.albumService.getAlbumById(id);
    }

    /**
     * Gets, orders and filters albums by query
     * @param request 
     */
    @Post('/albums')
    @Header('Content-Type', 'application/json')
    async getAlbums(@Body() request: GetAlbumsRequest): Promise<GetAlbumsResponse[]>
    {
        const limit = request.limit || 10;
        const page = request.page || 1;
        const titleFilter = request.filterForTitle || '';
        const artistFilter = request.filterForArtist || '';
        const orderDirection = request.orderDirection || OrderDirections.DESC;
        let orderQuery = null;

        if(request.orderBy != null && request.orderBy == AlbumOrderTypes.ALPHABETIC)
        {
            orderQuery = { title: orderDirection }
        } else if(request.orderBy != null)
        {
            orderQuery = { formedYear: orderDirection }
        }

        let queryOptions: FindManyOptions = {
            where: { title: Like('%' + titleFilter + '%'), artist: Like('%' + artistFilter + '%')},
            order: orderQuery,
            take: limit,
            skip: (page - 1) * limit,
            relations: ['tracks', 'artist']
        }

        return this.albumService.getAlbums(queryOptions);
    }

}
