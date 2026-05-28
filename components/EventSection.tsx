import ScrollingText from "./ui/ScrollingText";

export default function EventSection() {
  return (
    <section className="flex flex-col gap-2 my-24">
      <div className="container-app">
        <p className="font-galgin lg:text-4xl md:text-3xl text-xl">
          What Event
        </p>
        <p className="font-galgin lg:text-7xl md:text-6xl text-3xl text-golden-500">
          Are you Planning?
        </p>
      </div>
      <div className="my-10 flex flex-col gap-10">
        <ScrollingText
          items={[
            "Wedding",
            "Sangeet",
            "Mehendi",
            "Reception",
            "Corporate",
            " birthday",
            "Wedding",
            "Sangeet",
            "Mehendi",
            "Reception",
            "Corporate",
            " birthday",
          ]}
          separator="|"
          speed={0.4}
          separatorClassname="text-foreground-primary font-extralight lg:text-6xl md:text-5xl"
          className="md:text-5xl font-caveat"
        />
        <div className="w-full h-[1.5px] bg-golden-500" />
        <ScrollingText
          items={["Kerala", "Travancore", "Continental", "Chinese"]}
          separator="|"
          speed={0.6}
          separatorClassname="text-foreground-primary font-extralight lg:text-6xl md:text-5xl"
          className="md:text-5xl font-caveat"
          reverse
        />
      </div>
      <div className="container-app text-right">
        <p className="font-galgin lg:text-4xl md:text-3xl text-xl">What Menu</p>
        <p className="font-galgin lg:text-7xl md:text-6xl text-3xl text-golden-500">
          Would You Prefer?
        </p>
      </div>
    </section>
  );
}
