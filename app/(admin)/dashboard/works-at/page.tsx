"use client";

import { useState } from "react";
import Image from "next/image";
import { api } from "@/lib/axios";
import { Work } from "@/types/work";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import WorkFormDialog from "@/components/admin/work-form-dialog";

import { getWorksData, removeWork } from "@/store/features/workSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function AdminWorksPage() {
	const dispatch = useAppDispatch();
	const works = useAppSelector(getWorksData);

	const [selected, setSelected] = useState<Work | null>(null);
	const [open, setOpen] = useState(false);

	const deleteWork = async (id: string) => {
		await api.delete(`/works-at/${id}`);
		dispatch(removeWork(id));
	};

	return (
		<section className="space-y-6 px-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Experience</h1>
					<p className="text-sm text-muted-foreground">
						Manage work history & roles
					</p>
				</div>

				<Button
					onClick={() => {
						setSelected(null);
						setOpen(true);
					}}
				>
					Add Work
				</Button>
			</div>

			{/* List */}
			<div className="grid gap-4">
				{works.map((work) => (
					<Card key={work._id} className="rounded-2xl">
						<CardContent className="flex gap-4 p-4">
							{/* Logo */}
							<div className="shrink-0">
								{work.logoUrl?.url ? (
									<div className="relative h-14 w-14 overflow-hidden rounded-xl border">
										<Image
											src={work.logoUrl.url}
											alt={work.company}
											fill
											className="object-contain p-1"
										/>
									</div>
								) : (
									<div className="h-14 w-14 rounded-xl border flex items-center justify-center text-xs text-muted-foreground">
										N/A
									</div>
								)}
							</div>

							{/* Info */}
							<div className="flex-1 space-y-1">
								<h3 className="font-semibold">{work.company}</h3>
								<p className="text-sm text-muted-foreground">{work.title}</p>

								<div className="flex gap-2 flex-wrap pt-1">
									<Badge variant="outline">{work.location}</Badge>
									<Badge variant="secondary">
										{work.start} – {work.end}
									</Badge>
								</div>
							</div>

							{/* Actions */}
							<div className="flex flex-col gap-2">
								<Button
									size="sm"
									variant="secondary"
									onClick={() => {
										setSelected(work);
										setOpen(true);
									}}
								>
									Edit
								</Button>

								<Button
									size="sm"
									variant="destructive"
									onClick={() => deleteWork(work._id)}
								>
									Delete
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Dialog */}
			<WorkFormDialog
				open={open}
				setOpenAction={setOpen}
				initialData={selected}
			/>
		</section>
	);
}
