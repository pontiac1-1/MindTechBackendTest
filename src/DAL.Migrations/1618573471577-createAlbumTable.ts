import { query } from "express";
import {MigrationInterface, QueryRunner} from "typeorm";

export class createAlbumTable1618573471577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            "create table `album` (`id` int auto_increment primary key, `title` varchar(255) not null, `releaseDate` datetime not null, `description` varchar(255) not null, `coverImageUrl` varchar(255) not null, `createdAt` datetime(6) default CURRENT_TIMESTAMP(6) not null, `modifiedAt` datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6), `artistId` int null, `constraint` FK_3d06f25148a4a880b429e3bc839 foreign key (artistId) references artist (id) on delete cascade)"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            "drop table `albums`"
        );
    }

}
