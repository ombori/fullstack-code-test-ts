import { Card } from '@src/components/Card';
import { LazyLoader } from '@src/components/LazyLoader';
import { Grid } from '@mui/material';
import { ApiUsers } from '@src/types&dtos/users.client.type';
import { useContext, useEffect, useMemo, useState } from 'react';
import { LayoutContext } from '@src/components/Layout';

export default function Home() {
  const layout = useContext(LayoutContext);
  const [pagination, setPagination] = useState<Partial<Omit<ApiUsers, 'data'>>>({
    page: 1,
    total_pages: null,
  });
  const [users, setUsers] = useState<ApiUsers['data']>([]);
  const { page, total_pages } = pagination;

  const loadMore = (pageNum: number) =>
    fetch(`/api/users?page=${pageNum}`)
      .then((res) => res.json())
      .then((res) => {
        const { data, ...pagination } = res;

        setUsers((prevState) => [...prevState, ...data]);
        setPagination(pagination);
      })
      .catch((error) => {
        console.error(error);
      });

  useEffect(() => {
    loadMore(page).finally(() => layout.setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elemsToRender = useMemo(
    () => (users.length && !layout.isLoading ? [...users, null] : null),
    [users, layout.isLoading],
  );

  const isLastPage = useMemo(() => page === total_pages, [page, total_pages]);

  return (
    <section>
      <Grid container spacing={3}>
        {elemsToRender &&
          elemsToRender.map((data, index) => {
            if (!data)
              return (
                <LazyLoader
                  key={index + 'L'}
                  isLastPage={isLastPage}
                  loadMore={() => loadMore(page + 1)}
                />
              );

            return (
              <Grid item xs={12} sm={12} md={6} key={data.id}>
                <Card {...data} />
              </Grid>
            );
          })}
      </Grid>
    </section>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      layout: { title: 'Users', loading: true },
    },
  };
};
