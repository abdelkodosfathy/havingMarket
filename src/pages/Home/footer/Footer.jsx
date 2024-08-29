import React from "react";
import "./footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [t, i18n] = useTranslation();
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">Having</h1>
      </div>
      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">{t("footer.contact")}</h2>
          <ul className="nav__ul">
            <li>
              <a href="mailto:support@having.market">{t("footer.support")}</a>
            </li>
            <li>
              <a href="#">{t("footer.phone")}: +20</a>
            </li>
          </ul>
        </li>
        <li className="nav__item">
          <h2 className="nav__title">{t("footer.legal")}</h2>
          <ul className="nav__ul">
            <li>
              <a href="https://app.having.market/privacy_policy">
                {t("footer.privacyPolicy")}
              </a>
            </li>
            <li>
              <a href="https://app.having.market/terms_and_conditions">
                {t("footer.terms")}
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <div className="legal">
        <p>&copy; 2024 HAVING. {t("footer.copyRights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
