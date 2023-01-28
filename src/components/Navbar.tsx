import Link from 'next/link';
import React, { FunctionComponent } from 'react';

const Navbar: FunctionComponent = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
          <Link href="/">Posts</Link>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
