import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './DAL/artist.entity';
import { Album } from './DAL/album.entity';
import { Track } from './DAL/track.entity';
import { ApiController } from './WEB/api.controller';
import { ArtistService } from './BL/artist.service';
import { Connection } from 'typeorm';
import { AlbumService } from './BL/album.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Artist, Album, Track])
  ],
  controllers: [ApiController, AppController],
  providers: [ArtistService, AlbumService, AppService],
})
export class AppModule
{
  constructor(private readonly connection: Connection) {}
}
