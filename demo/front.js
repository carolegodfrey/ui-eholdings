import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'svg-react-loader?name=Logo!./frontside-icon-transparent.svg';
import style from './front.css';

export default function Front() {
  return (
    <div className={style.front}>
      <h1><Logo className={style.logo}/> eHoldings, by Frontside</h1>
      <p>
        Welcome to the Frontside FOLIO demo. Here you'll find a showcase of the applications and modules that we've been working on.
      </p>

      <p>
        While we wire up the general search and navigation system for e-holdings, please have a look at these direct links as a starting point:
      </p>

      <h3>Search</h3>
      <ul>
        <li>Search for a <Link to="/eholdings/search/vendors">vendor</Link>, <Link to="/eholdings/search/packages">package</Link>, or <Link to="/eholdings/search/titles">title</Link></li>
      </ul>

      <h3>Vendors</h3>
      <ul>
        <li><Link to="/eholdings/vendors/432">NASA</Link></li>
        <li><Link to="/eholdings/vendors/19">EBSCO</Link></li>
      </ul>

      <h3>Packages</h3>
      <ul>
        <li><Link to="/eholdings/vendors/432/packages/8208">NASA eBooks</Link></li>
        <li><Link to="/eholdings/vendors/19/packages/1125">Business Source Complete</Link></li>
      </ul>

      <h3>Titles</h3>
      <ul>
        <li><Link to="/eholdings/titles/2022451">Rockets and People, Volume 2: Creating a Rocket Industry</Link></li>
        <li><Link to="/eholdings/titles/910785">Cornell Real Estate Review</Link></li>
      </ul>

      <p>
        <em>
          The data in this demo connects to the EBSCO resource management API sandbox. The UI does not yet have any pagination, so result sets are limited to 25 items.
        </em>
      </p>
    </div>
  );
}
