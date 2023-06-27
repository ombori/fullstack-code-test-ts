import styled from '@emotion/styled';
import { Header } from './Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export function Layout(props: { children: React.ReactNode; pageProps: any }) {
  const { children, pageProps } = props;
  const {
    layout: { title },
  } = pageProps;

  return (
    <Wrapper>
      <Header title={title} />
      <main>{children}</main>
    </Wrapper>
  );
}
