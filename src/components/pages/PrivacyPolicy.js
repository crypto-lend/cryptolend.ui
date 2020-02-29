import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const DATA = [
  {
    title: "Cryptolendr Global Limited",
    text: [
      "It is Cryptolendr Global Limited's policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to https://Cryptolendr.com (hereinafter, 'us', 'we', or 'https://Cryptolendr.com'). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy ('Privacy Policy') to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.",
      "This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms and conditions."
    ]
  },
  {
    title: "Website Visitors",
    text: [
      "Like most website operators, Cryptolendr Global Limited collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Cryptolendr Global Limited's purpose in collecting non-personally identifying information is to better understand how Cryptolendr Global Limited's visitors use its website. From time to time, Cryptolendr Global Limited may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.",
      "Cryptolendr Global Limited also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on https://Cryptolendr.com and any user information collected from users filling in account forms or registration forms. Cryptolendr Global Limited only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below."
    ]
  },
  {
    title: "Gathering of Personally-Identifying Information",
    text: [
      "Certain visitors to Cryptolendr Global Limited's websites choose to interact with Cryptolendr Global Limited in ways that require Cryptolendr Global Limited to gather personally-identifying information. The amount and type of information that Cryptolendr Global Limited gathers depends on the nature of the interaction. For example, we ask visitors who sign up for a blog at https://Cryptolendr.com to provide a username and email address."
    ]
  },
  {
    title: "Security",
    text: [
      "The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security."
    ]
  },
  {
    title: "Advertisements",
    text: [
      "Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by Cryptolendr Global Limited and does not cover the use of cookies by any advertisers."
    ]
  },
  {
    title: "Links To External Sites",
    text: [
      "Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.",
      "We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services."
    ]
  },
  {
    title: "Protection of Certain Personally-Identifying Information",
    text: [
      "Cryptolendr Global Limited discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on Cryptolendr Global Limited's behalf or to provide services available at Cryptolendr Global Limited's website, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using Cryptolendr Global Limited's website, you consent to the transfer of such information to them. Cryptolendr Global Limited will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, Cryptolendr Global Limited discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when Cryptolendr Global Limited believes in good faith that disclosure is reasonably necessary to protect the property or rights of Cryptolendr Global Limited, third parties or the public at large.",
      "If you are a registered user of https://Cryptolendr.com and have supplied your email address, Cryptolendr Global Limited may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what's going on with Cryptolendr Global Limited and our products. We primarily use our blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. Cryptolendr Global Limited takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information."
    ]
  },
  {
    title: "Aggregated Statistics",
    text: [
      "Cryptolendr Global Limited may collect statistics about the behavior of visitors to its website. Cryptolendr Global Limited may display this information publicly or provide it to others. However, Cryptolendr Global Limited does not disclose your personally-identifying information."
    ]
  },
  {
    title: "Cookies",
    text: [
      "To enrich and perfect your online experience, Cryptolendr Global Limited uses 'Cookies', similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.",
      "A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. Cryptolendr Global Limited uses cookies to help Cryptolendr Global Limited identify and track visitors, their usage of https://Cryptolendr.com, and their website access preferences. Cryptolendr Global Limited visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Cryptolendr Global Limited's websites, with the drawback that certain features of Cryptolendr Global Limited's websites may not function properly without the aid of cookies.",
      "By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Cryptolendr Global Limited's use of cookies."
    ]
  },
  {
    title: "Privacy Policy Changes",
    text: [
      "Although most changes are likely to be minor, Cryptolendr Global Limited may change its Privacy Policy from time to time, and in Cryptolendr Global Limited's sole discretion. Cryptolendr Global Limited encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change."
    ]
  }
];

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row text-center">
          <h2 className="col-12">Welcome to our Privacy Policy</h2>
          <span className="col-12 font-weight-bold text-primary">
            {" "}
            Your privacy is important to us
          </span>
        </div>
        <div className="row mt-5">
          {DATA.map(({ title, text }, index) => (
            <span className="col-12" key={index}>
              <h6 className="mt-4">{title}</h6>
              <p>
                {text.map((point, index) => (
                  <span key={index}>
                    <span>{point}</span>
                    <br />
                  </span>
                ))}
              </p>
            </span>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
