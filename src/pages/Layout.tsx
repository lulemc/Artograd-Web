import React, { ReactNode } from 'react';
import Header from './Header'; // Assuming you create a Header component
import Footer from './Footer'; // Assuming you create a Footer component

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
