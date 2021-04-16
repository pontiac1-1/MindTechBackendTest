import { IAlbum } from '../BL.Common/IAlbum';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

import {
    Entity,
    Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

@Entity('albums')
export class Album implements IAlbum
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    releaseDate: Date;

    @ManyToOne(type => Artist, artist => artist.albums, { onDelete: 'CASCADE'})
    artist: Artist;

    @OneToMany(type => Track, track => track.album)
    tracks: Track[];

    @Column()
    description: string;

    @Column()
    coverImageUrl: string;

    @CreateDateColumn()
    createdAt: number;

    @UpdateDateColumn()
    modifiedAt: number;
}