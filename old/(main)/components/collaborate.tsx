"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { SocialIconLink } from "@/components/social-icon-link";
import { useAppSelector } from "@/hooks/hooks";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { getContactData } from "@/store/features/contactSlice";
import { Icons } from "@/components/icons";

export default function Collaborate() {
	const contact = useAppSelector(getContactData);

	if (!contact?.social) return null;

	return (
		<section id="connect">
			<BlurFade delay={BLUR_FADE_DELAY * 4.5}>
				<div className="space-y-4 md:space-y-6">
					<h2 className="text-xl font-bold">Let&apos;s collaborate 🤝🏻</h2>

					<div className="flex flex-wrap gap-2 md:gap-4">
						{Object.entries(contact.social).map(([name, social], idx) => {
							const Icon = Icons[social.icon as keyof typeof Icons];

							if (!Icon || !social.url) return null;

							return (
								<SocialIconLink
									key={name}
									name={name}
									url={social.url}
									icon={<Icon />}
									delay={BLUR_FADE_DELAY * 5 + idx * 0.05}
								/>
							);
						})}
					</div>
				</div>
			</BlurFade>
		</section>
	);
}
