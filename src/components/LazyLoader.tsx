import { useOnScreen } from '@src/hooks/useOnScreen';
import { useEffect, useRef, useState } from 'react';

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

  if (isLastPage) return <div>{'Nothing to load more'}</div>;

  return (
    <div ref={ref}>
      {onScreen ? (
        <div style={{ width: '100%', height: '200px', border: '3px solid white' }}>
          {'I AM LOADING'}
        </div>
      ) : (
        <div>{'Not Loaded'}</div>
      )}
    </div>
  );
};
