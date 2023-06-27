import { useOnScreen } from '@src/hooks/useOnScreen';
import { useEffect, useRef, useState } from 'react';
import { Loading } from './Loading';
import * as Styled from './Loading.styled';

type props = {
  loadMore: Function;
  isLastPage: boolean;
};

export const LazyLoader = ({ loadMore, isLastPage }: props) => {
  const ref = useRef();
  const onScreen = useOnScreen(ref);
  const [toLoad, setLoad] = useState(false);

  useEffect(() => {
    console.log({ onScreen });
    if (onScreen) {
      setLoad(true);
    }
  }, [onScreen, loadMore]);

  useEffect(() => {
    if (toLoad && !isLastPage) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toLoad, isLastPage]);

  if (isLastPage)
    return <Styled.Caption variant="body1">{'There is no more users to be loaded'}</Styled.Caption>;

  return (
    <Styled.OuterWrapper ref={ref}>
      {onScreen ? <Loading /> : <Styled.Empty></Styled.Empty>}
    </Styled.OuterWrapper>
  );
};
