import Image from "next/image";

export default function ContactInfoCard() {
  return (
    <div className="lg:col-span-2 md:col-span-3 sm:col-span-2">
      <div className="bg-background-elevated rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col">
        <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Image
                src={"svg/email-bw.svg"}
                alt="mail"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h4 className="font-medium mb-1 text-sm">Email Address</h4>
              <a
                href="mailto:websitemedjourney@gmail.com"
                className="text-lg hover:text-golden-500 transition-colors break-all"
              >
                regentcaterers@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Image
                src={"svg/phone-bw.svg"}
                alt="phone"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h4 className="font-medium mb-1 text-sm">Phone Number</h4>
              <a
                href="tel:+911234567890"
                className="text-lg hover:text-golden-500 transition-colors"
              >
                +91 123 456 7890
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src={"svg/location-bw.svg"}
                alt="location"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h4 className="font-medium mb-1 text-sm">Office Address</h4>
              <p className="text-lg leading-relaxed">
                123 Journey Lane,
                <br />
                Travel District,
                <br />
                New Delhi, 110001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
