import { ApiUserData } from '@src/types&dtos/users.client.type';
import Image from 'next/image';
import { Paper, Grid, ButtonBase, Typography } from '@mui/material';
import styled from '@emotion/styled';
// import * as Styled from './Card.styled';

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  position: relative;
  margin-right: 30px;

  & > img {
    border-radius: 50%;
  }

  @media (width <= 400px) {
    width: 80px;
    height: 80px;
  }

  @media (width >= 770px) {
    width: 150px;
    height: 150px;
  }
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 1px solid black; */
  margin-bottom: 60px;
  padding-left: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  box-sizing: border-box;

  @media (width <= 770px) {
    margin-bottom: 30px;
  }

  @media (width <= 400px) {
    margin-bottom: 5px;
  }
`;

const StyledContacts = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  @media (width >= 770px) {
    align-items: center;
  }
`;

export const Card = (data: ApiUserData) => {
  const { avatar, first_name, last_name, email } = data;
  const userName = `${first_name} ${last_name}`;

  return (
    <StyledPaper elevation={3}>
      <ImageWrapper>
        <Image src={avatar} fill={true} alt={`${userName} avatar`} />
      </ImageWrapper>

      <StyledContacts>
        <div>
          <Typography variant="h6">{userName}</Typography>
          <Typography variant="subtitle1">{email}</Typography>
        </div>
      </StyledContacts>
    </StyledPaper>
  );
};
