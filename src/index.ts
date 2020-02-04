import { createConnection } from 'typeorm';
import { Photo } from './entity/Photo';
import { PhotoMetadata } from './entity/PhotoMetadata';
import { Album } from './entity/Album';

createConnection()
  .then(async connection => {
    /** CREATE */
    let album1 = new Album();
    album1.name = 'Bears';
    await connection.manager.save(album1);

    let album2 = new Album();
    album2.name = 'Me';
    await connection.manager.save(album2);

    let photo = new Photo();
    photo.name = 'Bears and My';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;
    photo.albums = [album1, album2];

    let metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = 'cybershoot';
    metadata.orientation = 'portait';

    photo.metadata = metadata; // connects them

    let photoRepository = connection.getRepository(Photo);

    await photoRepository.save(photo);

    /** FIND via QueryBuilder */
    let photos = await connection
      .getRepository(Photo)
      .createQueryBuilder('photo')
      .innerJoinAndSelect('photo.metadata', 'metadata')
      .getMany();
    console.log(photos);

    let photoAlbums = await connection
    .getRepository(Photo)
    .createQueryBuilder("photo") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .innerJoinAndSelect("photo.metadata", "metadata")
    .leftJoinAndSelect("photo.albums", "album")
    .where("photo.isPublished = true")
    .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
    .orderBy("photo.id", "DESC")
    .skip(5)
    .take(10)
    .setParameters({ photoName: "My", bearName: "Mishka" })
    .getMany();
    console.log(photoAlbums);

    /** UPDATE */
    // let photoToUpdate = await photoRepository.findOne(1);
    // photoToUpdate.name = "Me, my friends and polar bears";
    // await photoRepository.save(photoToUpdate);

    /** DELETE */
    // let photoToRemove = await photoRepository.findOne(1);
    // await photoRepository.remove(photoToRemove);
  })
  .catch(error => console.log(error));
