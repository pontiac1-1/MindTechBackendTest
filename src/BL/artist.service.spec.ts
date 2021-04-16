import { Test } from '@nestjs/testing';
import { ApiController } from '../WEB/api.controller';
import { ArtistService } from './artist.service';
import { Artist } from '../DAL/artist.entity';
import { Album } from '../DAL/album.entity';
import { Track } from '../DAL/track.entity';
import { GetArtistResponse } from '../BL.Common/GetArtistResponse';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlbumService } from './album.service';

describe('ArtistService', () => {
    let artistService: ArtistService;
    let albumService: AlbumService;
    let apiController: ApiController;

    enum Genres
    {
        POP_ROCK ='Pop-Rock',
        ROCK = 'Rock',
        METAL = 'Metal',
        NOT_REALLY_MUSIC = 'some 21st century bullshit',
    }

    const mockArtistRepository = {
        data: [
            {
                id: 1,
                name: 'Tom Petty and The Heartbrakers',
                genre: Genres.POP_ROCK,
                biography: 'bio',
                formedYear: new Date,
                albums: [],
                tracks: [],
                createdAt: Number(Date.now),
                modifiedAt: Number(Date.now)
            }
        ],

        async findOne(id): Promise<Artist> {
            return await this.data[id];
        },
        
        async count() {
            return 0;
        },

        async insert(record) {
            this.data.push({
                id: 2,
                name: 'Tom Petty and The Heartbrakers',
                genre: Genres.POP_ROCK,
                biography: 'bio',
                formedYear: new Date,
                albums: [],
                tracks: [],
                createdAt: Number(Date.now),
                modifiedAt: Number(Date.now)
            });
            return {identifiers: [{userId: record.user_id}]};
        },
    }

    const mockAlbumRepository = {};


    let mockAlbums: Album[] = [
        
    ]

    let mockTracks: Track[] = [

    ]
    
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ApiController],
            providers: [
                ArtistService,
                AlbumService,
                {
                    provide: getRepositoryToken(Artist),
                    useValue: mockArtistRepository
                },
                {
                    provide: getRepositoryToken(Album),
                    useValue: mockAlbumRepository
                }
            ]
        }).compile();

        artistService = module.get<ArtistService>(ArtistService);
        albumService = module.get<AlbumService>(AlbumService);
        apiController = module.get<ApiController>(ApiController);
    });

    describe('getArtistById', () => {
        it('should return an artist', async () => {
            const mockId: number = 0;
            const mockArtistResult = await mockArtistRepository.findOne(mockId);
            const mockResult = new GetArtistResponse(mockArtistResult);
            jest.spyOn(artistService, 'getArtistById').mockImplementation(async () => mockResult);

            expect(await apiController.getArtist(mockId)).toBe(mockResult)
        })
    })

})