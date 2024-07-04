import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ navs = [], children }) => {
  return (
    <>
      <div className="breadcrumbs--new">
        <div className="bread">
          <ul className="breadcrumbs">
            {navs.map((nav, index) => {
              return (
                <li className="breadcrumbs--item" key={`${nav.name}-${index}`}>
                  <Link
                    href={nav.href}
                    className="breadcrumbs--link breadcrumbs"
                    style={{ display: "inline", textDecoration: "none" }}
                  >
                    {nav.name}
                  </Link>
                </li>
              );
            })}

            {/* <li className="breadcrumbs--item">
            <Link
              href="./account"
              className="breadcrumbs--link breadcrumbs--link--active"
            >
              ACCOUNTS
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              to="./account"
              className="breadcrumbs--link breadcrumbs--link--active"
            >
              GUIDEDSELLING
            </Link>
          </li> */}

            {children}
          </ul>
          <hr className="hr" />
        </div>
      </div>
    </>
  );
};

export default BreadCrumbs;
