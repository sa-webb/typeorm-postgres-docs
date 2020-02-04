import { Photo } from './Photo';
import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @OneToMany(type => Photo, photo => photo.author)
    photos: Photo[];
}

/** a photo has one author, and each author can have many photos */
