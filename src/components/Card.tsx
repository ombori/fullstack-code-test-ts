import { ApiUserData } from '@src/types&dtos/users.client.type';
import Image from 'next/image';
import { Typography } from '@mui/material';
import * as Styled from './Card.styled';

export const Card = (data: ApiUserData) => {
  const { avatar, first_name, last_name, email } = data;
  const userName = `${first_name} ${last_name}`;

  return (
    <Styled.Card elevation={3}>
      <Styled.ImageWrapper>
        <Image src={avatar} fill={true} alt={`${userName} avatar`} />
      </Styled.ImageWrapper>

      <Styled.Contacts>
        <div>
          <Typography variant="h6">{userName}</Typography>
          <Typography variant="subtitle1">{email}</Typography>
        </div>
      </Styled.Contacts>
    </Styled.Card>
  );
};
