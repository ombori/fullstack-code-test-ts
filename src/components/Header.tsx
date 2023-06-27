import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fce4ec;
  letter-spacing: 3px;
`;

export function Header({ title = 'Welcome' }) {
  return (
    <Wrapper>
      <Typography variant="h5" fontWeight={500}>
        {title}
      </Typography>
    </Wrapper>
  );
}
