import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { COLORS } from '@src/constants/visuals';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${COLORS.PINK};
  letter-spacing: 3px;
  padding: 30px 0;
`;

export const Header = ({ title = 'Welcome' }) => {
  return (
    <HeaderWrapper>
      <Typography variant="h5" fontWeight={500}>
        {title}
      </Typography>
    </HeaderWrapper>
  );
};
