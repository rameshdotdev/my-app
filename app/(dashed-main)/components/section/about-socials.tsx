import dynamic from "next/dynamic";
import { AboutSkeleton } from "../../skeleton";
import SocialsSkeleton from "../../socials-skeleton";
import { ContactData } from "@/types/type";
import { useFetch } from "@/hooks/use-fetch";
import { setContactData } from "@/store/features/contactSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { useEffect } from "react";

const About = dynamic(() => import("../about"), {
  loading: () => <AboutSkeleton />,
  ssr: false,
});

const Socials = dynamic(() => import("../socials"), {
  loading: () => <SocialsSkeleton />,
  ssr: false,
});

export default function AboutSocials() {
  const dispatch = useAppDispatch();
  const { data } = useFetch<ContactData>("/contact", {
    revalidate: 120,
    tags: ["contact"],
  });
  useEffect(() => {
    if (data) {
      dispatch(setContactData(data));
    }
  }, [data, dispatch]);
  return (
    <div>
      <About />
      <Socials />
    </div>
  );
}
