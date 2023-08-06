'use client';

import Table from '@/components/Table';
import { useEffect } from 'react';

export default function Page() {
  // useEffect to get Dbs from server

  useEffect(() => {
    fetch(
      'http://localhost:8181/api/v1/0xc0b84d0e05c59e48110577f8ec2eee360f804371/databases'
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <>{/* <Table /> */}</>;
}
