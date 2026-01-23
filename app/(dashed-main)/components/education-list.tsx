"use client";

import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import EducationCard from "./education-card";

export default function EducationList() {
  const educations = [
    {
      logo: "/images/lpu.png",
      alt: "Lovely professional university",
      college: "Lovely professional university",
      type: "Regular",
      degree: "Master of computer application",
      duration: "2022 - 2024",
      location: "Phagwara, Punjab",
      href: "https://www.lpu.in/",
    },
    {
      logo: "/images/brabu.png",
      alt: "B. R. Ambedkar Bihar University",
      college: "B. R. Ambedkar Bihar University",
      type: "Regular",
      degree: "Bachelor of computer application",
      duration: "2018 - 2021",
      location: "Muzaffarpur, Bihar",
      href: "https://brabu.ac.in/",
    },
    {
      logo: "/images/srap.jpg",
      alt: "Sheodeni Ram Ayodhya Prasad, College",
      college: "Sheodeni Ram Ayodhya Prasad, College",
      type: "Regular",
      degree: "Senior secondary",
      duration: "2016 - 2018",
      location: "Chakia, Bihar",
      href: "https://srapcollege.co.in/",
    },

    // add more...
    // {
    //   logo: "/images/xyz.png",
    //   alt: "XYZ University",
    //   college: "XYZ University",
    //   type: "Regular",
    //   degree: "BCA",
    //   duration: "2019 - 2022",
    //   location: "Delhi, India",
    //   href: "https://srapcollege.co.in/",
    // },
  ];

  return (
    <div>
      {educations.map((edu, idx) => (
        <div key={`${edu.college}-${idx}`}>
          <EducationCard {...edu} />
          {idx !== educations.length - 1 && <HorizontalDashedBorder />}
        </div>
      ))}
    </div>
  );
}
