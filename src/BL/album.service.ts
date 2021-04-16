import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "../DAL/album.entity";
import { FindManyOptions, Repository } from "typeorm";
import { GetAlbumsResponse } from "../BL.Common/GetAlbumsResponse";
import { GetAlbumResponse } from "../BL.Common/GetAlbumResponse";

@Injectable()
export class AlbumService
{
    constructor(
        @InjectRepository(Album) private readonly albumRepository: Repository<Album>
    ) {}

    private async findAlbum(id: number, albumRelations?: string[]): Promise<Album>
    {
        return await this.albumRepository.findOne(id, {relations: albumRelations})
            .then(
                (album: Album) => {

                    if(album === undefined) {
                        throw new HttpException('Album not found', 404)
                    };

                    return album;               
                } 
            )
    }

    public async getAlbumById(id: number): Promise<GetAlbumResponse>
    {   
        return await this.findAlbum(id, ['tracks'])
            .then(
                (album: Album) => {
                    return new GetAlbumResponse(album);
                }
            );

    }

    public async getAlbums(queryOptions: FindManyOptions): Promise<GetAlbumsResponse[]>
    {
        return await this.albumRepository.findAndCount(queryOptions)
            .then(
                (albums: [Album[], number]) => {
                    let albumsResponse: GetAlbumsResponse[] = [];

                    albums[0].forEach(album => {
                        albumsResponse.push(new GetAlbumsResponse(album));
                    });
                    
                    return albumsResponse;
                }
            )
    }
}