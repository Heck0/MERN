import { ReactNode, useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.scss";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaBeer } from "react-icons/fa";
import cn from "classnames";

const Header = (): ReactNode => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <FaBeer className={styles.logo} />

      {!showMobileMenu ? (
        <AiOutlineMenu
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className={styles.menu}
        />
      ) : (
        <AiOutlineClose
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className={styles.menu}
        />
      )}

      <nav
        className={cn({
          [styles.nav]: true,
          [styles.menu_open]: showMobileMenu,
        })}
      >
        <ul>
          <li>
            <Link href="/breuvages">
              <a>Breuvages</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Nous contacter</a>
            </Link>
          </li>
          <li>
            <Link href="/apropos">
              <a>À propos</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
