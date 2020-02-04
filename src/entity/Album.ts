import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Album {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Photo, photo => photo.albums)
    @JoinTable()
    photos: Photo[];
}
/** A photo can be in many albums, and each album can contain many photos */

/** @JoinTable is required to specify that this is the owner side of the relationship */