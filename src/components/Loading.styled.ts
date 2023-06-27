import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { MEDIA_QUERIES } from '@src/constants/media';
import { COLORS } from '@src/constants/visuals';

export type Props = {
  type?: 'cover' | 'regular';
};

export const wrapperDynamicStyle = ({ type }: Props) =>
  type === 'cover' &&
  css`
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: ${COLORS.WHITE};
    z-index: 1000;
  `;

export const OuterWrapper = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${wrapperDynamicStyle}
`;

export const Caption = styled(Typography)`
  margin: 0 auto 60px auto;
  color: ${COLORS.GREEN};
  text-transform: uppercase;

  @media (width <= ${MEDIA_QUERIES.MEDIUM}) {
    margin-bottom: 30px;
  }

  @media (width <= ${MEDIA_QUERIES.SMALL}) {
    margin: 20px auto;
  }
`;

export const Empty = styled.div`
  width: 1px;
  height: 1px;
`;

export const Pulse = styled.div`
  background: ${COLORS.LIGHT_GREEN};
  height: 20px;
  width: 20px;
  border-radius: 100%;
  position: relative;
  margin: auto;

  & > div {
    position: absolute;
    background-color: inherit;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    opacity: 0.5;
    animation: pulse 3s ease-out infinite;

    &:nth-of-type(1) {
      animation-delay: -0.5s;
    }

    &:nth-of-type(2) {
      animation-delay: -1s;
    }

    @keyframes pulse {
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }
  }
`;
