import { Genres } from '../BL.Common/enums/genres';
import { IArtist } from '../BL.Common/IArtist';
import { Album } from './album.entity';
import { Track } from './track.entity';

import {
    Entity,
    Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
    OneToMany,
    JoinColumn
} from 'typeorm';

@Entity('artists')
export class Artist implements IArtist
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    genre: Genres;

    @Column()
    formedYear: number;

    @Column()
    biography: string;

    @OneToMany(type => Album, album => album.artist)
    albums: Album[];

    @OneToMany(type => Track, track => track.artist)
    tracks: Track[];

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    modifiedAt: number;
}
