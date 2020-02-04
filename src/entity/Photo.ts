import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  ManyToMany
} from 'typeorm';
import { PhotoMetadata } from './PhotoMetadata';
import { Author } from './Author';
import { Album } from './Album';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  /** Cascade - if one object of the relationship is saved, it will save the other */
  @OneToOne(
    type => PhotoMetadata,
    photoMetadata => photoMetadata.photo,
    {
      cascade: true
    }
  )
  metadata: PhotoMetadata;

  @ManyToOne(
    type => Author,
    author => author.photos
  )
  author: Author;
  
  @ManyToMany(type => Album, album => album.photos)
    albums: Album[];

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('integer')
  views: number;

  @Column()
  isPublished: boolean;
}
