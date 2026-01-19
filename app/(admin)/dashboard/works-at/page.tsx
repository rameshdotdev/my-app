"use client";

import { useState } from "react";
import Image from "next/image";
import { api } from "@/lib/axios";
import type { Work } from "@/types/work";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import WorkFormDialog from "@/components/admin/work-form-dialog";

import { getWorksData, removeWork } from "@/store/features/workSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { Pencil, Trash2, Plus, MapPin, CalendarDays } from "lucide-react";

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Experience</h1>
          <p className="text-sm text-muted-foreground">
            Manage work history, roles, tags and points
          </p>
        </div>

        <Button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Work
        </Button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {works.map((work) => {
          const tagsToShow = work.tags?.slice(0, 6) ?? [];
          const remainingTags = (work.tags?.length ?? 0) - tagsToShow.length;

          const pointsToShow = work.points?.slice(0, 2) ?? [];
          const remainingPoints =
            (work.points?.length ?? 0) - pointsToShow.length;

          return (
            <Card
              key={work._id}
              className="rounded-2xl border-border bg-background"
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: Logo + Info */}
                  <div className="flex gap-4">
                    {/* Logo */}
                    <div className="shrink-0">
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-border bg-muted/30">
                        {work.logoUrl?.url ? (
                          <Image
                            src={work.logoUrl.url}
                            alt={work.company}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                            N/A
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Main Info */}
                    <div className="space-y-2">
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold leading-tight text-foreground">
                            {work.company}
                          </h3>

                          {work.type && (
                            <Badge variant="secondary" className="rounded-md">
                              {work.type}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {work.role}
                        </p>
                      </div>

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {/* Location */}
                        <div className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="text-foreground/80">
                            {work.location_type ?? "—"}
                          </span>
                          <span className="opacity-70">•</span>
                          <span>{work.location}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>
                            {work.start} — {work.end}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      {work.tags?.length ? (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tagsToShow.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="rounded-md text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}

                          {remainingTags > 0 && (
                            <Badge
                              variant="secondary"
                              className="rounded-md text-xs"
                            >
                              +{remainingTags} more
                            </Badge>
                          )}
                        </div>
                      ) : null}

                      {/* Points preview */}
                      {work.points?.length ? (
                        <div className="space-y-1 pt-1">
                          {pointsToShow.map((p, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                              <p className="leading-relaxed text-foreground/90">
                                {p}
                              </p>
                            </div>
                          ))}

                          {remainingPoints > 0 && (
                            <p className="text-xs text-muted-foreground">
                              +{remainingPoints} more points
                            </p>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row gap-2 sm:flex-col sm:items-end">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="gap-2"
                      onClick={() => {
                        setSelected(work);
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => deleteWork(work._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
