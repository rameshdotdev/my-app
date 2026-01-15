export type CloudinaryImage = {
	url: string;
	publicId: string;
};

export type Work = {
	_id: string;
	company: string;
	title: string;
	href?: string;
	badges: string[];
	location: "Remote" | "Onsite" | "Hybrid";
	logoUrl?: CloudinaryImage;
	start: string;
	end: string;
	description: string;
	isPublished: boolean;
};
