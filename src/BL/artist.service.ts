import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetArtistResponse } from "../BL.Common/GetArtistResponse";
import { Artist } from "../DAL/artist.entity";
import { FindManyOptions, Repository, UpdateResult } from "typeorm";
import { IArtist } from "src/BL.Common/IArtist";
import { UpdateArtistRequest } from "src/BL.Common/UpdateArtistRequest";

@Injectable()
export class ArtistService
{
    constructor(
        @InjectRepository(Artist) private readonly artistRepository: Repository<Artist>
    ) {}

    private async findArtist(id: number, artistRelations?: string[]): Promise<Artist>
    {
        return await this.artistRepository.findOne(id, {relations: artistRelations})
            .then(
                (artist: Artist) => {

                    if(artist === undefined) {
                        throw new HttpException('Artist not found', 404)
                    };

                    return artist;               
                } 
            )
    }

    public async getArtistById(id: number): Promise<GetArtistResponse>
    {   
        return await this.findArtist(id, ['albums', 'tracks'])
            .then(
                (artist: Artist) => {
                    return new GetArtistResponse(artist);
                }
            );
    }

    public async getArtists(queryOptions: FindManyOptions): Promise<GetArtistResponse[]>
    {
        return await this.artistRepository.findAndCount(queryOptions)
            .then(
                (artists: [Artist[], number]) => {
                    let artistsResponse: GetArtistResponse[] = [];

                    artists[0].forEach(artist => {
                        artistsResponse.push(new GetArtistResponse(artist));
                    });
                    
                    return artistsResponse;
                }
            )
    }

    public async updateArtist(id: number, updatedValues: UpdateArtistRequest)
    {
        const artistToUpdate = await this.findArtist(id);

        const updatedArtist = await this.artistRepository.update(
            artistToUpdate.id,
            updatedValues
        );

        console.log(updatedArtist);
    };

    public async deleteArtist(id: number): Promise<any>
    {
        return await this.artistRepository.delete(id);
    }
}