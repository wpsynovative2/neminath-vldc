import EnquiryForm from "@/components/EnquiryForm";
import Icon, { type IconName } from "@/components/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import { contactSection } from "@/data/home";
import { contact } from "@/data/site";

type InfoCardProps = {
  icon: IconName;
  title: string;
  roomy?: boolean;
  children: React.ReactNode;
};

function InfoCard({ icon, title, roomy, children }: InfoCardProps) {
  return (
    <div
      className={`flex w-full flex-row flex-wrap justify-between gap-[5px] rounded-[10px] border-l-[3px] border-maroon bg-cream px-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)] max-md:justify-start md:w-[49%] ${
        roomy ? "py-[18px]" : "py-[15px]"
      }`}
    >
      <div className="text-center text-maroon">
        <Icon name={icon} className="inline-block h-[30px] w-[1em] text-[30px] max-md:h-[25px] max-md:text-[25px]" />
      </div>
      <div className="w-[210px] max-w-[210px] font-roboto text-[16px] text-muted max-md:text-start max-md:text-[12px]">
        <h3 className="m-0 text-[23px] leading-[1.2] font-medium text-maroon max-[480px]:mb-[5px] max-[480px]:text-[20px]">
          {title}
        </h3>
        <p className="m-0 max-[480px]:text-wrap">{children}</p>
      </div>
    </div>
  );
}

const linkClass = "text-muted hover:text-maroon focus:text-maroon";

export default function Contact() {
  return (
    <div
      id="contact-us"
      className="relative z-[1] w-full scroll-mt-[100px] px-0 pt-2.5 pb-[30px] max-md:px-2.5 max-md:pt-0"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center items-center justify-center gap-[15px]">
        <div className="mt-5 flex w-full flex-row flex-wrap content-center items-start justify-between gap-[15px] pb-[30px]">
          {/* Details */}
          <div className="flex w-full flex-row flex-wrap content-center justify-between gap-2.5 md:w-[49%]">
            <div className="flex w-full flex-row flex-wrap items-start justify-start gap-x-0.5 gap-y-[15px]">
              <SectionLabel text={contactSection.label} width="w-[38%] max-md:w-[55%]" />
              <SectionHeading title={contactSection.title} highlight={contactSection.highlight} className="-mt-2.5" />
            </div>
            <div className="mb-5 font-roboto text-black max-md:text-[15px]">
              <p className="mb-[5px]">{contactSection.description}</p>
            </div>

            <InfoCard icon="map-marker" title="Location">
              <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {contact.address}
              </a>
            </InfoCard>
            <InfoCard icon="phone" title="Contact">
              {contact.phones.map((phone, index) => (
                <span key={phone.href}>
                  {index > 0 && <br />}
                  <a href={phone.href} className={linkClass}>
                    {phone.label}
                  </a>
                </span>
              ))}
            </InfoCard>
            <InfoCard icon="envelope" title="Email Address" roomy>
              {contact.emails.map((email, index) => (
                <span key={email}>
                  {index > 0 && <br />}
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                </span>
              ))}
            </InfoCard>
            <InfoCard icon="house-user" title="Office Hours" roomy>
              {contact.hours.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </InfoCard>
          </div>

          {/* Form */}
          <div className="flex w-full flex-col gap-5 max-md:mt-5 md:w-[48%]">
            <h2 className="m-0 font-roboto-flex text-[30px] leading-none font-semibold text-black max-md:text-[25px]">
              {contactSection.formTitle}
            </h2>
            <EnquiryForm variant="section" className="mt-2.5 w-full" />
          </div>
        </div>

        <div className="flex h-[450px] w-full overflow-hidden rounded-[10px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)]">
          <iframe
            src={contact.mapEmbed}
            title="Neminath VLDC on Google Maps"
            className="h-[450px] w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
