import {MigrationInterface, QueryRunner} from "typeorm";

export class createArtistTable1618573463189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query( 
            "create table `artists` (`id` int auto_increment primary key, `name` varchar(255) not null, `genre` varchar(255) not null, `formedYear` datetime not null, `biography` varchar(255) not null, `createrAt` datetime(6) default CURRENT_TIMESTAMP(6) not null, `modifiedAt` datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6))"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            "drop `table` `artists`"
        )
    }

}
