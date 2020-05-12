import React from 'react';
import styled from 'styled-components';
import { AlbumArtDto } from '../models/AlbumArtDto';
import { spacing } from '../consts/general';

const Main = styled.li`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-right: ${spacing}px;
  }
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: ${spacing}px;
  font-size: 1.05em;
  flex: 1;
`;

export interface AlbumArtProps {
  albumArt: AlbumArtDto;
}

const AlbumArt = React.memo(({ albumArt }: AlbumArtProps) => {
  return (
    <Main>
      <Title>
        {albumArt.id}: {albumArt.title}
      </Title>
      <img src={albumArt.thumbnailUrl} />
    </Main>
  );
});

export default AlbumArt;
