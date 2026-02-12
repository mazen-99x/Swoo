import { useTranslation } from "react-i18next";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";

const icons = [FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaPinterestP];

const sectionLinks = [
  "footer.categories.laptops",
  "footer.categories.pc",
  "footer.categories.phones",
  "footer.categories.tablets",
  "footer.categories.gaming",
  "footer.categories.networks",
  "footer.categories.cameras",
  "footer.categories.sounds",
  "footer.categories.office",
];

const secSectionLinks = [
  "footer.companyLinks.about",
  "footer.companyLinks.contact",
  "footer.companyLinks.career",
  "footer.companyLinks.blog",
  "footer.companyLinks.sitemap",
  "footer.companyLinks.stores",
];

const thrSectionLinks = [
  "footer.helpLinks.customerService",
  "footer.helpLinks.policy",
  "footer.helpLinks.terms",
  "footer.helpLinks.track",
  "footer.helpLinks.faqs",
  "footer.helpLinks.account",
  "footer.helpLinks.support",
];

const Partner = [
  "footer.partnerLinks.seller",
  "footer.partnerLinks.affiliate",
  "footer.partnerLinks.advertise",
  "footer.partnerLinks.partnership",
];

const Payment = [
  { color: "text-blue-800", label: "footer.payment.paypal" },
  { color: "text-orange-500", label: "footer.payment.mastercard" },
  { color: "text-blue-600", label: "footer.payment.visa" },
  { color: "text-blue-400", label: "footer.payment.stripe" },
  { color: "text-pink-400", label: "footer.payment.klarna" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-(--white-color) dark:bg-(--dark-alt-color) py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand and Contact Section */}
          <div className="lg:col-span-1">
            <h2 className="font-bold text-(--main-color) text-lg mb-6">
              {t("footer.brandTitle")}
            </h2>
            <p className="text-xs uppercase tracking-wider mb-1">
              {t("footer.hotline")}
            </p>
            <p className="text-(--main-color) text-2xl font-bold mb-6">
              (025) 3686 25 16
            </p>

            <div className="text-sm space-y-1 mb-6">
              <p>{t("footer.addressLine1")}</p>
              <p>{t("footer.addressLine2")}</p>
              <p>{t("footer.email")}</p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {icons.map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-full hover:text-(--white-color) hover:bg-(--main-color) transition duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-bold mb-4 text-(--main-color)">
              {t("footer.topCategories")}
            </h3>
            <ul className="text-sm space-y-3">
              {sectionLinks.map((key) => (
                <li key={key}>
                  <a
                    href="#"
                    className="dark:text-gray-300 text-gray-600 hover:text-(--main-color) transition duration-300"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-(--main-color)">
              {t("footer.company")}
            </h3>
            <ul className="text-sm space-y-3">
              {secSectionLinks.map((key) => (
                <li key={key}>
                  <a
                    href="#"
                    className="dark:text-gray-300 text-gray-600 hover:text-(--main-color) transition duration-300"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-(--main-color)">
              {t("footer.helpCenter")}
            </h3>
            <ul className="text-sm space-y-3">
              {thrSectionLinks.map((key) => (
                <li key={key}>
                  <a
                    href="#"
                    className="dark:text-gray-300 text-gray-600 hover:text-(--main-color) transition duration-300"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-(--main-color)">
              {t("footer.partner")}
            </h3>
            <ul className="text-sm space-y-3">
              {Partner.map((key) => (
                <li key={key}>
                  <a
                    href="#"
                    className="dark:text-gray-300 text-gray-600 hover:text-(--main-color) transition duration-300"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm md:text-base">
                {t("footer.subscribeTitle")}{" "}
                <span className="text-(--main-color)">
                  {t("footer.subscribeOff")}
                </span>{" "}
                {t("footer.subscribeSubtitle")}
              </h3>
            </div>
            <div className="flex items-center max-w-xl border-b border-gray-300 focus-within:border-(--main-color)">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="flex-1 py-2 outline-none bg-transparent"
              />

              <button className="ml-2 border px-3 py-1 rounded hover:bg-(--main-color) hover:text-(--white-color) hover:border-(--main-color) transition duration-300 text-(--main-color) font-bold text-sm whitespace-nowrap">
                {t("footer.subscribe")}
              </button>
            </div>
          </div>
          <p className="text-[10px] dark:text-gray-300 text-gray-600 mt-2">
            {t("footer.policyText")}{" "}
            <a href="#" className="underline">
              {t("footer.policyLink")}
            </a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs dark:text-gray-300 text-gray-600">
            © 2026{" "}
            <a href="" className="font-bold text-(--main-color)">
              Mazen
            </a>
            . {t("footer.copyright")}
          </p>

          <div className="flex items-center space-x-4 opacity-70">
            {Payment.map(({ color, label }) => (
              <span
                key={label}
                className={`font-bold ${color} italic grayscale hover:grayscale-0 transition duration-300 cursor-pointer`}
              >
                {t(label)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
