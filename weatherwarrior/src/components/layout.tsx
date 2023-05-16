import Head from 'next/head';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import Login from '../pages/login';
import { useState } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setUsername] = useState('');
  const [category, setCategory] = useState('');

  const onLogin = (name: string, category: string) => {
    setIsLogin(true);
    setUsername(name);
    setCategory(category);
  };

  if (isLogin) {
    return (
      <>
        <Head>
          <title>Weather Worrior</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <Container>{props.children}</Container>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Weather Worrior</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <Container>
          <Login onLogin={onLogin} />
        </Container>
      </>
    );
  }
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Layout;
