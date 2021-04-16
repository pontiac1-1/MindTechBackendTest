import { Genres } from '../BL.Common/enums/genres';
import { ITrack } from '../BL.Common/ITrack';
import { Album } from './album.entity';
import { Artist } from './artist.entity';

import {
    Entity,
    PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
    ManyToOne
} from 'typeorm';

@Entity('tracks')
export class Track implements ITrack
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => Album, album => album.tracks, { onDelete: 'CASCADE'})
    album: Album;

    @ManyToOne(type => Artist, artist => artist.tracks, { onDelete: 'CASCADE'})
    artist: Artist;

    @Column()
    durationInSec: number;

    @Column()
    genre: Genres;
    
    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    modifiedAt: number;
}