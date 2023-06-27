import { Card } from '@src/components/Card';
import { LazyLoader } from '@src/components/LazyLoader';
import { Grid } from '@mui/material';
import { ApiUsers } from '@src/types&dtos/users.client.type';
import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [pagination, setPagination] = useState<Partial<Omit<ApiUsers, 'data'>>>({
    page: 1,
    total_pages: null,
  });
  const [users, setUsers] = useState<ApiUsers['data']>([]);
  const { page, total_pages } = pagination;

  const loadMore = (pageNum: number) => {
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
  };

  useEffect(() => {
    loadMore(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elemsToRender = useMemo(() => [...users, null], [users]);

  const isLastPage = useMemo(() => page === total_pages, [page, total_pages]);

  return (
    <section>
      <Grid container spacing={2}>
        {users.length &&
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

export function getServerSideProps() {
  return {
    props: {
      layout: { title: 'Users' },
    },
  };
}
