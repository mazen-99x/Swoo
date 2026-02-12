/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import OutlineButton from "../../Components/OutlineButton";
import FormInput from "../../Components/FormInput";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";

const socialIcons = [
  { id: 1, icon: FaTwitter, href: "https://twitter.com" },
  { id: 2, icon: FaFacebookF, href: "https://facebook.com" },
  { id: 3, icon: FaInstagram, href: "https://instagram.com" },
  { id: 4, icon: FaYoutube, href: "https://youtube.com" },
  { id: 5, icon: FaPinterestP, href: "https://pinterest.com" },
];

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="px-6 lg:px-24 py-14 space-y-20 bg-(--white-color) dark:bg-(--dark-alt-color) my-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* -------- Left: Form -------- */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-4">
              {t("contact.title")}
            </h2>

            <p className="text-sm dark:text-gray-300 text-gray-600 mb-8">
              {t("contact.subtitle")}
            </p>

            <form className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  labelKey="contact.firstName"
                  placeholder
                  Key="contact.firstName"
                  type="text"
                  required
                />

                <FormInput
                  labelKey="contact.lastName"
                  placeholder
                  Key="contact.lastName"
                  type="text"
                  required
                />
              </div>
              {/* Email */}
              <FormInput
                type="email"
                labelKey="contact.email"
                placeholder
                required
                Key="contact.email"
              />
              {/* Phone (optional) */}

              <FormInput
                type="tel"
                labelKey="contact.phone"
                placeholder
                required
                Key="contact.phone"
              />
              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("contact.country")} <span className="text-red-500">*</span>
                </label>
                <select className="w-full border rounded-md px-4 py-2 bg-(--white-color) dark:bg-(--dark-secondary-color)  focus:outline-none focus:ring focus:ring-(--main-color)">
                  <option>{t("contact.countries.us")}</option>
                  <option>{t("contact.countries.uk")}</option>
                  <option>{t("contact.countries.ca")}</option>
                </select>
              </div>

              {/* Subject (optional) */}
              <FormInput
                type="text"
                labelKey="contact.subject"
                placeholder
                Key="contact.subject"
              />

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("contact.message")}
                </label>
                <textarea
                  rows={4}
                  placeholder={t("contact.messagePlaceholder")}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-(--main-color)"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-2 text-sm dark:text-gray-300 text-gray-600">
                <input type="checkbox" className="mt-1" />
                <p>
                  {t("contact.news")}{" "}
                  <span className="text-(--main-color) cursor-pointer">
                    {t("contact.terms")}
                  </span>
                </p>
              </div>

              {/* Button */}
              <OutlineButton>{t("contact.button")}</OutlineButton>
            </form>
          </div>

          {/* -------- Right: Info -------- */}
          <div className="space-y-6">
            <div className="bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl p-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase dark:text-gray-300 text-gray-600 mb-2">
                  {t("contact.locations.us.title")}
                </h4>
                <p className="text-sm">{t("contact.locations.us.address")}</p>
                <p className="text-sm mt-1">
                  {t("contact.locations.us.phone")}
                </p>
                <p className="text-sm text-(--main-color) mt-1">
                  {t("contact.locations.us.email")}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase dark:text-gray-300 text-gray-600 mb-2">
                  {t("contact.locations.uk.title")}
                </h4>
                <p className="text-sm">{t("contact.locations.uk.address")}</p>
                <p className="text-sm mt-1">
                  {t("contact.locations.uk.phone")}
                </p>
                <p className="text-sm text-(--main-color) mt-1">
                  {t("contact.locations.uk.email")}
                </p>
              </div>

              <div className="flex gap-3">
                {socialIcons.map(({ id, icon: Icon, href }) => (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-(--main-color) text-(--white-color) flex items-center justify-center"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <img
              src="./assets/contact.png"
              className="w-full h-65 rounded-xl"
              alt=""
            />
          </div>
        </section>
      </div>

      {/* Map */}
      <section className="mb-6 bg-(--white-color) rounded-xl dark:bg-(--dark-alt-color) p-6">
        <div className="w-full h-75 lg:h-105 overflow-hidden">
          <iframe
            title="map"
            className="w-full h-full border-0"
            loading="lazy"
            src="https://www.google.com/maps?q=Manhattan,New+York&output=embed"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;
