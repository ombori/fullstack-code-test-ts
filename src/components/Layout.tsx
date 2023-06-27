import styled from '@emotion/styled';
import { Header } from './Header';
import { createContext, useState } from 'react';
import { Loading } from './Loading';

export const LayoutContext = createContext(null);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Layout = (props: { children: React.ReactNode; pageProps: any }) => {
  const { children, pageProps } = props;
  const {
    layout: { title, loading },
  } = pageProps;

  const [isLoading, setLoading] = useState(loading);

  return (
    <Wrapper>
      <LayoutContext.Provider value={{ setLoading, isLoading }}>
        {isLoading ? <Loading type="cover" /> : null}
        <Header title={title} />
        <main>{children}</main>
      </LayoutContext.Provider>
    </Wrapper>
  );
};
