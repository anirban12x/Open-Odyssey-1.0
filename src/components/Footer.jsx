import React from "react";
import logo from "../assets/logo.png";
import logo2 from "../assets/SamarthTMSL_logo.png";

const Footer = () => {
  const FooterLinkData = {
    socials: [
      {
        icon: "fa-solid fa-globe",
        link: "https://www.samarthtmsl.xyz",
      },
      {
        icon: "fab fa-facebook-f",
        link: "https://www.facebook.com/SamarthTMSL",
      },
      {
        icon: "fab fa-instagram",
        link: "https://www.instagram.com/samarth_tmsl_official",
      },
      {
        icon: "fab fa-linkedin-in",
        link: "https://www.linkedin.com/company/samarthtmsl",
      },
    ],
    about: [
      {
        text: "Open Odyssey 1.0",
        link: "#",
      },
      {
        text: "Event Details",
        link: "https://bit.ly/open-odyssey-1",
      },
      {
        text: "Organizers",
        link: "https://www.samarthtmsl.xyz",
      },
      {
        text: "Contribute",
        link: "https://linktr.ee/SamarthXHacktoberfest2024",
      },
    ],
    gethelp: [
      {
        text: "FAQ",
        link: "",
      },
      {
        text: "Rules & Guidelines",
        link: "",
      },
      {
        text: "Technical Support",
        link: "https://www.samarthtmsl.xyz",
      },
      {
        text: "Contact Us",
        link: "https://www.samarthtmsl.xyz",
      },
    ],
    resources: [
      {
        text: "Leaderboard",
        link: "#",
      },
      {
        text: "Project Submissions",
        link: "https://github.com/SamarthTech",
      },
      {
        text: "Mentorship Program",
        link: "",
      },
      {
        text: "Workshop Materials",
        link: "",
      },
    ],
  };

  return (
    <footer
      className="bg-[#101010] text-gray-300 py-10 px-12 mt-16 
    border-t-2 border-t-purple-600"
    >
      <div className="container mx-auto px-5 pt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Follow Us Section */}
          <div className="footer-col flex justify-start lg:justify-center items-start">
            <div className="w-max">
              <div className="flex items-center flex-shrink-0">
                <img className="h-16 w-16 mr-2 md:h-20 md:w-20" src={logo} alt="Logo" />
                <span className="text-3xl tracking-tight text-white">
                  Open Odyssey
                </span>
              </div>
              <div className="mt-5">
                <h4 className="text-white text-xl font-semibold mb-3">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {FooterLinkData.socials.map((item) => (
                    <a href={item.link} className="hover:text-red-400 transition-all duration-100 ease-in">
                      <i className={item.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className="footer-col flex justify-start lg:justify-center items-start">
            <div className="w-max">
              <h4 className="text-white text-xl font-semibold mb-4">
                About Us
              </h4>
              <ul className="space-y-2">
                {FooterLinkData.about.map((item) => (
                  <li>
                    <a href={item.link} className="hover:text-red-400 transition-all duration-100 ease-in">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Get Help Section */}
          <div className="footer-col flex justify-start lg:justify-center items-start">
            <div className="w-max">
              <h4 className="text-white text-xl font-semibold mb-4">
                Get Help
              </h4>
              <ul className="space-y-2">
                {FooterLinkData.gethelp.map((item) => (
                  <li>
                    <a href={item.link} className="hover:text-red-400 transition-all duration-100 ease-in">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources Section */}
          <div className="footer-col flex justify-start lg:justify-center items-start">
            <div className="w-max">
              <h4 className="text-white text-xl font-semibold mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                {FooterLinkData.resources.map((item) => (
                  <li>
                    <a href={item.link} className="hover:text-red-400 transition-all duration-100 ease-in">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 w-full flex flex-row justify-center items-center">
          <p className="text-xs text-center">Copyright © 2024 - Pravidhi, Samarth TMSL</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
