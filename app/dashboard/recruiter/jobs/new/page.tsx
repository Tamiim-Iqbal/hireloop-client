"use client"

import { type FormEvent, useState } from "react"
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CircleHelp,
  Globe2,
  MapPin,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type JobFormData = {
  title: string
  companyName: string
  category: string
  jobType: string
  remoteAllowed: boolean
  location: string
  deadline: string
  salaryMin: string
  salaryMax: string
  salaryFrequency: string
  responsibilities: string
  qualifications: string
}

const initialForm: JobFormData = {
  title: "",
  companyName: "",
  category: "",
  jobType: "",
  remoteAllowed: false,
  location: "",
  deadline: "",
  salaryMin: "",
  salaryMax: "",
  salaryFrequency: "",
  responsibilities: "",
  qualifications: "",
}

const inputClassName =
  "h-10 rounded-lg border-transparent bg-[#1d1d21] px-3 text-sm font-medium text-white placeholder:text-sm placeholder:font-normal placeholder:text-white/40 shadow-none focus-visible:border-[#5c53fe] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/20"

const sectionTitleClassName =
  "flex items-center gap-2 text-sm font-semibold tracking-[-0.01em] text-white"

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-medium tracking-[-0.01em] text-white/90"
    >
      {children}
      {required && <span className="ml-0.5 text-[#8178ff]">*</span>}
    </label>
  )
}

function SelectField({
  id,
  value,
  onChange,
  children,
}: {
  id: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <select
      id={id}
      name={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`${inputClassName} w-full appearance-none`}
    >
      {children}
    </select>
  )
}

export default function NewJobForm() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function updateField<K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K]
  ) {
    setSubmitted(false)
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("New job data:", form)
    setSubmitted(true)
  }

  return (
    <section className="min-h-svh bg-[#101114] px-3 py-5 text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[860px]">
        <Link
          href="/dashboard/recruiter/jobs"
          className="mb-5 inline-flex items-center gap-1.5 text-xs text-white/45 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3.5" />
          Back to jobs
        </Link>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Create New Job
          </h1>
          <p className="mt-1 text-sm text-white/45">
            Add the details for your new job listing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-x border-dashed border-[#0877a7] bg-[#111215] px-3 py-4 sm:px-5 sm:py-6"
        >
          <div className="space-y-7">
            <section>
              <h2 className={sectionTitleClassName}>
                <span className="size-1 rounded-full bg-[#6f62ff]" />
                1. Basic Information
              </h2>
              <div className="mt-4 space-y-3">
                <div className="space-y-1">
                  <FieldLabel htmlFor="title" required>
                    Job Title
                  </FieldLabel>
                  <Input
                    id="title"
                    name="title"
                    required
                    value={form.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    placeholder="Frontend Developer"
                    className={inputClassName}
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <FieldLabel htmlFor="companyName" required>
                      Company Name
                    </FieldLabel>
                    <Input
                      id="companyName"
                      name="companyName"
                      required
                      value={form.companyName}
                      onChange={(event) =>
                        updateField("companyName", event.target.value)
                      }
                      placeholder="e.g. HirePulse Network"
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-1">
                    <FieldLabel htmlFor="category" required>
                      Job Category
                    </FieldLabel>
                    <SelectField
                      id="category"
                      value={form.category}
                      onChange={(value) => updateField("category", value)}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option>Engineering &amp; Tech</option>
                      <option>Design</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>Operations</option>
                    </SelectField>
                  </div>
                </div>

                <div className="space-y-1">
                  <FieldLabel htmlFor="jobType" required>
                    Job Type
                  </FieldLabel>
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                    {["Full-time", "Part-time", "Contract", "Internship"].map(
                      (type) => (
                        <label
                          key={type}
                          className={`flex h-8 cursor-pointer items-center justify-center rounded-lg border text-[11px] font-medium transition-colors ${
                            form.jobType === type
                              ? "border-[#5c53fe] bg-[#1d1b3b] text-white"
                              : "border-transparent bg-[#1d1d21] text-white/45 hover:text-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="jobType"
                            value={type}
                            checked={form.jobType === type}
                            onChange={(event) =>
                              updateField("jobType", event.target.value)
                            }
                            className="sr-only"
                          />
                          {type}
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className={sectionTitleClassName}>
                <span className="size-1 rounded-full bg-[#6f62ff]" />
                2. Location, Compensation &amp; Timeline
              </h2>
              <div className="mt-4 space-y-3">
                <label className="flex min-h-12 cursor-pointer items-center justify-between rounded-lg bg-[#1d1d21] px-3 py-2">
                  <span className="flex items-center gap-2">
                    <Globe2 className="size-4 text-white/65" />
                    <span>
                      <span className="block text-xs font-medium text-white">
                        Remote Work Allowed (isRemote)
                      </span>
                      <span className="block text-[10px] leading-4 text-white/45">
                        Enable worldwide or distributed candidate applications
                      </span>
                    </span>
                  </span>
                  <span
                    className={`relative h-3.5 w-7 rounded-full transition-colors ${
                      form.remoteAllowed ? "bg-[#8178ff]" : "bg-white/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="remoteAllowed"
                      checked={form.remoteAllowed}
                      onChange={(event) =>
                        updateField("remoteAllowed", event.target.checked)
                      }
                      className="sr-only"
                    />
                    <span
                      className={`absolute top-0.5 size-2.5 rounded-full bg-white transition-transform ${
                        form.remoteAllowed ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </label>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="location" required>
                        Job Location (location)
                      </FieldLabel>
                      <span className="text-[10px] font-medium text-white/40">
                        Required
                      </span>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute top-2.5 left-2.5 size-3.5 text-white/45" />
                      <Input
                        id="location"
                        name="location"
                        required
                        value={form.location}
                        onChange={(event) =>
                          updateField("location", event.target.value)
                        }
                        placeholder="e.g. New York, USA"
                        className={`${inputClassName} pl-8`}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <FieldLabel htmlFor="deadline">
                      Application Deadline (deadline)
                    </FieldLabel>
                    <div className="relative">
                      <CalendarDays className="absolute top-2.5 left-2.5 size-3.5 text-white/45" />
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={form.deadline}
                        onChange={(event) =>
                          updateField("deadline", event.target.value)
                        }
                        className={`${inputClassName} pl-8 [color-scheme:dark]`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-1">
                    <FieldLabel htmlFor="salaryMin">
                      Min Salary / Rate
                    </FieldLabel>
                    <Input
                      id="salaryMin"
                      name="salaryMin"
                      type="number"
                      min="0"
                      value={form.salaryMin}
                      onChange={(event) =>
                        updateField("salaryMin", event.target.value)
                      }
                      placeholder="€ 25"
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-1">
                    <FieldLabel htmlFor="salaryMax">
                      Max Salary / Rate
                    </FieldLabel>
                    <Input
                      id="salaryMax"
                      name="salaryMax"
                      type="number"
                      min="0"
                      value={form.salaryMax}
                      onChange={(event) =>
                        updateField("salaryMax", event.target.value)
                      }
                      placeholder="€ 40"
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-1">
                    <FieldLabel htmlFor="salaryFrequency">Frequency</FieldLabel>
                    <SelectField
                      id="salaryFrequency"
                      value={form.salaryFrequency}
                      onChange={(value) =>
                        updateField("salaryFrequency", value)
                      }
                    >
                      <option value="" disabled>
                        Select frequency
                      </option>
                      <option>per hour</option>
                      <option>per month</option>
                      <option>per year</option>
                    </SelectField>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className={sectionTitleClassName}>
                <span className="size-1 rounded-full bg-[#6f62ff]" />
                3. Responsibilities &amp; Requirements
              </h2>
              <div className="mt-4 space-y-3">
                <div className="space-y-1">
                  <FieldLabel htmlFor="responsibilities" required>
                    Key Responsibilities
                  </FieldLabel>
                  <textarea
                    id="responsibilities"
                    name="responsibilities"
                    required
                    value={form.responsibilities}
                    onChange={(event) =>
                      updateField("responsibilities", event.target.value)
                    }
                    placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                    rows={4}
                    className="w-full resize-y rounded-lg border border-transparent bg-[#1d1d21] px-3 py-3 text-sm leading-5 font-medium text-white shadow-none outline-none placeholder:text-sm placeholder:font-normal placeholder:text-white/40 focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/20"
                  />
                </div>
                <div className="space-y-1">
                  <FieldLabel htmlFor="qualifications" required>
                    Qualifications &amp; Requirements
                  </FieldLabel>
                  <textarea
                    id="qualifications"
                    name="qualifications"
                    required
                    value={form.qualifications}
                    onChange={(event) =>
                      updateField("qualifications", event.target.value)
                    }
                    placeholder={
                      "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven design\n• Experience partnering with product teams and UI/UX designers"
                    }
                    rows={4}
                    className="w-full resize-y rounded-lg border border-transparent bg-[#1d1d21] px-3 py-3 text-sm leading-5 font-medium text-white shadow-none outline-none placeholder:text-sm placeholder:font-normal placeholder:text-white/40 focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/20"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-7 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
            <p className="flex items-center gap-1.5 text-[10px] text-white/40">
              <CircleHelp className="size-3" />
              You can save this listing as a draft and finish it later.
            </p>
            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="h-9 flex-1 rounded-lg border-white/10 bg-[#1d1d21] px-4 text-xs font-medium text-white/75 hover:bg-white/10 sm:flex-none"
              >
                Save draft
              </Button>
              <Button
                type="submit"
                className="h-9 flex-1 rounded-lg bg-[#5c53fe] px-4 text-xs font-semibold text-white hover:bg-[#4f46f0] sm:flex-none"
              >
                Publish job
              </Button>
            </div>
          </div>

          {submitted && (
            <div
              role="status"
              className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300"
            >
              <Check className="size-3.5" />
              Job details collected successfully. Your listing is ready to
              publish.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
