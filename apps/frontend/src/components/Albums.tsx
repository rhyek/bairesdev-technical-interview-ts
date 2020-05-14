import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { spacing } from "../consts/general";
import { AlbumArtDto } from "../models/AlbumArtDto";
import Album from "./Album";

const Title = styled.h1`
  padding: ${spacing}px;
  padding-bottom: 0;
  margin: 0;
`;

const AlbumList = styled.ul`
  padding: ${spacing}px;
  margin: 0;
  list-style: none;
`;

// const mockedAlbumArts = [
//   {
//     albumId: 2,
//     id: 1,
//     title: 'accusamus beatae ad facilis cum similique qui sunt',
//     url: 'https://via.placeholder.com/600/92c952',
//     thumbnailUrl: 'https://via.placeholder.com/150/92c952',
//   },
//   {
//     albumId: 2,
//     id: 2,
//     title: 'reprehenderit est deserunt velit ipsam',
//     url: 'https://via.placeholder.com/600/771796',
//     thumbnailUrl: 'https://via.placeholder.com/150/771796',
//   },
//   {
//     albumId: 7,
//     id: 3,
//     title: 'officia porro iure quia iusto qui ipsa ut modi',
//     url: 'https://via.placeholder.com/600/24f355',
//     thumbnailUrl: 'https://via.placeholder.com/150/24f355',
//   },
//   {
//     albumId: 5,
//     id: 4,
//     title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
//     url: 'https://via.placeholder.com/600/d32776',
//     thumbnailUrl: 'https://via.placeholder.com/150/d32776',
//   },
//   {
//     albumId: 1,
//     id: 5,
//     title: 'natus nisi omnis corporis facere molestiae rerum in',
//     url: 'https://via.placeholder.com/600/f66b97',
//     thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
//   },
// ];

export default function Albums() {
  const [albumArts, setAlbumArts] = useState<AlbumArtDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setAlbumArts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const albums = useMemo(() => {
    const groups: Record<string, AlbumArtDto[]> = {};
    for (const albumArt of albumArts) {
      const id = albumArt.albumId;
      if (!groups[id]) {
        groups[id] = [];
      }
      groups[id].push(albumArt);
    }
    return groups;
  }, [albumArts]);

  const lastThreeAlbums = useMemo(() => {
    const sortedKeys = Object.keys(albums).sort((a, b) => {
      return parseInt(b) - parseInt(a);
    });
    const firstThree = sortedKeys.slice(0, 3);
    console.log("sorted keys", firstThree);
    const lastAlbums: Record<string, AlbumArtDto[]> = {};
    for (const id of firstThree) {
      lastAlbums[id] = albums[id];
    }
    return { keys: firstThree, data: lastAlbums };
  }, [albums]);

  const finalData = useMemo(() => {
    const { keys, data } = lastThreeAlbums;
    const shortened = [];
    for (const id of keys) {
      const albumArts = data[id];
      const orderedAlbumArts = albumArts.sort((a, b) => {
        return b.id - a.id;
      });
      const trimmed = orderedAlbumArts.slice(0, 2);
      shortened.push({ id, albumArts: trimmed });
    }
    return shortened;
  }, [lastThreeAlbums]);

  const colors = ["green", "blue", "purple"];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title>Albums</Title>
      <AlbumList>
        {finalData.map(({ id, albumArts }, index) => (
          <Album
            key={id}
            albumId={parseInt(id)}
            albumArts={albumArts}
            color={colors[index]}
          />
        ))}
      </AlbumList>
    </>
  );
}
