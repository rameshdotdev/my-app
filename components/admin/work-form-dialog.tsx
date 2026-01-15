"use client";

import { useEffect, useState } from "react";
import { Work } from "@/types/work";
import { api } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { toast } from "sonner";

import { useAppDispatch } from "@/hooks/hooks";
import { addWork, updateWork } from "@/store/features/workSlice";
import Image from "next/image";

type ImageState = {
	url: string;
	publicId: string;
};

const LOCATION_TYPES = ["Remote", "Onsite", "Hybrid"] as const;

type Props = {
	setOpenAction: (v: boolean) => void;
	open: boolean;
	initialData: Work | null;
};

export default function WorkFormDialog({
	open,
	setOpenAction,
	initialData,
}: Props) {
	const dispatch = useAppDispatch();

	const [form, setForm] = useState<Partial<Work>>({});
	const [logo, setLogo] = useState<ImageState | null>(null);
	const [badges, setBadges] = useState<string[]>([]);
	const [badgeInput, setBadgeInput] = useState("");
	const [uploading, setUploading] = useState(false);
	const [saving, setSaving] = useState(false);

	/* =========================
     Hydrate on Edit
  ========================= */
	useEffect(() => {
		if (initialData) {
			setForm(initialData);
			setLogo(initialData.logoUrl ?? null);
			setBadges(initialData.badges ?? []);
		} else {
			setForm({});
			setLogo(null);
			setBadges([]);
		}
	}, [initialData]);

	/* =========================
     Logo Upload (REQUIRED)
  ========================= */
	const handleLogoChange = async (file: File) => {
		try {
			setUploading(true);
			const res = await uploadToCloudinary(file);

			setLogo({
				url: res.secure_url,
				publicId: res.public_id,
			});

			toast.success("Logo uploaded");
		} catch {
			toast.error("Logo upload failed");
		} finally {
			setUploading(false);
		}
	};

	/* =========================
     Badge Handling
  ========================= */
	const addBadge = () => {
		if (!badgeInput.trim()) return;
		setBadges((prev) => [...prev, badgeInput.trim()]);
		setBadgeInput("");
	};

	const removeBadge = (badge: string) => {
		setBadges((prev) => prev.filter((b) => b !== badge));
	};

	/* =========================
     Submit (Redux + API)
  ========================= */
	const submit = async () => {
		if (!logo) {
			toast.error("Company logo is required");
			return;
		}

		if (
			!form.company ||
			!form.title ||
			!form.location ||
			!form.start ||
			!form.end ||
			!form.description
		) {
			toast.error("Please fill all required fields");
			return;
		}

		const payload = {
			...form,
			badges,
			logoUrl: logo, // REQUIRED by schema
		};

		try {
			setSaving(true);

			if (form._id) {
				// UPDATE
				const res = await api.put(`/works-at/${form._id}`, payload);
				dispatch(updateWork(res.data));
				toast.success("Work updated");
			} else {
				// CREATE
				const res = await api.post("/works-at", payload);
				dispatch(addWork(res.data));
				toast.success("Work created");
			}

			setOpenAction(false);
		} catch {
			toast.error("Something went wrong");
		} finally {
			setSaving(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpenAction}>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle>{form._id ? "Edit Work" : "Add Work"}</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{/* Company */}
					<Input
						placeholder="Company *"
						value={form.company ?? ""}
						onChange={(e) => setForm({ ...form, company: e.target.value })}
					/>

					{/* Title */}
					<Input
						placeholder="Title *"
						value={form.title ?? ""}
						onChange={(e) => setForm({ ...form, title: e.target.value })}
					/>

					{/* Website */}
					<Input
						placeholder="Company URL (optional)"
						value={form.href ?? ""}
						onChange={(e) => setForm({ ...form, href: e.target.value })}
					/>

					{/* Location */}
					<Select
						value={form.location}
						onValueChange={(v) =>
							setForm({ ...form, location: v as Work["location"] })
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Location *" />
						</SelectTrigger>
						<SelectContent>
							{LOCATION_TYPES.map((loc) => (
								<SelectItem key={loc} value={loc}>
									{loc}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Start / End */}
					<div className="grid grid-cols-2 gap-3">
						<Input
							placeholder="Start (e.g. Aug 2025) *"
							value={form.start ?? ""}
							onChange={(e) => setForm({ ...form, start: e.target.value })}
						/>
						<Input
							placeholder="End (e.g. Present) *"
							value={form.end ?? ""}
							onChange={(e) => setForm({ ...form, end: e.target.value })}
						/>
					</div>

					{/* Description */}
					<Textarea
						placeholder="Description *"
						value={form.description ?? ""}
						onChange={(e) => setForm({ ...form, description: e.target.value })}
					/>

					{/* =========================
              Badges
          ========================= */}
					<div className="space-y-2">
						<div className="flex gap-2">
							<Input
								placeholder="Add badge"
								value={badgeInput}
								onChange={(e) => setBadgeInput(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && addBadge()}
							/>
							<Button type="button" onClick={addBadge}>
								Add
							</Button>
						</div>

						<div className="flex gap-2 flex-wrap">
							{badges.map((badge) => (
								<Badge key={badge} variant="secondary">
									{badge}
									<X
										className="ml-1 h-3 w-3 cursor-pointer"
										onClick={() => removeBadge(badge)}
									/>
								</Badge>
							))}
						</div>
					</div>

					{/* =========================
              Logo Upload
          ========================= */}
					<div className="space-y-2">
						<label className="text-sm font-medium">Company Logo *</label>

						<Input
							type="file"
							accept="image/*"
							disabled={uploading}
							onChange={(e) =>
								e.target.files && handleLogoChange(e.target.files[0])
							}
						/>

						{logo && (
							<Image
								width={64}
								height={64}
								src={logo.url}
								alt="Logo preview"
								className="rounded-md border object-contain"
							/>
						)}
					</div>

					<Button
						className="w-full"
						onClick={submit}
						disabled={uploading || saving}
					>
						{saving ? "Saving..." : form._id ? "Update Work" : "Create Work"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
