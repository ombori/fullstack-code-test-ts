import styled from '@emotion/styled';
import { MEDIA_QUERIES } from '@src/constants/media';
import { Paper } from '@mui/material';

export const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  position: relative;
  margin-right: 30px;

  & > img {
    border-radius: 50%;
  }

  @media (width <= ${MEDIA_QUERIES.SMALL}) {
    width: 80px;
    height: 80px;
  }

  @media (width >= ${MEDIA_QUERIES.MEDIUM}) {
    width: 150px;
    height: 150px;
  }
`;

export const Card = styled(Paper)`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  padding: 15px 0 15px 30px;
  box-sizing: border-box;

  @media (width <= ${MEDIA_QUERIES.MEDIUM}) {
    margin-bottom: 30px;
  }

  @media (width <= ${MEDIA_QUERIES.SMALL}) {
    margin-bottom: 5px;
  }
`;

export const Contacts = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  @media (width >= ${MEDIA_QUERIES.MEDIUM}) {
    align-items: center;
  }
`;
