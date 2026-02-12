import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

const userLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Products", link: "/products" },
  { title: "Contact", link: "/contact" },
];
const adminLinks = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users", link: "/users" },
  { title: "Products", link: "/productcontrol" },
];
function NaV() {
  const [role] = useState("user");
  const NavLinks = role === "user" ? userLinks : adminLinks;
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <nav>
      <ul className="flex items-center max-md:flex-col gap-6">
        {NavLinks.map((link) => (
          <li
            key={link.title}
            className={`Nav_link duration-300 font-bold ${
              location.pathname === link.link
                ? "text-(--main-color)"
                : "hover:text-(--main-color)"
            }`}
          >
            <Link to={link.link}>{t(`nav.${link.title}`)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NaV;
