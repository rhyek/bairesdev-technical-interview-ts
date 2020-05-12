import React from 'react';
import styled from 'styled-components';
import { spacing } from '../consts/general';
import { AlbumArtDto } from '../models/AlbumArtDto';
import AlbumArt from './AlbumArt';

const Main = styled.li`
  padding: ${spacing}px;
  &:not(:last-child) {
    margin-bottom: ${spacing}px;
  }
`;

const AlbumArtList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: ${spacing}px;
  padding-bottom: ${spacing}px;
  border-bottom: 1px solid white;
  font-size: 1.1em;
`;

export interface AlbumProps {
  albumId: number;
  albumArts: AlbumArtDto[];
  color: string;
}

const Album = React.memo(({ albumId, albumArts, color }: AlbumProps) => {
  return (
    <Main style={{ backgroundColor: color }}>
      <Title>Album id: {albumId}</Title>
      <AlbumArtList>
        {albumArts.map((albumArt) => (
          <AlbumArt key={albumArt.id} albumArt={albumArt} />
        ))}
      </AlbumArtList>
    </Main>
  );
});

export default Album;
