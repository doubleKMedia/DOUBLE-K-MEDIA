import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import navRoutes from './navRoutes.json';

type routeInfoType = {
  head: { href: string; name: string };
  list: { href: string; name: string }[];
};

const Route = ({ routeInfo, isMenuOpen, path }: { routeInfo: routeInfoType; isMenuOpen: boolean; path: string }) => {
  const { head, list } = routeInfo;

  return (
    <div className={`route ${isMenuOpen ? 'open' : ''}`}>
      <span className={`head ${head.href === path ? 'open' : ''}`}>
        <Link href={head.href}>
          <a>{head.name}</a>
        </Link>
      </span>
      <ul>
        {list.map((l, i) => (
          <li className={l.href === path ? 'open' : ''} key={i}>
            <Link href={l.href}>
              <a>{l.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>
        {`
          .route a {
            color: var(--nav-color);
          }

          .head {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            white-space: nowrap;
          }

          .head::after {
            content: '';
            position: absolute;
            width: 1px;
            bottom: -5px;
            border-bottom: 2px solid #6cc26c;
            opacity: 0;
            transition: opacity 0.1s, width 0.3s ease-out;
          }

          .head:hover::after,
          .head.open::after {
            opacity: 1;
            width: 100%;
          }

          .route > ul {
            white-space: nowrap;
            display: none;
          }

          /* menu open */

          .route.open {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
          }

          .route.open .head {
            display: flex;
            justify-content: center;
            font-size: 24px;
            font-weight: normal;
          }

          .route.open > ul {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 15px;
          }

          .route.open > ul > li {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            font-weight: normal;
            list-style: none;
          }

          .route.open > ul > li::after {
            content: '';
            position: absolute;
            width: 1px;
            bottom: -4px;
            border-bottom: 2px solid #ffffff;
            opacity: 0;
            transition: opacity 0.1s, width 0.2s ease-out;
          }

          .route.open > ul > li:hover::after,
          .route.open > ul > li.open::after {
            opacity: 1;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};

const Nav = ({ mode }: { mode: 'dark' | 'light' }) => {
  const LOGO = 'DOUBLE K MEDIA';
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const routeInfos: routeInfoType[] = navRoutes;
  const { route, pathname } = useRouter();

  console.log('nav', route, pathname);

  return (
    <nav className={`${mode} ${isMenuOpen ? 'open' : ''}`}>
      <div className="logo">
        <Link href="/">{LOGO}</Link>
      </div>
      <div className="routes">
        {routeInfos.map((routeInfo, i) => (
          <Route routeInfo={routeInfo} isMenuOpen={isMenuOpen} path={route} key={i} />
        ))}
      </div>
      <button className={`menu ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="line" />
      </button>

      <style jsx>
        {`
          nav {
            position: fixed;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 50px;
            width: 100%;
            padding: 50px 100px;
            transform: background-color 0.3s;
            z-index: 1;
          }

          nav.dark {
            background-color: #f9f9f9;
            --nav-color: #222222;
          }

          nav.light,
          nav.open {
            background-color: rgba(0, 0, 0, 0.5);
            --nav-color: #ffffff;
          }

          .logo {
            font-size: 27px;
            font-weight: bold;
            white-space: nowrap;
            color: var(--nav-color);
          }

          .routes {
            display: flex;
            align-items: flex-end;
            gap: clamp(20px, 2vw, 60px);
            font-size: 15px;
            font-weight: bold;
            color: var(--nav-color);
            padding-top: 14px;
            margin-right: 100px;
          }

          .menu {
            position: absolute;
            top: 65px;
            right: 100px;
            width: 25px;
            height: 15px;
            box-sizing: content-box;
          }

          .menu::before,
          .menu::after,
          .menu > .line {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 25px;
            height: 2px;
            border-radius: 1px;
            background-color: var(--nav-color);
            transition: transform 0.3s, opacity 0.3s;
          }

          .menu::before {
            transform: translateY(-1px);
          }

          .menu::after {
            transform: translateY(13px);
          }

          .menu > .line {
            transform: translateY(6px);
          }

          .menu.open::before {
            transform: translateY(6px) rotate(45deg);
          }

          .menu.open::after {
            transform: translateY(6px) rotate(-45deg);
          }

          .menu.open > .line {
            opacity: 0;
          }

          /* open menu */

          nav.open {
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.8);
          }

          nav.open > .routes {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: clamp(50px, 5vw, 150px);
            top: 20vh;
            left: 0;
            width: 100%;
            margin: 0;
          }
        `}
      </style>
    </nav>
  );
};

export default Nav;
