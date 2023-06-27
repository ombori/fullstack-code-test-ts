import * as Styled from './Loading.styled';

export const Loading = ({ type = 'regular' }: Styled.Props) => {
  return (
    <Styled.Wrapper type={type}>
      <Styled.Pulse>
        <div></div>
        <div></div>
      </Styled.Pulse>
    </Styled.Wrapper>
  );
};
